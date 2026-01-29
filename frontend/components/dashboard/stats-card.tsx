import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatsCard({
  icon,
  title,
  value,
  subtitle,
  trend = 'neutral',
}: StatsCardProps) {
  return (
    <div className="glass rounded-2xl p-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl -mr-16 -mt-16" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10">
            {icon}
          </div>
          {trend === 'up' && (
            <div className="text-green-400 text-sm font-semibold">↑ 12%</div>
          )}
        </div>

        <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
        <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
