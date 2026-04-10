"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info, TrendingDown } from "lucide-react";

type WarningLevel = 'low' | 'medium' | 'high';

interface WarningTooltipProps {
  message: string;
  level?: WarningLevel;
  className?: string;
}

const levelConfig = {
  low: {
    icon: Info,
    bgClass: 'bg-blue-500/20',
    textClass: 'text-blue-400',
    borderClass: 'border-blue-500/30',
    title: 'Informação'
  },
  medium: {
    icon: AlertCircle,
    bgClass: 'bg-yellow-500/20',
    textClass: 'text-yellow-400',
    borderClass: 'border-yellow-500/30',
    title: 'Atenção'
  },
  high: {
    icon: AlertTriangle,
    bgClass: 'bg-red-500/20',
    textClass: 'text-red-400',
    borderClass: 'border-red-500/30',
    title: 'Alerta'
  }
};

export function WarningTooltip({ message, level = 'medium', className }: WarningTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <span className={cn("relative inline-block", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={cn(
          "inline-flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold cursor-help transition-colors",
          config.bgClass,
          config.textClass
        )}
      >
        !
      </button>
      
      {isOpen && (
        <div className={cn(
          "absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 border rounded-lg shadow-xl",
          config.borderClass
        )}>
          <div className="flex items-center gap-2 mb-2">
            <Icon className={cn("w-4 h-4", config.textClass)} />
            <span className={cn("font-bold text-sm", config.textClass)}>{config.title}</span>
          </div>
          <p className="text-slate-300 text-sm">{message}</p>
          <div className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-800 border-r border-b rotate-45",
            config.borderClass
          )} />
        </div>
      )}
    </span>
  );
}

interface WarningBadgeProps {
  message: string;
  level?: WarningLevel;
  className?: string;
}

export function WarningBadge({ message, level = 'medium', className }: WarningBadgeProps) {
  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium",
      config.bgClass,
      config.textClass,
      className
    )}>
      <Icon className="w-3 h-3" />
      {message}
    </div>
  );
}

// Pre-defined warnings for common scenarios
export const WARNING_MESSAGES = {
  highPL: "P/L acima de 25 pode indicar ação cara ou expectativa muito alta de crescimento.",
  lowPL: "P/L muito baixo pode indicar problemas na empresa ou ação subvalorizada.",
  highPVP: "P/VP acima de 2x indica que a ação está sendo negociada bem acima do valor patrimonial.",
  lowPVP: "P/VP abaixo de 1 pode ser oportunidade ou indicar problemas na empresa.",
  highDY: "Dividend Yield muito alto pode não ser sustentável. Verifique a origem do pagamento.",
  negativeROE: "ROE negativo indica que a empresa está destruindo valor para os acionistas.",
  highDivida: "Dívida elevada em relação ao EBITDA pode ser risco para a empresa.",
  lowLiquidez: "Ação com baixa liquidez pode ser difícil de vender no preço desejado.",
  volatilityAlta: "Alta volatilidade significa que o preço varia muito. Risco maior.",
  setorial: "Setor com problemas pode afetar todas as empresas do segmento.",
  politica: "Incertezas políticas podem impactar o mercado significativamente.",
  cambio: "Variações cambiais afetam empresas exportadoras e importadoras."
};