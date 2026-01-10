interface ComparisonData {
  time: string;
  cost: string;
}

interface ComparisonCardProps {
  traditional: ComparisonData;
  syndicateiq: ComparisonData;
  savings: {
    time: string;
    cost: string;
  };
}

export function ComparisonCard({
  traditional,
  syndicateiq,
  savings
}: ComparisonCardProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-slate-200 p-6 hover:shadow-xl transition-all">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Traditional vs SyndicateIQ
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">❌</span>
            <span className="font-semibold text-slate-700">Traditional</span>
          </div>
          <div className="pl-8 space-y-1 text-sm">
            <p className="text-slate-600">
              <span className="font-medium">Duration:</span> {traditional.time}
            </p>
            <p className="text-slate-600">
              <span className="font-medium">Cost:</span> {traditional.cost}
            </p>
            <p className="text-slate-500">Manual checks required</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✅</span>
            <span className="font-semibold text-slate-700">SyndicateIQ</span>
          </div>
          <div className="pl-8 space-y-1 text-sm">
            <p className="text-slate-600">
              <span className="font-medium">Duration:</span> {syndicateiq.time}
            </p>
            <p className="text-slate-600">
              <span className="font-medium">Cost:</span> {syndicateiq.cost}
            </p>
            <p className="text-slate-500">Automated verification</p>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <div>
            <p className="text-xs text-slate-500">Savings</p>
            <p className="text-lg font-bold text-green-600">{savings.cost}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">⏱️</span>
          <div>
            <p className="text-xs text-slate-500">Faster</p>
            <p className="text-lg font-bold text-blue-600">{savings.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
