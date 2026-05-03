import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// DYInvest Premium GSAP Animation System
// Based on Dribbble 2025 + GSAP Best Practices
// ============================================

// Core Animation Presets
export const animations = {
  // Page load animations
  fadeInUp: {
    from: { y: 30, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
  },
  
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.5, ease: "power2.out" }
  },
  
  slideInLeft: {
    from: { x: -30, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
  },
  
  slideInRight: {
    from: { x: 30, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
  },
  
  scaleIn: {
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" }
  },
  
  // Stagger children animation
  stagger: (stagger = 0.1) => ({
    stagger,
    ease: "power3.out"
  })
};

// Micro-interactions
export const microInteractions = {
  // Button hover
  buttonHover: (target: Element) => {
    gsap.to(target, {
      scale: 1.02,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      duration: 0.2,
      ease: "power1.out"
    });
  },
  
  buttonLeave: (target: Element) => {
    gsap.to(target, {
      scale: 1,
      boxShadow: "none",
      duration: 0.2,
      ease: "power1.out"
    });
  },
  
  buttonClick: (target: Element) => {
    gsap.to(target, {
      scale: 0.98,
      duration: 0.1,
      onComplete: () => gsap.to(target, {
        scale: 1,
        duration: 0.1,
        ease: "power1.out"
      })
    });
  },
  
  // Card hover - 3D tilt effect
  cardHover: (target: Element) => {
    gsap.to(target, {
      y: -4,
      scale: 1.01,
      boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
      duration: 0.2,
      ease: "power2.out"
    });
  },
  
  cardLeave: (target: Element) => {
    gsap.to(target, {
      y: 0,
      scale: 1,
      boxShadow: "none",
      duration: 0.2,
      ease: "power2.out"
    });
  },
  
  // Form validation - error shake
  formError: (target: Element) => {
    gsap.to(target, {
      x: -5,
      duration: 0.05,
      repeat: 5,
      yoyo: true,
      ease: "power2.out"
    });
  },
  
  // Success feedback
  successPulse: (target: Element) => {
    gsap.to(target, {
      scale: 1.2,
      duration: 0.1,
      onComplete: () => gsap.to(target, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)"
      })
    });
  }
};

// Export individual presets for convenience
export const fadeInUp = animations.fadeInUp;
export const fadeIn = animations.fadeIn;
export const slideInLeft = animations.slideInLeft;
export const slideInRight = animations.slideInRight;
export const scaleIn = animations.scaleIn;
export const stagger = animations.stagger;

// Scroll-triggered animations
export const scrollAnimations = {
  // Parallax effect
  parallax: (yPercent: number = 20) => ({
    scrollTrigger: {
      trigger: ".parallax-trigger",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    },
    y: yPercent,
    ease: "none"
  }),
  
  // Reveal on scroll
  reveal: (selector: string) => ({
    scrollTrigger: {
      trigger: selector,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }),
  
  // Stagger reveal
  staggerReveal: (selector: string, stagger: number = 0.1) => ({
    scrollTrigger: {
      trigger: selector,
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 30,
    opacity: 0,
    stagger,
    duration: 0.5,
    ease: "power3.out"
  })
};

// Number counter hook for financial data
export function useNumberAnimation(endValue: number, duration: number = 1.5) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        innerText: endValue,
        duration,
        ease: "power2.out",
        snap: { innerText: 0.01 },
        onUpdate: function() {
          setDisplayValue(parseFloat(this.targets()[0].innerText));
        }
      });
    }
  }, [endValue, duration]);
  
  return { ref, value: displayValue };
}

// Page transition hook
export function usePageTransition() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      const ctx = gsap.context(() => {
        // Enter animation
        gsap.from(ref.current, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power3.out"
        });
      }, ref);
      
      return () => ctx.revert();
    }
  }, []);
  
  return ref;
}

// Chart animations
export const chartAnimations = {
  // Line chart drawing
  lineDraw: (duration: number = 1.5) => ({
    scrollTrigger: {
      trigger: ".chart-container",
      start: "top 80%"
    },
    strokeDasharray: "1000 0",
    duration,
    ease: "power2.out"
  }),
  
  // Bar chart growth
  barGrow: (stagger: number = 0.05) => ({
    scrollTrigger: {
      trigger: ".chart-container",
      start: "top 80%"
    },
    scaleY: 0,
    transformOrigin: "bottom center",
    stagger,
    duration: 0.5,
    ease: "power3.out"
  }),
  
  // Data points pop-in
  dataPoints: (stagger: number = 0.1) => ({
    scrollTrigger: {
      trigger: ".chart-container",
      start: "top 80%"
    },
    scale: 0,
    stagger,
    duration: 0.3,
    ease: "back.out(1.7)"
  })
};

// Loading states
export const loadingAnimations = {
  // Spinner
  spinner: (target: Element) => {
    gsap.to(target, {
      rotation: 360,
      ease: "none",
      repeat: -1,
      duration: 1
    });
  },
  
  // Skeleton pulse
  skeletonPulse: (target: Element) => {
    gsap.to(target, {
      opacity: 0.5,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "sine.inOut"
    });
  },
  
  // Progress bar fill
  progressFill: (target: Element, progress: number) => {
    gsap.to(target, {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power1.inOut"
    });
  }
};

// Custom hooks for common patterns
export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      const ctx = gsap.context(() => {
        gsap.from(ref.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }, ref);
      
      return () => ctx.revert();
    }
  }, []);
  
  return ref;
}

export function useStaggerReveal(selector: string, stagger: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      const ctx = gsap.context(() => {
        gsap.from(selector, {
          y: 30,
          opacity: 0,
          stagger,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }, ref);
      
      return () => ctx.revert();
    }
  }, [selector, stagger]);
  
  return ref;
}

// Page load animations (for backward compatibility)
export const pageLoadAnimations = {
  hero: () => {
    const tl = gsap.timeline();
    tl.from(".hero-badge", { y: -30, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.2);
    tl.from(".hero-title", { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, 0.35);
    tl.from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.5);
    return tl;
  }
};

// Export GSAP and ScrollTrigger for direct use
export { gsap, ScrollTrigger };
