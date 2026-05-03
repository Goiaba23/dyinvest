import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { 
  TrendingUp, TrendingDown, BarChart3, DollarSign, 
  Wallet, Newspaper, BookOpen, Calculator,
  Sparkles, Zap, Globe, Shield, PieChart,
  Activity, Layers, Target, Calendar, Bell,
  ChevronRight, ArrowUpRight, ArrowDownRight,
  Star, CheckCircle2, Play, Users, Trophy,
  Clock, Settings, Search, Menu, X, LogOut,
  Home, LineChart, CandlestickChart, Percent,
  Briefcase, Building2, Landmark, Coins,
  Flame, Bookmark, Share2, RefreshCw, ExternalLink,
  Filter, ArrowRight, ChevronDown, AlertTriangle
} from "lucide-react";

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

export const fadeInUp = {
  from: { y: 20, opacity: 0 },
  to: { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
};

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: 0.4, ease: "power2.out" }
};

export const slideInLeft = {
  from: { x: -20, opacity: 0 },
  to: { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
};

export const scaleIn = {
  from: { scale: 0.9, opacity: 0 },
  to: { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
};

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
