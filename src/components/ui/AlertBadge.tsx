"use client";

import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

interface AlertBadgeProps {
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp?: Date;
}

export default function AlertBadge({ severity, message, timestamp }: AlertBadgeProps) {
  const config = {
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-500'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
      iconColor: 'text-amber-500'
    },
    critical: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      iconColor: 'text-red-500'
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`${bgColor} ${borderColor} border-l-4 p-4 rounded transition-all hover:shadow-md`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`${iconColor} mt-0.5 flex-shrink-0`} size={20} />
        <div className="flex-1">
          <p className={`${textColor} font-medium text-sm`}>{message}</p>
          {timestamp && (
            <p className="text-xs text-slate-500 mt-1">
              {timestamp.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
