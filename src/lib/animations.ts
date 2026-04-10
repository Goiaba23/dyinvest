"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ease = {
  smooth: "power3.out",
  elastic: "elastic.out(1, 0.5)",
  bounce: "bounce.out",
  expo: "expo.out",
  quad: "power2.out",
  cubic: "power3.out",
};

export const durations = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  stagger: 0.1,
};

export function fadeInUp(target: string, delay = 0) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: durations.normal,
      ease: ease.smooth,
      delay,
    }
  );
}

export function fadeIn(target: string, delay = 0) {
  return gsap.fromTo(
    target,
    { opacity: 0 },
    {
      opacity: 1,
      duration: durations.normal,
      ease: ease.smooth,
      delay,
    }
  );
}

export function scaleIn(target: string, delay = 0) {
  return gsap.fromTo(
    target,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration: durations.normal,
      ease: ease.elastic,
      delay,
    }
  );
}

export function staggerFadeIn(targets: string, stagger = 0.1) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: durations.normal,
      stagger,
      ease: ease.smooth,
    }
  );
}

export function slideInFromRight(target: string, delay = 0) {
  return gsap.fromTo(
    target,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: durations.normal,
      ease: ease.expo,
      delay,
    }
  );
}

export function slideInFromLeft(target: string, delay = 0) {
  return gsap.fromTo(
    target,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: durations.normal,
      ease: ease.expo,
      delay,
    }
  );
}

export function textReveal(target: string, delay = 0) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: ease.smooth,
      delay,
    }
  );
}

export function shimmer(target: string) {
  return gsap.fromTo(
    target,
    { backgroundPosition: "-200% 0" },
    {
      backgroundPosition: "200% 0",
      duration: 1.5,
      ease: "linear",
      repeat: -1,
    }
  );
}

export function pulse(target: string) {
  return gsap.fromTo(
    target,
    { scale: 1 },
    {
      scale: 1.05,
      duration: 0.8,
      ease: ease.smooth,
      repeat: -1,
      yoyo: true,
    }
  );
}

export function float(target: string) {
  return gsap.fromTo(
    target,
    { y: 0 },
    {
      y: -10,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    }
  );
}

export function rotateIn(target: string, delay = 0) {
  return gsap.fromTo(
    target,
    { opacity: 0, rotation: -180, scale: 0.5 },
    {
      opacity: 1,
      rotation: 0,
      scale: 1,
      duration: 0.8,
      ease: ease.elastic,
      delay,
    }
  );
}

export function scrollReveal(
  target: string,
  options?: ScrollTrigger.Vars
) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: durations.normal,
      ease: ease.smooth,
      scrollTrigger: {
        trigger: target,
        start: "top 85%",
        toggleActions: "play none none reverse",
        ...options,
      },
    }
  );
}

export function scrollRevealStagger(
  targets: string,
  stagger = 0.1,
  options?: ScrollTrigger.Vars
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: durations.normal,
      stagger,
      ease: ease.smooth,
      scrollTrigger: {
        trigger: targets,
        start: "top 85%",
        toggleActions: "play none none reverse",
        ...options,
      },
    }
  );
}

export function parallax(target: string, speed = 0.5) {
  return gsap.to(target, {
    y: () => -(ScrollTrigger.maxScroll(window) * speed),
    ease: "none",
    scrollTrigger: {
      trigger: target,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function underlineHover(target: string) {
  return gsap.fromTo(
    target,
    { width: "0%" },
    {
      width: "100%",
      duration: durations.normal,
      ease: ease.smooth,
    }
  );
}

export function magneticHover(
  target: string,
  strength = 0.3
) {
  if (typeof window === "undefined") return;

  const element = document.querySelector(target) as HTMLElement;
  if (!element) return;

  const moveMagnetic = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: ease.smooth,
    });
  };

  const reset = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: ease.elastic,
    });
  };

  element.addEventListener("mousemove", moveMagnetic);
  element.addEventListener("mouseleave", reset);

  return () => {
    element.removeEventListener("mousemove", moveMagnetic);
    element.removeEventListener("mouseleave", reset);
  };
}

export function numberCounter(
  target: string,
  endValue: number,
  duration = 1
) {
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: ease.smooth,
    onUpdate: () => {
      const element = document.querySelector(target) as HTMLElement;
      if (element) {
        element.textContent = Math.round(obj.value).toLocaleString("pt-BR");
      }
    },
  });
}

export const pageTransition = {
  enter: (direction: "in" | "out" = "in") => {
    const timeline = gsap.timeline();

    if (direction === "in") {
      timeline
        .set(".page-content", { opacity: 0, y: 20 })
        .to(".page-content", {
          opacity: 1,
          y: 0,
          duration: durations.normal,
          ease: ease.smooth,
        });
    } else {
      timeline
        .to(".page-content", {
          opacity: 0,
          y: -20,
          duration: durations.fast,
          ease: ease.smooth,
        });
    }

    return timeline;
  },
};

export const hoverEffects = {
  lift: (target: string) => {
    gsap.to(target, {
      y: -5,
      scale: 1.02,
      duration: durations.fast,
      ease: ease.smooth,
    });
  },

  drop: (target: string) => {
    gsap.to(target, {
      y: 0,
      scale: 1,
      duration: durations.fast,
      ease: ease.smooth,
    });
  },

  glow: (target: string) => {
    gsap.to(target, {
      boxShadow: "0 0 30px rgba(41, 151, 255, 0.3)",
      duration: durations.fast,
    });
  },

  unglow: (target: string) => {
    gsap.to(target, {
      boxShadow: "0 0 0 rgba(41, 151, 255, 0)",
      duration: durations.fast,
    });
  },
};

export default gsap;