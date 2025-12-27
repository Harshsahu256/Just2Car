// import { Search, MessagesSquare, MapPin, IndianRupee, User, Phone, Eye, MessageCircle, Trash2, Loader2, Clock, CheckCircle, XCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";

// // Helper for Currency Formatting
// const formatPrice = (price: number): string => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(price);
// };

// // Status badge helper
// const getStatusStyles = (status: string) => {
//   switch (status) {
//     case "pending": return { className: "bg-warning/20 text-warning border-warning/30", icon: <Clock className="h-3 w-3" /> };
//     case "contacted": return { className: "bg-primary/20 text-primary border-primary/30", icon: <Phone className="h-3 w-3" /> };
//     case "closed": return { className: "bg-destructive/20 text-destructive border-destructive/30", icon: <XCircle className="h-3 w-3" /> };
//     case "converted": return { className: "bg-success/20 text-success border-success/30", icon: <CheckCircle className="h-3 w-3" /> };
//     default: return { className: "bg-muted text-muted-foreground", icon: null };
//   }
// };

// interface InquiryListProps {
//   inquiries: any[];
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   onView: (inquiry: any) => void;
//   onNegotiate: (inquiry: any) => void;
//   onDelete: (inquiry: any) => void;
//   negotiatingId: string | null;
//   loadingAction: boolean;
// }

// const InquiryList = ({ 
//   inquiries, 
//   searchQuery, 
//   setSearchQuery, 
//   onView, 
//   onNegotiate, 
//   onDelete,
//   negotiatingId,
//   loadingAction 
// }: InquiryListProps) => {

//   return (
//     <div className="space-y-6">
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
//       {inquiries.length === 0 && (
//         <div className="text-center py-16 animate-fade-in">
//           <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
//             <MessagesSquare className="h-10 w-10 text-muted-foreground" />
//           </div>
//           <h3 className="text-xl font-semibold mb-2">No inquiries found</h3>
//           <p className="text-muted-foreground">{searchQuery ? "Try adjusting your search query" : "New inquiries will appear here"}</p>
//         </div>
//       )}

//       {/* Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {inquiries.map((inquiry, index) => {
//           const statusStyles = getStatusStyles(inquiry.status);
//           const carImage = inquiry.car.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400";
//           const isNegotiating = negotiatingId === inquiry._id;

//           return (
//             <div
//               key={inquiry._id}
//               className="glass-card rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all animate-slide-up"
//               style={{ animationDelay: `${0.1 * (index % 6)}s` }}
//             >
//               {/* Image */}
//               <div className="relative h-40 overflow-hidden group">
//                 <img
//                   src={carImage}
//                   alt="Car"
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"; }}
//                 />
//                 <div className="absolute top-3 right-3">
//                   <Badge className={`${statusStyles.className} gap-1 border backdrop-blur-sm`}>
//                     {statusStyles.icon}
//                     {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
//                   </Badge>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
//                   <h3 className="font-bold text-lg text-white">{inquiry.car.make} {inquiry.car.model}</h3>
//                 </div>
//               </div>

//               {/* Details */}
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

//                 <div className="space-y-2 p-3 rounded-lg bg-secondary/50 border border-border/50">
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
//                 <div className="flex gap-2 pt-1">
//                   <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => onView(inquiry)}>
//                     <Eye className="h-4 w-4" /> View
//                   </Button>
//                   <Button 
//                     size="sm" 
//                     className="flex-1 gap-2" 
//                     onClick={() => onNegotiate(inquiry)}
//                     disabled={loadingAction}
//                   >
//                     {isNegotiating ? <Loader2 className="h-3 w-3 animate-spin" /> : <MessageCircle className="h-3 w-3" />}
//                     Negotiate
//                   </Button>
//                   <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 border-destructive/20" onClick={() => onDelete(inquiry)}>
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default InquiryList;

import { Search, MessagesSquare, MapPin, IndianRupee, User, Phone, Eye, MessageCircle, Trash2, Loader2, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Helper for Currency Formatting
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

// Status badge helper
const getStatusStyles = (status: string) => {
  switch (status) {
    case "pending": return { className: "bg-warning/20 text-warning border-warning/30", icon: <Clock className="h-3 w-3" /> };
    case "contacted": return { className: "bg-primary/20 text-primary border-primary/30", icon: <Phone className="h-3 w-3" /> };
    case "closed": return { className: "bg-destructive/20 text-destructive border-destructive/30", icon: <XCircle className="h-3 w-3" /> };
    case "converted": return { className: "bg-success/20 text-success border-success/30", icon: <CheckCircle className="h-3 w-3" /> };
    default: return { className: "bg-muted text-muted-foreground", icon: null };
  }
};

interface InquiryListProps {
  inquiries: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onView: (inquiry: any) => void;
  onNegotiate: (inquiry: any) => void;
  onDelete: (inquiry: any) => void;
  negotiatingId: string | null;
  loadingAction: boolean;
}

const InquiryList = ({ 
  inquiries, 
  searchQuery, 
  setSearchQuery, 
  onView, 
  onNegotiate, 
  onDelete,
  negotiatingId,
  loadingAction 
}: InquiryListProps) => {

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
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
      {inquiries.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <MessagesSquare className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No inquiries found</h3>
          <p className="text-muted-foreground">{searchQuery ? "Try adjusting your search query" : "New inquiries will appear here"}</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inquiries.map((inquiry, index) => {
          const statusStyles = getStatusStyles(inquiry.status);
          const carImage = inquiry.car.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400";
          const isNegotiating = negotiatingId === inquiry._id;

          return (
            <div
              key={inquiry._id}
              className="glass-card rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all animate-slide-up"
              style={{ animationDelay: `${0.1 * (index % 6)}s` }}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden group">
                <img
                  src={carImage}
                  alt="Car"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400"; }}
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`${statusStyles.className} gap-1 border backdrop-blur-sm`}>
                    {statusStyles.icon}
                    {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="font-bold text-lg text-white">{inquiry.car.make} {inquiry.car.model}</h3>
                </div>
              </div>

              {/* Details */}
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

                <div className="space-y-2 p-3 rounded-lg bg-secondary/50 border border-border/50">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{inquiry.buyerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{inquiry.buyerPhone}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => onView(inquiry)}>
                    <Eye className="h-4 w-4" /> View
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 gap-2" 
                    onClick={() => onNegotiate(inquiry)}
                    disabled={loadingAction}
                  >
                    {isNegotiating ? <Loader2 className="h-3 w-3 animate-spin" /> : <MessageCircle className="h-3 w-3" />}
                    Negotiate
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 border-destructive/20" onClick={() => onDelete(inquiry)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InquiryList;