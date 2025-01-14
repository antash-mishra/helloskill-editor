"use client"

import { useState } from "react";
// import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
// import { Card } from "@/components/ui/card";
import QuestionPanel from "@/components/QuestionPanel";
import { Button } from "@/components/ui/button";
import { Lightbulb, ShowerHead } from "lucide-react";
import TextEditor from "@/components/editor";


// const TextEditor = dynamic(() => import("@/components/editor"), { ssr: false });

export default function Home() {
  const [questionWidth, setQuestionWidth] = useState<number>(50);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>("");

  const handleDrag = (e: MouseEvent) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    setQuestionWidth(Math.min(75, Math.max(25, newWidth)));
  };

  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", stopDragging);
  };

  const stopDragging = () => {
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", stopDragging);
  };

  const handleHintsChange = (hints: boolean) => {
    setShowHints(hints);
  };

  const handleCurrentHint = (hint: string) => {
    setCurrentHint(hint);
  };

  return (

    // Create two sides question-side and editor-side
    <div className="flex flex-col h-screen bg-white">
      {/* Navigation */}
      <div className="flex-none">
        <Navbar />
        <Separator className="mt-0.5" />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Question Panel */}
        <div 
          className="relative border-r border-gray-200"
          style={{
            width: `${questionWidth}%`,
            minWidth: "25%",
            maxWidth: "75%",
          }}
        >
          <div className="h-full overflow-y-auto px-4 py-3">
            <QuestionPanel showHints={showHints} currentHint={currentHint}/>
          </div>
        </div>

        {/* Draggable Divider */}
        <div
          className="relative w-1.5 hover:w-2 bg-gray-200 cursor-col-resize hover:bg-blue-400 transition-all duration-150 ease-in-out"
          onMouseDown={startDragging}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-400 rounded-full opacity-50" />
        </div>

        {/* Editor Panel */}
        <div className="flex-1 min-w-[25%] flex flex-col">
          
          {/* Editor Container */}
          <div className="flex-1">
            <div className="h-full p-3">
              <TextEditor 
                initialLanguage="python"
                hints = {showHints}
                onHintsChange={handleHintsChange}
                onHintReceived={handleCurrentHint}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
