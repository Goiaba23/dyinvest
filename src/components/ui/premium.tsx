import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export function PremiumCard({ children, className, hoverable = true, gradient = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-[#121216] border border-[#252529] rounded-2xl p-6 transition-all duration-300",
        hoverable && "hover:border-zinc-700 hover:bg-[#1E1E1E] cursor-pointer",
        gradient && "bg-gradient-to-br from-[#121216] to-[#1a1a20]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'red' | 'purple' | 'amber' | 'emerald';
  size?: 'sm' | 'md';
  className?: string;
}

const badgeStyles = {
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const sizeStyles = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export function Badge({ children, variant = 'blue', size = 'sm', className }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-lg font-bold uppercase tracking-wider border ${badgeStyles[variant]} ${sizeStyles[size]} ${className || ''}`}>
      {children}
    </span>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: any;
  onClick?: () => void;
}

export function StatCard({ label, value, change, icon: Icon, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-[#121216] border border-[#252529] rounded-2xl p-5 hover:border-zinc-700 hover:bg-[#1E1E1E] transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">{label}</span>
        {Icon && <Icon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {change !== undefined && (
          <span className={`text-sm font-medium flex items-center gap-0.5 ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  badge?: string;
}

export function SectionHeader({ title, subtitle, action, badge }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-display text-xl md:text-2xl text-white">{title}</h2>
          {badge && <Badge variant="amber">{badge}</Badge>}
        </div>
        {subtitle && <p className="text-zinc-500 text-sm">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
