import React from "react";

export default function QuestionPanel() {
  return (
    <div style={{ padding: "20px", wordWrap: "break-word" }}>
      <h1>Question</h1>
      <p>
        Given an array of integers, return the indices of the two numbers such
        that they add up to a specific target.
      </p>
      <pre>
        Input: nums = [2,7,11,15], target = 9
        Output: [0,1]
      </pre>
    </div>
  );
}
