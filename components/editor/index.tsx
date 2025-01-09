"use client";

import { useState } from "react";
import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { CircularSpinner } from "@/components/circular-spinner";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from "@codemirror/lang-python";

interface TextEditorProps {
    // language: Specifies the programming language for the editor. It must be one of the predefined options (although you can add more if you want)
    language: "javascript" | "typescript" | "python" | "java" | "c";
}
  
  const TextEditor = ({
    language,
  }: TextEditorProps) => {
    
    const [value, setValue] = useState("console.log('hello')");
    const onChange = React.useCallback((val: string, viewUpdate: any) => {
      console.log('val:', val);
      setValue(val);
    }, []);
    
    const { resolvedTheme } = useTheme();

    return (
      <CodeMirror value={value} theme={resolvedTheme === "dark" ? "dark" : "light"} height="90vh" extensions={[python()]} onChange={onChange} />
    );
  };

export default TextEditor;