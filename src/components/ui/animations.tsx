"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

interface FadeInUpProps extends AnimationProps {
  direction?: "up" | "down" | "left" | "right";
}

export function FadeInUp({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
}: FadeInUpProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const fromValues: gsap.TweenVars = {
      opacity: 0,
      duration,
      ease: "power3.out",
      delay,
    };

    switch (direction) {
      case "up":
        Object.assign(fromValues, { y: 30 });
        break;
      case "down":
        Object.assign(fromValues, { y: -30 });
        break;
      case "left":
        Object.assign(fromValues, { x: 50 });
        break;
      case "right":
        Object.assign(fromValues, { x: -50 });
        break;
    }

    gsap.fromTo(element, fromValues, {
      opacity: 1,
      x: 0,
      y: 0,
    });
  }, [delay, duration, direction]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function ScaleIn({ children, className, delay = 0 }: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.6)",
        delay,
      }
    );
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function StaggerIn({
  children,
  className,
  stagger = 0.1,
}: AnimationProps & { stagger?: number }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger,
        ease: "power3.out",
      }
    );
  }, [stagger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function ScrollRevealStagger({
  children,
  className,
  stagger = 0.1,
}: AnimationProps & { stagger?: number }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [stagger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function Float({
  children,
  className,
  duration = 2,
}: AnimationProps & { duration?: number }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      y: -10,
      duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, [duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function Pulse({
  children,
  className,
}: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      scale: 1.05,
      duration: 0.8,
      ease: "power3.out",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function Shimmer({
  children,
  className,
}: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { backgroundPosition: "-200% 0" },
      {
        backgroundPosition: "200% 0",
        duration: 1.5,
        ease: "linear",
        repeat: -1,
      }
    );
  }, []);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function Parallax({
  children,
  className,
  speed = 0.5,
}: AnimationProps & { speed?: number }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      y: () => -(ScrollTrigger.maxScroll(window) * speed),
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function NumberCounter({
  endValue,
  prefix = "",
  suffix = "",
  className,
}: {
  endValue: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: endValue,
      duration: 1.5,
      ease: "power3.out",
      onUpdate: () => {
        if (element) {
          element.textContent = `${prefix}${Math.round(obj.value).toLocaleString("pt-BR")}${suffix}`;
        }
      },
    });
  }, [endValue, prefix, suffix]);

  return <span ref={elementRef} className={className} />;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const elementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.6)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <button ref={elementRef} className={className}>
      {children}
    </button>
  );
}