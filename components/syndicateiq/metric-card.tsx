import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: 'blue' | 'green' | 'amber' | 'red' | 'slate';
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  slate: 'bg-slate-50 text-slate-700 border-slate-200',
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'slate'
}: MetricCardProps) {
  return (
    <div className={`p-6 rounded-lg border-2 ${colorClasses[color]} transition-all hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        {Icon && <Icon size={20} className="text-slate-400" />}
      </div>
      <p className="text-3xl font-bold">{value}</p>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      {trend && (
        <div className="mt-2 flex items-center gap-1">
          <span
            className={`text-sm font-medium ${
              trend.positive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.value}
          </span>
          <span className="text-xs text-slate-500">vs last period</span>
        </div>
      )}
    </div>
  );
}
