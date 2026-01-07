// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Car, MessagesSquare, TrendingUp, CheckCircle, XCircle, Clock } from "lucide-react";

// const FranchiseDashboard = () => {
//   const stats = [
//     {
//       title: "Pending Listings",
//       value: "23",
//       icon: Clock,
//       color: "text-warning",
//     },
//     {
//       title: "Active Leads",
//       value: "45",
//       icon: MessagesSquare,
//       color: "text-primary",
//     },
//     {
//       title: "Deals in Progress",
//       value: "12",
//       icon: TrendingUp,
//       color: "text-success",
//     },
//     {
//       title: "Approved Listings",
//       value: "156",
//       icon: CheckCircle,
//       color: "text-success",
//     },
//     {
//       title: "Rejected Listings",
//       value: "8",
//       icon: XCircle,
//       color: "text-destructive",
//     },
//     {
//       title: "My Listings",
//       value: "34",
//       icon: Car,
//       color: "text-primary",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Franchise Dashboard</h1>
//         <p className="text-muted-foreground mt-1">
//           Manage your district operations and listings
//         </p>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {stats.map((stat) => (
//           <Card key={stat.title}>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">
//                 {stat.title}
//               </CardTitle>
//               <stat.icon className={`h-4 w-4 ${stat.color}`} />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Listings for Review</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
//                   <div>
//                     <p className="text-sm font-medium">Toyota Fortuner 2023</p>
//                     <p className="text-xs text-muted-foreground">Submitted 2 hours ago</p>
//                   </div>
//                   <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded">Pending</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Active Leads</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
//                   <div>
//                     <p className="text-sm font-medium">Honda City Inquiry</p>
//                     <p className="text-xs text-muted-foreground">Contact: +91 98765xxxxx</p>
//                   </div>
//                   <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">New</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default FranchiseDashboard;


// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { 
//   Car, 
//   MessagesSquare, 
//   TrendingUp, 
//   CheckCircle, 
//   XCircle, 
//   Clock,
//   Loader2 
// } from "lucide-react";

// // ✅ IMPORT API SERVICES
// import {
//   getFranchiseDashboardReports,
//   getMyFranchiseListings,
//   getFranchiseInquiries,
// } from "@/services/franchiseService";

// const FranchiseDashboard = () => {
//   // ✅ STATE MANAGEMENT
//   const [stats, setStats] = useState(null);
//   const [listings, setListings] = useState([]);
//   const [inquiries, setInquiries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ FETCH ALL DASHBOARD DATA
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const [statsRes, listingsRes, inquiriesRes] = await Promise.all([
//           getFranchiseDashboardReports(), // Counts
//           getMyFranchiseListings(),        // Recent Listings
//           getFranchiseInquiries(),         // Active Leads
//         ]);

//         setStats(statsRes);
//         setListings(listingsRes || []);
//         setInquiries(inquiriesRes?.data || []);
//       } catch (err) {
//         console.error("Dashboard error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   // ✅ LOADING STATE
//   if (loading) {
//     return (
//       <div className="flex h-[50vh] items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   // ✅ DYNAMIC STATS CONFIGURATION
//   const statCards = [
//     {
//       title: "Pending Listings",
//       value: stats?.pendingListings || 0,
//       icon: Clock,
//       color: "text-warning",
//     },
//     {
//       title: "Active Leads",
//       value: stats?.activeLeads || 0,
//       icon: MessagesSquare,
//       color: "text-primary",
//     },
//     {
//       title: "Deals in Progress",
//       value: stats?.dealsInProgress || 0,
//       icon: TrendingUp,
//       color: "text-success",
//     },
//     {
//       title: "Approved Listings",
//       value: stats?.approvedListings || 0,
//       icon: CheckCircle,
//       color: "text-success",
//     },
//     {
//       title: "Rejected Listings",
//       value: stats?.rejectedListings || 0,
//       icon: XCircle,
//       color: "text-destructive",
//     },
//     {
//       title: "My Listings",
//       value: stats?.myListings || 0,
//       icon: Car,
//       color: "text-primary",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Franchise Dashboard</h1>
//         <p className="text-muted-foreground mt-1">
//           Manage your district operations and listings
//         </p>
//       </div>

//       {/* STATS GRID */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {statCards.map((stat) => (
//           <Card key={stat.title}>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">
//                 {stat.title}
//               </CardTitle>
//               <stat.icon className={`h-4 w-4 ${stat.color}`} />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         {/* RECENT LISTINGS CARD */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Listings for Review</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {listings.length > 0 ? (
//                 listings.slice(0, 5).map((item) => (
//                   <div key={item._id} className="flex items-center justify-between pb-4 border-b last:border-0">
//                     <div>
//                       <p className="text-sm font-medium">
//                         {item.brand} {item.model} {item.variant}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {new Date(item.createdAt).toLocaleString()}
//                       </p>
//                     </div>
//                     <span className={`text-xs px-2 py-1 rounded capitalize ${
//                       item.status === 'approved' ? 'bg-success/10 text-success' : 
//                       item.status === 'rejected' ? 'bg-destructive/10 text-destructive' : 
//                       'bg-warning/10 text-warning'
//                     }`}>
//                       {item.status}
//                     </span>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-muted-foreground text-center py-4">
//                   No listings found
//                 </p>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* ACTIVE LEADS CARD */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Active Leads</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {inquiries.length > 0 ? (
//                 inquiries.slice(0, 5).map((lead) => (
//                   <div key={lead._id} className="flex items-center justify-between pb-4 border-b last:border-0">
//                     <div>
//                       <p className="text-sm font-medium">
//                         {lead.car?.brand} {lead.car?.model} Inquiry
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         Contact: {lead.buyerPhone}
//                       </p>
//                     </div>
//                     <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
//                       New
//                     </span>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-muted-foreground text-center py-4">
//                   No active leads
//                 </p>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default FranchiseDashboard;



  // import { useEffect, useState } from "react";
  // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  // import { 
  //   Car, 
  //   MessagesSquare, 
  //   TrendingUp, 
  //   CheckCircle, 
  //   XCircle, 
  //   Clock,
  //   Loader2,
  //   RefreshCw
  // } from "lucide-react";
  // import { Button } from "@/components/ui/button";
  // import {
  //   BarChart,
  //   Bar,
  //   LineChart,
  //   Line,
  //   XAxis,
  //   YAxis,
  //   Tooltip,
  //   ResponsiveContainer,
  //   CartesianGrid,
  // } from "recharts";

  // // ✅ IMPORT API SERVICES
  // import {
  //   getFranchiseDashboardReports,
  //   getMyFranchiseListings,
  //   getFranchiseInquiries,
  // } from "@/services/franchiseService";

  // const FranchiseDashboard = () => {
  //   // ✅ STATE MANAGEMENT
  //   const [stats, setStats] = useState<any>(null);
  //   const [listings, setListings] = useState<any[]>([]);
  //   const [inquiries, setInquiries] = useState<any[]>([]);
  //   const [loading, setLoading] = useState(true);
  //   const [refreshing, setRefreshing] = useState(false);

  //   // ✅ FETCH DATA FUNCTION
  //   const fetchDashboard = async (isRefresh = false) => {
  //     if (isRefresh) setRefreshing(true);
  //     try {
  //       const [statsRes, listingsRes, inquiriesRes] = await Promise.all([
  //         getFranchiseDashboardReports(),
  //         getMyFranchiseListings(),
  //         getFranchiseInquiries(),
  //       ]);

  //       setStats(statsRes);
  //       setListings(listingsRes || []);
  //       // Check if inquiriesRes is an array or has a data property
  //       setInquiries(Array.isArray(inquiriesRes) ? inquiriesRes : inquiriesRes?.data || []);
        
  //     } catch (err) {
  //       console.error("Dashboard error:", err);
  //     } finally {
  //       setLoading(false);
  //       setRefreshing(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchDashboard();
  //   }, []);

  //   const handleRefresh = () => {
  //     fetchDashboard(true);
  //   };

  //   // ✅ LOADING STATE
  //   if (loading) {
  //     return (
  //       <div className="flex items-center justify-center h-64">
  //         <Loader2 className="h-8 w-8 animate-spin text-primary" />
  //       </div>
  //     );
  //   }

  //   // ✅ DYNAMIC STATS CONFIGURATION
  //   const statCards = [
  //     {
  //       title: "Pending Listings",
  //       value: stats?.pendingListings || 0,
  //       icon: Clock,
  //       color: "text-warning",
  //     },
  //     {
  //       title: "Active Leads",
  //       value: stats?.activeLeads || 0,
  //       icon: MessagesSquare,
  //       color: "text-primary",
  //     },
  //     {
  //       title: "Deals in Progress",
  //       value: stats?.dealsInProgress || 0,
  //       icon: TrendingUp,
  //       color: "text-success",
  //     },
  //     {
  //       title: "Approved Listings",
  //       value: stats?.approvedListings || 0,
  //       icon: CheckCircle,
  //       color: "text-success",
  //     },
  //     {
  //       title: "Rejected Listings",
  //       value: stats?.rejectedListings || 0,
  //       icon: XCircle,
  //       color: "text-destructive",
  //     },
  //     {
  //       title: "My Listings",
  //       value: stats?.myListings || 0,
  //       icon: Car,
  //       color: "text-primary",
  //     },
  //   ];

  //   // ✅ CHART DATA FROM STATS
  //   const barChartData = [
  //     { name: "Pending", value: stats?.pendingListings || 0, fill: "hsl(var(--warning))" },
  //     { name: "Approved", value: stats?.approvedListings || 0, fill: "hsl(var(--success))" },
  //     { name: "Rejected", value: stats?.rejectedListings || 0, fill: "hsl(var(--destructive))" },
  //   ];

  //   const lineChartData = [
  //     { name: "Leads", value: stats?.activeLeads || 0 },
  //     { name: "Deals", value: stats?.dealsInProgress || 0 },
  //   ];

  //   return (
  //     <div className="space-y-6 animate-fade-in">
  //       <div className="flex items-center justify-between">
  //         <div className="flex flex-col gap-1">
  //           <h1 className="text-2xl font-bold text-foreground">
  //             Franchise Dashboard
  //           </h1>
  //           <p className="text-muted-foreground text-sm">
  //             Manage your district operations and listings
  //           </p>
  //         </div>
  //         <Button
  //           variant="outline"
  //           size="sm"
  //           onClick={handleRefresh}
  //           disabled={refreshing}
  //           className="gap-2"
  //         >
  //           <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
  //           {refreshing ? "Refreshing..." : "Refresh"}
  //         </Button>
  //       </div>

  //       {/* STATS GRID */}
  //       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
  //         {statCards.map((stat) => (
  //           <Card key={stat.title} className="glass-card hover:scale-[1.02] transition-transform">
  //             <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3">
  //               <CardTitle className="text-xs font-medium text-muted-foreground">
  //                 {stat.title}
  //               </CardTitle>
  //               <stat.icon className={`h-4 w-4 ${stat.color}`} />
  //             </CardHeader>
  //             <CardContent className="px-3 pb-3">
  //               <p className="text-xl font-bold text-foreground">{stat.value}</p>
  //             </CardContent>
  //           </Card>
  //         ))}
  //       </div>

  //       {/* CHARTS ROW */}
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         {/* BAR CHART - Listings Status */}
  //         <Card className="glass-card">
  //           <CardHeader className="pb-2 pt-3 px-4">
  //             <CardTitle className="text-sm font-medium text-foreground">Listings Overview</CardTitle>
  //           </CardHeader>
  //           <CardContent className="px-4 pb-3">
  //             <div className="h-[120px] w-full">
  //               <ResponsiveContainer width="100%" height="100%">
  //                 <BarChart data={barChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
  //                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
  //                   <XAxis 
  //                     dataKey="name" 
  //                     tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} 
  //                     axisLine={{ stroke: "hsl(var(--border))" }}
  //                     tickLine={false}
  //                   />
  //                   <YAxis 
  //                     tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} 
  //                     axisLine={{ stroke: "hsl(var(--border))" }}
  //                     tickLine={false}
  //                     allowDecimals={false}
  //                   />
  //                   <Tooltip 
  //                     contentStyle={{ 
  //                       backgroundColor: "hsl(var(--card))", 
  //                       border: "1px solid hsl(var(--border))",
  //                       borderRadius: "6px",
  //                       fontSize: "12px"
  //                     }}
  //                     labelStyle={{ color: "hsl(var(--foreground))" }}
  //                   />
  //                   <Bar dataKey="value" radius={[4, 4, 0, 0]} />
  //                 </BarChart>
  //               </ResponsiveContainer>
  //             </div>
  //           </CardContent>
  //         </Card>

  //         {/* LINE CHART - Leads vs Deals */}
  //         <Card className="glass-card">
  //           <CardHeader className="pb-2 pt-3 px-4">
  //             <CardTitle className="text-sm font-medium text-foreground">Leads vs Deals</CardTitle>
  //           </CardHeader>
  //           <CardContent className="px-4 pb-3">
  //             <div className="h-[120px] w-full">
  //               <ResponsiveContainer width="100%" height="100%">
  //                 <LineChart data={lineChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
  //                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
  //                   <XAxis 
  //                     dataKey="name" 
  //                     tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
  //                     axisLine={{ stroke: "hsl(var(--border))" }}
  //                     tickLine={false}
  //                   />
  //                   <YAxis 
  //                     tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
  //                     axisLine={{ stroke: "hsl(var(--border))" }}
  //                     tickLine={false}
  //                     allowDecimals={false}
  //                   />
  //                   <Tooltip 
  //                     contentStyle={{ 
  //                       backgroundColor: "hsl(var(--card))", 
  //                       border: "1px solid hsl(var(--border))",
  //                       borderRadius: "6px",
  //                       fontSize: "12px"
  //                     }}
  //                     labelStyle={{ color: "hsl(var(--foreground))" }}
  //                   />
  //                   <Line 
  //                     type="monotone" 
  //                     dataKey="value" 
  //                     stroke="hsl(var(--primary))" 
  //                     strokeWidth={2}
  //                     dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
  //                   />
  //                 </LineChart>
  //               </ResponsiveContainer>
  //             </div>
  //           </CardContent>
  //         </Card>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         {/* RECENT LISTINGS CARD */}
  //         <Card className="glass-card">
  //           <CardHeader className="pb-2 pt-3 px-4">
  //             <CardTitle className="text-sm font-medium text-foreground">Recent Listings for Review</CardTitle>
  //           </CardHeader>
  //           <CardContent className="px-4 pb-3">
  //             <div className="space-y-2 max-h-[180px] overflow-y-auto">
  //               {listings.length > 0 ? (
  //                 listings.slice(0, 5).map((item: any) => (
  //                   <div
  //                     key={item._id}
  //                     className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
  //                   >
  //                     <div className="flex flex-col gap-0.5">
  //                       <span className="text-sm font-medium text-foreground">
  //                         {item.brand} {item.model} {item.variant}
  //                       </span>
  //                       <span className="text-xs text-muted-foreground">
  //                         {new Date(item.createdAt).toLocaleString()}
  //                       </span>
  //                     </div>
  //                     <span className={`text-xs px-2 py-1 rounded-full font-medium ${
  //                       item.status === 'approved' ? 'bg-success/20 text-success' : 
  //                       item.status === 'rejected' ? 'bg-destructive/20 text-destructive' : 
  //                       'bg-warning/20 text-warning'
  //                     }`}>
  //                       {item.status}
  //                     </span>
  //                   </div>
  //                 ))
  //               ) : (
  //                 <p className="text-sm text-muted-foreground text-center py-4">
  //                   No listings found
  //                 </p>
  //               )}
  //             </div>
  //           </CardContent>
  //         </Card>

  //         {/* ACTIVE LEADS CARD */}
  //         <Card className="glass-card">
  //           <CardHeader className="pb-2 pt-3 px-4">
  //             <CardTitle className="text-sm font-medium text-foreground">Active Leads</CardTitle>
  //           </CardHeader>
  //           <CardContent className="px-4 pb-3">
  //             <div className="space-y-2 max-h-[180px] overflow-y-auto">
  //               {inquiries.length > 0 ? (
  //                 inquiries.slice(0, 5).map((lead: any) => (
  //                   <div
  //                     key={lead._id}
  //                     className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
  //                   >
  //                     <div className="flex flex-col gap-0.5">
  //                       <span className="text-sm font-medium text-foreground">
  //                         {lead.car?.brand} {lead.car?.model} Inquiry
  //                       </span>
  //                       <span className="text-xs text-muted-foreground">
  //                         Contact: {lead.buyerPhone}
  //                       </span>
  //                     </div>
  //                     <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
  //                       New
  //                     </span>
  //                   </div>
  //                 ))
  //               ) : (
  //                 <p className="text-sm text-muted-foreground text-center py-4">
  //                   No active leads
  //                 </p>
  //               )}
  //             </div>
  //           </CardContent>
  //         </Card>
  //       </div>
  //     </div>
  //   );
  // };

  // export default FranchiseDashboard;

//   import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Car,
//   TrendingUp,
//   Users,
//   IndianRupee,
//   Eye,
//   CheckCircle2,
//   ArrowUpRight,
//   ArrowDownRight,
//   Loader2,
//   RefreshCw
// } from "lucide-react";
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
// } from "recharts";
// import { Button } from "@/components/ui/button";

// // ✅ IMPORT API SERVICES
// import {
//   getFranchiseDashboardReports,
//   getMyFranchiseListings,
//   getFranchiseInquiries,
// } from "@/services/franchiseService";

// // Helper for relative time (e.g., "2 hrs ago")
// const timeAgo = (dateString: string) => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
//   let interval = seconds / 31536000;
//   if (interval > 1) return Math.floor(interval) + " years ago";
//   interval = seconds / 2592000;
//   if (interval > 1) return Math.floor(interval) + " months ago";
//   interval = seconds / 86400;
//   if (interval > 1) return Math.floor(interval) + " days ago";
//   interval = seconds / 3600;
//   if (interval > 1) return Math.floor(interval) + " hrs ago";
//   interval = seconds / 60;
//   if (interval > 1) return Math.floor(interval) + " mins ago";
//   return "Just now";
// };

// // Helper for Currency Formatting
// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumSignificantDigits: 3
//   }).format(amount);
// };

// const statusColors: Record<string, string> = {
//   live: "bg-success/20 text-success border-success/30",
//   approved: "bg-success/20 text-success border-success/30",
//   pending: "bg-warning/20 text-warning border-warning/30",
//   sold: "bg-primary/20 text-primary border-primary/30",
//   rejected: "bg-destructive/20 text-destructive border-destructive/30",
//   hot: "bg-destructive/20 text-destructive border-destructive/30",
//   warm: "bg-warning/20 text-warning border-warning/30",
//   new: "bg-primary/20 text-primary border-primary/30",
//   contacted: "bg-blue-500/20 text-blue-500 border-blue-500/30",
// };

// const colorMap: Record<string, string> = {
//   primary: "hsl(var(--primary))",
//   success: "hsl(var(--success))",
//   warning: "hsl(var(--warning))",
//   destructive: "hsl(var(--destructive))",
// };

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-lg p-3 shadow-xl">
//         <p className="text-sm font-medium text-foreground">{label}</p>
//         {payload.map((entry: any, index: number) => (
//           <p key={index} className="text-sm text-muted-foreground">
//             <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
//             {entry.name}: {entry.value}
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// const FranchiseDashboard = () => {
//   // ✅ State Management
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [stats, setStats] = useState<any>(null);
//   const [recentListings, setRecentListings] = useState<any[]>([]);
//   const [activeLeads, setActiveLeads] = useState<any[]>([]);
//   const [monthlyData, setMonthlyData] = useState<any[]>([]);
//   const [weeklyData, setWeeklyData] = useState<any[]>([]);

//   // ✅ Data Processing Logic
//   const processChartData = (listings: any[], inquiries: any[]) => {
//     // 1. Process Monthly Listings (Bar Chart)
//     const monthCounts: Record<string, number> = {};
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
//     // Initialize current year months to 0
//     const currentMonthIndex = new Date().getMonth();
//     for(let i = 0; i <= currentMonthIndex; i++) {
//         monthCounts[months[i]] = 0;
//     }

//     listings.forEach(item => {
//       const date = new Date(item.createdAt);
//       const monthName = months[date.getMonth()];
//       if (monthCounts[monthName] !== undefined) {
//         monthCounts[monthName]++;
//       }
//     });

//     const processedMonthly = Object.keys(monthCounts).map(name => ({
//       name,
//       listings: monthCounts[name],
//       revenue: (monthCounts[name] * 0.5) // Simulated revenue metric for chart aesthetics
//     }));

//     // 2. Process Weekly Leads (Area Chart)
//     const dayCounts: Record<string, number> = { "Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0, "Sun": 0 };
//     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//     inquiries.forEach(item => {
//       const date = new Date(item.createdAt);
//       const dayName = days[date.getDay()];
//       if (dayCounts[dayName] !== undefined) {
//         dayCounts[dayName]++;
//       }
//     });

//     // Reorder to start from Monday
//     const orderedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//     const processedWeekly = orderedDays.map(day => ({
//       day,
//       leads: dayCounts[day]
//     }));

//     setMonthlyData(processedMonthly);
//     setWeeklyData(processedWeekly);
//   };

//   // ✅ Fetch Data
//   const fetchDashboard = async (isRefresh = false) => {
//     if (isRefresh) setRefreshing(true);
//     try {
//       const [statsRes, listingsRes, inquiriesRes] = await Promise.all([
//         getFranchiseDashboardReports(),
//         getMyFranchiseListings(),
//         getFranchiseInquiries(),
//       ]);

//       setStats(statsRes);
      
//       const rawListings = listingsRes || [];
//       const rawInquiries = Array.isArray(inquiriesRes) ? inquiriesRes : inquiriesRes?.data || [];

//       // Format Recent Listings
//       const formattedListings = rawListings.slice(0, 10).map((item: any) => ({
//         id: item._id,
//         car: item.title || `${item.brand} ${item.model}` || "Vehicle Listing",
//         price: item.price ? formatCurrency(item.price) : "₹ --",
//         status: item.status || "pending",
//         date: timeAgo(item.createdAt)
//       }));
//       setRecentListings(formattedListings);

//       // Format Active Leads
//       const formattedLeads = rawInquiries.slice(0, 10).map((item: any) => ({
//         id: item._id,
//         buyer: item.buyerName || "Unknown Buyer",
//         car: item.listingTitle || item.car?.model || "General Inquiry",
//         phone: item.buyerPhone || "N/A",
//         status: item.status || "new"
//       }));
//       setActiveLeads(formattedLeads);

//       // Generate Charts
//       processChartData(rawListings, rawInquiries);

//     } catch (err) {
//       console.error("Error fetching dashboard:", err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   // ✅ Dynamic Stats Data
//   const dynamicStatsData = [
//     {
//       title: "Total Listings",
//       value: stats?.myListings || "0",
//       change: "+12%", // Mock trend (API doesn't provide history yet)
//       trend: "up",
//       icon: Car,
//       color: "primary",
//     },
//     {
//       title: "Active Leads",
//       value: stats?.activeLeads || "0",
//       change: "+8%",
//       trend: "up",
//       icon: Users,
//       color: "success",
//     },
//     {
//       title: "Deals In Progress", // Changed from Revenue as API provides Deals count
//       value: stats?.dealsInProgress || "0",
//       change: "+5%",
//       trend: "up",
//       icon: TrendingUp, // Changed icon
//       color: "warning",
//     },
//     {
//       title: "Page Views", // Static / Mock until API supports analytics
//       value: "3.2K",
//       change: "-3%",
//       trend: "down",
//       icon: Eye,
//       color: "primary",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <Loader2 className="h-10 w-10 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background p-3 md:p-4 lg:p-6">
//       <div className="max-w-7xl mx-auto space-y-4">
//         {/* Header */}
//         <div className="animate-fade-in flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
//               Franchise Dashboard
//             </h1>
//             <p className="text-muted-foreground text-sm mt-1">
//               Overview of your franchise performance
//             </p>
//           </div>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => fetchDashboard(true)}
//             disabled={refreshing}
//             className="gap-2"
//           >
//             <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
//             Refresh
//           </Button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-slide-up">
//           {dynamicStatsData.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <Card
//                 key={stat.title}
//                 className="glass-card border border-border/40 overflow-hidden group hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.02]"
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >
//                 <CardContent className="p-4">
//                   <div className="flex items-start justify-between">
//                     <div className="space-y-1">
//                       <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
//                         {stat.title}
//                       </p>
//                       <p className="text-2xl md:text-3xl font-bold text-foreground">
//                         {stat.value}
//                       </p>
//                       <div className="flex items-center gap-1">
//                         {stat.trend === "up" ? (
//                           <ArrowUpRight className="w-3 h-3 text-success" />
//                         ) : (
//                           <ArrowDownRight className="w-3 h-3 text-destructive" />
//                         )}
//                         <span
//                           className={`text-xs font-medium ${
//                             stat.trend === "up" ? "text-success" : "text-destructive"
//                           }`}
//                         >
//                           {stat.change}
//                         </span>
//                         <span className="text-xs text-muted-foreground">vs last month</span>
//                       </div>
//                     </div>
//                     <div
//                       className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110"
//                       style={{
//                         background: `linear-gradient(135deg, ${colorMap[stat.color]}20, ${colorMap[stat.color]}10)`,
//                         boxShadow: `0 0 20px ${colorMap[stat.color]}15`,
//                       }}
//                     >
//                       <Icon
//                         className="w-5 h-5"
//                         style={{ color: colorMap[stat.color] }}
//                       />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-scale-in stagger-2">
//           {/* Bar Chart - Monthly Listings */}
//           <Card className="glass-card border border-border/40 overflow-hidden">
//             <CardHeader className="pb-2 pt-4 px-4">
//               <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
//                 <TrendingUp className="w-4 h-4 text-primary" />
//                 Monthly Listings
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 pt-0">
//               <div className="h-[180px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={monthlyData} barCategoryGap="20%">
//                     <defs>
//                       <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
//                         <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       vertical={false}
//                       stroke="hsl(var(--border))"
//                       opacity={0.3}
//                     />
//                     <XAxis
//                       dataKey="name"
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
//                     />
//                     <YAxis
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
//                       width={30}
//                     />
//                     <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }} />
//                     <Bar
//                       dataKey="listings"
//                       name="Listings"
//                       fill="url(#barGradient)"
//                       radius={[6, 6, 0, 0]}
//                       animationBegin={0}
//                       animationDuration={800}
//                       animationEasing="ease-out"
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Area Chart - Weekly Leads */}
//           <Card className="glass-card border border-border/40 overflow-hidden">
//             <CardHeader className="pb-2 pt-4 px-4">
//               <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
//                 <Users className="w-4 h-4 text-success" />
//                 Weekly Leads
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 pt-0">
//               <div className="h-[180px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={weeklyData}>
//                     <defs>
//                       <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
//                         <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0.05} />
//                       </linearGradient>
//                       <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
//                         <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.8} />
//                         <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={1} />
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       vertical={false}
//                       stroke="hsl(var(--border))"
//                       opacity={0.3}
//                     />
//                     <XAxis
//                       dataKey="day"
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
//                     />
//                     <YAxis
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
//                       width={30}
//                     />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Area
//                       type="monotone"
//                       dataKey="leads"
//                       name="Leads"
//                       stroke="url(#lineGradient)"
//                       strokeWidth={2.5}
//                       fill="url(#areaGradient)"
//                       animationBegin={0}
//                       animationDuration={1000}
//                       animationEasing="ease-out"
//                       dot={{ fill: "hsl(var(--success))", strokeWidth: 0, r: 0 }}
//                       activeDot={{
//                         fill: "hsl(var(--success))",
//                         stroke: "hsl(var(--background))",
//                         strokeWidth: 2,
//                         r: 5,
//                       }}
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Bottom Row - Recent Listings & Active Leads */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in stagger-3">
//           {/* Recent Listings */}
//           <Card className="glass-card border border-border/40 overflow-hidden">
//             <CardHeader className="pb-2 pt-4 px-4">
//               <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
//                 <Car className="w-4 h-4 text-primary" />
//                 Recent Listings
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-0">
//               <ScrollArea className="h-[160px]">
//                 <div className="divide-y divide-border/30">
//                   {recentListings.length > 0 ? (
//                     recentListings.map((listing) => (
//                       <div
//                         key={listing.id}
//                         className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors duration-200"
//                       >
//                         <div className="flex items-center gap-3 min-w-0">
//                           <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
//                             <Car className="w-4 h-4 text-muted-foreground" />
//                           </div>
//                           <div className="min-w-0">
//                             <p className="text-sm font-medium text-foreground truncate">
//                               {listing.car}
//                             </p>
//                             <p className="text-xs text-muted-foreground">{listing.date}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 flex-shrink-0">
//                           <span className="text-sm font-semibold text-foreground">
//                             {listing.price}
//                           </span>
//                           <Badge
//                             variant="outline"
//                             className={`text-[10px] px-2 py-0.5 capitalize ${statusColors[listing.status] || statusColors.pending}`}
//                           >
//                             {listing.status}
//                           </Badge>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-center text-xs text-muted-foreground py-10">No recent listings</p>
//                   )}
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>

//           {/* Active Leads */}
//           <Card className="glass-card border border-border/40 overflow-hidden">
//             <CardHeader className="pb-2 pt-4 px-4">
//               <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
//                 <Users className="w-4 h-4 text-success" />
//                 Active Leads
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-0">
//               <ScrollArea className="h-[160px]">
//                 <div className="divide-y divide-border/30">
//                   {activeLeads.length > 0 ? (
//                     activeLeads.map((lead) => (
//                       <div
//                         key={lead.id}
//                         className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors duration-200"
//                       >
//                         <div className="flex items-center gap-3 min-w-0">
//                           <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
//                             <Users className="w-4 h-4 text-muted-foreground" />
//                           </div>
//                           <div className="min-w-0">
//                             <p className="text-sm font-medium text-foreground truncate">
//                               {lead.buyer}
//                             </p>
//                             <p className="text-xs text-muted-foreground truncate">{lead.car}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 flex-shrink-0">
//                           <span className="text-xs text-muted-foreground hidden sm:block">
//                             {lead.phone}
//                           </span>
//                           <Badge
//                             variant="outline"
//                             className={`text-[10px] px-2 py-0.5 capitalize ${statusColors[lead.status] || statusColors.new}`}
//                           >
//                             {lead.status}
//                           </Badge>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-center text-xs text-muted-foreground py-10">No active leads</p>
//                   )}
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FranchiseDashboard;




import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Car, TrendingUp, Users, Eye, Loader2, RefreshCw } from "lucide-react";

// ✅ IMPORT API SERVICES
import {
  getFranchiseDashboardReports,
  getMyFranchiseListings,
  getFranchiseInquiries,
} from "@/services/franchiseService";

// Child Components
import DashboardStats from "../franchise/pages/DashboardStats";
import DashboardCharts from "../franchise/pages/DashboardCharts";
import DashboardActivity from "../franchise/pages/DashboardActivity";

// Helper for relative time
const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hrs ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return "Just now";
};

// Helper for Currency Formatting
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumSignificantDigits: 3
  }).format(amount);
};

const FranchiseDashboard = () => {
  // ✅ State Management
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [recentListings, setRecentListings] = useState<any[]>([]);
  const [activeLeads, setActiveLeads] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);

  // ✅ Data Processing Logic
  const processChartData = (listings: any[], inquiries: any[]) => {
    // 1. Process Monthly Listings (Bar Chart)
    const monthCounts: Record<string, number> = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonthIndex = new Date().getMonth();
    for(let i = 0; i <= currentMonthIndex; i++) {
        monthCounts[months[i]] = 0;
    }

    listings.forEach(item => {
      const date = new Date(item.createdAt);
      const monthName = months[date.getMonth()];
      if (monthCounts[monthName] !== undefined) {
        monthCounts[monthName]++;
      }
    });

    const processedMonthly = Object.keys(monthCounts).map(name => ({
      name,
      listings: monthCounts[name],
      revenue: (monthCounts[name] * 0.5)
    }));

    // 2. Process Weekly Leads (Area Chart)
    const dayCounts: Record<string, number> = { "Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0, "Sun": 0 };
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    inquiries.forEach(item => {
      const date = new Date(item.createdAt);
      const dayName = days[date.getDay()];
      if (dayCounts[dayName] !== undefined) {
        dayCounts[dayName]++;
      }
    });

    const orderedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const processedWeekly = orderedDays.map(day => ({
      day,
      leads: dayCounts[day]
    }));

    setMonthlyData(processedMonthly);
    setWeeklyData(processedWeekly);
  };

  // ✅ Fetch Data
  const fetchDashboard = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const [statsRes, listingsRes, inquiriesRes] = await Promise.all([
        getFranchiseDashboardReports(),
        getMyFranchiseListings(),
        getFranchiseInquiries(),
      ]);

      setStats(statsRes);
      
      const rawListings = listingsRes || [];
      const rawInquiries = Array.isArray(inquiriesRes) ? inquiriesRes : inquiriesRes?.data || [];

      // Format Recent Listings
      const formattedListings = rawListings.slice(0, 10).map((item: any) => ({
        id: item._id,
        car: item.title || `${item.make} ${item.model} ${item.variant}` || "Vehicle Listing",
        price: item.expectedPrice ? formatCurrency(item.expectedPrice) : "₹ --",
        status: item.status || "pending",
        date: timeAgo(item.createdAt)
      }));
      setRecentListings(formattedListings);

      // Format Active Leads
      const formattedLeads = rawInquiries.slice(0, 10).map((item: any) => ({
        id: item._id,
        buyer: item.buyerName || "Unknown Buyer",
        car: item.listingTitle || item.car?.model || "General Inquiry",
        phone: item.buyerPhone || "N/A",
        status: item.status || "new"
      }));
      setActiveLeads(formattedLeads);

      // Generate Charts
      processChartData(rawListings, rawInquiries);

    } catch (err) {
      console.error("Error fetching dashboard:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ✅ Dynamic Stats Data
  const dynamicStatsData = [
    {
      title: "Total Listings",
      value: stats?.myListings || "0",
      change: "+12%",
      trend: "up",
      icon: Car,
      color: "primary",
    },
    {
      title: "Active Leads",
      value: stats?.activeLeads || "0",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "success",
    },
    // {
    //   title: "Deals In Progress",
    //   value: stats?.dealsInProgress || "0",
    //   change: "+5%",
    //   trend: "up",
    //   icon: TrendingUp,
    //   color: "warning",
    // },
    {
  title: "Cars Sold",
  value: stats?.carsSold || "0",
  change: "+10%",
  trend: "up",
  icon: Car,
  color: "success",
},

    {
      title: "Page Views",
      value: "3.2K",
      change: "-3%",
      trend: "down",
      icon: Eye,
      color: "primary",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-3 md:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="animate-fade-in flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Franchise Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Overview of your franchise performance
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchDashboard(true)}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* 1. Stats Cards */}
        <DashboardStats statsData={dynamicStatsData} />

        {/* 2. Charts Row */}
        <DashboardCharts monthlyData={monthlyData} weeklyData={weeklyData} />

        {/* 3. Bottom Row - Activity */}
        <DashboardActivity recentListings={recentListings} activeLeads={activeLeads} />
      </div>
    </div>
  );
};

export default FranchiseDashboard;

