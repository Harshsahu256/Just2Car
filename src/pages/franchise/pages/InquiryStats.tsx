// import { MessageCircle, Clock, Phone, XCircle, TrendingUp } from "lucide-react";

// interface StatsProps {
//   stats: {
//     total: number;
//     pending: number;
//     contacted: number;
//     closed: number;
//     converted: number;
//   };
// }

// const InquiryStats = ({ stats }: StatsProps) => {
//   const statItems = [
//     { label: "Total", value: stats.total, icon: MessageCircle, color: "text-primary", bg: "bg-primary/20" },
//     { label: "Pending", value: stats.pending, icon: Clock, color: "text-warning", bg: "bg-warning/20" },
//     { label: "Contacted", value: stats.contacted, icon: Phone, color: "text-primary", bg: "bg-primary/20" },
//     { label: "Closed", value: stats.closed, icon: XCircle, color: "text-destructive", bg: "bg-destructive/20" },
//     { label: "Converted", value: stats.converted, icon: TrendingUp, color: "text-success", bg: "bg-success/20" },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
//       {statItems.map((stat, i) => (
//         <div key={i} className="glass-card p-4 rounded-xl border border-border/50 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
//               <stat.icon className={`h-5 w-5 ${stat.color}`} />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-foreground">{stat.value}</p>
//               <p className="text-sm text-muted-foreground">{stat.label}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default InquiryStats;








import { MessageCircle, Clock, Phone, XCircle, TrendingUp } from "lucide-react";

interface StatsProps {
  stats: {
    total: number;
    pending: number;
    contacted: number;
    closed: number;
    converted: number;
  };
}

const InquiryStats = ({ stats }: StatsProps) => {
  const statItems = [
    { label: "Total", value: stats.total, icon: MessageCircle, color: "text-primary", bg: "bg-primary/20" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "text-warning", bg: "bg-warning/20" },
    { label: "Contacted", value: stats.contacted, icon: Phone, color: "text-primary", bg: "bg-primary/20" },
    { label: "Closed", value: stats.closed, icon: XCircle, color: "text-destructive", bg: "bg-destructive/20" },
    { label: "Converted", value: stats.converted, icon: TrendingUp, color: "text-success", bg: "bg-success/20" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      {statItems.map((stat, i) => (
        <div key={i} className="glass-card p-4 rounded-xl border border-border/50 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InquiryStats;