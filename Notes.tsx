"use client";

import { useState, useEffect } from "react";

export default function Notes() {
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setText(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem("notes", text);
  };

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-1">Notes</h3>
      <textarea
        className="w-full border rounded p-2 text-sm"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write notes..."
      />
      <button
        onClick={handleSave}
        className="mt-2 px-3 py-1 bg-black text-white rounded text-sm"
      >
        Save
      </button>
    </div>
  );
}