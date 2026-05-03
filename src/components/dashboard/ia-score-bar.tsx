// src/components/dashboard/ia-score-bar.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface IAScoreBarProps {
  score: number;
  color: string;
}

export function IAScoreBar({ score, color }: IAScoreBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        { 
          width: `${score}%`, 
          duration: 1.5, 
          ease: "expo.out",
          delay: 0.2
        }
      );
    }
  }, [score]);

  return (
    <div className="w-16 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
      <div 
        ref={barRef}
        className={cn("h-full rounded-full", color.replace('text', 'bg'))} 
        style={{ width: "0%" }} 
      />
    </div>
  );
}
