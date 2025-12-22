// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { MessagesSquare } from "lucide-react";

// const InquiryLeads = () => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Inquiry & Leads</h1>
//         <p className="text-muted-foreground mt-1">Manage customer inquiries and leads</p>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <MessagesSquare className="h-5 w-5" />
//             Active Leads
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground">Inquiry management interface coming soon</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default InquiryLeads;

// import { useState, useEffect, useMemo } from "react";
// import {
//   MessagesSquare,
//   Search,
//   Phone,
//   Mail,
//   MapPin,
//   IndianRupee,
//   Car,
//   User,
//   Clock,
//   CheckCircle,
//   XCircle,
//   TrendingUp,
//   Eye,
//   Trash2,
//   X,
//   AlertTriangle,
//   Loader2,
//   MessageCircle,
//   RefreshCw,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/hooks/use-toast";

// // Types
// interface Buyer {
//   _id: string;
//   fullName: string;
//   email: string;
//   phone: string;
// }

// interface CarDetails {
//   _id: string;
//   city: string;
//   pincode?: string;
//   make: string;
//   model: string;
//   expectedPrice: number;
//   images: string[];
//   registrationNumber?: string;
// }

// interface Inquiry {
//   _id: string;
//   buyerName: string;
//   buyerPhone: string;
//   buyerMessage?: string;
//   buyer?: Buyer;
//   car: CarDetails;
//   assignedFranchise: string;
//   status: "pending" | "contacted" | "closed" | "converted";
//   createdAt: string;
//   updatedAt: string;
// }

// interface ApiResponse {
//   success: boolean;
//   count: number;
//   data: Inquiry[];
// }

// // API Configuration - Update this with your actual API base URL
// const API_BASE_URL = "https://your-api.com/api/v1";

// // Mock data for demo (remove when connecting to real API)
// const MOCK_DATA: Inquiry[] = [
//   {
//     _id: "69467a71492b48db7c9a0f38",
//     buyerName: "Yashwant Patel",
//     buyerPhone: "9876543210",
//     buyer: {
//       _id: "6939416d34d28cbb150279a5",
//       fullName: "Yashwant Patel",
//       email: "user1@gmail.com",
//       phone: "9876543210",
//     },
//     car: {
//       _id: "6946793d492b48db7c9a0f2c",
//       city: "Indore",
//       pincode: "4001",
//       make: "Kia",
//       model: "Seltos",
//       expectedPrice: 1350000,
//       images: [
//         "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400",
//       ],
//     },
//     assignedFranchise: "693984a97df345f48d57c175",
//     status: "pending",
//     createdAt: "2025-12-20T10:29:05.751Z",
//     updatedAt: "2025-12-20T10:29:05.751Z",
//   },
//   {
//     _id: "69467a71492b48db7c9a0f39",
//     buyerName: "Rahul Sharma",
//     buyerPhone: "9988776655",
//     buyer: {
//       _id: "6939416d34d28cbb150279a6",
//       fullName: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       phone: "9988776655",
//     },
//     car: {
//       _id: "6946793d492b48db7c9a0f2d",
//       city: "Mumbai",
//       make: "Hyundai",
//       model: "Creta",
//       expectedPrice: 1250000,
//       images: [
//         "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400",
//       ],
//     },
//     assignedFranchise: "693984a97df345f48d57c175",
//     status: "contacted",
//     createdAt: "2025-12-19T08:15:00.000Z",
//     updatedAt: "2025-12-19T14:30:00.000Z",
//   },
//   {
//     _id: "69467a71492b48db7c9a0f40",
//     buyerName: "Priya Singh",
//     buyerPhone: "8877665544",
//     buyer: {
//       _id: "6939416d34d28cbb150279a7",
//       fullName: "Priya Singh",
//       email: "priya@gmail.com",
//       phone: "8877665544",
//     },
//     car: {
//       _id: "6946793d492b48db7c9a0f2e",
//       city: "Delhi",
//       make: "Maruti",
//       model: "Swift",
//       expectedPrice: 750000,
//       images: [
//         "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
//       ],
//     },
//     assignedFranchise: "693984a97df345f48d57c175",
//     status: "converted",
//     createdAt: "2025-12-18T12:00:00.000Z",
//     updatedAt: "2025-12-20T09:00:00.000Z",
//   },
//   {
//     _id: "69467a71492b48db7c9a0f41",
//     buyerName: "Amit Kumar",
//     buyerPhone: "7766554433",
//     car: {
//       _id: "6946793d492b48db7c9a0f2f",
//       city: "Bangalore",
//       make: "Honda",
//       model: "City",
//       expectedPrice: 1100000,
//       images: [
//         "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400",
//       ],
//     },
//     assignedFranchise: "693984a97df345f48d57c175",
//     status: "closed",
//     createdAt: "2025-12-17T15:45:00.000Z",
//     updatedAt: "2025-12-19T11:20:00.000Z",
//   },
// ];

// // Helper to get auth token
// const getAuthToken = (): string | null => {
//   return localStorage.getItem("token");
// };

// // Format price in Indian Rupees
// const formatPrice = (price: number): string => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(price);
// };

// // Format date
// const formatDate = (dateString: string): string => {
//   return new Date(dateString).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// // Status badge styles
// const getStatusStyles = (
//   status: Inquiry["status"]
// ): { className: string; icon: React.ReactNode } => {
//   switch (status) {
//     case "pending":
//       return {
//         className: "bg-warning/20 text-warning border-warning/30",
//         icon: <Clock className="h-3 w-3" />,
//       };
//     case "contacted":
//       return {
//         className: "bg-primary/20 text-primary border-primary/30",
//         icon: <Phone className="h-3 w-3" />,
//       };
//     case "closed":
//       return {
//         className: "bg-destructive/20 text-destructive border-destructive/30",
//         icon: <XCircle className="h-3 w-3" />,
//       };
//     case "converted":
//       return {
//         className: "bg-success/20 text-success border-success/30",
//         icon: <CheckCircle className="h-3 w-3" />,
//       };
//     default:
//       return {
//         className: "bg-muted text-muted-foreground",
//         icon: null,
//       };
//   }
// };

// const InquiryLeads = () => {
//   const { toast } = useToast();
//   const [inquiries, setInquiries] = useState<Inquiry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // Fetch inquiries
//   const fetchInquiries = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // For demo, using mock data. Replace with actual API call:
//       // const token = getAuthToken();
//       // const response = await fetch(`${API_BASE_URL}/franchise/inquiries`, {
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //     "Content-Type": "application/json",
//       //   },
//       // });
//       // if (!response.ok) throw new Error("Failed to fetch inquiries");
//       // const data: ApiResponse = await response.json();
//       // setInquiries(data.data);

//       // Simulating API delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setInquiries(MOCK_DATA);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       toast({
//         title: "Error",
//         description: "Failed to fetch inquiries",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update inquiry status
//   const updateStatus = async (id: string, newStatus: Inquiry["status"]) => {
//     setIsUpdating(true);
//     try {
//       // Replace with actual API call:
//       // const token = getAuthToken();
//       // const response = await fetch(`${API_BASE_URL}/franchise/inquiries/${id}/status`, {
//       //   method: "PATCH",
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //     "Content-Type": "application/json",
//       //   },
//       //   body: JSON.stringify({ status: newStatus }),
//       // });
//       // if (!response.ok) throw new Error("Failed to update status");

//       // Simulating API delay
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       setInquiries((prev) =>
//         prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
//       );

//       if (selectedInquiry?._id === id) {
//         setSelectedInquiry((prev) =>
//           prev ? { ...prev, status: newStatus } : null
//         );
//       }

//       toast({
//         title: "Status Updated",
//         description: `Inquiry marked as ${newStatus}`,
//       });
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to update status",
//         variant: "destructive",
//       });
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // Delete inquiry
//   const deleteInquiry = async () => {
//     if (!inquiryToDelete) return;

//     setIsDeleting(true);
//     try {
//       // Replace with actual API call:
//       // const token = getAuthToken();
//       // const response = await fetch(`${API_BASE_URL}/franchise/inquiries/${inquiryToDelete._id}`, {
//       //   method: "DELETE",
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       // });
//       // if (!response.ok) throw new Error("Failed to delete inquiry");

//       // Simulating API delay
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       setInquiries((prev) =>
//         prev.filter((inq) => inq._id !== inquiryToDelete._id)
//       );

//       if (selectedInquiry?._id === inquiryToDelete._id) {
//         setIsModalOpen(false);
//         setSelectedInquiry(null);
//       }

//       toast({
//         title: "Deleted",
//         description: "Inquiry has been deleted",
//       });
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to delete inquiry",
//         variant: "destructive",
//       });
//     } finally {
//       setIsDeleting(false);
//       setIsDeleteDialogOpen(false);
//       setInquiryToDelete(null);
//     }
//   };

//   useEffect(() => {
//     fetchInquiries();
//   }, []);

//   // Filter inquiries based on search
//   const filteredInquiries = useMemo(() => {
//     if (!searchQuery.trim()) return inquiries;

//     const query = searchQuery.toLowerCase();
//     return inquiries.filter(
//       (inq) =>
//         inq.buyerName.toLowerCase().includes(query) ||
//         inq.buyerPhone.includes(query) ||
//         inq.car.make.toLowerCase().includes(query) ||
//         inq.car.model.toLowerCase().includes(query) ||
//         inq.car.city.toLowerCase().includes(query)
//     );
//   }, [inquiries, searchQuery]);

//   // Stats calculation
//   const stats = useMemo(() => {
//     return {
//       total: inquiries.length,
//       pending: inquiries.filter((i) => i.status === "pending").length,
//       contacted: inquiries.filter((i) => i.status === "contacted").length,
//       closed: inquiries.filter((i) => i.status === "closed").length,
//       converted: inquiries.filter((i) => i.status === "converted").length,
//     };
//   }, [inquiries]);

//   // Open detail modal
//   const openDetailModal = (inquiry: Inquiry) => {
//     setSelectedInquiry(inquiry);
//     setIsModalOpen(true);
//   };

//   // Confirm delete
//   const confirmDelete = (inquiry: Inquiry) => {
//     setInquiryToDelete(inquiry);
//     setIsDeleteDialogOpen(true);
//   };

//   // Loading Skeleton
//   if (loading) {
//     return (
//       <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6 animate-fade-in">
//         <div className="space-y-2">
//           <Skeleton className="h-10 w-64" />
//           <Skeleton className="h-5 w-96" />
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           {[...Array(5)].map((_, i) => (
//             <Skeleton key={i} className="h-24 rounded-xl" />
//           ))}
//         </div>

//         <Skeleton className="h-12 w-full max-w-md rounded-lg" />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <Skeleton key={i} className="h-64 rounded-xl" />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <div className="glass-card rounded-2xl p-8 text-center max-w-md animate-scale-in">
//           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
//             <AlertTriangle className="h-8 w-8 text-destructive" />
//           </div>
//           <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
//           <p className="text-muted-foreground mb-6">{error}</p>
//           <Button onClick={fetchInquiries} className="gap-2">
//             <RefreshCw className="h-4 w-4" />
//             Try Again
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
//       {/* Header */}
//       <div className="animate-slide-up">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
//             <MessagesSquare className="h-6 w-6 text-primary" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">
//               Inquiry & Leads
//             </h1>
//             <p className="text-muted-foreground">
//               Manage customer inquiries and convert them into sales
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div
//         className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-slide-up"
//         style={{ animationDelay: "0.1s" }}
//       >
//         <div className="stat-card">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
//               <MessageCircle className="h-5 w-5 text-primary" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-foreground">{stats.total}</p>
//               <p className="text-sm text-muted-foreground">Total</p>
//             </div>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
//               <Clock className="h-5 w-5 text-warning" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-foreground">
//                 {stats.pending}
//               </p>
//               <p className="text-sm text-muted-foreground">Pending</p>
//             </div>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
//               <Phone className="h-5 w-5 text-primary" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-foreground">
//                 {stats.contacted}
//               </p>
//               <p className="text-sm text-muted-foreground">Contacted</p>
//             </div>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
//               <XCircle className="h-5 w-5 text-destructive" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-foreground">{stats.closed}</p>
//               <p className="text-sm text-muted-foreground">Closed</p>
//             </div>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
//               <TrendingUp className="h-5 w-5 text-success" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-foreground">
//                 {stats.converted}
//               </p>
//               <p className="text-sm text-muted-foreground">Converted</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div
//         className="animate-slide-up"
//         style={{ animationDelay: "0.2s" }}
//       >
//         <div className="relative max-w-md">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//           <Input
//             placeholder="Search by name, phone, car..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10 glass-card border-0 h-12"
//           />
//         </div>
//       </div>

//       {/* Empty State */}
//       {filteredInquiries.length === 0 && (
//         <div className="text-center py-16 animate-fade-in">
//           <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
//             <MessagesSquare className="h-10 w-10 text-muted-foreground" />
//           </div>
//           <h3 className="text-xl font-semibold mb-2">No inquiries found</h3>
//           <p className="text-muted-foreground">
//             {searchQuery
//               ? "Try adjusting your search query"
//               : "New inquiries will appear here"}
//           </p>
//         </div>
//       )}

//       {/* Inquiry Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredInquiries.map((inquiry, index) => {
//           const statusStyles = getStatusStyles(inquiry.status);
//           const carImage =
//             inquiry.car.images?.[0] ||
//             "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400";

//           return (
//             <div
//               key={inquiry._id}
//               className="inquiry-card animate-slide-up"
//               style={{ animationDelay: `${0.1 * (index % 6)}s` }}
//             >
//               {/* Car Image */}
//               <div className="relative h-40 overflow-hidden">
//                 <img
//                   src={carImage}
//                   alt={`${inquiry.car.make} ${inquiry.car.model}`}
//                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src =
//                       "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400";
//                   }}
//                 />
//                 <div className="absolute top-3 right-3">
//                   <Badge
//                     className={`${statusStyles.className} gap-1 border backdrop-blur-sm`}
//                   >
//                     {statusStyles.icon}
//                     {inquiry.status.charAt(0).toUpperCase() +
//                       inquiry.status.slice(1)}
//                   </Badge>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
//                   <h3 className="font-bold text-lg text-foreground">
//                     {inquiry.car.make} {inquiry.car.model}
//                   </h3>
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-4 space-y-4">
//                 {/* Car Details */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2 text-muted-foreground">
//                     <MapPin className="h-4 w-4" />
//                     <span className="text-sm">{inquiry.car.city}</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-primary font-semibold">
//                     <IndianRupee className="h-4 w-4" />
//                     <span>{formatPrice(inquiry.car.expectedPrice).replace("₹", "")}</span>
//                   </div>
//                 </div>

//                 {/* Buyer Info */}
//                 <div className="space-y-2 p-3 rounded-lg bg-muted/50">
//                   <div className="flex items-center gap-2">
//                     <User className="h-4 w-4 text-muted-foreground" />
//                     <span className="font-medium text-foreground">
//                       {inquiry.buyerName}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm text-muted-foreground">
//                       {inquiry.buyerPhone}
//                     </span>
//                   </div>
//                   {inquiry.buyer?.email && (
//                     <div className="flex items-center gap-2">
//                       <Mail className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm text-muted-foreground truncate">
//                         {inquiry.buyer.email}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="flex-1 gap-2"
//                     onClick={() => openDetailModal(inquiry)}
//                   >
//                     <Eye className="h-4 w-4" />
//                     View
//                   </Button>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="flex-1"
//                         disabled={isUpdating}
//                       >
//                         Status
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="glass-card">
//                       {(
//                         ["pending", "contacted", "closed", "converted"] as const
//                       ).map((status) => {
//                         const styles = getStatusStyles(status);
//                         return (
//                           <DropdownMenuItem
//                             key={status}
//                             onClick={() => updateStatus(inquiry._id, status)}
//                             className="gap-2 cursor-pointer"
//                           >
//                             {styles.icon}
//                             {status.charAt(0).toUpperCase() + status.slice(1)}
//                           </DropdownMenuItem>
//                         );
//                       })}
//                     </DropdownMenuContent>
//                   </DropdownMenu>

//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="text-destructive hover:bg-destructive/10"
//                     onClick={() => confirmDelete(inquiry)}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Detail Modal */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="glass-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
//           {selectedInquiry && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
//                     <Car className="h-5 w-5 text-primary" />
//                   </div>
//                   <span>
//                     {selectedInquiry.car.make} {selectedInquiry.car.model}
//                   </span>
//                 </DialogTitle>
//                 <DialogDescription>
//                   Inquiry received on {formatDate(selectedInquiry.createdAt)}
//                 </DialogDescription>
//               </DialogHeader>

//               <div className="space-y-6 py-4">
//                 {/* Car Image */}
//                 <div className="relative h-48 rounded-xl overflow-hidden">
//                   <img
//                     src={
//                       selectedInquiry.car.images?.[0] ||
//                       "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"
//                     }
//                     alt={`${selectedInquiry.car.make} ${selectedInquiry.car.model}`}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src =
//                         "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400";
//                     }}
//                   />
//                   <div className="absolute top-3 right-3">
//                     <Badge
//                       className={`${
//                         getStatusStyles(selectedInquiry.status).className
//                       } gap-1 border backdrop-blur-sm`}
//                     >
//                       {getStatusStyles(selectedInquiry.status).icon}
//                       {selectedInquiry.status.charAt(0).toUpperCase() +
//                         selectedInquiry.status.slice(1)}
//                     </Badge>
//                   </div>
//                 </div>

//                 {/* Car Details */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="p-4 rounded-xl bg-muted/50">
//                     <p className="text-sm text-muted-foreground mb-1">
//                       Expected Price
//                     </p>
//                     <p className="text-xl font-bold text-primary">
//                       {formatPrice(selectedInquiry.car.expectedPrice)}
//                     </p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-muted/50">
//                     <p className="text-sm text-muted-foreground mb-1">
//                       Location
//                     </p>
//                     <p className="text-xl font-bold text-foreground flex items-center gap-2">
//                       <MapPin className="h-5 w-5" />
//                       {selectedInquiry.car.city}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Buyer Info */}
//                 <div className="p-4 rounded-xl bg-muted/50 space-y-3">
//                   <h4 className="font-semibold flex items-center gap-2">
//                     <User className="h-5 w-5 text-primary" />
//                     Buyer Information
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
//                         <User className="h-4 w-4 text-primary" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-muted-foreground">Name</p>
//                         <p className="font-medium">{selectedInquiry.buyerName}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
//                         <Phone className="h-4 w-4 text-primary" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-muted-foreground">Phone</p>
//                         <p className="font-medium">{selectedInquiry.buyerPhone}</p>
//                       </div>
//                     </div>
//                     {selectedInquiry.buyer?.email && (
//                       <div className="flex items-center gap-3 md:col-span-2">
//                         <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
//                           <Mail className="h-4 w-4 text-primary" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-muted-foreground">Email</p>
//                           <p className="font-medium">
//                             {selectedInquiry.buyer.email}
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                   {selectedInquiry.buyerMessage && (
//                     <div className="pt-3 border-t border-border">
//                       <p className="text-xs text-muted-foreground mb-1">
//                         Message
//                       </p>
//                       <p className="text-sm">{selectedInquiry.buyerMessage}</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Status Update Buttons */}
//                 <div className="space-y-3">
//                   <h4 className="font-semibold">Update Status</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {(
//                       ["pending", "contacted", "closed", "converted"] as const
//                     ).map((status) => {
//                       const styles = getStatusStyles(status);
//                       const isActive = selectedInquiry.status === status;
//                       return (
//                         <Button
//                           key={status}
//                           variant={isActive ? "default" : "outline"}
//                           size="sm"
//                           className={`gap-2 ${
//                             isActive ? "" : styles.className
//                           }`}
//                           onClick={() =>
//                             updateStatus(selectedInquiry._id, status)
//                           }
//                           disabled={isUpdating || isActive}
//                         >
//                           {isUpdating ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             styles.icon
//                           )}
//                           {status.charAt(0).toUpperCase() + status.slice(1)}
//                         </Button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>

//               <DialogFooter className="gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => setIsModalOpen(false)}
//                   className="gap-2"
//                 >
//                   <X className="h-4 w-4" />
//                   Close
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     confirmDelete(selectedInquiry);
//                   }}
//                   className="gap-2"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                   Delete
//                 </Button>
//               </DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <AlertDialog
//         open={isDeleteDialogOpen}
//         onOpenChange={setIsDeleteDialogOpen}
//       >
//         <AlertDialogContent className="glass-card">
//           <AlertDialogHeader>
//             <AlertDialogTitle className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-destructive" />
//               Delete Inquiry
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete this inquiry from{" "}
//               <strong>{inquiryToDelete?.buyerName}</strong>? This action cannot
//               be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={deleteInquiry}
//               disabled={isDeleting}
//               className="bg-destructive hover:bg-destructive/90"
//             >
//               {isDeleting ? (
//                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//               ) : (
//                 <Trash2 className="h-4 w-4 mr-2" />
//               )}
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default InquiryLeads;
  


import { useState, useEffect, useMemo } from "react";
import {
  MessagesSquare,
  Search,
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  Car,
  User,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Eye,
  Trash2,
  X,
  AlertTriangle,
  Loader2,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// --- API Service Import ---
import { getFranchiseInquiries } from "@/services/franchiseService";

// Types
interface Buyer {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface CarDetails {
  _id: string;
  city: string;
  pincode?: string;
  make: string;
  model: string;
  expectedPrice: number;
  images: string[];
  registrationNumber?: string;
}

interface Inquiry {
  _id: string;
  buyerName: string;
  buyerPhone: string;
  buyerMessage?: string;
  buyer?: Buyer;
  car: CarDetails;
  assignedFranchise: string;
  status: "pending" | "contacted" | "closed" | "converted";
  createdAt: string;
  updatedAt: string;
}

// Format price in Indian Rupees
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

// Format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Status badge styles
const getStatusStyles = (
  status: Inquiry["status"]
): { className: string; icon: React.ReactNode } => {
  switch (status) {
    case "pending":
      return {
        className: "bg-warning/20 text-warning border-warning/30",
        icon: <Clock className="h-3 w-3" />,
      };
    case "contacted":
      return {
        className: "bg-primary/20 text-primary border-primary/30",
        icon: <Phone className="h-3 w-3" />,
      };
    case "closed":
      return {
        className: "bg-destructive/20 text-destructive border-destructive/30",
        icon: <XCircle className="h-3 w-3" />,
      };
    case "converted":
      return {
        className: "bg-success/20 text-success border-success/30",
        icon: <CheckCircle className="h-3 w-3" />,
      };
    default:
      return {
        className: "bg-muted text-muted-foreground",
        icon: null,
      };
  }
};

const InquiryLeads = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Fetch inquiries from real API ---
  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getFranchiseInquiries();
      // Backend returns: { success: true, count: 1, data: [...] }
      if (response.success) {
        setInquiries(response.data);
      } else {
        throw new Error("Failed to fetch inquiries");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      toast({
        title: "Error",
        description: err.message || "Failed to fetch inquiries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update inquiry status
  const updateStatus = async (id: string, newStatus: Inquiry["status"]) => {
    setIsUpdating(true);
    try {
      // API call placeholder for status update
      await new Promise((resolve) => setTimeout(resolve, 500));

      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
      );

      if (selectedInquiry?._id === id) {
        setSelectedInquiry((prev) =>
          prev ? { ...prev, status: newStatus } : null
        );
      }

      toast({
        title: "Status Updated",
        description: `Inquiry marked as ${newStatus}`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete inquiry
  const deleteInquiry = async () => {
    if (!inquiryToDelete) return;

    setIsDeleting(true);
    try {
      // API call placeholder for delete
      await new Promise((resolve) => setTimeout(resolve, 500));

      setInquiries((prev) =>
        prev.filter((inq) => inq._id !== inquiryToDelete._id)
      );

      if (selectedInquiry?._id === inquiryToDelete._id) {
        setIsModalOpen(false);
        setSelectedInquiry(null);
      }

      toast({
        title: "Deleted",
        description: "Inquiry has been deleted",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete inquiry",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setInquiryToDelete(null);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Filter inquiries based on search
  const filteredInquiries = useMemo(() => {
    if (!searchQuery.trim()) return inquiries;

    const query = searchQuery.toLowerCase();
    return inquiries.filter(
      (inq) =>
        inq.buyerName.toLowerCase().includes(query) ||
        inq.buyerPhone.includes(query) ||
        inq.car.make.toLowerCase().includes(query) ||
        inq.car.model.toLowerCase().includes(query) ||
        inq.car.city.toLowerCase().includes(query)
    );
  }, [inquiries, searchQuery]);

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: inquiries.length,
      pending: inquiries.filter((i) => i.status === "pending").length,
      contacted: inquiries.filter((i) => i.status === "contacted").length,
      closed: inquiries.filter((i) => i.status === "closed").length,
      converted: inquiries.filter((i) => i.status === "converted").length,
    };
  }, [inquiries]);

  // Open detail modal
  const openDetailModal = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = (inquiry: Inquiry) => {
    setInquiryToDelete(inquiry);
    setIsDeleteDialogOpen(true);
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6 animate-fade-in">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-12 w-full max-w-md rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card rounded-2xl p-8 text-center max-w-md animate-scale-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={fetchInquiries} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <MessagesSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Inquiry & Leads
            </h1>
            <p className="text-muted-foreground">
              Manage customer inquiries and convert them into sales
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-slide-up">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.contacted}</p>
              <p className="text-sm text-muted-foreground">Contacted</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.closed}</p>
              <p className="text-sm text-muted-foreground">Closed</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.converted}</p>
              <p className="text-sm text-muted-foreground">Converted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="animate-slide-up">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, car..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass-card border-0 h-12"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredInquiries.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <MessagesSquare className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No inquiries found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "Try adjusting your search query" : "New inquiries will appear here"}
          </p>
        </div>
      )}

      {/* Inquiry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInquiries.map((inquiry, index) => {
          const statusStyles = getStatusStyles(inquiry.status);
          const carImage = inquiry.car.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400";

          return (
            <div
              key={inquiry._id}
              className="inquiry-card animate-slide-up"
              style={{ animationDelay: `${0.1 * (index % 6)}s` }}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={carImage}
                  alt={`${inquiry.car.make} ${inquiry.car.model}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`${statusStyles.className} gap-1 border backdrop-blur-sm`}>
                    {statusStyles.icon}
                    {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
                  <h3 className="font-bold text-lg text-foreground">
                    {inquiry.car.make} {inquiry.car.model}
                  </h3>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{inquiry.car.city}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary font-semibold">
                    <IndianRupee className="h-4 w-4" />
                    <span>{formatPrice(inquiry.car.expectedPrice).replace("₹", "")}</span>
                  </div>
                </div>

                <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{inquiry.buyerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{inquiry.buyerPhone}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => openDetailModal(inquiry)}>
                    <Eye className="h-4 w-4" /> View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1" disabled={isUpdating}>Status</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card">
                      {(["pending", "contacted", "closed", "converted"] as const).map((status) => {
                        const styles = getStatusStyles(status);
                        return (
                          <DropdownMenuItem key={status} onClick={() => updateStatus(inquiry._id, status)} className="gap-2 cursor-pointer">
                            {styles.icon}
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => confirmDelete(inquiry)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="glass-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedInquiry && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  <span>{selectedInquiry.car.make} {selectedInquiry.car.model}</span>
                </DialogTitle>
                <DialogDescription>Inquiry received on {formatDate(selectedInquiry.createdAt)}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="relative h-48 rounded-xl overflow-hidden">
                  <img src={selectedInquiry.car.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"} alt="car" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge className={`${getStatusStyles(selectedInquiry.status).className} gap-1 border backdrop-blur-sm`}>
                      {getStatusStyles(selectedInquiry.status).icon}
                      {selectedInquiry.status.charAt(0).toUpperCase() + selectedInquiry.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/50"><p className="text-sm text-muted-foreground mb-1">Expected Price</p><p className="text-xl font-bold text-primary">{formatPrice(selectedInquiry.car.expectedPrice)}</p></div>
                  <div className="p-4 rounded-xl bg-muted/50"><p className="text-sm text-muted-foreground mb-1">Location</p><p className="text-xl font-bold text-foreground flex items-center gap-2"><MapPin className="h-5 w-5" />{selectedInquiry.car.city}</p></div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                  <h4 className="font-semibold flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Buyer Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><User className="h-4 w-4 text-primary" /></div>
                      <div><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{selectedInquiry.buyerName}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Phone className="h-4 w-4 text-primary" /></div>
                      <div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{selectedInquiry.buyerPhone}</p></div>
                    </div>
                  </div>
                  {selectedInquiry.buyerMessage && (
                    <div className="pt-3 border-t border-border"><p className="text-xs text-muted-foreground mb-1">Message</p><p className="text-sm">{selectedInquiry.buyerMessage}</p></div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Update Status</h4>
                  <div className="flex flex-wrap gap-2">
                    {(["pending", "contacted", "closed", "converted"] as const).map((status) => {
                      const styles = getStatusStyles(status);
                      const isActive = selectedInquiry.status === status;
                      return (
                        <Button key={status} variant={isActive ? "default" : "outline"} size="sm" className={`gap-2 ${isActive ? "" : styles.className}`} onClick={() => updateStatus(selectedInquiry._id, status)} disabled={isUpdating || isActive}>
                          {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : styles.icon}
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="gap-2"><X className="h-4 w-4" /> Close</Button>
                <Button variant="destructive" onClick={() => { setIsModalOpen(false); confirmDelete(selectedInquiry); }} className="gap-2"><Trash2 className="h-4 w-4" /> Delete</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="glass-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" /> Delete Inquiry</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this inquiry from <strong>{inquiryToDelete?.buyerName}</strong>?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteInquiry} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />} Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InquiryLeads;