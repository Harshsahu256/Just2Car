

import { useEffect, useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getinspectionDashboardStats } from "@/services/inspectionService.js";

/* ---------------- COLORS ---------------- */
const chartColors = {
  pending: "#FBBF59",      // warm mellow amber
  completed: "#4ADE80",    // soft vibrant green
  reinspection: "#F87171", // gentle coral red
};

/* ---------------- COMPONENT ---------------- */
const InspectionDashboard  = () => {
  const [data, setData] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    reInspectionTasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getinspectionDashboardStats();
      if (res?.success) {
        setData(res.data);
      }
    };
    fetchStats();
  }, []);

  /* ---------------- STATS CARDS ---------------- */
  const stats = [
    {
      title: "Total Tasks",
      value: data.totalTasks,
      icon: ClipboardList,
      bg: "bg-blue-50",
      iconBg: "bg-blue-500",
      text: "text-blue-600",
    },
    {
      title: "Pending",
      value: data.pendingTasks,
      icon: Clock,
      bg: "bg-amber-50",
      iconBg: "bg-amber-500",
      text: "text-amber-600",
    },
    {
      title: "Completed",
      value: data.completedTasks,
      icon: CheckCircle2,
      bg: "bg-green-50",
      iconBg: "bg-green-500",
      text: "text-green-600",
    },
    {
      title: "Re-inspection",
      value: data.reInspectionTasks,
      icon: AlertCircle,
      bg: "bg-red-50",
      iconBg: "bg-red-500",
      text: "text-red-600",
    },
  ];

  /* ---------------- CHART DATA ---------------- */
  const barData = [
    { name: "Pending", value: data.pendingTasks, color: chartColors.pending },
    { name: "Completed", value: data.completedTasks, color: chartColors.completed },
    { name: "Re-Inspection", value: data.reInspectionTasks, color: chartColors.reinspection },
  ];

  const pieData = barData;

  return (
    <div className="space-y-4">
      {/* ---------- HEADER ---------- */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Inspection Dashboard
        </h2>
        <p className="text-slate-500 text-sm">
          inspection task analysis & real-time stats
        </p>
      </div>

      {/* ---------- STAT CARDS ---------- */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`border border-border/40 ${stat.bg} hover:shadow-md transition`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-1.5 rounded-md ${stat.iconBg}`}>
                <stat.icon className="h-3.5 w-3.5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <div className={`text-2xl font-semibold ${stat.text}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ---------- CHART SECTION ---------- */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* ----- BAR CHART ----- */}
        <Card className="border border-border/40 shadow-sm">
          <CardHeader>
            <CardTitle>Task Status Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barGap={16}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    background: "white",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="value" barSize={32} radius={[6, 6, 4, 4]}>
                  {barData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ----- PIE CHART ----- */}
        <Card className="border border-border/40 shadow-sm">
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={95}
                  label
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    background: "white",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InspectionDashboard;
