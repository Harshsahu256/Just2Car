import { MessageCircle, Clock, Phone, XCircle, TrendingUp } from "lucide-react";

interface StatsProps {
  stats: { total: number; pending: number; contacted: number; closed: number; converted: number };
}

export const InquiryStats = ({ stats }: StatsProps) => {
  const items = [
    { label: "Total", val: stats.total, icon: MessageCircle, color: "text-primary", bg: "bg-primary/20" },
    { label: "Pending", val: stats.pending, icon: Clock, color: "text-warning", bg: "bg-warning/20" },
    { label: "Contacted", val: stats.contacted, icon: Phone, color: "text-primary", bg: "bg-primary/20" },
    { label: "Closed", val: stats.closed, icon: XCircle, color: "text-destructive", bg: "bg-destructive/20" },
    { label: "Converted", val: stats.converted, icon: TrendingUp, color: "text-success", bg: "bg-success/20" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-slide-up">
      {items.map((item, i) => (
        <div key={i} className="glass-card p-4 rounded-xl border border-border/50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{item.val}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};