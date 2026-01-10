interface RiskGaugeProps {
  score: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskGauge({ score, label, size = 'md' }: RiskGaugeProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return '#10B981';
    if (score < 60) return '#F59E0B';
    return '#EF4444';
  };

  const getRiskLabel = (score: number) => {
    if (score < 30) return 'Low Risk';
    if (score < 60) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <path
            d="M 10 90 A 40 40 0 0 1 90 90"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
          />
          <path
            d="M 10 90 A 40 40 0 0 1 90 90"
            fill="none"
            stroke={getRiskColor(score)}
            strokeWidth="8"
            strokeDasharray={`${(score / 100) * 126} 126`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold" style={{ color: getRiskColor(score) }}>
            {score}
          </div>
          <div className="text-sm text-slate-600 font-medium">{getRiskLabel(score)}</div>
        </div>
      </div>
      <p className="mt-4 text-center text-sm font-medium text-slate-700">{label}</p>
    </div>
  );
}
