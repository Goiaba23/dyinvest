import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// Premium GSAP Animations for DYInvest
// Based on fintech design research
// ============================================

// Base animation presets
export const fadeInUp = {
  from: { y: 30, opacity: 0 },
  to: { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
};

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: 0.5, ease: "power2.out" }
};

export const slideInLeft = {
  from: { x: -30, opacity: 0 },
  to: { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
};

export const slideInRight = {
  from: { x: 30, opacity: 0 },
  to: { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
};

export const scaleIn = {
  from: { scale: 0.8, opacity: 0 },
  to: { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" }
};

// Number counting animation for financial data
export const numberCounter = {
  from: { innerText: 0 },
  to: { 
    innerText: "value", 
    duration: 1.5, 
    ease: "power2.out"
  }
};

// Chart line reveal animation
export const chartReveal = {
  from: { strokeDashoffset: 1000 },
  to: { 
    strokeDashoffset: 0, 
    duration: 2, 
    ease: "power2.inOut" 
  }
};

// Stagger children animation
export const staggerChildren = (stagger = 0.1) => ({
  stagger
});

// Custom hooks for GSAP animations
export function useGsapAnimation(ref: any, animation: any, dependencies: any[] = []) {
  useEffect(() => {
    if (ref.current) {
      const ctx = gsap.context(() => {
        if (typeof animation === 'function') {
          animation();
        } else {
          gsap.fromTo(ref.current, animation.from || {}, animation.to || {});
        }
      }, ref);
      return () => ctx.revert();
    }
  }, dependencies);
}

// Page load animations
export const pageLoadAnimations = {
  hero: () => {
    const tl = gsap.timeline();
    
    // Background elements
    tl.from(".page-bg-gradient", {
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, 0);
    
    // Hero content
    tl.from(".hero-title", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, 0.2);
    
    tl.from(".hero-subtitle", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, 0.35);
    
    tl.from(".hero-stats", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    }, 0.5);
    
    tl.from(".hero-cta", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    }, 0.6);
    
    // 3D elements
    tl.from(".hero-3d", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.2)"
    }, 0.3);
    
    return tl;
  },
  
  dashboard: () => {
    const tl = gsap.timeline();
    
    // Stats cards staggered
    tl.from(".stat-card", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out"
    }, 0);
    
    // Main content
    tl.from(".dashboard-main", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, 0.3);
    
    // Sidebar
    tl.from(".dashboard-sidebar", {
      x: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power3.out"
    }, 0.2);
    
    return tl;
  },
  
  cards: () => {
    const tl = gsap.timeline();
    
    tl.from(".glass-card", {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out"
    }, 0);
    
    return tl;
  }
};

// Scroll-triggered animations
export const scrollAnimations = {
  fadeInUp: (trigger?: string) => ({
    scrollTrigger: {
      trigger: trigger || ".scroll-trigger",
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }),
  
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
  
  staggerReveal: (stagger: number = 0.1) => ({
    scrollTrigger: {
      trigger: ".stagger-trigger",
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

// Micro-interactions
export const microInteractions = {
  buttonHover: (target: Element) => {
    gsap.to(target, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out"
    });
  },
  
  buttonLeave: (target: Element) => {
    gsap.to(target, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  },
  
  cardHover: (target: Element) => {
    gsap.to(target, {
      y: -4,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 255, 148, 0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  },
  
  cardLeave: (target: Element) => {
    gsap.to(target, {
      y: 0,
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });
  }
};

// Export GSAP for direct use
export { gsap, ScrollTrigger };

// Stagger helper function
export function staggerAnimation(selector: string, options: any = {}) {
  return {
    [selector]: {
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
        ...options.scrollTrigger,
      },
      ...options,
    }
  };
}

// Card hover animation
export const cardHover = {
  from: { y: 0 },
  to: { 
    y: -2, 
    duration: 0.2, 
    ease: "power2.out",
    onComplete: (self: any) => {
      self.targets[0].style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)';
    }
  }
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

// 3D Card tilt effect
export function use3DTilt(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      gsap.to(element, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
}