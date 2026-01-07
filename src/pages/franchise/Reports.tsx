
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   TrendingUp,
//   TrendingDown,
//   Users,
//   IndianRupee,
//   PieChart,
//   Download,
//   Calendar,
//   Car,
//   Target,
//   ChevronDown,
//   BarChart3,
//   Loader2 
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   PieChart as RechartsPieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// import { getFranchiseAnalytics } from "@/services/franchiseService";

// const IconMap = {
//   IndianRupee: IndianRupee,
//   Car: Car,
//   Users: Users,
//   Target: Target,
//   Calendar: Calendar,
// };

// const dateRanges = [
//   "Last 7 Days",
//   "Last 30 Days",
//   "Last 3 Months",
//   "Last 6 Months",
//   "Last Year",
//   "All Time",
// ];

// const FranchiseReports = () => {
//   const [selectedRange, setSelectedRange] = useState("Last 6 Months");
//   const [loading, setLoading] = useState(true);
//   const [reportData, setReportData] = useState({
//     monthlyData: [],
//     leadConversionData: [],
//     kpiData: []
//   });

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       setLoading(true);
//       try {
//         const response = await getFranchiseAnalytics(selectedRange);
//         if (response.success) {
//           setReportData({
//             monthlyData: response.data.monthlyData,
//             leadConversionData: response.data.leadConversionData,
//             kpiData: response.data.kpiData
//           });
//         }
//       } catch (error) {
//         console.error("Failed to fetch reports:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAnalytics();
//   }, [selectedRange]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
//     },
//   };

//   const chartVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
//     },
//   };

//   const getColorClasses = (color) => {
//     const colors = {
//       emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600", icon: "text-emerald-500" },
//       indigo: { bg: "bg-indigo-500/10", text: "text-indigo-600", icon: "text-indigo-500" },
//       blue: { bg: "bg-blue-500/10", text: "text-blue-600", icon: "text-blue-500" },
//       purple: { bg: "bg-purple-500/10", text: "text-purple-600", icon: "text-purple-500" },
//     };
//     return colors[color] || colors.indigo;
//   };

//   const formatCurrency = (value) => {
//     if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
//     if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
//     return `₹${value.toLocaleString("en-IN")}`;
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
//           <p className="font-semibold text-foreground mb-1">{label}</p>
//           {payload.map((entry, index) => (
//             <p key={index} className="text-sm" style={{ color: entry.color }}>
//               {entry.name}: {entry.name.includes("Revenue") || entry.dataKey === "revenue" || entry.dataKey === "target"
//                 ? formatCurrency(entry.value)
//                 : entry.value}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   const CustomLegend = ({ payload }) => (
//     <div className="flex flex-wrap justify-center gap-4 mt-4">
//       {payload?.map((entry, index) => (
//         <div key={index} className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
//           <span className="text-sm text-muted-foreground">{entry.value}</span>
//         </div>
//       ))}
//     </div>
//   );

//   if (loading && !reportData.kpiData.length) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//         <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header Section */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
//               <div className="p-2 rounded-xl bg-indigo-500/10"><BarChart3 className="h-8 w-8 text-indigo-500" /></div>
//               Analytics & Performance
//             </h1>
//             <p className="text-muted-foreground mt-2 text-lg">Track your sales, revenue, and lead conversion rates</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="gap-2 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card">
//                   <Calendar className="h-4 w-4" /> {selectedRange} <ChevronDown className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-sm">
//                 {dateRanges.map((range) => (
//                   <DropdownMenuItem key={range} onClick={() => setSelectedRange(range)} className={selectedRange === range ? "bg-primary/10" : ""}>
//                     {range}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//             {/* <Button className="gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/25">
//               <Download className="h-4 w-4" /> Export Report
//             </Button> */}
//           </div>
//         </motion.div>

//         {/* KPI Cards */}
//         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {reportData.kpiData.map((kpi, index) => {
//             const colorClasses = getColorClasses(kpi.color);
//             const IconComponent = IconMap[kpi.icon] || Car;
//             return (
//               <motion.div key={index} variants={itemVariants}>
//                 <Card className="relative overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 hover:border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
//                   <div className={`absolute top-0 right-0 w-32 h-32 ${colorClasses.bg} rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500`} />
//                   <CardHeader className="pb-2">
//                     <div className="flex items-center justify-between">
//                       <div className={`p-2.5 rounded-xl ${colorClasses.bg}`}><IconComponent className={`h-5 w-5 ${colorClasses.icon}`} /></div>
//                       <Badge variant="secondary" className={`${kpi.trendUp ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"} gap-1`}>
//                         {kpi.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {kpi.trend}
//                       </Badge>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-sm text-muted-foreground">{kpi.title}</p>
//                     <p className={`text-3xl font-bold ${colorClasses.text} mt-1`}>{kpi.value}</p>
//                     <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* SECTION SHIFTED UP: Lead Conversion Pipeline (Pie Chart) */}
//         <motion.div variants={chartVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
//           <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-xl transition-shadow duration-300">
//             <CardHeader>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-purple-500/10"><PieChart className="h-5 w-5 text-purple-500" /></div>
//                 <div><CardTitle className="text-lg">Lead Conversion Pipeline</CardTitle><CardDescription>Distribution of leads by status</CardDescription></div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <RechartsPieChart>
//                       <Pie data={reportData.leadConversionData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value" stroke="none">
//                         {reportData.leadConversionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
//                       </Pie>
//                       <Tooltip formatter={(value, name) => [`${value} leads`, name]} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
//                       <Legend content={<CustomLegend />} />
//                     </RechartsPieChart>
//                   </ResponsiveContainer>
//                 </div>
//                 <div className="space-y-4">
//                   {reportData.leadConversionData.map((item, index) => {
//                     const total = reportData.leadConversionData.reduce((sum, i) => sum + i.value, 0);
//                     const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
//                     return (
//                       <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + index * 0.1 }} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
//                         <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
//                         <div className="flex-1"><p className="font-medium text-foreground">{item.name}</p><p className="text-sm text-muted-foreground">{item.value} leads</p></div>
//                         <div className="text-right"><p className="text-2xl font-bold" style={{ color: item.color }}>{percentage}%</p></div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* SECTION SHIFTED DOWN: Main Charts Section (Bar & Area) */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <motion.div variants={chartVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
//             <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-xl transition-shadow duration-300">
//               <CardHeader>
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-indigo-500/10"><BarChart3 className="h-5 w-5 text-indigo-500" /></div>
//                   <div><CardTitle className="text-lg">Month-wise Sales</CardTitle><CardDescription>Units sold per month in the period</CardDescription></div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={reportData.monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
//                       <defs>
//                         <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={1} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} /></linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
//                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
//                       <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
//                       <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }} />
//                       <Bar dataKey="sales" fill="url(#salesGradient)" radius={[6, 6, 0, 0]} name="Units Sold" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div variants={chartVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
//             <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-xl transition-shadow duration-300">
//               <CardHeader>
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-emerald-500/10"><TrendingUp className="h-5 w-5 text-emerald-500" /></div>
//                   <div><CardTitle className="text-lg">Revenue Trends</CardTitle><CardDescription>Revenue vs Target comparison</CardDescription></div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={reportData.monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
//                       <defs>
//                         <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
//                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
//                       <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revenueGradient)" name="Revenue" />
//                       <Area type="monotone" dataKey="target" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" fill="transparent" name="Target" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FranchiseReports;



// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   TrendingUp,
//   TrendingDown,
//   Users,
//   IndianRupee,
//   PieChart,
//   Calendar,
//   Car,
//   Target,
//   ChevronDown,
//   BarChart3,
//   Loader2,
//   Phone,
//   User,
//   BadgeCheck
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   PieChart as RechartsPieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// // 👇 Aapki API service import
// import { getFranchiseAnalytics } from "../../services/franchiseService"; 

// const IconMap: any = {
//   IndianRupee: IndianRupee,
//   Car: Car,
//   Users: Users,
//   Target: Target,
//   Calendar: Calendar,
// };

// const dateRanges = [
//   "Last 7 Days",
//   "Last 30 Days",
//   "Last 3 Months",
//   "Last 6 Months",
//   "Last Year",
//   "All Time",
// ];

// const FranchiseReports = () => {
//   const [selectedRange, setSelectedRange] = useState("Last 6 Months");
//   const [loading, setLoading] = useState(true);
  
//   // 1. Updated State Structure
//   const [reportData, setReportData] = useState({
//     monthlyData: [],
//     leadConversionData: [],
//     kpiData: [],
//     recentSales: [] // 👈 New Field Added
//   });

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       setLoading(true);
//       try {
//         const response = await getFranchiseAnalytics(selectedRange);
//         if (response.success && response.data) {
//           setReportData({
//             monthlyData: response.data.monthlyData || [],
//             leadConversionData: response.data.leadConversionData || [],
//             kpiData: response.data.kpiData || [],
//             recentSales: response.data.recentSales || [] // 👈 Mapping new data
//           });
//         }
//       } catch (error) {
//         console.error("Failed to fetch reports:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAnalytics();
//   }, [selectedRange]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
//     },
//   };

//   const chartVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
//     },
//   };

//   const getColorClasses = (color: string) => {
//     const colors: any = {
//       emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600", icon: "text-emerald-500" },
//       indigo: { bg: "bg-indigo-500/10", text: "text-indigo-600", icon: "text-indigo-500" },
//       blue: { bg: "bg-blue-500/10", text: "text-blue-600", icon: "text-blue-500" },
//       purple: { bg: "bg-purple-500/10", text: "text-purple-600", icon: "text-purple-500" },
//     };
//     return colors[color] || colors.indigo;
//   };

//   const formatCurrency = (value: number) => {
//     if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
//     if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
//     return `₹${value.toLocaleString("en-IN")}`;
//   };

//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
//           <p className="font-semibold text-foreground mb-1">{label}</p>
//           {payload.map((entry: any, index: number) => (
//             <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
//               <span>{entry.name}:</span>
//               <span className="font-mono font-medium">
//                 {entry.name.includes("Revenue") || entry.dataKey === "revenue" || entry.dataKey === "totalValue"
//                   ? formatCurrency(entry.value)
//                   : entry.value}
//               </span>
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   const CustomLegend = ({ payload }: any) => (
//     <div className="flex flex-wrap justify-center gap-4 mt-4">
//       {payload?.map((entry: any, index: number) => (
//         <div key={index} className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
//           <span className="text-sm text-muted-foreground">{entry.value}</span>
//         </div>
//       ))}
//     </div>
//   );

//   if (loading && !reportData.kpiData.length) {
//     return (
//       <div className="h-screen w-full flex flex-col items-center justify-center gap-2">
//         <Loader2 className="h-10 w-10 animate-spin text-primary" />
//         <p className="text-muted-foreground text-sm">Gathering Franchise Analytics...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50/50 p-4 md:p-6 lg:p-8 animate-fade-in">
//       <div className="max-w-7xl mx-auto space-y-6">
        
//         {/* --- Header Section --- */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
//               Franchise Reports
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Financial overview, sales performance & recent transactions.
//             </p>
//           </div>
//           <div className="flex items-center gap-3">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="gap-2 bg-white border-slate-200">
//                   <Calendar className="h-4 w-4 text-slate-500" /> {selectedRange} <ChevronDown className="h-4 w-4 text-slate-400" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 {dateRanges.map((range) => (
//                   <DropdownMenuItem key={range} onClick={() => setSelectedRange(range)} className={selectedRange === range ? "bg-primary/5 font-medium text-primary" : ""}>
//                     {range}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </motion.div>

//         {/* --- KPI Cards --- */}
//         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {reportData.kpiData.map((kpi: any, index: number) => {
//             const colorClasses = getColorClasses(kpi.color);
//             const IconComponent = IconMap[kpi.icon] || Target;
//             return (
//               <motion.div key={index} variants={itemVariants}>
//                 <Card className="relative overflow-hidden border-l-4 hover:shadow-lg transition-all duration-300" style={{ borderLeftColor: `var(--${kpi.color}-500)` }}>
//                   <CardHeader className="pb-2 flex flex-row items-center justify-between">
//                      <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
//                      <div className={`p-2 rounded-full ${colorClasses.bg}`}>
//                         <IconComponent className={`h-4 w-4 ${colorClasses.icon}`} />
//                      </div>
//                   </CardHeader>
//                   <CardContent>
//                     <p className={`text-2xl font-bold text-slate-800`}>{kpi.value}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Badge variant="secondary" className={`${kpi.trendUp ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"} px-1 py-0 text-[10px] font-medium`}>
//                         {kpi.trendUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />} 
//                         {kpi.trend}
//                       </Badge>
//                       <span className="text-xs text-muted-foreground">{kpi.description}</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* --- Charts Grid --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
//             {/* 1. Monthly Revenue & Sales (Combined Bar & Area removed, now separate or cleaner) */}
//             <motion.div className="lg:col-span-2" variants={chartVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
//               <Card className="h-full hover:shadow-md transition-shadow">
//                 <CardHeader>
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-lg bg-blue-50"><BarChart3 className="h-5 w-5 text-blue-600" /></div>
//                     <div><CardTitle className="text-lg">Revenue & Sales Trend</CardTitle></div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[320px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={reportData.monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//                         <defs>
//                           <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
//                         <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
//                         <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
//                         <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        
//                         <Tooltip content={<CustomTooltip />} />
//                         <Legend wrapperStyle={{ paddingTop: '20px' }} />

//                         {/* Updated: Only showing Revenue (Commission) as Area */}
//                         <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#revenueGradient)" name="Revenue (Commission)" />
//                         {/* Note: Removed Target line as it's not in new API */}
                        
//                         {/* Overlaid: Sales Count as Bar (Cleaner look) */}
//                         {/* Note: Combining Bar inside AreaChart is tricky in Recharts without ComposedChart. 
//                             If you want strictly bars for sales, use ComposedChart. 
//                             For now, assuming AreaChart is fine for revenue. If you want Bars for Sales, uncomment below and change AreaChart to ComposedChart import */}
//                          {/* <Bar yAxisId="right" dataKey="sales" barSize={20} fill="#6366f1" radius={[4,4,0,0]} name="Cars Sold" /> */}
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* 2. Lead Conversion (Pie Chart) */}
//             <motion.div variants={chartVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
//             <Card className="h-full hover:shadow-md transition-shadow">
//                 <CardHeader>
//                 <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-lg bg-purple-50"><PieChart className="h-5 w-5 text-purple-600" /></div>
//                     <div><CardTitle className="text-lg">Lead Status</CardTitle></div>
//                 </div>
//                 </CardHeader>
//                 <CardContent>
//                 <div className="h-[200px] mt-4">
//                     <ResponsiveContainer width="100%" height="100%">
//                     <RechartsPieChart>
//                         <Pie data={reportData.leadConversionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
//                         {reportData.leadConversionData.map((entry: any, index: number) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
//                         </Pie>
//                         <Tooltip formatter={(value, name) => [`${value} leads`, name]} />
//                     </RechartsPieChart>
//                     </ResponsiveContainer>
//                 </div>
//                 <div className="space-y-3 mt-6">
//                     {reportData.leadConversionData.map((item: any, index: number) => {
//                         const total = reportData.leadConversionData.reduce((sum: any, i: any) => sum + i.value, 0);
//                         const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
//                         return (
//                         <div key={index} className="flex items-center justify-between text-sm">
//                             <div className="flex items-center gap-2">
//                                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
//                                 <span className="text-slate-600">{item.name}</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <span className="font-medium">{item.value}</span>
//                                 <span className="text-xs text-muted-foreground w-12 text-right">{percentage}%</span>
//                             </div>
//                         </div>
//                         );
//                     })}
//                 </div>
//                 </CardContent>
//             </Card>
//             </motion.div>
//         </div>

//         {/* --- NEW SECTION: Recent Sales Table --- */}
//         <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.7 }}>
//           <Card className="overflow-hidden border-slate-200 shadow-sm">
//             <CardHeader className="bg-slate-50/50 border-b border-slate-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle className="text-lg">Recent Sales History</CardTitle>
//                   <CardDescription>Latest successfully closed deals</CardDescription>
//                 </div>
//                 <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">View All</Button>
//               </div>
//             </CardHeader>
//             <CardContent className="p-0">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left">
//                   <thead className="bg-slate-50 text-slate-500 font-medium">
//                     <tr>
//                       <th className="px-6 py-4">Car Details</th>
//                       <th className="px-6 py-4">Buyer Info</th>
//                       <th className="px-6 py-4">Sale Date</th>
//                       <th className="px-6 py-4">Final Price</th>
//                       <th className="px-6 py-4 text-right">Commission</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100">
//                     {reportData.recentSales.length > 0 ? (
//                       reportData.recentSales.map((sale: any) => (
//                         <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors">
//                           <td className="px-6 py-4">
//                             <div className="flex items-center gap-3">
//                               <div className="h-10 w-10 rounded-md bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
//                                 <img src={sale.carImage} alt="Car" className="h-full w-full object-cover" />
//                               </div>
//                               <div>
//                                 <p className="font-medium text-slate-900">{sale.carName}</p>
//                                 <p className="text-xs text-slate-500 uppercase">{sale.regNumber}</p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex items-center gap-2">
//                               <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
//                                 <User className="h-4 w-4" />
//                               </div>
//                               <div>
//                                 <p className="font-medium text-slate-900">{sale.buyerName}</p>
//                                 <div className="flex items-center text-xs text-slate-500">
//                                   <Phone className="h-3 w-3 mr-1" /> {sale.buyerPhone}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 text-slate-600">
//                             {sale.soldDate}
//                           </td>
//                           <td className="px-6 py-4 font-medium text-slate-900">
//                             ₹ {sale.salePrice.toLocaleString('en-IN')}
//                           </td>
//                           <td className="px-6 py-4 text-right">
//                              {sale.commission > 0 ? (
//                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
//                                  + ₹ {sale.commission.toLocaleString('en-IN')}
//                                </span>
//                              ) : (
//                                <span className="text-slate-400 text-xs">-</span>
//                              )}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
//                            <div className="flex flex-col items-center gap-2">
//                              <BadgeCheck className="h-8 w-8 text-slate-300" />
//                              <p>No sales records found for this period.</p>
//                            </div>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//       </div>
//     </div>
//   );
// };

// export default FranchiseReports;



import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  IndianRupee,
  PieChart,
  Calendar,
  Car,
  Target,
  ChevronDown,
  BarChart3,
  Loader2,
  Phone,
  User,
  BadgeCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// 👇 Correct Import Path as per your request
import { getFranchiseAnalytics } from "../../services/franchiseService"; 

const IconMap: any = {
  IndianRupee: IndianRupee,
  Car: Car,
  Users: Users,
  Target: Target,
  Calendar: Calendar,
};

const dateRanges = [
  "Last 7 Days",
  "Last 30 Days",
  "Last 3 Months",
  "Last 6 Months",
  "Last Year",
  "All Time",
];

const FranchiseReports = () => {
  const [selectedRange, setSelectedRange] = useState("Last 6 Months");
  const [loading, setLoading] = useState(true);
  
  // State initialization
  const [reportData, setReportData] = useState({
    monthlyData: [],
    leadConversionData: [],
    kpiData: [],
    recentSales: [] // 👈 Table data yahan aayega
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const response = await getFranchiseAnalytics(selectedRange);
        
        // Debugging log to verify data
        // console.log("Frontend Data Received:", response);

        if (response.success && response.data) {
          setReportData({
            monthlyData: response.data.monthlyData || [],
            leadConversionData: response.data.leadConversionData || [],
            kpiData: response.data.kpiData || [],
            recentSales: response.data.recentSales || [] 
          });
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [selectedRange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const getColorClasses = (color: string) => {
    const colors: any = {
      emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600", icon: "text-emerald-500" },
      indigo: { bg: "bg-indigo-500/10", text: "text-indigo-600", icon: "text-indigo-500" },
      blue: { bg: "bg-blue-500/10", text: "text-blue-600", icon: "text-blue-500" },
      purple: { bg: "bg-purple-500/10", text: "text-purple-600", icon: "text-purple-500" },
    };
    return colors[color] || colors.indigo;
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
          <p className="font-semibold text-foreground mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
              <span>{entry.name}:</span>
              <span className="font-mono font-medium">
                {/* Format currency only for Revenue/Value fields */}
                {entry.name.includes("Revenue") || entry.dataKey === "revenue" || entry.dataKey === "totalValue"
                  ? formatCurrency(entry.value)
                  : entry.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading && !reportData.kpiData.length) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">Loading Franchise Reports...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* --- Header Section --- */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              Franchise Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time analytics, revenue tracking & sales history.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-white border-slate-200 shadow-sm">
                  <Calendar className="h-4 w-4 text-slate-500" /> {selectedRange} <ChevronDown className="h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {dateRanges.map((range) => (
                  <DropdownMenuItem key={range} onClick={() => setSelectedRange(range)} className={selectedRange === range ? "bg-primary/5 font-medium text-primary" : ""}>
                    {range}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* --- KPI Cards --- */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportData.kpiData.map((kpi: any, index: number) => {
            const colorClasses = getColorClasses(kpi.color);
            const IconComponent = IconMap[kpi.icon] || Target;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative overflow-hidden border-l-4 hover:shadow-lg transition-all duration-300 bg-white" style={{ borderLeftColor: `var(--${kpi.color}-500)` }}>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                     <p className="text-sm font-medium text-slate-500">{kpi.title}</p>
                     <div className={`p-2 rounded-full ${colorClasses.bg}`}>
                        <IconComponent className={`h-4 w-4 ${colorClasses.icon}`} />
                     </div>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-2xl font-bold text-slate-800`}>{kpi.value}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className={`${kpi.trendUp ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"} px-1 py-0 text-[10px] font-medium border-0`}>
                        {kpi.trendUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />} 
                        {kpi.trend}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{kpi.description}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* --- Charts Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Monthly Revenue Chart */}
            <motion.div className="lg:col-span-2" variants={chartVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
              <Card className="h-full hover:shadow-md transition-shadow bg-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50"><BarChart3 className="h-5 w-5 text-blue-600" /></div>
                    <div><CardTitle className="text-lg">Monthly Revenue</CardTitle></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={reportData.monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#revenueGradient)" name="Revenue (Commission)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 2. Lead Conversion Pie Chart */}
            <motion.div variants={chartVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
            <Card className="h-full hover:shadow-md transition-shadow bg-white">
                <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50"><PieChart className="h-5 w-5 text-purple-600" /></div>
                    <div><CardTitle className="text-lg">Lead Status</CardTitle></div>
                </div>
                </CardHeader>
                <CardContent>
                <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie data={reportData.leadConversionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                        {reportData.leadConversionData.map((entry: any, index: number) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value} leads`, name]} />
                    </RechartsPieChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-3 mt-6">
                    {reportData.leadConversionData.map((item: any, index: number) => {
                        const total = reportData.leadConversionData.reduce((sum: any, i: any) => sum + i.value, 0);
                        const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
                        return (
                        <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-slate-600">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-medium">{item.value}</span>
                                <span className="text-xs text-muted-foreground w-12 text-right">{percentage}%</span>
                            </div>
                        </div>
                        );
                    })}
                </div>
                </CardContent>
            </Card>
            </motion.div>
        </div>

        {/* --- Recent Sales Table Section --- */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.7 }}>
          <Card className="overflow-hidden border-slate-200 shadow-sm bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Sales History</CardTitle>
                  <CardDescription>Latest successfully closed deals</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:bg-blue-50">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">Car Details</th>
                      <th className="px-6 py-4">Buyer Info</th>
                      <th className="px-6 py-4">Sale Date</th>
                      <th className="px-6 py-4">Final Price</th>
                      <th className="px-6 py-4 text-right">Commission</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reportData.recentSales && reportData.recentSales.length > 0 ? (
                      reportData.recentSales.map((sale: any) => (
                        <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-md bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                                {sale.carImage ? (
                                    <img src={sale.carImage} alt="Car" className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                                ) : (
                                    <Car className="h-5 w-5 text-slate-400 m-2.5" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{sale.carName}</p>
                                <p className="text-xs text-slate-500 uppercase">{sale.regNumber || "N/A"}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                                <User className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{sale.buyerName}</p>
                                <div className="flex items-center text-xs text-slate-500">
                                  <Phone className="h-3 w-3 mr-1" /> {sale.buyerPhone || "N/A"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {sale.soldDate}
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-900">
                            ₹ {(sale.salePrice || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 text-right">
                             {sale.commission > 0 ? (
                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                                 + ₹ {sale.commission.toLocaleString('en-IN')}
                               </span>
                             ) : (
                               <span className="text-slate-400 text-xs px-2 py-1 rounded bg-slate-100">No Comm.</span>
                             )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                           <div className="flex flex-col items-center gap-2">
                             <BadgeCheck className="h-10 w-10 text-slate-300" />
                             <p>No sales records found for this period.</p>
                           </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default FranchiseReports;