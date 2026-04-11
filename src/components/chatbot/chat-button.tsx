"use client";

import { MessageCircle, X } from "@esmate/shadcn/pkgs/lucide-react";

export function ChatButton({
  onClick,
  open,
}: {
  onClick: () => void;
  open: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F6B4F] text-white shadow-lg transition-transform hover:scale-105"
      aria-label={open ? "Close AI assistant" : "Open AI assistant"}
    >
      {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
    </button>
  );
}

