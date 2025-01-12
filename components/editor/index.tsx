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
interface TextEditorProps {
    // language: Specifies the programming language for the editor. It must be one of the predefined options (although you can add more if you want)
    initialLanguage: "javascript" | "typescript" | "python" | "java" | "c";
}
  
  const TextEditor: React.FC<TextEditorProps> = ({initialLanguage}) => {
    const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);
    const [monaco, setMonaco] = useState<Monaco | null>(null);
    const [language, setLanguage] = useState<TextEditorProps["initialLanguage"]>(initialLanguage);
    const [loading, setLoading] = useState(true);
    // Handle Language change
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(event.target.value as TextEditorProps["initialLanguage"]);
    };
    console.log(initialLanguage, language)
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
      <div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="language-select">Select Language: </label>
          <select id="language-select" value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>
        </div>
      
        <MonacoEditor 
          height="90vh" 
          theme= {resolvedTheme ==="dark" ? "vs-dark" : "vs"} 
          defaultLanguage="python" 
          language={language} defaultValue="// some comment" 
          onMount={(editor, monaco) => {
            setEditor(editor);
            setMonaco(monaco);
            setLoading(false);
          }} />
      </div>
    );
  };

export default TextEditor;