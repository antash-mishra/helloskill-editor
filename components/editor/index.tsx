"use client";

import { useState, useEffect } from "react";
import React from "react";
// import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
// import { CircularSpinner } from "@/components/circular-spinner";
import MonacoEditor from '@monaco-editor/react';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {
  registerCompletion,
  type Monaco,
  type StandaloneCodeEditor,
} from 'monacopilot';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Lightbulb, ShowerHead } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


export interface hintsCompletion {
  completion: string;
}

interface TextEditorProps {
    // language: Specifies the programming language for the editor. It must be one of the predefined options (although you can add more if you want)
    initialLanguage: "javascript" | "typescript" | "python" | "java" | "c";
    hints: boolean;
    onHintsChange?: (hints: boolean) => void;
    onHintReceived?: (hint: string) => void;
}

  const TextEditor: React.FC<TextEditorProps> = ({initialLanguage, hints, onHintsChange, onHintReceived}) => {
    const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);
    const [monaco, setMonaco] = useState<Monaco | null>(null);
    const [language, setLanguage] = useState<TextEditorProps["initialLanguage"]>(initialLanguage);
    const [loading, setLoading] = useState(true);
    const [showHints, setShowHints] = useState<boolean>(hints);
    const [isFetching, setIsFetching] = useState(false);
    
    const { toast } = useToast()

    const fetchHints = async () => {
      try {
        if (!editor) return
        const code: string = editor?.getValue();
        setIsFetching(true);


        const response = await fetch('http://localhost:8080/suggestion', {
          method: 'POST', // Specify the HTTP method
          headers: {
            'Content-Type': 'application/json', // Ensure the server knows the request payload type
          },
          body: JSON.stringify({ 
            question: "Given an array of integers, return the indices of the two numbers such that they add up to a specific target." , 
            language: language, 
            input:  code, 
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data: hintsCompletion = await response.json();
        const newHintsValue = !showHints;
        setShowHints(newHintsValue);
        onHintsChange?.(newHintsValue);
        onHintReceived?.(data.completion);

        toast({
          title: "Hint Received",
          description: "New hint has been loaded",
        });
  
      } catch (err) {

        toast({
          title: "Error",
          description: "Failed to fetch hint. Please try again.",
          variant: "destructive",
        });
        console.error('Error fetching hint:', err);
  
      } finally {
        setIsFetching(false);
      }
    }


    const handleLanguageChange = (value: string) => {
      setLanguage(value as TextEditorProps["initialLanguage"]);
    };
  
    const handleHintsToggle = () => {
      if (!showHints) {
        // Only fetch when turning hints on
        fetchHints();
      } else {
        // Just toggle off if hints are currently shown
        const newHintsValue = false;
        setShowHints(newHintsValue);
        onHintsChange?.(newHintsValue);
      }
    };
  
    const { resolvedTheme } = useTheme();
  
    useEffect(() => {
      if (!monaco || !editor) return;
      
      const completion = registerCompletion(monaco, editor, {
        endpoint: 'http://localhost:8080/complete',
        language: language,
      });
  
      return () => {
        completion.deregister();
      };
    }, [monaco, editor, language]);
  
    return (
      <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="c">C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleHintsToggle}
          disabled={isFetching}
          className="flex items-center gap-2"
        >
          <Lightbulb size={16} className={showHints ? "text-yellow-500" : ""}/>
          {showHints ? "Hide Hints" : "Show Hints"}
        </Button>
      </div>
      
      <div className="flex-1">
        <MonacoEditor 
          height="100%"
          theme={resolvedTheme === "dark" ? "vs-dark" : "vs"}
          defaultLanguage="python"
          language={language}
          defaultValue="# Start coding here"
          onMount={(editor, monaco) => {
            setEditor(editor);
            setMonaco(monaco);
            setLoading(false);
          }}
        />
      </div>
    </div>

    );
  };

export default TextEditor;