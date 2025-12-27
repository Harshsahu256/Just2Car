
// import { useState, useEffect, useMemo, useRef } from "react";
// import { io, Socket } from "socket.io-client";
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
//   Send,
//   CheckCircle2
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
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/hooks/use-toast";

// // --- API Service Imports ---
// import { 
//   getFranchiseInquiries, 
//   deleteFranchiseInquiry,
//   startDeal, 
//   getDealDetails, 
//   makeOffer, 
//   finalizeDeal
// } from "@/services/franchiseService";

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
  
//   // Data States
//   const [inquiries, setInquiries] = useState<Inquiry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // Modal States
//   const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // --- CHAT & DEAL STATES ---
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [activeDealId, setActiveDealId] = useState<string | null>(null);
//   const [chatMessages, setChatMessages] = useState<any[]>([]);
//   const [newPrice, setNewPrice] = useState("");
//   const [newMessage, setNewMessage] = useState("");
//   const [dealStatus, setDealStatus] = useState("negotiating");
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [negotiatingInquiryId, setNegotiatingInquiryId] = useState<string | null>(null);

//   const socketRef = useRef<Socket | null>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // --- Fetch inquiries ---
//   const fetchInquiries = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getFranchiseInquiries();
//       if (response.success) {
//         setInquiries(response.data);
//       } else {
//         throw new Error("Failed to fetch inquiries");
//       }
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//       toast({
//         title: "Error",
//         description: err.message || "Failed to fetch inquiries",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInquiries();
//   }, []);

//   // --- SOCKET & DEAL LOGIC ---
//   const initSocket = (dealId: string) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       const userId = payload.id || payload.userId || payload._id;

//       socketRef.current = io("http://localhost:8002", { auth: { userId } });

//       socketRef.current.on("connect", () => {
//         socketRef.current?.emit("joinDealRoom", dealId);
//       });

//       socketRef.current.on("newOffer", (data: any) => {
//         setChatMessages((prev) => [...prev, data]);
//       });

//       socketRef.current.on("dealFinalized", (data: any) => {
//         setDealStatus("sold");
//         toast({ title: "Deal Finalized!", description: "The car is now marked as sold." });
//         fetchInquiries();
//       });
//     } catch (e) {
//       console.error("Socket Init Error", e);
//     }
//   };

//   const handleOpenChat = async (inquiry: Inquiry) => {
//     setIsActionLoading(true);
//     setNegotiatingInquiryId(inquiry._id);
//     setSelectedInquiry(inquiry);

//     try {
//       const res = await startDeal({ inquiryId: inquiry._id });
//       let dealId = "";

//       if (res.success && res.data) {
//         dealId = res.data._id;
//       } else if (res.dealId) {
//         dealId = res.dealId;
//       }

//       if (dealId) {
//         await setupChatSession(dealId);
//       }
//     } catch (err: any) {
//       const errorData = err.response?.data;
//       if (errorData && errorData.dealId) {
//         await setupChatSession(errorData.dealId);
//       } else {
//         toast({
//           title: "Error",
//           description: err.message || "Could not open negotiation",
//           variant: "destructive",
//         });
//       }
//     } finally {
//       setIsActionLoading(false);
//       setNegotiatingInquiryId(null);
//     }
//   };

//   const setupChatSession = async (dealId: string) => {
//     setActiveDealId(dealId);
    
//     // Load History
//     const history = await getDealDetails(dealId);
//     if (history.success) {
//       setChatMessages(history.data.negotiation || []);
//       setDealStatus(history.data.status);
//     }

//     // Connect Socket
//     initSocket(dealId);
//     setIsChatOpen(true);
//   };

//   const handleSendOffer = async () => {
//     if (!newPrice || !newMessage || !activeDealId) return;
//     try {
//       await makeOffer({
//         dealId: activeDealId,
//         offeredPrice: Number(newPrice),
//         message: newMessage,
//       });
//       setNewMessage("");
//       setNewPrice("");
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to send offer", variant: "destructive" });
//     }
//   };

//   const handleFinalize = async () => {
//     if (!activeDealId) return;
//     try {
//       const lastOffer = chatMessages[chatMessages.length - 1]?.offeredPrice || selectedInquiry?.car.expectedPrice || 0;
//       await finalizeDeal({
//         dealId: activeDealId,
//         finalPrice: lastOffer,
//         paymentMethod: "Online/Cash",
//       });
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to finalize", variant: "destructive" });
//     }
//   };

//   useEffect(() => {
//     if (isChatOpen) {
//       scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chatMessages, isChatOpen]);

//   useEffect(() => {
//     if (!isChatOpen && socketRef.current) {
//       socketRef.current.disconnect();
//     }
//   }, [isChatOpen]);


//   // --- Helper Functions ---
//   const updateStatus = async (id: string, newStatus: Inquiry["status"]) => {
//     setIsUpdating(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       setInquiries((prev) => prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq)));
//       if (selectedInquiry?._id === id) {
//         setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
//       }
//       toast({ title: "Status Updated", description: `Inquiry marked as ${newStatus}` });
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const deleteInquiry = async () => {
//     if (!inquiryToDelete) return;
//     setIsDeleting(true);
//     try {
//       const response = await deleteFranchiseInquiry(inquiryToDelete._id);
//       if (response.success) {
//         setInquiries((prev) => prev.filter((inq) => inq._id !== inquiryToDelete._id));
//         if (selectedInquiry?._id === inquiryToDelete._id) {
//           setIsModalOpen(false);
//           setSelectedInquiry(null);
//         }
//         toast({ title: "Deleted", description: "Inquiry has been deleted" });
//       } else {
//         throw new Error(response.message);
//       }
//     } catch (err: any) {
//       toast({ title: "Error", description: err.message || "Failed to delete", variant: "destructive" });
//     } finally {
//       setIsDeleting(false);
//       setIsDeleteDialogOpen(false);
//       setInquiryToDelete(null);
//     }
//   };

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

//   const stats = useMemo(() => {
//     return {
//       total: inquiries.length,
//       pending: inquiries.filter((i) => i.status === "pending").length,
//       contacted: inquiries.filter((i) => i.status === "contacted").length,
//       closed: inquiries.filter((i) => i.status === "closed").length,
//       converted: inquiries.filter((i) => i.status === "converted").length,
//     };
//   }, [inquiries]);

//   const openDetailModal = (inquiry: Inquiry) => {
//     setSelectedInquiry(inquiry);
//     setIsModalOpen(true);
//   };

//   const confirmDelete = (inquiry: Inquiry) => {
//     setInquiryToDelete(inquiry);
//     setIsDeleteDialogOpen(true);
//   };

//   // --- Render ---

//   if (loading) {
//     return (
//       <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6 animate-fade-in">
//         <div className="space-y-2">
//           <Skeleton className="h-10 w-64" />
//           <Skeleton className="h-5 w-96" />
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
//         </div>
//         <Skeleton className="h-12 w-full max-w-md rounded-lg" />
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
//         </div>
//       </div>
//     );
//   }

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
//             <RefreshCw className="h-4 w-4" /> Try Again
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
//             <h1 className="text-3xl font-bold text-foreground">Inquiry & Leads</h1>
//             <p className="text-muted-foreground">Manage customer inquiries and convert them into sales</p>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
//         {[
//           { label: "Total", value: stats.total, icon: MessageCircle, color: "text-primary", bg: "bg-primary/20" },
//           { label: "Pending", value: stats.pending, icon: Clock, color: "text-warning", bg: "bg-warning/20" },
//           { label: "Contacted", value: stats.contacted, icon: Phone, color: "text-primary", bg: "bg-primary/20" },
//           { label: "Closed", value: stats.closed, icon: XCircle, color: "text-destructive", bg: "bg-destructive/20" },
//           { label: "Converted", value: stats.converted, icon: TrendingUp, color: "text-success", bg: "bg-success/20" },
//         ].map((stat, i) => (
//           <div key={i} className="stat-card">
//             <div className="flex items-center gap-3">
//               <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
//                 <stat.icon className={`h-5 w-5 ${stat.color}`} />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-foreground">{stat.value}</p>
//                 <p className="text-sm text-muted-foreground">{stat.label}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Search Bar */}
//       <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
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
//           <p className="text-muted-foreground">{searchQuery ? "Try adjusting your search query" : "New inquiries will appear here"}</p>
//         </div>
//       )}

//       {/* Inquiry Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredInquiries.map((inquiry, index) => {
//           const statusStyles = getStatusStyles(inquiry.status);
//           const carImage = inquiry.car.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400";
//           const isNegotiating = negotiatingInquiryId === inquiry._id;

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
//                   onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"; }}
//                 />
//                 <div className="absolute top-3 right-3">
//                   <Badge className={`${statusStyles.className} gap-1 border backdrop-blur-sm`}>
//                     {statusStyles.icon}
//                     {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
//                   </Badge>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
//                   <h3 className="font-bold text-lg text-foreground">{inquiry.car.make} {inquiry.car.model}</h3>
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-4 space-y-4">
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

//                 <div className="space-y-2 p-3 rounded-lg bg-muted/50">
//                   <div className="flex items-center gap-2">
//                     <User className="h-4 w-4 text-muted-foreground" />
//                     <span className="font-medium text-foreground">{inquiry.buyerName}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm text-muted-foreground">{inquiry.buyerPhone}</span>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2">
//                   <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => openDetailModal(inquiry)}>
//                     <Eye className="h-4 w-4" /> View
//                   </Button>
                  
//                   {/* REPLACED STATUS BUTTON WITH NEGOTIATE BUTTON */}
//                   <Button 
//                     size="sm" 
//                     className="flex-1 gap-2" 
//                     onClick={() => handleOpenChat(inquiry)}
//                     disabled={isActionLoading}
//                   >
//                     {isNegotiating ? <Loader2 className="h-3 w-3 animate-spin" /> : <MessageCircle className="h-3 w-3" />}
//                     Negotiate
//                   </Button>

//                   <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => confirmDelete(inquiry)}>
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* --- Detail Modal --- */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="glass-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
//           {selectedInquiry && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
//                     <Car className="h-5 w-5 text-primary" />
//                   </div>
//                   <span>{selectedInquiry.car.make} {selectedInquiry.car.model}</span>
//                 </DialogTitle>
//                 <DialogDescription>Inquiry received on {formatDate(selectedInquiry.createdAt)}</DialogDescription>
//               </DialogHeader>

//               <div className="space-y-6 py-4">
//                 <div className="relative h-48 rounded-xl overflow-hidden">
//                   <img
//                     src={selectedInquiry.car.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"}
//                     alt="car"
//                     className="w-full h-full object-cover"
//                     onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"; }}
//                   />
//                   <div className="absolute top-3 right-3">
//                     <Badge className={`${getStatusStyles(selectedInquiry.status).className} gap-1 border backdrop-blur-sm`}>
//                       {getStatusStyles(selectedInquiry.status).icon}
//                       {selectedInquiry.status.charAt(0).toUpperCase() + selectedInquiry.status.slice(1)}
//                     </Badge>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="p-4 rounded-xl bg-muted/50"><p className="text-sm text-muted-foreground mb-1">Expected Price</p><p className="text-xl font-bold text-primary">{formatPrice(selectedInquiry.car.expectedPrice)}</p></div>
//                   <div className="p-4 rounded-xl bg-muted/50"><p className="text-sm text-muted-foreground mb-1">Location</p><p className="text-xl font-bold text-foreground flex items-center gap-2"><MapPin className="h-5 w-5" />{selectedInquiry.car.city}</p></div>
//                 </div>

//                 <div className="p-4 rounded-xl bg-muted/50 space-y-3">
//                   <h4 className="font-semibold flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Buyer Information</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><User className="h-4 w-4 text-primary" /></div>
//                       <div><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{selectedInquiry.buyerName}</p></div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Phone className="h-4 w-4 text-primary" /></div>
//                       <div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{selectedInquiry.buyerPhone}</p></div>
//                     </div>
//                     {selectedInquiry.buyer?.email && (
//                       <div className="flex items-center gap-3 md:col-span-2">
//                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Mail className="h-4 w-4 text-primary" /></div>
//                          <div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{selectedInquiry.buyer.email}</p></div>
//                       </div>
//                     )}
//                   </div>
//                   {selectedInquiry.buyerMessage && (
//                     <div className="pt-3 border-t border-border"><p className="text-xs text-muted-foreground mb-1">Message</p><p className="text-sm">{selectedInquiry.buyerMessage}</p></div>
//                   )}
//                 </div>
                
//                 <div className="space-y-3">
//                   <h4 className="font-semibold">Update Status</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {(["pending", "contacted", "closed", "converted"] as const).map((status) => {
//                       const styles = getStatusStyles(status);
//                       const isActive = selectedInquiry.status === status;
//                       return (
//                         <Button key={status} variant={isActive ? "default" : "outline"} size="sm" className={`gap-2 ${isActive ? "" : styles.className}`} onClick={() => updateStatus(selectedInquiry._id, status)} disabled={isUpdating || isActive}>
//                           {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : styles.icon}
//                           {status.charAt(0).toUpperCase() + status.slice(1)}
//                         </Button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="flex justify-center mt-4">
//                     <Button 
//                       className="w-full gap-2" 
//                       onClick={() => {
//                         setIsModalOpen(false);
//                         handleOpenChat(selectedInquiry);
//                       }}
//                     >
//                       <MessageCircle className="h-4 w-4" /> Negotiate Deal
//                     </Button>
//                 </div>
//               </div>

//               <DialogFooter className="gap-2">
//                 <Button variant="outline" onClick={() => setIsModalOpen(false)} className="gap-2"><X className="h-4 w-4" /> Close</Button>
//               </DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* --- Chat/Negotiation Modal --- */}
//       <Dialog open={isChatOpen} onOpenChange={(val) => {
//         setIsChatOpen(val);
//         if(!val && socketRef.current) socketRef.current.disconnect();
//       }}>
//         <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl glass-card">
//           <div className="bg-primary p-4 text-primary-foreground flex justify-between items-center">
//             <div>
//               <h2 className="font-bold">{selectedInquiry?.buyerName}</h2>
//               <p className="text-xs opacity-80">{selectedInquiry?.car?.make} Negotiation</p>
//             </div>
//             <Badge className="bg-background text-foreground uppercase text-[10px] border-0">{dealStatus}</Badge>
//           </div>

//           <ScrollArea className="h-[400px] p-4 bg-muted/30">
//             <div className="space-y-4">
//               {chatMessages.length === 0 && (
//                 <div className="text-center text-muted-foreground text-sm mt-10">
//                   <MessageCircle className="h-10 w-10 mx-auto mb-2 opacity-20" />
//                   <p>Start the negotiation by sending an offer.</p>
//                 </div>
//               )}
//               {chatMessages.map((msg, i) => (
//                 <div key={i} className={`flex flex-col ${msg.senderRole === 'franchise' ? 'items-end' : 'items-start'}`}>
//                   <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
//                     msg.senderRole === 'franchise' 
//                       ? 'bg-primary text-primary-foreground rounded-tr-none' 
//                       : 'bg-card border text-foreground rounded-tl-none'
//                   }`}>
//                     {msg.offeredPrice > 0 && (
//                       <div className="flex items-center gap-1 font-bold text-xs mb-1 opacity-90">
//                          Offer: <IndianRupee className="h-3 w-3" /> {msg.offeredPrice?.toLocaleString('en-IN')}
//                       </div>
//                     )}
//                     <p className="text-sm">{msg.message}</p>
//                   </div>
//                   <span className="text-[10px] mt-1 text-muted-foreground uppercase px-1">{msg.senderRole}</span>
//                 </div>
//               ))}
//               <div ref={scrollRef} />
//             </div>
//           </ScrollArea>

//           {dealStatus === "negotiating" ? (
//             <div className="p-4 border-t bg-background space-y-3">
//               <div className="flex gap-2">
//                 <div className="relative w-28">
//                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">₹</span>
//                    <Input
//                     type="number"
//                     placeholder="Price"
//                     className="pl-5 h-10"
//                     value={newPrice}
//                     onChange={e => setNewPrice(e.target.value)}
//                   />
//                 </div>
//                 <Input
//                   placeholder="Type message..."
//                   className="flex-1 h-10"
//                   value={newMessage}
//                   onChange={e => setNewMessage(e.target.value)}
//                   onKeyDown={e => e.key === 'Enter' && handleSendOffer()}
//                 />
//                 <Button size="icon" onClick={handleSendOffer} className="h-10 w-10"><Send className="h-4 w-4" /></Button>
//               </div>
//               <Button variant="outline" className="w-full text-success border-success/30 hover:bg-success/10 h-9 text-xs gap-2" onClick={handleFinalize}>
//                 <CheckCircle2 className="h-4 w-4" /> Finalize Deal & Mark Sold
//               </Button>
//             </div>
//           ) : (
//             <div className="p-6 bg-success/10 text-success flex flex-col items-center justify-center text-center gap-2">
//               <CheckCircle className="h-8 w-8" />
//               <div>
//                 <p className="font-bold">Deal Closed</p>
//                 <p className="text-xs opacity-80">This car has been marked as sold.</p>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <AlertDialogContent className="glass-card">
//           <AlertDialogHeader>
//             <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" /> Delete Inquiry</AlertDialogTitle>
//             <AlertDialogDescription>Are you sure you want to delete this inquiry from <strong>{inquiryToDelete?.buyerName}</strong>? This action cannot be undone.</AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={deleteInquiry} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
//               {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />} Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default InquiryLeads;

// import { useState, useEffect, useMemo, useRef } from "react";
// import { io, Socket } from "socket.io-client";
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
//   Send,
//   CheckCircle2
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
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/hooks/use-toast";

// // --- API Service Imports ---
// import { 
//   getFranchiseInquiries, 
//   deleteFranchiseInquiry,
//   startDeal, 
//   getDealDetails, 
//   makeOffer, 
//   finalizeDeal
// } from "@/services/franchiseService";

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
  
//   // Data States
//   const [inquiries, setInquiries] = useState<Inquiry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // Modal States
//   const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // --- CHAT & DEAL STATES ---
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [activeDealId, setActiveDealId] = useState<string | null>(null);
//   const [chatMessages, setChatMessages] = useState<any[]>([]);
//   const [newPrice, setNewPrice] = useState("");
//   const [newMessage, setNewMessage] = useState("");
//   const [dealStatus, setDealStatus] = useState("negotiating");
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [negotiatingInquiryId, setNegotiatingInquiryId] = useState<string | null>(null);

//   const socketRef = useRef<Socket | null>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // --- Fetch inquiries ---
//   const fetchInquiries = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getFranchiseInquiries();
//       if (response.success) {
//         setInquiries(response.data);
//       } else {
//         throw new Error("Failed to fetch inquiries");
//       }
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//       toast({
//         title: "Error",
//         description: err.message || "Failed to fetch inquiries",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInquiries();
//   }, []);

//   // --- SOCKET & DEAL LOGIC ---
//   const initSocket = (dealId: string) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       const userId = payload.id || payload.userId || payload._id;

//       socketRef.current = io("http://localhost:8002", { auth: { userId } });

//       socketRef.current.on("connect", () => {
//         socketRef.current?.emit("joinDealRoom", dealId);
//       });

//       socketRef.current.on("newOffer", (data: any) => {
//         setChatMessages((prev) => [...prev, data]);
//       });

//       socketRef.current.on("dealFinalized", (data: any) => {
//         setDealStatus("sold");
//         toast({ title: "Deal Finalized!", description: "The car is now marked as sold." });
//         fetchInquiries();
//       });
//     } catch (e) {
//       console.error("Socket Init Error", e);
//     }
//   };

//   const handleOpenChat = async (inquiry: Inquiry) => {
//     setIsActionLoading(true);
//     setNegotiatingInquiryId(inquiry._id);
//     setSelectedInquiry(inquiry);

//     try {
//       const res = await startDeal({ inquiryId: inquiry._id });
//       let dealId = "";

//       if (res.success && res.data) {
//         dealId = res.data._id;
//       } else if (res.dealId) {
//         dealId = res.dealId;
//       }

//       if (dealId) {
//         await setupChatSession(dealId);
//       }
//     } catch (err: any) {
//       const errorData = err.response?.data;
//       if (errorData && errorData.dealId) {
//         await setupChatSession(errorData.dealId);
//       } else {
//         toast({
//           title: "Error",
//           description: err.message || "Could not open negotiation",
//           variant: "destructive",
//         });
//       }
//     } finally {
//       setIsActionLoading(false);
//       setNegotiatingInquiryId(null);
//     }
//   };

//   const setupChatSession = async (dealId: string) => {
//     setActiveDealId(dealId);
    
//     // Load History
//     const history = await getDealDetails(dealId);
//     if (history.success) {
//       setChatMessages(history.data.negotiation || []);
//       setDealStatus(history.data.status);
//     }

//     // Connect Socket
//     initSocket(dealId);
//     setIsChatOpen(true);
//   };

//   const handleSendOffer = async () => {
//     if (!newPrice || !newMessage || !activeDealId) return;
//     try {
//       await makeOffer({
//         dealId: activeDealId,
//         offeredPrice: Number(newPrice),
//         message: newMessage,
//       });
//       setNewMessage("");
//       setNewPrice("");
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to send offer", variant: "destructive" });
//     }
//   };

//   const handleFinalize = async () => {
//     if (!activeDealId) return;
//     try {
//       const lastOffer = chatMessages[chatMessages.length - 1]?.offeredPrice || selectedInquiry?.car.expectedPrice || 0;
//       await finalizeDeal({
//         dealId: activeDealId,
//         finalPrice: lastOffer,
//         paymentMethod: "Online/Cash",
//       });
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to finalize", variant: "destructive" });
//     }
//   };

//   useEffect(() => {
//     if (isChatOpen) {
//       scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chatMessages, isChatOpen]);

//   useEffect(() => {
//     if (!isChatOpen && socketRef.current) {
//       socketRef.current.disconnect();
//     }
//   }, [isChatOpen]);


//   // --- Helper Functions ---
//   const updateStatus = async (id: string, newStatus: Inquiry["status"]) => {
//     setIsUpdating(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       setInquiries((prev) => prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq)));
//       if (selectedInquiry?._id === id) {
//         setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
//       }
//       toast({ title: "Status Updated", description: `Inquiry marked as ${newStatus}` });
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const deleteInquiry = async () => {
//     if (!inquiryToDelete) return;
//     setIsDeleting(true);
//     try {
//       const response = await deleteFranchiseInquiry(inquiryToDelete._id);
//       if (response.success) {
//         setInquiries((prev) => prev.filter((inq) => inq._id !== inquiryToDelete._id));
//         if (selectedInquiry?._id === inquiryToDelete._id) {
//           setIsModalOpen(false);
//           setSelectedInquiry(null);
//         }
//         toast({ title: "Deleted", description: "Inquiry has been deleted" });
//       } else {
//         throw new Error(response.message);
//       }
//     } catch (err: any) {
//       toast({ title: "Error", description: err.message || "Failed to delete", variant: "destructive" });
//     } finally {
//       setIsDeleting(false);
//       setIsDeleteDialogOpen(false);
//       setInquiryToDelete(null);
//     }
//   };

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

//   const stats = useMemo(() => {
//     return {
//       total: inquiries.length,
//       pending: inquiries.filter((i) => i.status === "pending").length,
//       contacted: inquiries.filter((i) => i.status === "contacted").length,
//       closed: inquiries.filter((i) => i.status === "closed").length,
//       converted: inquiries.filter((i) => i.status === "converted").length,
//     };
//   }, [inquiries]);

//   const openDetailModal = (inquiry: Inquiry) => {
//     setSelectedInquiry(inquiry);
//     setIsModalOpen(true);
//   };

//   const confirmDelete = (inquiry: Inquiry) => {
//     setInquiryToDelete(inquiry);
//     setIsDeleteDialogOpen(true);
//   };

//   // --- Render ---

//   if (loading) {
//     return (
//       <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6 animate-fade-in">
//         <div className="space-y-2">
//           <Skeleton className="h-10 w-64" />
//           <Skeleton className="h-5 w-96" />
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
//         </div>
//         <Skeleton className="h-12 w-full max-w-md rounded-lg" />
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
//         </div>
//       </div>
//     );
//   }

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
//             <RefreshCw className="h-4 w-4" /> Try Again
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
//             <h1 className="text-3xl font-bold text-foreground">Inquiry & Leads</h1>
//             <p className="text-muted-foreground">Manage customer inquiries and convert them into sales</p>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
//         {[
//           { label: "Total", value: stats.total, icon: MessageCircle, color: "text-primary", bg: "bg-primary/20" },
//           { label: "Pending", value: stats.pending, icon: Clock, color: "text-warning", bg: "bg-warning/20" },
//           { label: "Contacted", value: stats.contacted, icon: Phone, color: "text-primary", bg: "bg-primary/20" },
//           { label: "Closed", value: stats.closed, icon: XCircle, color: "text-destructive", bg: "bg-destructive/20" },
//           { label: "Converted", value: stats.converted, icon: TrendingUp, color: "text-success", bg: "bg-success/20" },
//         ].map((stat, i) => (
//           <div key={i} className="stat-card">
//             <div className="flex items-center gap-3">
//               <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
//                 <stat.icon className={`h-5 w-5 ${stat.color}`} />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-foreground">{stat.value}</p>
//                 <p className="text-sm text-muted-foreground">{stat.label}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Search Bar */}
//       <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
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
//           <p className="text-muted-foreground">{searchQuery ? "Try adjusting your search query" : "New inquiries will appear here"}</p>
//         </div>
//       )}

//       {/* Inquiry Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredInquiries.map((inquiry, index) => {
//           const statusStyles = getStatusStyles(inquiry.status);
//           const carImage = inquiry.car.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400";
//           const isNegotiating = negotiatingInquiryId === inquiry._id;

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
//                   onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"; }}
//                 />
//                 <div className="absolute top-3 right-3">
//                   <Badge className={`${statusStyles.className} gap-1 border backdrop-blur-sm`}>
//                     {statusStyles.icon}
//                     {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
//                   </Badge>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
//                   <h3 className="font-bold text-lg text-foreground">{inquiry.car.make} {inquiry.car.model}</h3>
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-4 space-y-4">
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

//                 <div className="space-y-2 p-3 rounded-lg bg-muted/50">
//                   <div className="flex items-center gap-2">
//                     <User className="h-4 w-4 text-muted-foreground" />
//                     <span className="font-medium text-foreground">{inquiry.buyerName}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm text-muted-foreground">{inquiry.buyerPhone}</span>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2">
//                   <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => openDetailModal(inquiry)}>
//                     <Eye className="h-4 w-4" /> View
//                   </Button>
                  
//                   {/* REPLACED STATUS BUTTON WITH NEGOTIATE BUTTON */}
//                   <Button 
//                     size="sm" 
//                     className="flex-1 gap-2" 
//                     onClick={() => handleOpenChat(inquiry)}
//                     disabled={isActionLoading}
//                   >
//                     {isNegotiating ? <Loader2 className="h-3 w-3 animate-spin" /> : <MessageCircle className="h-3 w-3" />}
//                     Negotiate
//                   </Button>

//                   <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => confirmDelete(inquiry)}>
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* --- Detail Modal --- */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="glass-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
//           {selectedInquiry && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
//                     <Car className="h-5 w-5 text-primary" />
//                   </div>
//                   <span>{selectedInquiry.car.make} {selectedInquiry.car.model}</span>
//                 </DialogTitle>
//                 <DialogDescription>Inquiry received on {formatDate(selectedInquiry.createdAt)}</DialogDescription>
//               </DialogHeader>

//               <div className="space-y-6 py-4">
//                 <div className="relative h-48 rounded-xl overflow-hidden">
//                   <img
//                     src={selectedInquiry.car.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"}
//                     alt="car"
//                     className="w-full h-full object-cover"
//                     onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"; }}
//                   />
//                   <div className="absolute top-3 right-3">
//                     <Badge className={`${getStatusStyles(selectedInquiry.status).className} gap-1 border backdrop-blur-sm`}>
//                       {getStatusStyles(selectedInquiry.status).icon}
//                       {selectedInquiry.status.charAt(0).toUpperCase() + selectedInquiry.status.slice(1)}
//                     </Badge>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="p-4 rounded-xl bg-muted/50"><p className="text-sm text-muted-foreground mb-1">Expected Price</p><p className="text-xl font-bold text-primary">{formatPrice(selectedInquiry.car.expectedPrice)}</p></div>
//                   <div className="p-4 rounded-xl bg-muted/50"><p className="text-sm text-muted-foreground mb-1">Location</p><p className="text-xl font-bold text-foreground flex items-center gap-2"><MapPin className="h-5 w-5" />{selectedInquiry.car.city}</p></div>
//                 </div>

//                 <div className="p-4 rounded-xl bg-muted/50 space-y-3">
//                   <h4 className="font-semibold flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Buyer Information</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><User className="h-4 w-4 text-primary" /></div>
//                       <div><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{selectedInquiry.buyerName}</p></div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Phone className="h-4 w-4 text-primary" /></div>
//                       <div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{selectedInquiry.buyerPhone}</p></div>
//                     </div>
//                     {selectedInquiry.buyer?.email && (
//                       <div className="flex items-center gap-3 md:col-span-2">
//                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Mail className="h-4 w-4 text-primary" /></div>
//                          <div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{selectedInquiry.buyer.email}</p></div>
//                       </div>
//                     )}
//                   </div>
//                   {selectedInquiry.buyerMessage && (
//                     <div className="pt-3 border-t border-border"><p className="text-xs text-muted-foreground mb-1">Message</p><p className="text-sm">{selectedInquiry.buyerMessage}</p></div>
//                   )}
//                 </div>
                
//                 {/* Update Status Section Removed as requested */}

//                 <div className="flex justify-center mt-4">
//                     <Button 
//                       className="w-full gap-2" 
//                       onClick={() => {
//                         setIsModalOpen(false);
//                         handleOpenChat(selectedInquiry);
//                       }}
//                     >
//                       <MessageCircle className="h-4 w-4" /> Negotiate Deal
//                     </Button>
//                 </div>
//               </div>

//               <DialogFooter className="gap-2">
//                 <Button variant="outline" onClick={() => setIsModalOpen(false)} className="gap-2"><X className="h-4 w-4" /> Close</Button>
//               </DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* --- Chat/Negotiation Modal --- */}
//       <Dialog open={isChatOpen} onOpenChange={(val) => {
//         setIsChatOpen(val);
//         if(!val && socketRef.current) socketRef.current.disconnect();
//       }}>
//         <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl glass-card">
//           <div className="bg-primary p-4 text-primary-foreground flex justify-between items-center">
//             <div>
//               <h2 className="font-bold">{selectedInquiry?.buyerName}</h2>
//               <p className="text-xs opacity-80">{selectedInquiry?.car?.make} Negotiation</p>
//             </div>
//             <Badge className="bg-background text-foreground uppercase text-[10px] border-0">{dealStatus}</Badge>
//           </div>

//           <ScrollArea className="h-[400px] p-4 bg-muted/30">
//             <div className="space-y-4">
//               {chatMessages.length === 0 && (
//                 <div className="text-center text-muted-foreground text-sm mt-10">
//                   <MessageCircle className="h-10 w-10 mx-auto mb-2 opacity-20" />
//                   <p>Start the negotiation by sending an offer.</p>
//                 </div>
//               )}
//               {chatMessages.map((msg, i) => (
//                 <div key={i} className={`flex flex-col ${msg.senderRole === 'franchise' ? 'items-end' : 'items-start'}`}>
//                   <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
//                     msg.senderRole === 'franchise' 
//                       ? 'bg-primary text-primary-foreground rounded-tr-none' 
//                       : 'bg-card border text-foreground rounded-tl-none'
//                   }`}>
//                     {msg.offeredPrice > 0 && (
//                       <div className="flex items-center gap-1 font-bold text-xs mb-1 opacity-90">
//                          Offer: <IndianRupee className="h-3 w-3" /> {msg.offeredPrice?.toLocaleString('en-IN')}
//                       </div>
//                     )}
//                     <p className="text-sm">{msg.message}</p>
//                   </div>
//                   <span className="text-[10px] mt-1 text-muted-foreground uppercase px-1">{msg.senderRole}</span>
//                 </div>
//               ))}
//               <div ref={scrollRef} />
//             </div>
//           </ScrollArea>

//           {dealStatus === "negotiating" ? (
//             <div className="p-4 border-t bg-background space-y-3">
//               <div className="flex gap-2">
//                 <div className="relative w-28">
//                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">₹</span>
//                    <Input
//                     type="number"
//                     placeholder="Price"
//                     className="pl-5 h-10"
//                     value={newPrice}
//                     onChange={e => setNewPrice(e.target.value)}
//                   />
//                 </div>
//                 <Input
//                   placeholder="Type message..."
//                   className="flex-1 h-10"
//                   value={newMessage}
//                   onChange={e => setNewMessage(e.target.value)}
//                   onKeyDown={e => e.key === 'Enter' && handleSendOffer()}
//                 />
//                 <Button size="icon" onClick={handleSendOffer} className="h-10 w-10"><Send className="h-4 w-4" /></Button>
//               </div>
//               <Button variant="outline" className="w-full text-success border-success/30 hover:bg-success/10 h-9 text-xs gap-2" onClick={handleFinalize}>
//                 <CheckCircle2 className="h-4 w-4" /> Finalize Deal & Mark Sold
//               </Button>
//             </div>
//           ) : (
//             <div className="p-6 bg-success/10 text-success flex flex-col items-center justify-center text-center gap-2">
//               <CheckCircle className="h-8 w-8" />
//               <div>
//                 <p className="font-bold">Deal Closed</p>
//                 <p className="text-xs opacity-80">This car has been marked as sold.</p>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <AlertDialogContent className="glass-card">
//           <AlertDialogHeader>
//             <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" /> Delete Inquiry</AlertDialogTitle>
//             <AlertDialogDescription>Are you sure you want to delete this inquiry from <strong>{inquiryToDelete?.buyerName}</strong>? This action cannot be undone.</AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={deleteInquiry} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
//               {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />} Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default InquiryLeads;

// import { useState, useEffect, useMemo, useRef } from "react";
// import { io, Socket } from "socket.io-client";
// import {
//   MessagesSquare,
//   AlertTriangle,
//   RefreshCw,
//   Loader2,
//   Trash2,
//   X,
//   Send,
//   CheckCircle2,
//   CheckCircle,
//   Car,
//   MapPin,
//   User,
//   Phone,
//   Mail,
//   Clock,
//   MessageCircle,
//   IndianRupee,
//   XCircle
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/hooks/use-toast";

// // --- API Service Imports ---
// import { 
//   getFranchiseInquiries, 
//   deleteFranchiseInquiry,
//   startDeal, 
//   getDealDetails, 
//   makeOffer, 
//   finalizeDeal
// } from "@/services/franchiseService";

// // Child Components
// import InquiryStats from "../franchise/pages/InquiryStats";
// import InquiryList from "../franchise/pages/InquiryList";

// // Helper for formatting
// const formatPrice = (price: number): string => {
//   return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
// };
// const formatDate = (dateString: string): string => {
//   return new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
// };
// const getStatusStyles = (status: string) => {
//   switch (status) {
//     case "pending": return { className: "bg-warning/20 text-warning border-warning/30", icon: <Clock className="h-3 w-3" /> };
//     case "contacted": return { className: "bg-primary/20 text-primary border-primary/30", icon: <Phone className="h-3 w-3" /> };
//     case "closed": return { className: "bg-destructive/20 text-destructive border-destructive/30", icon: <XCircle className="h-3 w-3" /> };
//     case "converted": return { className: "bg-success/20 text-success border-success/30", icon: <CheckCircle className="h-3 w-3" /> };
//     default: return { className: "bg-muted text-muted-foreground", icon: null };
//   }
// };

// const InquiryLeads = () => {
//   const { toast } = useToast();
  
//   // Data States
//   const [inquiries, setInquiries] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // Modal States
//   const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [inquiryToDelete, setInquiryToDelete] = useState<any | null>(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // --- CHAT & DEAL STATES ---
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [activeDealId, setActiveDealId] = useState<string | null>(null);
//   const [chatMessages, setChatMessages] = useState<any[]>([]);
//   const [newPrice, setNewPrice] = useState("");
//   const [newMessage, setNewMessage] = useState("");
//   const [dealStatus, setDealStatus] = useState("negotiating");
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [negotiatingInquiryId, setNegotiatingInquiryId] = useState<string | null>(null);

//   const socketRef = useRef<Socket | null>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // --- Fetch inquiries ---
//   const fetchInquiries = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getFranchiseInquiries();
//       if (response.success) {
//         setInquiries(response.data);
//       } else {
//         throw new Error("Failed to fetch inquiries");
//       }
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//       toast({ title: "Error", description: err.message || "Failed to fetch inquiries", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchInquiries(); }, []);

//   // --- SOCKET & DEAL LOGIC ---
//   const initSocket = (dealId: string) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       const userId = payload.id || payload.userId || payload._id;
//       socketRef.current = io("http://localhost:8002", { auth: { userId } });
//       socketRef.current.on("connect", () => { socketRef.current?.emit("joinDealRoom", dealId); });
//       socketRef.current.on("newOffer", (data: any) => { setChatMessages((prev) => [...prev, data]); });
//       socketRef.current.on("dealFinalized", () => {
//         setDealStatus("sold");
//         toast({ title: "Deal Finalized!", description: "The car is now marked as sold." });
//         fetchInquiries();
//       });
//     } catch (e) { console.error("Socket Init Error", e); }
//   };

//   const handleOpenChat = async (inquiry: any) => {
//     setIsActionLoading(true);
//     setNegotiatingInquiryId(inquiry._id);
//     setSelectedInquiry(inquiry);
//     try {
//       const res = await startDeal({ inquiryId: inquiry._id });
//       let dealId = "";
//       if (res.success && res.data) { dealId = res.data._id; } 
//       else if (res.dealId) { dealId = res.dealId; }
      
//       if (dealId) { await setupChatSession(dealId); }
//     } catch (err: any) {
//       const errorData = err.response?.data;
//       if (errorData && errorData.dealId) { await setupChatSession(errorData.dealId); } 
//       else { toast({ title: "Error", description: err.message || "Could not open negotiation", variant: "destructive" }); }
//     } finally {
//       setIsActionLoading(false);
//       setNegotiatingInquiryId(null);
//     }
//   };

//   const setupChatSession = async (dealId: string) => {
//     setActiveDealId(dealId);
//     const history = await getDealDetails(dealId);
//     if (history.success) {
//       setChatMessages(history.data.negotiation || []);
//       setDealStatus(history.data.status);
//     }
//     initSocket(dealId);
//     setIsChatOpen(true);
//   };

//   const handleSendOffer = async () => {
//     if (!newPrice || !newMessage || !activeDealId) return;
//     try {
//       await makeOffer({ dealId: activeDealId, offeredPrice: Number(newPrice), message: newMessage });
//       setNewMessage(""); setNewPrice("");
//     } catch (err) { toast({ title: "Error", description: "Failed to send offer", variant: "destructive" }); }
//   };

//   const handleFinalize = async () => {
//     if (!activeDealId) return;
//     try {
//       const lastOffer = chatMessages[chatMessages.length - 1]?.offeredPrice || selectedInquiry?.car.expectedPrice || 0;
//       await finalizeDeal({ dealId: activeDealId, finalPrice: lastOffer, paymentMethod: "Online/Cash" });
//     } catch (err) { toast({ title: "Error", description: "Failed to finalize", variant: "destructive" }); }
//   };

//   useEffect(() => { if (isChatOpen) { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); } }, [chatMessages, isChatOpen]);
//   useEffect(() => { if (!isChatOpen && socketRef.current) { socketRef.current.disconnect(); } }, [isChatOpen]);

//   // --- Actions ---
//   const deleteInquiry = async () => {
//     if (!inquiryToDelete) return;
//     setIsDeleting(true);
//     try {
//       const response = await deleteFranchiseInquiry(inquiryToDelete._id);
//       if (response.success) {
//         setInquiries((prev) => prev.filter((inq) => inq._id !== inquiryToDelete._id));
//         if (selectedInquiry?._id === inquiryToDelete._id) { setIsModalOpen(false); setSelectedInquiry(null); }
//         toast({ title: "Deleted", description: "Inquiry has been deleted" });
//       } else { throw new Error(response.message); }
//     } catch (err: any) { toast({ title: "Error", description: err.message || "Failed to delete", variant: "destructive" }); } 
//     finally { setIsDeleting(false); setIsDeleteDialogOpen(false); setInquiryToDelete(null); }
//   };

//   const filteredInquiries = useMemo(() => {
//     if (!searchQuery.trim()) return inquiries;
//     const query = searchQuery.toLowerCase();
//     return inquiries.filter(inq => 
//       inq.buyerName.toLowerCase().includes(query) || inq.buyerPhone.includes(query) ||
//       inq.car.make.toLowerCase().includes(query) || inq.car.model.toLowerCase().includes(query)
//     );
//   }, [inquiries, searchQuery]);

//   const stats = useMemo(() => ({
//     total: inquiries.length,
//     pending: inquiries.filter((i) => i.status === "pending").length,
//     contacted: inquiries.filter((i) => i.status === "contacted").length,
//     closed: inquiries.filter((i) => i.status === "closed").length,
//     converted: inquiries.filter((i) => i.status === "converted").length,
//   }), [inquiries]);

//   // --- Render ---
//   if (loading) return (
//     <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
//       <div className="space-y-2"><Skeleton className="h-10 w-64" /><Skeleton className="h-5 w-96" /></div>
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
//       <Skeleton className="h-12 w-full max-w-md rounded-lg" />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}</div>
//     </div>
//   );

//   if (error) return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="glass-card rounded-2xl p-8 text-center max-w-md">
//         <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-4" />
//         <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
//         <p className="text-muted-foreground mb-6">{error}</p>
//         <Button onClick={fetchInquiries} className="gap-2"><RefreshCw className="h-4 w-4" /> Try Again</Button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
//       {/* Header */}
//       <div className="animate-slide-up flex items-center gap-3 mb-2">
//         <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
//           <MessagesSquare className="h-6 w-6 text-primary" />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Inquiry & Leads</h1>
//           <p className="text-muted-foreground">Manage customer inquiries and convert them into sales</p>
//         </div>
//       </div>

//       {/* Components Split */}
//       <InquiryStats stats={stats} />
      
//       <InquiryList 
//         inquiries={filteredInquiries} 
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         onView={(inq) => { setSelectedInquiry(inq); setIsModalOpen(true); }}
//         onNegotiate={handleOpenChat}
//         onDelete={(inq) => { setInquiryToDelete(inq); setIsDeleteDialogOpen(true); }}
//         negotiatingId={negotiatingInquiryId}
//         loadingAction={isActionLoading}
//       />

//       {/* --- Detail Modal --- */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="glass-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
//           {selectedInquiry && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center"><Car className="h-5 w-5 text-primary" /></div>
//                   <span>{selectedInquiry.car.make} {selectedInquiry.car.model}</span>
//                 </DialogTitle>
//                 <DialogDescription>Inquiry received on {formatDate(selectedInquiry.createdAt)}</DialogDescription>
//               </DialogHeader>

//               <div className="space-y-6 py-4">
//                 <div className="relative h-48 rounded-xl overflow-hidden">
//                   <img src={selectedInquiry.car.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"} alt="car" className="w-full h-full object-cover" />
//                   <div className="absolute top-3 right-3"><Badge className={`${getStatusStyles(selectedInquiry.status).className} gap-1 border backdrop-blur-sm`}>{getStatusStyles(selectedInquiry.status).icon}{selectedInquiry.status}</Badge></div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="p-4 rounded-xl bg-muted/50"><p className="text-sm text-muted-foreground mb-1">Expected Price</p><p className="text-xl font-bold text-primary">{formatPrice(selectedInquiry.car.expectedPrice)}</p></div>
//                   <div className="p-4 rounded-xl bg-muted/50"><p className="text-sm text-muted-foreground mb-1">Location</p><p className="text-xl font-bold text-foreground flex items-center gap-2"><MapPin className="h-5 w-5" />{selectedInquiry.car.city}</p></div>
//                 </div>

//                 <div className="p-4 rounded-xl bg-muted/50 space-y-3">
//                   <h4 className="font-semibold flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Buyer Information</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><User className="h-4 w-4 text-primary" /></div><div><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{selectedInquiry.buyerName}</p></div></div>
//                     <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Phone className="h-4 w-4 text-primary" /></div><div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{selectedInquiry.buyerPhone}</p></div></div>
//                     {selectedInquiry.buyer?.email && (<div className="flex items-center gap-3 md:col-span-2"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Mail className="h-4 w-4 text-primary" /></div><div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{selectedInquiry.buyer.email}</p></div></div>)}
//                   </div>
//                   {selectedInquiry.buyerMessage && (<div className="pt-3 border-t border-border"><p className="text-xs text-muted-foreground mb-1">Message</p><p className="text-sm">{selectedInquiry.buyerMessage}</p></div>)}
//                 </div>
                
//                 <div className="flex justify-center mt-4">
//                     <Button className="w-full gap-2" onClick={() => { setIsModalOpen(false); handleOpenChat(selectedInquiry); }}><MessageCircle className="h-4 w-4" /> Negotiate Deal</Button>
//                 </div>
//               </div>
//               <DialogFooter className="gap-2"><Button variant="outline" onClick={() => setIsModalOpen(false)} className="gap-2"><X className="h-4 w-4" /> Close</Button></DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* --- Chat/Negotiation Modal --- */}
//       <Dialog open={isChatOpen} onOpenChange={(val) => { setIsChatOpen(val); if(!val && socketRef.current) socketRef.current.disconnect(); }}>
//         <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl glass-card">
//           <div className="bg-primary p-4 text-primary-foreground flex justify-between items-center">
//             <div><h2 className="font-bold">{selectedInquiry?.buyerName}</h2><p className="text-xs opacity-80">{selectedInquiry?.car?.make} Negotiation</p></div>
//             <Badge className="bg-background text-foreground uppercase text-[10px] border-0">{dealStatus}</Badge>
//           </div>
//           <ScrollArea className="h-[400px] p-4 bg-muted/30">
//             <div className="space-y-4">
//               {chatMessages.length === 0 && <div className="text-center text-muted-foreground text-sm mt-10"><MessageCircle className="h-10 w-10 mx-auto mb-2 opacity-20" /><p>Start the negotiation by sending an offer.</p></div>}
//               {chatMessages.map((msg, i) => (
//                 <div key={i} className={`flex flex-col ${msg.senderRole === 'franchise' ? 'items-end' : 'items-start'}`}>
//                   <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${msg.senderRole === 'franchise' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-card border text-foreground rounded-tl-none'}`}>
//                     {msg.offeredPrice > 0 && <div className="flex items-center gap-1 font-bold text-xs mb-1 opacity-90">Offer: <IndianRupee className="h-3 w-3" /> {msg.offeredPrice?.toLocaleString('en-IN')}</div>}
//                     <p className="text-sm">{msg.message}</p>
//                   </div>
//                   <span className="text-[10px] mt-1 text-muted-foreground uppercase px-1">{msg.senderRole}</span>
//                 </div>
//               ))}
//               <div ref={scrollRef} />
//             </div>
//           </ScrollArea>
//           {dealStatus === "negotiating" ? (
//             <div className="p-4 border-t bg-background space-y-3">
//               <div className="flex gap-2">
//                 <div className="relative w-28"><span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">₹</span><Input type="number" placeholder="Price" className="pl-5 h-10" value={newPrice} onChange={e => setNewPrice(e.target.value)} /></div>
//                 <Input placeholder="Type message..." className="flex-1 h-10" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendOffer()} />
//                 <Button size="icon" onClick={handleSendOffer} className="h-10 w-10"><Send className="h-4 w-4" /></Button>
//               </div>
//               <Button variant="outline" className="w-full text-success border-success/30 hover:bg-success/10 h-9 text-xs gap-2" onClick={handleFinalize}><CheckCircle2 className="h-4 w-4" /> Finalize Deal & Mark Sold</Button>
//             </div>
//           ) : (
//             <div className="p-6 bg-success/10 text-success flex flex-col items-center justify-center text-center gap-2"><CheckCircle className="h-8 w-8" /><div><p className="font-bold">Deal Closed</p><p className="text-xs opacity-80">This car has been marked as sold.</p></div></div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation */}
//       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <AlertDialogContent className="glass-card">
//           <AlertDialogHeader>
//             <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" /> Delete Inquiry</AlertDialogTitle>
//             <AlertDialogDescription>Are you sure you want to delete this inquiry from <strong>{inquiryToDelete?.buyerName}</strong>?</AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={deleteInquiry} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">{isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />} Delete</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default InquiryLeads;



import { useState, useEffect, useMemo, useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  MessagesSquare,
  AlertTriangle,
  RefreshCw,
  Loader2,
  Trash2,
  Send,
  CheckCircle2,
  CheckCircle,
  MessageCircle,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// API Services
import { 
  getFranchiseInquiries, 
  deleteFranchiseInquiry,
  startDeal, 
  getDealDetails, 
  makeOffer, 
  finalizeDeal
} from "@/services/franchiseService";

// Child Components
import InquiryStats from "../franchise/pages/InquiryStats";
import InquiryList from "../franchise/pages/InquiryList";
import { InquiryDetailsDialog } from "../franchise/pages/InquiryDialogs"; // ✅ NEW UPDATED DIALOG

const InquiryLeads = () => {
  const { toast } = useToast();
  
  // Data States
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal States
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- CHAT & DEAL STATES ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeDealId, setActiveDealId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newPrice, setNewPrice] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [dealStatus, setDealStatus] = useState("negotiating");
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [negotiatingInquiryId, setNegotiatingInquiryId] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch Logic
  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFranchiseInquiries();
      if (response.success) {
        setInquiries(response.data);
      } else {
        throw new Error("Failed to fetch inquiries");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      toast({ title: "Error", description: err.message || "Failed to fetch inquiries", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInquiries(); }, []);

  // Socket Logic (Same as before)
  const initSocket = (dealId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id || payload.userId || payload._id;
      socketRef.current = io("http://localhost:8002", { auth: { userId } });
      socketRef.current.on("connect", () => { socketRef.current?.emit("joinDealRoom", dealId); });
      socketRef.current.on("newOffer", (data: any) => { setChatMessages((prev) => [...prev, data]); });
      socketRef.current.on("dealFinalized", () => {
        setDealStatus("sold");
        toast({ title: "Deal Finalized!", description: "The car is now marked as sold." });
        fetchInquiries();
      });
    } catch (e) { console.error("Socket Init Error", e); }
  };

  const handleOpenChat = async (inquiry: any) => {
    setIsActionLoading(true);
    setNegotiatingInquiryId(inquiry._id);
    setSelectedInquiry(inquiry);
    try {
      const res = await startDeal({ inquiryId: inquiry._id });
      let dealId = "";
      if (res.success && res.data) { dealId = res.data._id; } 
      else if (res.dealId) { dealId = res.dealId; }
      
      if (dealId) { await setupChatSession(dealId); }
    } catch (err: any) {
      const errorData = err.response?.data;
      if (errorData && errorData.dealId) { await setupChatSession(errorData.dealId); } 
      else { toast({ title: "Error", description: err.message || "Could not open negotiation", variant: "destructive" }); }
    } finally {
      setIsActionLoading(false);
      setNegotiatingInquiryId(null);
    }
  };

  const setupChatSession = async (dealId: string) => {
    setActiveDealId(dealId);
    const history = await getDealDetails(dealId);
    if (history.success) {
      setChatMessages(history.data.negotiation || []);
      setDealStatus(history.data.status);
    }
    initSocket(dealId);
    setIsChatOpen(true);
  };

  const handleSendOffer = async () => {
    if (!newPrice || !newMessage || !activeDealId) return;
    try {
      await makeOffer({ dealId: activeDealId, offeredPrice: Number(newPrice), message: newMessage });
      setNewMessage(""); setNewPrice("");
    } catch (err) { toast({ title: "Error", description: "Failed to send offer", variant: "destructive" }); }
  };

  const handleFinalize = async () => {
    if (!activeDealId) return;
    try {
      const lastOffer = chatMessages[chatMessages.length - 1]?.offeredPrice || selectedInquiry?.car.expectedPrice || 0;
      await finalizeDeal({ dealId: activeDealId, finalPrice: lastOffer, paymentMethod: "Online/Cash" });
    } catch (err) { toast({ title: "Error", description: "Failed to finalize", variant: "destructive" }); }
  };

  useEffect(() => { if (isChatOpen) { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); } }, [chatMessages, isChatOpen]);
  useEffect(() => { if (!isChatOpen && socketRef.current) { socketRef.current.disconnect(); } }, [isChatOpen]);

  // Actions
  const deleteInquiry = async () => {
    if (!inquiryToDelete) return;
    setIsDeleting(true);
    try {
      const response = await deleteFranchiseInquiry(inquiryToDelete._id);
      if (response.success) {
        setInquiries((prev) => prev.filter((inq) => inq._id !== inquiryToDelete._id));
        if (selectedInquiry?._id === inquiryToDelete._id) { setIsModalOpen(false); setSelectedInquiry(null); }
        toast({ title: "Deleted", description: "Inquiry has been deleted" });
      } else { throw new Error(response.message); }
    } catch (err: any) { toast({ title: "Error", description: err.message || "Failed to delete", variant: "destructive" }); } 
    finally { setIsDeleting(false); setIsDeleteDialogOpen(false); setInquiryToDelete(null); }
  };

  const filteredInquiries = useMemo(() => {
    if (!searchQuery.trim()) return inquiries;
    const query = searchQuery.toLowerCase();
    return inquiries.filter(inq => 
      inq.buyerName.toLowerCase().includes(query) || inq.buyerPhone.includes(query) ||
      inq.car.make.toLowerCase().includes(query) || inq.car.model.toLowerCase().includes(query)
    );
  }, [inquiries, searchQuery]);

  const stats = useMemo(() => ({
    total: inquiries.length,
    pending: inquiries.filter((i) => i.status === "pending").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    closed: inquiries.filter((i) => i.status === "closed").length,
    converted: inquiries.filter((i) => i.status === "converted").length,
  }), [inquiries]);

  if (loading) return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      <div className="space-y-2"><Skeleton className="h-10 w-64" /><Skeleton className="h-5 w-96" /></div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
      <Skeleton className="h-12 w-full max-w-md rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-8 text-center max-w-md">
        <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={fetchInquiries} className="gap-2"><RefreshCw className="h-4 w-4" /> Try Again</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="animate-slide-up flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <MessagesSquare className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inquiry & Leads</h1>
          <p className="text-muted-foreground">Manage customer inquiries and convert them into sales</p>
        </div>
      </div>

      <InquiryStats stats={stats} />
      
      <InquiryList 
        inquiries={filteredInquiries} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onView={(inq) => { setSelectedInquiry(inq); setIsModalOpen(true); }}
        onNegotiate={handleOpenChat}
        onDelete={(inq) => { setInquiryToDelete(inq); setIsDeleteDialogOpen(true); }}
        negotiatingId={negotiatingInquiryId}
        loadingAction={isActionLoading}
      />

      {/* ✅ NEW: Using the Updated Styling Modal */}
      <InquiryDetailsDialog 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        inquiry={selectedInquiry}
        onNegotiate={handleOpenChat}
      />

      {/* Chat/Negotiation Modal */}
      <Dialog open={isChatOpen} onOpenChange={(val) => { setIsChatOpen(val); if(!val && socketRef.current) socketRef.current.disconnect(); }}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl bg-white rounded-2xl">
          <div className="bg-[#0052cc] p-4 text-white flex justify-between items-center">
            <div><h2 className="font-bold">{selectedInquiry?.buyerName}</h2><p className="text-xs opacity-80">{selectedInquiry?.car?.make} Negotiation</p></div>
            <Badge className="bg-white/20 text-white uppercase text-[10px] border-0 hover:bg-white/30">{dealStatus}</Badge>
          </div>
          <ScrollArea className="h-[400px] p-4 bg-gray-50">
            <div className="space-y-4">
              {chatMessages.length === 0 && <div className="text-center text-gray-400 text-sm mt-10"><MessageCircle className="h-10 w-10 mx-auto mb-2 opacity-20" /><p>Start the negotiation by sending an offer.</p></div>}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.senderRole === 'franchise' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${msg.senderRole === 'franchise' ? 'bg-[#0052cc] text-white rounded-tr-none' : 'bg-white border text-gray-800 rounded-tl-none'}`}>
                    {msg.offeredPrice > 0 && <div className="flex items-center gap-1 font-bold text-xs mb-1 opacity-90">Offer: <IndianRupee className="h-3 w-3" /> {msg.offeredPrice?.toLocaleString('en-IN')}</div>}
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <span className="text-[10px] mt-1 text-gray-400 uppercase px-1">{msg.senderRole}</span>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          {dealStatus === "negotiating" ? (
            <div className="p-4 border-t bg-white space-y-3">
              <div className="flex gap-2">
                <div className="relative w-28"><span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span><Input type="number" placeholder="Price" className="pl-5 h-10" value={newPrice} onChange={e => setNewPrice(e.target.value)} /></div>
                <Input placeholder="Type message..." className="flex-1 h-10" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendOffer()} />
                <Button size="icon" onClick={handleSendOffer} className="h-10 w-10 bg-[#0052cc] hover:bg-[#0041a3]"><Send className="h-4 w-4" /></Button>
              </div>
              <Button variant="outline" className="w-full text-green-600 border-green-200 hover:bg-green-50 h-9 text-xs gap-2 font-bold" onClick={handleFinalize}><CheckCircle2 className="h-4 w-4" /> Finalize Deal & Mark Sold</Button>
            </div>
          ) : (
            <div className="p-6 bg-green-50 text-green-700 flex flex-col items-center justify-center text-center gap-2"><CheckCircle className="h-8 w-8" /><div><p className="font-bold">Deal Closed</p><p className="text-xs opacity-80">This car has been marked as sold.</p></div></div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="glass-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" /> Delete Inquiry</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this inquiry from <strong>{inquiryToDelete?.buyerName}</strong>?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteInquiry} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">{isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />} Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InquiryLeads;