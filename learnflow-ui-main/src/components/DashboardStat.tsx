import { ReactNode } from "react";

interface DashboardStatProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
}

const DashboardStat = ({ label, value, icon, trend }: DashboardStatProps) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-card animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-2xl font-bold text-foreground">{value}</p>
        {trend && <p className="mt-1 text-xs font-medium text-success">{trend}</p>}
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        {icon}
      </div>
    </div>
  </div>
);

export default DashboardStat;
