
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
//   Send,
//   Handshake,
//   CreditCard,
//   Banknote,
//   Building2,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/hooks/use-toast";

// // --- API Service Imports ---
// import { 
//   getFranchiseInquiries, 
//   deleteFranchiseInquiry,
//   updateFranchiseInquiryStatus // ✅ Added Import
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
//   status: "pending" | "contacted" | "closed" | "converted" | "sold";
//   createdAt: string;
//   updatedAt: string;
// }

// interface NegotiationMessage {
//   sender: string;
//   senderRole: "buyer" | "franchise";
//   offeredPrice: number;
//   message: string;
//   createdAt: string;
// }

// interface Deal {
//   _id: string;
//   inquiry: string;
//   car: string;
//   franchise: string;
//   buyer: string;
//   negotiation: NegotiationMessage[];
//   initialPrice: number;
//   finalAgreedPrice?: number;
//   status: "negotiating" | "accepted" | "sold" | "cancelled";
//   paymentMethod?: string;
//   paymentStatus: "pending" | "completed";
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
//   if (!dateString) return "N/A";
//   return new Date(dateString).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// // Format short time for chat
// const formatChatTime = (dateString: string): string => {
//   if (!dateString) return "";
//   return new Date(dateString).toLocaleTimeString("en-IN", {
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
//     case "sold":
//       return {
//         className: "bg-success/20 text-success border-success/30",
//         icon: <Handshake className="h-3 w-3" />,
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

//   // ========== DEAL STATE ==========
//   const [currentDeal, setCurrentDeal] = useState<Deal | null>(null);
//   const [isDealLoading, setIsDealLoading] = useState(false);
//   const [offerPrice, setOfferPrice] = useState("");
//   const [offerMessage, setOfferMessage] = useState("");
//   const [isSendingOffer, setIsSendingOffer] = useState(false);
//   const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);
//   const [finalPrice, setFinalPrice] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [isFinalizing, setIsFinalizing] = useState(false);

//   // Fetch inquiries (REAL API)
//   const fetchInquiries = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await getFranchiseInquiries();
//       if (response.success) {
//         setInquiries(response.data || []);
//       } else {
//         throw new Error( "Failed to fetch inquiries");
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       toast({
//         title: "Error",
//         description: "Failed to fetch inquiries",
//         variant: "destructive",
//       });
//       setInquiries([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete inquiry (REAL API)
//   const deleteInquiry = async () => {
//     if (!inquiryToDelete) return;

//     setIsDeleting(true);
//     try {
//       const response = await deleteFranchiseInquiry(inquiryToDelete._id);
      
//       if(response.success) {
//         setInquiries((prev) =>
//             prev.filter((inq) => inq._id !== inquiryToDelete._id)
//         );

//         if (selectedInquiry?._id === inquiryToDelete._id) {
//             setIsModalOpen(false);
//             setSelectedInquiry(null);
//         }

//         toast({
//             title: "Deleted",
//             description: "Inquiry has been deleted successfully",
//         });
//       }
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err.message || "Failed to delete inquiry",
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

//   // ========== DEAL & STATUS LOGIC ==========
  
//   const handleStartDeal = async (inquiryId: string) => {
//     toast({
//         title: "Deal API Not Connected",
//         description: "Deal creation logic needs the backend endpoint.",
//         variant: "default"
//     });
//     // Simulating UI change for demo purposes
//     setInquiries((prev) =>
//         prev.map((inq) =>
//           inq._id === inquiryId ? { ...inq, status: "converted" as const } : inq
//         )
//     );
//   };

//   const handleMakeOffer = async () => {
//     if (!offerPrice || !offerMessage.trim()) {
//       toast({
//         title: "Validation Error",
//         description: "Please enter both price and message",
//         variant: "destructive",
//       });
//       return;
//     }
//     toast({
//         title: "Offer Sent (Simulation)",
//         description: "Offer API needs integration.",
//     });
//     setOfferPrice("");
//     setOfferMessage("");
//   };

//   const handleFinalizeDeal = async () => {
//     if (!finalPrice || !paymentMethod) {
//       toast({
//         title: "Validation Error",
//         description: "Please enter final price and payment method",
//         variant: "destructive",
//       });
//       return;
//     }
//     toast({
//         title: "Deal Finalized (Simulation)",
//         description: "Deal finalization API needs integration.",
//     });
//     setIsFinalizeModalOpen(false);
//     setFinalPrice("");
//     setPaymentMethod("");
//   };

//   // ✅ UPDATE STATUS (INTEGRATED API)
//   const updateStatus = async (id: string, newStatus: Inquiry["status"]) => {
//     if (newStatus === "converted") {
//       await handleStartDeal(id);
//       return;
//     }

//     setIsUpdating(true);
//     try {
//         // Call API
//         const response = await updateFranchiseInquiryStatus(id, newStatus);

//         if(response.success) {
//             // Update Local State on success
//             setInquiries((prev) =>
//                 prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
//             );
//             if (selectedInquiry?._id === id) {
//                 setSelectedInquiry((prev) =>
//                 prev ? { ...prev, status: newStatus } : null
//                 );
//             }
//             toast({
//                 title: "Status Updated",
//                 description: `Inquiry marked as ${newStatus}.`,
//             });
//         }
//     } catch (err: any) {
//         toast({
//             title: "Error",
//             description: err.message || "Failed to update status",
//             variant: "destructive",
//         });
//     } finally {
//         setIsUpdating(false);
//     }
//   };

//   // Reset deal state when modal closes
//   useEffect(() => {
//     if (!isModalOpen) {
//       setCurrentDeal(null);
//       setOfferPrice("");
//       setOfferMessage("");
//     }
//   }, [isModalOpen]);

//   // Filter inquiries based on search
//   const filteredInquiries = useMemo(() => {
//     if (!searchQuery.trim()) return inquiries;

//     const query = searchQuery.toLowerCase();
//     return inquiries.filter(
//       (inq) =>
//         inq.buyerName?.toLowerCase().includes(query) ||
//         inq.buyerPhone?.includes(query) ||
//         inq.car?.make.toLowerCase().includes(query) ||
//         inq.car?.model.toLowerCase().includes(query) ||
//         inq.car?.city.toLowerCase().includes(query)
//     );
//   }, [inquiries, searchQuery]);

//   // Stats calculation
//   const stats = useMemo(() => {
//     return {
//       total: inquiries.length,
//       pending: inquiries.filter((i) => i.status === "pending").length,
//       contacted: inquiries.filter((i) => i.status === "contacted").length,
//       closed: inquiries.filter((i) => i.status === "closed").length,
//       converted: inquiries.filter(
//         (i) => i.status === "converted" || i.status === "sold"
//       ).length,
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

//   // Check if deal is active (negotiating)
//   const isDealActive = currentDeal && currentDeal.status === "negotiating";
//   const isDealSold = currentDeal && currentDeal.status === "sold";

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
//             inquiry.car?.images?.[0] ||
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
//                   alt={`${inquiry.car?.make} ${inquiry.car?.model}`}
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
//                     {inquiry.car?.make} {inquiry.car?.model}
//                   </h3>
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-4 space-y-4">
//                 {/* Car Details */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2 text-muted-foreground">
//                     <MapPin className="h-4 w-4" />
//                     <span className="text-sm">{inquiry.car?.city}</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-primary font-semibold">
//                     <IndianRupee className="h-4 w-4" />
//                     <span>{formatPrice(inquiry.car?.expectedPrice || 0).replace("₹", "")}</span>
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
//                         disabled={isUpdating || inquiry.status === "sold"}
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
//                     {selectedInquiry.car?.make} {selectedInquiry.car?.model}
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
//                       selectedInquiry.car?.images?.[0] ||
//                       "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"
//                     }
//                     alt={`${selectedInquiry.car?.make} ${selectedInquiry.car?.model}`}
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
//                       {formatPrice(selectedInquiry.car?.expectedPrice || 0)}
//                     </p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-muted/50">
//                     <p className="text-sm text-muted-foreground mb-1">
//                       Location
//                     </p>
//                     <p className="text-xl font-bold text-foreground flex items-center gap-2">
//                       <MapPin className="h-5 w-5" />
//                       {selectedInquiry.car?.city}
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

//                 {/* ========== DEAL / NEGOTIATION SECTION ========== */}
//                 {(selectedInquiry.status === "converted" ||
//                   selectedInquiry.status === "sold" ||
//                   currentDeal) && (
//                   <div className="p-4 rounded-xl bg-success/10 border border-success/20 space-y-4">
//                     <h4 className="font-semibold flex items-center gap-2 text-success">
//                       <Handshake className="h-5 w-5" />
//                       Deal Negotiation
//                       {isDealSold && (
//                         <Badge className="bg-success text-success-foreground ml-2">
//                           SOLD
//                         </Badge>
//                       )}
//                     </h4>

//                     {/* Deal Info */}
//                     {currentDeal && (
//                       <div className="grid grid-cols-2 gap-3 text-sm">
//                         <div>
//                           <span className="text-muted-foreground">Initial Price:</span>
//                           <span className="font-semibold ml-2">
//                             {formatPrice(currentDeal.initialPrice)}
//                           </span>
//                         </div>
//                         {currentDeal.finalAgreedPrice && (
//                           <div>
//                             <span className="text-muted-foreground">Final Price:</span>
//                             <span className="font-semibold ml-2 text-success">
//                               {formatPrice(currentDeal.finalAgreedPrice)}
//                             </span>
//                           </div>
//                         )}
//                         <div>
//                           <span className="text-muted-foreground">Status:</span>
//                           <Badge
//                             variant="outline"
//                             className="ml-2 capitalize"
//                           >
//                             {currentDeal.status}
//                           </Badge>
//                         </div>
//                         {currentDeal.paymentMethod && (
//                           <div>
//                             <span className="text-muted-foreground">Payment:</span>
//                             <span className="font-semibold ml-2 capitalize">
//                               {currentDeal.paymentMethod}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* Negotiation Chat */}
//                     {currentDeal && currentDeal.negotiation.length > 0 && (
//                       <div className="space-y-3 max-h-60 overflow-y-auto p-3 rounded-lg bg-background/50">
//                         <p className="text-xs text-muted-foreground text-center">
//                           Negotiation History
//                         </p>
//                         {currentDeal.negotiation.map((msg, idx) => (
//                           <div
//                             key={idx}
//                             className={`flex ${
//                               msg.senderRole === "franchise"
//                                 ? "justify-end"
//                                 : "justify-start"
//                             }`}
//                           >
//                             <div
//                               className={`max-w-[75%] p-3 rounded-xl ${
//                                 msg.senderRole === "franchise"
//                                   ? "bg-primary text-primary-foreground rounded-br-sm"
//                                   : "bg-muted text-foreground rounded-bl-sm"
//                               }`}
//                             >
//                               <p className="text-xs opacity-70 mb-1">
//                                 {msg.senderRole === "franchise"
//                                   ? "You (Franchise)"
//                                   : "Buyer"}
//                               </p>
//                               <p className="font-semibold">
//                                 {formatPrice(msg.offeredPrice)}
//                               </p>
//                               <p className="text-sm mt-1">{msg.message}</p>
//                               <p className="text-xs opacity-50 mt-2 text-right">
//                                 {formatChatTime(msg.createdAt)}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {/* Make Offer Form */}
//                     {isDealActive && (
//                       <div className="space-y-3 pt-3 border-t border-success/20">
//                         <div className="grid grid-cols-2 gap-3">
//                           <div>
//                             <label className="text-xs text-muted-foreground">
//                               Offered Price (₹)
//                             </label>
//                             <Input
//                               type="number"
//                               placeholder="Enter price"
//                               value={offerPrice}
//                               onChange={(e) => setOfferPrice(e.target.value)}
//                               className="mt-1"
//                             />
//                           </div>
//                           <div className="flex items-end">
//                             <Button
//                               onClick={handleMakeOffer}
//                               disabled={isSendingOffer || !offerPrice || !offerMessage.trim()}
//                               className="w-full gap-2"
//                             >
//                               {isSendingOffer ? (
//                                 <Loader2 className="h-4 w-4 animate-spin" />
//                               ) : (
//                                 <Send className="h-4 w-4" />
//                               )}
//                               Send Offer
//                             </Button>
//                           </div>
//                         </div>
//                         <div>
//                           <label className="text-xs text-muted-foreground">
//                             Message
//                           </label>
//                           <Textarea
//                             placeholder="Enter your message..."
//                             value={offerMessage}
//                             onChange={(e) => setOfferMessage(e.target.value)}
//                             className="mt-1"
//                             rows={2}
//                           />
//                         </div>
//                       </div>
//                     )}

//                     {/* Finalize Deal Button */}
//                     {isDealActive && (
//                       <Button
//                         onClick={() => setIsFinalizeModalOpen(true)}
//                         className="w-full gap-2 bg-success hover:bg-success/90"
//                       >
//                         <Handshake className="h-4 w-4" />
//                         Finalize Deal
//                       </Button>
//                     )}

//                     {/* Deal Already Exists Message */}
//                     {!currentDeal &&
//                       (selectedInquiry.status === "converted" ||
//                         selectedInquiry.status === "sold") && (
//                         <div className="text-center py-4">
//                           {isDealLoading ? (
//                             <Loader2 className="h-6 w-6 animate-spin mx-auto text-success" />
//                           ) : (
//                             <p className="text-sm text-muted-foreground">
//                               Deal was started for this inquiry.
//                             </p>
//                           )}
//                         </div>
//                       )}
//                   </div>
//                 )}

//                 {/* Status Update Buttons */}
//                 {selectedInquiry.status !== "sold" && (
//                   <div className="space-y-3">
//                     <h4 className="font-semibold">Update Status</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {(
//                         ["pending", "contacted", "closed", "converted"] as const
//                       ).map((status) => {
//                         const styles = getStatusStyles(status);
//                         const isActive = selectedInquiry.status === status;
//                         return (
//                           <Button
//                             key={status}
//                             variant={isActive ? "default" : "outline"}
//                             size="sm"
//                             className={`gap-2 ${
//                               isActive ? "" : styles.className
//                             }`}
//                             onClick={() =>
//                               updateStatus(selectedInquiry._id, status)
//                             }
//                             disabled={isUpdating || isActive || isDealLoading}
//                           >
//                             {(isUpdating || isDealLoading) &&
//                             status === "converted" ? (
//                               <Loader2 className="h-4 w-4 animate-spin" />
//                             ) : (
//                               styles.icon
//                             )}
//                             {status.charAt(0).toUpperCase() + status.slice(1)}
//                           </Button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Sold Status Message */}
//                 {selectedInquiry.status === "sold" && (
//                   <div className="p-4 rounded-xl bg-success/10 border border-success/20 text-center">
//                     <Handshake className="h-8 w-8 mx-auto text-success mb-2" />
//                     <p className="font-semibold text-success">
//                       This car has been sold!
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       The deal has been finalized successfully.
//                     </p>
//                   </div>
//                 )}
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

//       {/* Finalize Deal Modal */}
//       <Dialog open={isFinalizeModalOpen} onOpenChange={setIsFinalizeModalOpen}>
//         <DialogContent className="glass-card border-border max-w-md">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <Handshake className="h-5 w-5 text-success" />
//               Finalize Deal
//             </DialogTitle>
//             <DialogDescription>
//               Complete the sale and close the deal
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4 py-4">
//             <div>
//               <label className="text-sm font-medium">
//                 Final Agreed Price (₹)
//               </label>
//               <Input
//                 type="number"
//                 placeholder="Enter final price"
//                 value={finalPrice}
//                 onChange={(e) => setFinalPrice(e.target.value)}
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Payment Method</label>
//               <Select value={paymentMethod} onValueChange={setPaymentMethod}>
//                 <SelectTrigger className="mt-1">
//                   <SelectValue placeholder="Select payment method" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="cash">
//                     <div className="flex items-center gap-2">
//                       <Banknote className="h-4 w-4" />
//                       Cash
//                     </div>
//                   </SelectItem>
//                   <SelectItem value="online">
//                     <div className="flex items-center gap-2">
//                       <CreditCard className="h-4 w-4" />
//                       Online Transfer
//                     </div>
//                   </SelectItem>
//                   <SelectItem value="bank">
//                     <div className="flex items-center gap-2">
//                       <Building2 className="h-4 w-4" />
//                       Bank Transfer
//                     </div>
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <DialogFooter className="gap-2">
//             <Button
//               variant="outline"
//               onClick={() => setIsFinalizeModalOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleFinalizeDeal}
//               disabled={isFinalizing || !finalPrice || !paymentMethod}
//               className="gap-2 bg-success hover:bg-success/90"
//             >
//               {isFinalizing ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 <CheckCircle className="h-4 w-4" />
//               )}
//               Confirm Sale
//             </Button>
//           </DialogFooter>
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
//               <span className="font-semibold">
//                 {inquiryToDelete?.buyerName}
//               </span>
//               ? This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={deleteInquiry}
//               className="bg-destructive hover:bg-destructive/90 gap-2"
//               disabled={isDeleting}
//             >
//               {isDeleting ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Trash2 className="h-4 w-4" />
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
import { useToast } from "@/hooks/use-toast";
import { Search, MessagesSquare, Loader2, Clock, Phone, XCircle, CheckCircle, Handshake } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InquiryStats } from "../franchise/pages/InquiryStats";
import { InquiryCard } from "../franchise/pages/InquiryCard";
import { InquiryDetailDialog } from "../franchise/pages/InquiryDetailDialog";
import { DeleteInquiryDialog } from "../franchise/pages/DeleteInquiryDialog";
import { getFranchiseInquiries, deleteFranchiseInquiry, updateFranchiseInquiryStatus } from "@/services/franchiseService";

const InquiryLeads = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => { fetchInquiries(); }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await getFranchiseInquiries();
      if (res.success) setInquiries(res.data || []);
    } catch (err) { toast({ title: "Error", variant: "destructive" }); }
    finally { setLoading(false); }
  };

  const handleUpdateStatus = async (id: string, newStatus: any) => {
    setIsUpdating(true);
    try {
      const res = await updateFranchiseInquiryStatus(id, newStatus);
      if (res.success) {
        setInquiries(prev => prev.map(inq => inq._id === id ? { ...inq, status: newStatus } : inq));
        toast({ title: "Status Updated" });
      }
    } catch (err) { toast({ title: "Update Failed", variant: "destructive" }); }
    finally { setIsUpdating(false); }
  };

  const handleDelete = async () => {
    if (!inquiryToDelete) return;
    try {
      await deleteFranchiseInquiry(inquiryToDelete._id);
      setInquiries(prev => prev.filter(i => i._id !== inquiryToDelete._id));
      setIsDeleteDialogOpen(false);
      toast({ title: "Inquiry Deleted" });
    } catch (err) { toast({ title: "Delete Failed", variant: "destructive" }); }
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => 
      inq.buyerName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      inq.buyerPhone?.includes(searchQuery)
    );
  }, [inquiries, searchQuery]);

  const stats = useMemo(() => ({
    total: inquiries.length,
    pending: inquiries.filter(i => i.status === "pending").length,
    contacted: inquiries.filter(i => i.status === "contacted").length,
    closed: inquiries.filter(i => i.status === "closed").length,
    converted: inquiries.filter(i => i.status === "converted" || i.status === "sold").length,
  }), [inquiries]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending": return { className: "bg-warning/20 text-warning", icon: <Clock className="h-3 w-3" /> };
      case "contacted": return { className: "bg-primary/20 text-primary", icon: <Phone className="h-3 w-3" /> };
      case "closed": return { className: "bg-destructive/20 text-destructive", icon: <XCircle className="h-3 w-3" /> };
      case "converted": return { className: "bg-success/20 text-success", icon: <CheckCircle className="h-3 w-3" /> };
      case "sold": return { className: "bg-success/20 text-success", icon: <Handshake className="h-3 w-3" /> };
      default: return { className: "bg-muted", icon: null };
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"><MessagesSquare className="text-primary" /></div>
        <h1 className="text-3xl font-bold">Inquiry & Leads</h1>
      </div>

      <InquiryStats stats={stats} />

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search name, phone..." className="pl-10 glass-card" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInquiries.map(inq => (
          <InquiryCard 
            key={inq._id} inquiry={inq} isUpdating={isUpdating} 
            formatPrice={(p: any) => `₹${p.toLocaleString()}`} 
            getStatusStyles={getStatusStyles}
            onOpen={(data: any) => { setSelectedInquiry(data); setIsModalOpen(true); }}
            onUpdateStatus={handleUpdateStatus}
            onDelete={(data: any) => { setInquiryToDelete(data); setIsDeleteDialogOpen(true); }}
          />
        ))}
      </div>

      <InquiryDetailDialog 
        open={isModalOpen} setOpen={setIsModalOpen} inquiry={selectedInquiry}
        statusStyles={getStatusStyles(selectedInquiry?.status)}
        formatPrice={(p: any) => `₹${p?.toLocaleString()}`}
        formatDate={(d: any) => new Date(d).toLocaleDateString()}
        onUpdateStatus={handleUpdateStatus}
        onDelete={(data: any) => { setIsModalOpen(false); setInquiryToDelete(data); setIsDeleteDialogOpen(true); }}
      />

      <DeleteInquiryDialog 
        open={isDeleteDialogOpen} setOpen={setIsDeleteDialogOpen} 
        inquiry={inquiryToDelete} onDelete={handleDelete}
      />
    </div>
  );
};

export default InquiryLeads;