// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ClipboardList } from "lucide-react";

// const DealTracking = () => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Deal Tracking</h1>
//         <p className="text-muted-foreground mt-1">Track ongoing deals and transactions</p>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <ClipboardList className="h-5 w-5" />
//             Active Deals
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground">Deal tracking interface coming soon</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default DealTracking;


// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import {
//   Send,
//   CheckCircle2,
//   AlertCircle,
//   Clock,
//   IndianRupee,
//   CreditCard,
//   Banknote,
//   Lock,
//   Sparkles,
//   ArrowRight,
// } from "lucide-react";
// import { toast } from "@/hooks/use-toast";

// interface NegotiationMessage {
//   senderRole: "buyer" | "franchise";
//   offeredPrice: number;
//   message: string;
//   createdAt: string;
// }

// interface Deal {
//   _id: string;
//   status: "negotiating" | "sold" | "cancelled";
//   negotiation: NegotiationMessage[];
//   finalPrice?: number;
//   paymentMethod?: "cash" | "online";
// }

// const API_BASE = "";

// const formatPrice = (price: number): string => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(price);
// };

// const formatTime = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//   });
// };

// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   };
// };

// const DealTracking = () => {
//   const [deal, setDeal] = useState<Deal>({
//     _id: "demo-deal-123",
//     status: "negotiating",
//     negotiation: [
//       {
//         senderRole: "buyer",
//         offeredPrice: 450000,
//         message: "Hi, I'm interested in this car. Is the price negotiable?",
//         createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
//       },
//       {
//         senderRole: "franchise",
//         offeredPrice: 480000,
//         message: "Hello! Yes, we can discuss. The lowest I can offer is ₹4.8L considering the excellent condition.",
//         createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
//       },
//       {
//         senderRole: "buyer",
//         offeredPrice: 460000,
//         message: "That's still a bit high. Can we settle at ₹4.6L? I can pay immediately.",
//         createdAt: new Date(Date.now() - 3600000).toISOString(),
//       },
//     ],
//   });

//   const [offeredPrice, setOfferedPrice] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [finalPrice, setFinalPrice] = useState<string>("");
//   const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isFinalizing, setIsFinalizing] = useState<boolean>(false);

//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [deal.negotiation]);

//   const handleSendOffer = async () => {
//     if (!offeredPrice || !message.trim()) {
//       toast({
//         title: "Missing Information",
//         description: "Please enter both price and message",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await axios.put(
//         `${API_BASE}/deal/update`,
//         {
//           dealId: deal._id,
//           offeredPrice: Number(offeredPrice),
//           message: message.trim(),
//         },
//         { headers: getAuthHeaders() }
//       );

//       const newMessage: NegotiationMessage = {
//         senderRole: "franchise",
//         offeredPrice: Number(offeredPrice),
//         message: message.trim(),
//         createdAt: new Date().toISOString(),
//       };

//       setDeal((prev) => ({
//         ...prev,
//         negotiation: [...prev.negotiation, newMessage],
//       }));

//       setOfferedPrice("");
//       setMessage("");

//       toast({
//         title: "Offer Sent",
//         description: "Your counter-offer has been sent successfully",
//       });
//     } catch (error) {
//       const newMessage: NegotiationMessage = {
//         senderRole: "franchise",
//         offeredPrice: Number(offeredPrice),
//         message: message.trim(),
//         createdAt: new Date().toISOString(),
//       };

//       setDeal((prev) => ({
//         ...prev,
//         negotiation: [...prev.negotiation, newMessage],
//       }));

//       setOfferedPrice("");
//       setMessage("");

//       toast({
//         title: "Offer Sent",
//         description: "Your counter-offer has been recorded",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFinalizeDeal = async () => {
//     if (!finalPrice) {
//       toast({
//         title: "Missing Price",
//         description: "Please enter the final agreed price",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsFinalizing(true);
//     try {
//       await axios.put(
//         `${API_BASE}/deal/finalize`,
//         {
//           dealId: deal._id,
//           finalPrice: Number(finalPrice),
//           paymentMethod,
//         },
//         { headers: getAuthHeaders() }
//       );

//       setDeal((prev) => ({
//         ...prev,
//         status: "sold",
//         finalPrice: Number(finalPrice),
//         paymentMethod,
//       }));

//       toast({
//         title: "Deal Finalized! 🎉",
//         description: "The deal has been marked as sold successfully",
//       });
//     } catch (error) {
//       setDeal((prev) => ({
//         ...prev,
//         status: "sold",
//         finalPrice: Number(finalPrice),
//         paymentMethod,
//       }));

//       toast({
//         title: "Deal Finalized! 🎉",
//         description: "The deal has been marked as sold successfully",
//       });
//     } finally {
//       setIsFinalizing(false);
//     }
//   };

//   const StatusBadge = () => {
//     const statusConfig = {
//       negotiating: {
//         label: "Negotiating",
//         className: "status-badge status-negotiating",
//         icon: Clock,
//       },
//       sold: {
//         label: "Sold",
//         className: "status-badge status-sold",
//         icon: CheckCircle2,
//       },
//       cancelled: {
//         label: "Cancelled",
//         className: "status-badge status-cancelled",
//         icon: AlertCircle,
//       },
//     };

//     const config = statusConfig[deal.status];
//     const Icon = config.icon;

//     return (
//       <span className={`${config.className} flex items-center gap-2 animate-scale-in`}>
//         <Icon className="w-3.5 h-3.5" />
//         {config.label}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-8">
//       <div className="max-w-3xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="glass-card p-6 animate-fade-in">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
//                 Deal Tracking
//               </h1>
//               <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
//                 Inquiry
//                 <ArrowRight className="w-3 h-3" />
//                 Negotiation
//                 <ArrowRight className="w-3 h-3" />
//                 Final Sale
//               </p>
//             </div>
//             <StatusBadge />
//           </div>
//         </div>

//         {/* Success Banner for Sold Deals */}
//         {deal.status === "sold" && (
//           <div className="glass-card p-6 border-success/30 bg-success/5 animate-scale-in">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center">
//                 <Sparkles className="w-7 h-7 text-success" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-xl font-semibold text-success flex items-center gap-2">
//                   🎉 Deal Closed Successfully
//                 </h3>
//                 <div className="flex flex-wrap gap-4 mt-2 text-sm">
//                   <span className="text-foreground/80 flex items-center gap-1.5">
//                     <IndianRupee className="w-4 h-4 text-success" />
//                     Final Price: <strong>{formatPrice(deal.finalPrice || 0)}</strong>
//                   </span>
//                   <span className="text-foreground/80 flex items-center gap-1.5">
//                     {deal.paymentMethod === "cash" ? (
//                       <Banknote className="w-4 h-4 text-success" />
//                     ) : (
//                       <CreditCard className="w-4 h-4 text-success" />
//                     )}
//                     Payment: <strong className="capitalize">{deal.paymentMethod}</strong>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Chat Section */}
//         <div className="glass-card animate-slide-up stagger-1">
//           <div className="p-4 border-b border-border/30">
//             <h2 className="font-semibold text-foreground flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-primary animate-pulse-subtle" />
//               Negotiation Chat
//             </h2>
//           </div>

//           <div
//             ref={chatContainerRef}
//             className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth"
//           >
//             {deal.negotiation.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.senderRole === "franchise" ? "justify-end" : "justify-start"} animate-fade-in`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div
//                   className={`chat-bubble ${
//                     msg.senderRole === "franchise"
//                       ? "chat-bubble-franchise"
//                       : "chat-bubble-buyer"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2 mb-2">
//                     <span
//                       className={`text-xs font-medium px-2 py-0.5 rounded-full ${
//                         msg.senderRole === "franchise"
//                           ? "bg-primary-foreground/20"
//                           : "bg-muted"
//                       }`}
//                     >
//                       {formatPrice(msg.offeredPrice)}
//                     </span>
//                   </div>
//                   <p className="text-sm leading-relaxed">{msg.message}</p>
//                   <p
//                     className={`text-xs mt-2 ${
//                       msg.senderRole === "franchise"
//                         ? "text-primary-foreground/60"
//                         : "text-muted-foreground"
//                     }`}
//                   >
//                     {formatDate(msg.createdAt)} • {formatTime(msg.createdAt)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Send Offer Section */}
//         {deal.status === "negotiating" && (
//           <div className="glass-card p-6 animate-slide-up stagger-2">
//             <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
//               <Send className="w-4 h-4 text-primary" />
//               Send Counter Offer
//             </h3>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm text-muted-foreground">
//                     Offered Price (₹)
//                   </label>
//                   <div className="relative">
//                     <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                     <input
//                       type="number"
//                       value={offeredPrice}
//                       onChange={(e) => setOfferedPrice(e.target.value)}
//                       placeholder="Enter amount"
//                       className="w-full pl-10 pr-4 py-3 rounded-lg glass-input border text-foreground placeholder:text-muted-foreground"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm text-muted-foreground">Message</label>
//                   <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Add a message..."
//                     className="w-full px-4 py-3 rounded-lg glass-input border text-foreground placeholder:text-muted-foreground"
//                   />
//                 </div>
//               </div>
//               <button
//                 onClick={handleSendOffer}
//                 disabled={isLoading}
//                 className="w-full md:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium glass-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <Send className="w-4 h-4" />
//                     Send Offer
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Finalize Deal Section */}
//         {deal.status === "negotiating" && (
//           <div className="glass-card p-6 animate-slide-up stagger-3 border-primary/20">
//             <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
//               <CheckCircle2 className="w-4 h-4 text-success" />
//               Finalize Deal
//             </h3>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm text-muted-foreground">
//                     Final Agreed Price (₹)
//                   </label>
//                   <div className="relative">
//                     <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                     <input
//                       type="number"
//                       value={finalPrice}
//                       onChange={(e) => setFinalPrice(e.target.value)}
//                       placeholder="Enter final price"
//                       className="w-full pl-10 pr-4 py-3 rounded-lg glass-input border text-foreground placeholder:text-muted-foreground"
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm text-muted-foreground">
//                     Payment Method
//                   </label>
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => setPaymentMethod("cash")}
//                       className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-300 flex items-center justify-center gap-2 ${
//                         paymentMethod === "cash"
//                           ? "bg-primary/20 border-primary text-foreground"
//                           : "bg-muted/30 border-border/40 text-muted-foreground hover:border-primary/50"
//                       }`}
//                     >
//                       <Banknote className="w-4 h-4" />
//                       Cash
//                     </button>
//                     <button
//                       onClick={() => setPaymentMethod("online")}
//                       className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-300 flex items-center justify-center gap-2 ${
//                         paymentMethod === "online"
//                           ? "bg-primary/20 border-primary text-foreground"
//                           : "bg-muted/30 border-border/40 text-muted-foreground hover:border-primary/50"
//                       }`}
//                     >
//                       <CreditCard className="w-4 h-4" />
//                       Online
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={handleFinalizeDeal}
//                 disabled={isFinalizing}
//                 className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-success to-success/80 text-success-foreground font-semibold glass-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isFinalizing ? (
//                   <span className="w-5 h-5 border-2 border-success-foreground/30 border-t-success-foreground rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <CheckCircle2 className="w-5 h-5" />
//                     Finalize & Mark Sold
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Locked State for Sold Deals */}
//         {deal.status === "sold" && (
//           <div className="glass-card p-6 animate-fade-in opacity-60">
//             <div className="flex items-center justify-center gap-3 text-muted-foreground">
//               <Lock className="w-5 h-5" />
//               <span>This deal has been finalized. No further actions available.</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DealTracking;

// import { useState, useRef, useEffect } from "react";
// // API Services Import
// import { makeOffer, finalizeDeal } from "@/services/franchiseService"; 
// import {
//   Send,
//   CheckCircle2,
//   AlertCircle,
//   Clock,
//   IndianRupee,
//   CreditCard,
//   Banknote,
//   Lock,
//   Sparkles,
//   ArrowRight,
//   Loader2,
// } from "lucide-react";
// import { toast } from "@/hooks/use-toast";

// interface NegotiationMessage {
//   senderRole: "buyer" | "franchise";
//   offeredPrice: number;
//   message: string;
//   createdAt: string;
// }

// interface Deal {
//   _id: string;
//   status: "negotiating" | "sold" | "cancelled";
//   negotiation: NegotiationMessage[];
//   finalPrice?: number;
//   paymentMethod?: "cash" | "online";
// }

// const formatPrice = (price: number): string => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(price);
// };

// const formatTime = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//   });
// };

// const DealTracking = () => {
//   // Initial state (Ideally, you should fetch this from backend using dealId on mount)
//   const [deal, setDeal] = useState<Deal>({
//     _id: "69467a71492b48db7c9a0f38", // Example Deal ID
//     status: "negotiating",
//     negotiation: [
//       {
//         senderRole: "buyer",
//         offeredPrice: 450000,
//         message: "Hi, I'm interested in this car. Is the price negotiable?",
//         createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
//       },
//     ],
//   });

//   const [offeredPrice, setOfferedPrice] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [finalPrice, setFinalPrice] = useState<string>("");
//   const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isFinalizing, setIsFinalizing] = useState<boolean>(false);

//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [deal.negotiation]);

//   // --- 1. HANDLE SEND OFFER (Negotiation Update) ---
//   const handleSendOffer = async () => {
//     if (!offeredPrice || !message.trim()) {
//       toast({
//         title: "Missing Information",
//         description: "Please enter both price and message",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const payload = {
//         dealId: deal._id,
//         offeredPrice: Number(offeredPrice),
//         message: message.trim(),
//       };

//       const response = await makeOffer(payload);

//       if (response.success) {
//         const newMessage: NegotiationMessage = {
//           senderRole: "franchise",
//           offeredPrice: Number(offeredPrice),
//           message: message.trim(),
//           createdAt: new Date().toISOString(),
//         };

//         setDeal((prev) => ({
//           ...prev,
//           negotiation: [...prev.negotiation, newMessage],
//         }));

//         setOfferedPrice("");
//         setMessage("");

//         toast({
//           title: "Offer Sent",
//           description: "Your counter-offer has been sent successfully",
//         });
//       }
//     } catch (error: any) {
//       toast({
//         title: "Offer Failed",
//         description: error.response?.data?.message || "Something went wrong",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- 2. HANDLE FINALIZE DEAL (Mark as Sold) ---
//   const handleFinalizeDeal = async () => {
//     if (!finalPrice) {
//       toast({
//         title: "Missing Price",
//         description: "Please enter the final agreed price",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsFinalizing(true);
//     try {
//       const payload = {
//         dealId: deal._id,
//         finalPrice: Number(finalPrice),
//         paymentMethod,
//       };

//       const response = await finalizeDeal(payload);

//       if (response.success) {
//         setDeal((prev) => ({
//           ...prev,
//           status: "sold",
//           finalPrice: Number(finalPrice),
//           paymentMethod,
//         }));

//         toast({
//           title: "Deal Finalized! 🎉",
//           description: "The car has been marked as sold successfully",
//         });
//       }
//     } catch (error: any) {
//       toast({
//         title: "Finalization Failed",
//         description: error.response?.data?.message || "Could not close the deal",
//         variant: "destructive",
//       });
//     } finally {
//       setIsFinalizing(false);
//     }
//   };

//   const StatusBadge = () => {
//     const statusConfig = {
//       negotiating: { label: "Negotiating", className: "status-badge status-negotiating", icon: Clock },
//       sold: { label: "Sold", className: "status-badge status-sold", icon: CheckCircle2 },
//       cancelled: { label: "Cancelled", className: "status-badge status-cancelled", icon: AlertCircle },
//     };

//     const config = statusConfig[deal.status];
//     const Icon = config.icon;

//     return (
//       <span className={`${config.className} flex items-center gap-2 animate-scale-in`}>
//         <Icon className="w-3.5 h-3.5" />
//         {config.label}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-8 font-sans">
//       <div className="max-w-3xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="glass-card p-6 animate-fade-in">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Deal Tracking</h1>
//               <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
//                 Inquiry <ArrowRight className="w-3 h-3" /> Negotiation <ArrowRight className="w-3 h-3" /> Final Sale
//               </p>
//             </div>
//             <StatusBadge />
//           </div>
//         </div>

//         {/* Success Banner */}
//         {deal.status === "sold" && (
//           <div className="glass-card p-6 border-success/30 bg-success/5 animate-scale-in">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center">
//                 <Sparkles className="w-7 h-7 text-success" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-xl font-semibold text-success flex items-center gap-2">🎉 Deal Closed Successfully</h3>
//                 <div className="flex flex-wrap gap-4 mt-2 text-sm">
//                   <span className="text-foreground/80 flex items-center gap-1.5">
//                     <IndianRupee className="w-4 h-4 text-success" />
//                     Final Price: <strong>{formatPrice(deal.finalPrice || 0)}</strong>
//                   </span>
//                   <span className="text-foreground/80 flex items-center gap-1.5">
//                     {deal.paymentMethod === "cash" ? <Banknote className="w-4 h-4 text-success" /> : <CreditCard className="w-4 h-4 text-success" />}
//                     Payment: <strong className="capitalize">{deal.paymentMethod}</strong>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Chat Section */}
//         <div className="glass-card animate-slide-up">
//           <div className="p-4 border-b border-border/30">
//             <h2 className="font-semibold text-foreground flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
//               Negotiation Chat
//             </h2>
//           </div>
//           <div ref={chatContainerRef} className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth">
//             {deal.negotiation.map((msg, index) => (
//               <div key={index} className={`flex ${msg.senderRole === "franchise" ? "justify-end" : "justify-start"} animate-fade-in`}>
//                 <div className={`chat-bubble ${msg.senderRole === "franchise" ? "chat-bubble-franchise" : "chat-bubble-buyer"}`}>
//                   <div className="flex items-center gap-2 mb-2">
//                     <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${msg.senderRole === "franchise" ? "bg-primary-foreground/20" : "bg-muted"}`}>
//                       {formatPrice(msg.offeredPrice)}
//                     </span>
//                   </div>
//                   <p className="text-sm leading-relaxed">{msg.message}</p>
//                   <p className={`text-xs mt-2 ${msg.senderRole === "franchise" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
//                     {formatDate(msg.createdAt)} • {formatTime(msg.createdAt)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Send Offer Section */}
//         {deal.status === "negotiating" && (
//           <div className="glass-card p-6 animate-slide-up">
//             <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
//               <Send className="w-4 h-4 text-primary" /> Send Counter Offer
//             </h3>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm text-muted-foreground">Offered Price (₹)</label>
//                   <div className="relative">
//                     <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                     <input type="number" value={offeredPrice} onChange={(e) => setOfferedPrice(e.target.value)} placeholder="Enter amount" className="w-full pl-10 pr-4 py-3 rounded-lg glass-input border text-foreground" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm text-muted-foreground">Message</label>
//                   <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Add a message..." className="w-full px-4 py-3 rounded-lg glass-input border text-foreground" />
//                 </div>
//               </div>
//               <button onClick={handleSendOffer} disabled={isLoading} className="w-full md:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 disabled:opacity-50">
//                 {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Offer</>}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Finalize Deal Section */}
//         {deal.status === "negotiating" && (
//           <div className="glass-card p-6 animate-slide-up border-primary/20">
//             <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
//               <CheckCircle2 className="w-4 h-4 text-success" /> Finalize Deal
//             </h3>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm text-muted-foreground">Final Agreed Price (₹)</label>
//                   <div className="relative">
//                     <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                     <input type="number" value={finalPrice} onChange={(e) => setFinalPrice(e.target.value)} placeholder="Enter final price" className="w-full pl-10 pr-4 py-3 rounded-lg glass-input border text-foreground" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm text-muted-foreground">Payment Method</label>
//                   <div className="flex gap-3">
//                     <button onClick={() => setPaymentMethod("cash")} className={`flex-1 px-4 py-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${paymentMethod === "cash" ? "bg-primary/20 border-primary" : "bg-muted/30"}`}><Banknote className="w-4 h-4" /> Cash</button>
//                     <button onClick={() => setPaymentMethod("online")} className={`flex-1 px-4 py-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${paymentMethod === "online" ? "bg-primary/20 border-primary" : "bg-muted/30"}`}><CreditCard className="w-4 h-4" /> Online</button>
//                   </div>
//                 </div>
//               </div>
//               <button onClick={handleFinalizeDeal} disabled={isFinalizing} className="w-full px-6 py-4 rounded-lg bg-success text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
//                 {isFinalizing ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Finalize & Mark Sold</>}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Locked State */}
//         {deal.status === "sold" && (
//           <div className="glass-card p-6 animate-fade-in opacity-60">
//             <div className="flex items-center justify-center gap-3 text-muted-foreground">
//               <Lock className="w-5 h-5" />
//               <span>This deal has been finalized. No further actions available.</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DealTracking;


import { useState, useEffect } from "react";
import { 
  Card, CardContent, CardFooter, CardHeader 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Car, Phone, Calendar, IndianRupee, CheckCircle, Clock, 
  MoreHorizontal, MessageSquare, User, FileText, AlertCircle, Loader2
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

// 👇 Import your services
import { getFranchiseDeals, updateDealStatus } from "../../services/franchiseService";

const statusColors: any = {
  negotiating: "bg-blue-100 text-blue-700 border-blue-200",
  accepted: "bg-purple-100 text-purple-700 border-purple-200",
  sold: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

const DealTracking = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [formData, setFormData] = useState({
    status: "",
    finalPrice: "",
    note: ""
  });

  // 1. Fetch Deals on Load
  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const res = await getFranchiseDeals();
      if (res.success) {
        setDeals(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load deals");
    } finally {
      setLoading(false);
    }
  };

  // 2. Open Modal Logic
  const handleEditClick = (deal: any) => {
    setSelectedDeal(deal);
    setFormData({
      status: deal.status,
      finalPrice: deal.finalAgreedPrice || deal.initialPrice || "",
      note: ""
    });
    setIsModalOpen(true);
  };

  // 3. Submit Update Logic
  const handleSubmit = async () => {
    try {
      // Validation for SOLD status
      if (formData.status === "sold" && !formData.finalPrice) {
        toast.error("Please enter the Final Selling Price to close the deal.");
        return;
      }

      setUpdating(true);

      const payload = {
        status: formData.status,
        finalPrice: formData.status === "sold" ? Number(formData.finalPrice) : undefined,
        note: formData.note
      };

      await updateDealStatus(selectedDeal._id, payload);

      toast.success(`Deal marked as ${formData.status.toUpperCase()}!`);
      setIsModalOpen(false);
      fetchDeals(); // Refresh list to show updated status
    } catch (error: any) {
      toast.error(error.message || "Failed to update deal");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading Deals...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Deal Tracking</h1>
            <p className="text-muted-foreground mt-1">Manage active negotiations and close sales.</p>
          </div>
          <Button onClick={fetchDeals} variant="outline" className="gap-2">
            <Clock className="w-4 h-4" /> Refresh List
          </Button>
        </div>

        {/* Deals Grid */}
        {deals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal, index) => (
              <motion.div
                key={deal._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full flex flex-col hover:shadow-lg transition-shadow border-t-4 ${deal.status === 'sold' ? 'border-emerald-500 bg-emerald-50/30' : 'border-indigo-500'}`}>
                  
                  {/* Card Header: Status & Date */}
                  <CardHeader className="pb-3 pt-4 px-4">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={`capitalize px-3 py-1 ${statusColors[deal.status] || "bg-slate-100"}`}>
                        {deal.status === 'sold' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {deal.status}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground bg-white px-2 py-1 rounded-full border shadow-sm">
                        {new Date(deal.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="px-4 flex-1 space-y-4">
                    
                    {/* Car Details */}
                    <div className="flex gap-3 items-center group cursor-pointer">
                      <div className="h-14 w-20 bg-slate-200 rounded-md overflow-hidden shrink-0 border border-slate-200">
                        {deal.car?.images?.[0] ? (
                            <img src={deal.car.images[0]} alt="Car" className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center"><Car className="text-slate-400 w-6 h-6"/></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 line-clamp-1 leading-tight">
                          {deal.car?.year} {deal.car?.make} {deal.car?.model}
                        </h3>
                        {/* <p className="text-xs text-muted-foreground font-mono mt-1 bg-slate-100 inline-block px-1 rounded">
                            {deal.car?.registrationNumber || "N/A"}
                        </p> */}
                      </div>
                    </div>

                    {/* Buyer Details */}
                    <div className="bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                          <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                              <User className="h-3 w-3" />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{deal.buyer?.fullName || "Unknown Buyer"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 ml-8">
                          <Phone className="h-3 w-3" /> {deal.buyer?.phone || "N/A"}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex justify-between items-end pt-2 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">
                            {deal.status === 'sold' ? 'Sold At' : 'Current Offer'}
                        </p>
                        <div className="text-lg font-bold text-slate-900 flex items-center">
                          <IndianRupee className="w-4 h-4 mr-0.5" />
                          {(deal.finalAgreedPrice || deal.initialPrice || 0).toLocaleString()}
                        </div>
                      </div>
                      {deal.status === 'sold' && (
                          <div className="text-right">
                              <p className="text-[10px] text-muted-foreground">Commission</p>
                              <p className="text-sm font-medium text-emerald-600">
                                + ₹ {(deal.franchiseCommission || 0).toLocaleString()}
                              </p>
                          </div>
                      )}
                    </div>

                  </CardContent>

                  {/* Actions */}
                  <CardFooter className="px-4 py-3 bg-slate-50/50 border-t">
                    <Button 
                      variant={deal.status === 'sold' ? "outline" : "default"} 
                      className={`w-full gap-2 ${deal.status === 'sold' ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                      onClick={() => handleEditClick(deal)}
                      disabled={deal.status === 'sold'}
                    >
                      {deal.status === 'sold' ? (
                        <>Deal Closed <CheckCircle className="w-4 h-4" /></>
                      ) : (
                        <>Update Status <MoreHorizontal className="w-4 h-4" /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-300 rounded-xl">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
                <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No Active Deals</h3>
            <p className="text-slate-500 text-sm max-w-sm text-center mt-1">
                Start negotiations from the "Inquiries & Leads" page to see deals here.
            </p>
          </div>
        )}
      </div>

      {/* --- UPDATE STATUS MODAL --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Deal Status</DialogTitle>
            <DialogDescription>
              Change status or finalize the deal for <b>{selectedDeal?.car?.make} {selectedDeal?.car?.model}</b>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            
            {/* 1. Status Selector */}
            <div className="space-y-2">
              <Label>New Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(val) => setFormData({...formData, status: val})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="negotiating">Negotiating (In Discussion)</SelectItem>
                  <SelectItem value="accepted">Accepted (Paperwork Pending)</SelectItem>
                  <SelectItem value="sold" className="text-emerald-600 font-medium">Sold (Payment Received)</SelectItem>
                  <SelectItem value="cancelled" className="text-red-600">Cancelled (Deal Dropped)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 2. Final Price Input (Only if SOLD) */}
            {formData.status === 'sold' && (
               <div className="space-y-3 bg-emerald-50 p-4 rounded-lg border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
                 <div className="flex items-center gap-2 text-emerald-800 font-medium text-sm">
                    <IndianRupee className="w-4 h-4" /> Final Selling Price
                 </div>
                 <Input 
                   type="number" 
                   value={formData.finalPrice} 
                   onChange={(e) => setFormData({...formData, finalPrice: e.target.value})}
                   className="bg-white border-emerald-200 focus:ring-emerald-500"
                   placeholder="Enter amount (e.g., 500000)"
                 />
                 <div className="flex gap-2 text-[11px] text-emerald-600">
                    <AlertCircle className="w-3 h-3 mt-0.5" />
                    <p>Entering this amount will generate commission and mark the car as sold in listings.</p>
                 </div>
               </div>
            )}

            {/* 3. Notes Input */}
            <div className="space-y-2">
              <Label>Remarks / Notes</Label>
              <Textarea 
                value={formData.note} 
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                placeholder="E.g. Customer requested RC transfer assistance..."
                className="h-20 resize-none"
              />
            </div>

          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={updating} className={formData.status === 'sold' ? "bg-emerald-600 hover:bg-emerald-700" : ""}>
              {updating ? (
                  <>Saving... <Loader2 className="ml-2 h-4 w-4 animate-spin"/></>
              ) : (
                  <>Save Changes</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default DealTracking;