"use client";

import { useState, useRef } from "react";
import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { CircularSpinner } from "@/components/circular-spinner";
import Editor, { Monaco} from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

interface TextEditorProps {
    // language: Specifies the programming language for the editor. It must be one of the predefined options (although you can add more if you want)
    initialLanguage: "javascript" | "typescript" | "python" | "java" | "c";
}
  
  const TextEditor: React.FC<TextEditorProps> = ({initialLanguage}) => {
    const [language, setLanguage] = useState<TextEditorProps["initialLanguage"]>(initialLanguage);
    const [loading, setLoading] = useState(true);
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(event.target.value as TextEditorProps["initialLanguage"]);
    };

  

    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    function handleEditorDidMount(
      editor: monaco.editor.IStandaloneCodeEditor, 
      monaco: typeof import('monaco-editor')) {
      editorRef.current = editor;
      editor.onDidChangeModelContent(() => {
        showValue();
      });
    }

    function showValue() {
      // alert(editorRef.current?.getValue())
      console.log(editorRef.current?.getValue())
    }

    const { resolvedTheme } = useTheme();


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
      
        <Editor height="90vh" theme= {resolvedTheme ==="dark" ? "vs-dark" : "vs"} defaultLanguage="javascript" language={language} defaultValue="// some comment" onMount={handleEditorDidMount} />
      </div>
    );
  };

export default TextEditor;