"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CarouselProps {
  children: React.ReactNode;
  itemWidth?: number;
}

export function GsapCarousel({ children, itemWidth = 320 }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollTo = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    
    const scrollAmount = direction === "right" ? itemWidth : -itemWidth;
    const targetScroll = containerRef.current.scrollLeft + scrollAmount;

    gsap.to(containerRef.current, {
      scrollLeft: targetScroll,
      duration: 0.6,
      ease: "power3.inOut",
      onUpdate: checkScroll,
    });
  };

  useEffect(() => {
    checkScroll();
    
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      checkScroll();
    };

    window.addEventListener("resize", handleResize);
    
    // GSAP entry animation
    gsap.fromTo(
      container.children,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <button
        onClick={() => scrollTo("left")}
        disabled={!canScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all -translate-x-2 ${
          canScrollLeft
            ? "bg-[#1c1c1e]/80 border border-white/[0.1] text-white hover:bg-[#2997ff]/20 hover:border-[#2997ff]/30"
            : "bg-transparent text-white/[0.2] cursor-not-allowed"
        }`}
      >
        ←
      </button>
      
      <button
        onClick={() => scrollTo("right")}
        disabled={!canScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all translate-x-2 ${
          canScrollRight
            ? "bg-[#1c1c1e]/80 border border-white/[0.1] text-white hover:bg-[#2997ff]/20 hover:border-[#2997ff]/30"
            : "bg-transparent text-white/[0.2] cursor-not-allowed"
        }`}
      >
        →
      </button>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-12 no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </div>
    </div>
  );
}

export default GsapCarousel;