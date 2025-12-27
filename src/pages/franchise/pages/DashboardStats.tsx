import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Colors helper specific to stats
const colorMap: Record<string, string> = {
  primary: "hsl(var(--primary))",
  success: "hsl(var(--success))",
  warning: "hsl(var(--warning))",
  destructive: "hsl(var(--destructive))",
};

interface StatItem {
  title: string;
  value: string;
  change: string;
  trend: string;
  icon: any;
  color: string;
}

interface DashboardStatsProps {
  statsData: StatItem[];
}

const DashboardStats = ({ statsData }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-slide-up">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="glass-card border border-border/40 overflow-hidden group hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.02]"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 text-success" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-destructive" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        stat.trend === "up" ? "text-success" : "text-destructive"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div
                  className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${colorMap[stat.color]}20, ${colorMap[stat.color]}10)`,
                    boxShadow: `0 0 20px ${colorMap[stat.color]}15`,
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: colorMap[stat.color] }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;