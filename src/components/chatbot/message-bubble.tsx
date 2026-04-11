"use client";

import DOMPurify from "isomorphic-dompurify";

export function MessageBubble({
  role,
  text,
  html,
}: {
  role: "user" | "assistant";
  text: string;
  html?: string;
}) {
  const user = role === "user";
  const safeHtml = html ? DOMPurify.sanitize(html) : "";
  return (
    <div className={`flex ${user ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
          user ? "bg-[#1F6B4F] text-white" : "bg-white text-[#1E1F1C] border border-[#C6A24A]/20"
        }`}
      >
        {html && !user ? (
          <div
            className="prose prose-sm max-w-none prose-headings:mb-2 prose-p:my-1 prose-ul:my-1"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        ) : (
          text
        )}
      </div>
    </div>
  );
}

