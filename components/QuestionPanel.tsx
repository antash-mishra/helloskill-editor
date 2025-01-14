import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface QuestionPanelProps {
  showHints?: boolean;
  currentHint?: string;
}

export default function QuestionPanel({ showHints = false, currentHint = "" }: QuestionPanelProps) {
  
  return (
    <div className="space-y-4">
      {/* Question Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Given an array of integers, return the indices of the two numbers such
              that they add up to a specific target.
            </p>
            <div className="bg-slate-100 p-4 rounded-md font-mono">
              Input: nums = [2,7,11,15], target = 9
              Output: [0,1]
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hints Panel */}
      {showHints && (
        <Card>
          <CardHeader>
            <CardTitle>Hints</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="whitespace-pre-wrap">
            {currentHint}
          </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}