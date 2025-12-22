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

import { useState, useRef, useEffect } from "react";
// API Services Import
import { makeOffer, finalizeDeal } from "@/services/franchiseService"; 
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  IndianRupee,
  CreditCard,
  Banknote,
  Lock,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NegotiationMessage {
  senderRole: "buyer" | "franchise";
  offeredPrice: number;
  message: string;
  createdAt: string;
}

interface Deal {
  _id: string;
  status: "negotiating" | "sold" | "cancelled";
  negotiation: NegotiationMessage[];
  finalPrice?: number;
  paymentMethod?: "cash" | "online";
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const DealTracking = () => {
  // Initial state (Ideally, you should fetch this from backend using dealId on mount)
  const [deal, setDeal] = useState<Deal>({
    _id: "69467a71492b48db7c9a0f38", // Example Deal ID
    status: "negotiating",
    negotiation: [
      {
        senderRole: "buyer",
        offeredPrice: 450000,
        message: "Hi, I'm interested in this car. Is the price negotiable?",
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
    ],
  });

  const [offeredPrice, setOfferedPrice] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [finalPrice, setFinalPrice] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinalizing, setIsFinalizing] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [deal.negotiation]);

  // --- 1. HANDLE SEND OFFER (Negotiation Update) ---
  const handleSendOffer = async () => {
    if (!offeredPrice || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both price and message",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        dealId: deal._id,
        offeredPrice: Number(offeredPrice),
        message: message.trim(),
      };

      const response = await makeOffer(payload);

      if (response.success) {
        const newMessage: NegotiationMessage = {
          senderRole: "franchise",
          offeredPrice: Number(offeredPrice),
          message: message.trim(),
          createdAt: new Date().toISOString(),
        };

        setDeal((prev) => ({
          ...prev,
          negotiation: [...prev.negotiation, newMessage],
        }));

        setOfferedPrice("");
        setMessage("");

        toast({
          title: "Offer Sent",
          description: "Your counter-offer has been sent successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Offer Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. HANDLE FINALIZE DEAL (Mark as Sold) ---
  const handleFinalizeDeal = async () => {
    if (!finalPrice) {
      toast({
        title: "Missing Price",
        description: "Please enter the final agreed price",
        variant: "destructive",
      });
      return;
    }

    setIsFinalizing(true);
    try {
      const payload = {
        dealId: deal._id,
        finalPrice: Number(finalPrice),
        paymentMethod,
      };

      const response = await finalizeDeal(payload);

      if (response.success) {
        setDeal((prev) => ({
          ...prev,
          status: "sold",
          finalPrice: Number(finalPrice),
          paymentMethod,
        }));

        toast({
          title: "Deal Finalized! 🎉",
          description: "The car has been marked as sold successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Finalization Failed",
        description: error.response?.data?.message || "Could not close the deal",
        variant: "destructive",
      });
    } finally {
      setIsFinalizing(false);
    }
  };

  const StatusBadge = () => {
    const statusConfig = {
      negotiating: { label: "Negotiating", className: "status-badge status-negotiating", icon: Clock },
      sold: { label: "Sold", className: "status-badge status-sold", icon: CheckCircle2 },
      cancelled: { label: "Cancelled", className: "status-badge status-cancelled", icon: AlertCircle },
    };

    const config = statusConfig[deal.status];
    const Icon = config.icon;

    return (
      <span className={`${config.className} flex items-center gap-2 animate-scale-in`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="glass-card p-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Deal Tracking</h1>
              <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                Inquiry <ArrowRight className="w-3 h-3" /> Negotiation <ArrowRight className="w-3 h-3" /> Final Sale
              </p>
            </div>
            <StatusBadge />
          </div>
        </div>

        {/* Success Banner */}
        {deal.status === "sold" && (
          <div className="glass-card p-6 border-success/30 bg-success/5 animate-scale-in">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-success flex items-center gap-2">🎉 Deal Closed Successfully</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                  <span className="text-foreground/80 flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-success" />
                    Final Price: <strong>{formatPrice(deal.finalPrice || 0)}</strong>
                  </span>
                  <span className="text-foreground/80 flex items-center gap-1.5">
                    {deal.paymentMethod === "cash" ? <Banknote className="w-4 h-4 text-success" /> : <CreditCard className="w-4 h-4 text-success" />}
                    Payment: <strong className="capitalize">{deal.paymentMethod}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Section */}
        <div className="glass-card animate-slide-up">
          <div className="p-4 border-b border-border/30">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Negotiation Chat
            </h2>
          </div>
          <div ref={chatContainerRef} className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth">
            {deal.negotiation.map((msg, index) => (
              <div key={index} className={`flex ${msg.senderRole === "franchise" ? "justify-end" : "justify-start"} animate-fade-in`}>
                <div className={`chat-bubble ${msg.senderRole === "franchise" ? "chat-bubble-franchise" : "chat-bubble-buyer"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${msg.senderRole === "franchise" ? "bg-primary-foreground/20" : "bg-muted"}`}>
                      {formatPrice(msg.offeredPrice)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                  <p className={`text-xs mt-2 ${msg.senderRole === "franchise" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    {formatDate(msg.createdAt)} • {formatTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Send Offer Section */}
        {deal.status === "negotiating" && (
          <div className="glass-card p-6 animate-slide-up">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Send className="w-4 h-4 text-primary" /> Send Counter Offer
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Offered Price (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="number" value={offeredPrice} onChange={(e) => setOfferedPrice(e.target.value)} placeholder="Enter amount" className="w-full pl-10 pr-4 py-3 rounded-lg glass-input border text-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Message</label>
                  <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Add a message..." className="w-full px-4 py-3 rounded-lg glass-input border text-foreground" />
                </div>
              </div>
              <button onClick={handleSendOffer} disabled={isLoading} className="w-full md:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 disabled:opacity-50">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Offer</>}
              </button>
            </div>
          </div>
        )}

        {/* Finalize Deal Section */}
        {deal.status === "negotiating" && (
          <div className="glass-card p-6 animate-slide-up border-primary/20">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" /> Finalize Deal
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Final Agreed Price (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="number" value={finalPrice} onChange={(e) => setFinalPrice(e.target.value)} placeholder="Enter final price" className="w-full pl-10 pr-4 py-3 rounded-lg glass-input border text-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Payment Method</label>
                  <div className="flex gap-3">
                    <button onClick={() => setPaymentMethod("cash")} className={`flex-1 px-4 py-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${paymentMethod === "cash" ? "bg-primary/20 border-primary" : "bg-muted/30"}`}><Banknote className="w-4 h-4" /> Cash</button>
                    <button onClick={() => setPaymentMethod("online")} className={`flex-1 px-4 py-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${paymentMethod === "online" ? "bg-primary/20 border-primary" : "bg-muted/30"}`}><CreditCard className="w-4 h-4" /> Online</button>
                  </div>
                </div>
              </div>
              <button onClick={handleFinalizeDeal} disabled={isFinalizing} className="w-full px-6 py-4 rounded-lg bg-success text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
                {isFinalizing ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Finalize & Mark Sold</>}
              </button>
            </div>
          </div>
        )}

        {/* Locked State */}
        {deal.status === "sold" && (
          <div className="glass-card p-6 animate-fade-in opacity-60">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Lock className="w-5 h-5" />
              <span>This deal has been finalized. No further actions available.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealTracking;