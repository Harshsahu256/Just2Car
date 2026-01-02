import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  X,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  Hash
} from "lucide-react";

// Helper Functions
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

// Status Config for Badges
const getStatusConfig = (status: string) => {
  switch (status) {
    case "pending":
      return { label: "Pending", color: "bg-yellow-50 text-yellow-700", icon: <Clock className="w-3 h-3" /> };
    case "contacted":
      return { label: "Contacted", color: "bg-blue-50 text-blue-700", icon: <Phone className="w-3 h-3" /> };
    case "closed":
      return { label: "Closed", color: "bg-red-50 text-red-700", icon: <XCircle className="w-3 h-3" /> };
    case "converted":
      return { label: "Converted", color: "bg-green-50 text-green-700", icon: <CheckCircle className="w-3 h-3" /> };
    default:
      return { label: status, color: "bg-gray-50 text-gray-700", icon: null };
  }
};

interface InquiryDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inquiry: any;
  onNegotiate: (inquiry: any) => void;
}

export const InquiryDetailsDialog = ({
  open,
  onOpenChange,
  inquiry,
  onNegotiate,
}: InquiryDetailsDialogProps) => {
  if (!inquiry) return null;

  const statusInfo = getStatusConfig(inquiry.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 rounded-2xl overflow-hidden border-none flex flex-col max-h-[90vh] shadow-2xl bg-white">
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#1a1f2c]">
                {inquiry.car.make} {inquiry.car.model}
              </h2>
              <p className="text-gray-500 font-medium text-sm mt-1">
                {inquiry.car.variant || "Standard Variant"} • {inquiry.car.year}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-gray-400 hover:bg-gray-100"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Car Image */}
          <AspectRatio ratio={16 / 9} className="rounded-2xl overflow-hidden shadow-sm bg-gray-100">
            <img
              src={inquiry.car.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
              alt="car"
              className="object-cover w-full h-full"
            />
          </AspectRatio>

          {/* Price & Status Row */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-[#0052cc]">
                {formatPrice(inquiry.car.expectedPrice)}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded">
                Expected
              </span>
            </div>
            <Badge className={`${statusInfo.color} border-none rounded-full px-4 py-1 text-xs font-bold uppercase flex items-center gap-2`}>
              {statusInfo.icon} {statusInfo.label}
            </Badge>
          </div>

          {/* Details Grid (Styled exactly like Listings Modal) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4">
            {[
              { 
                label: "Buyer Name", 
                value: inquiry.buyerName, 
                icon: <User className="w-4 h-4" /> 
              },
              { 
                label: "Phone Number", 
                value: inquiry.buyerPhone, 
                icon: <Phone className="w-4 h-4" /> 
              },
              { 
                label: "Email", 
                value: inquiry.buyer?.email || "N/A", 
                icon: <Mail className="w-4 h-4" /> 
              },
              { 
                label: "Location", 
                value: inquiry.car.city, 
                icon: <MapPin className="w-4 h-4" /> 
              },
              { 
                label: "Inquiry Date", 
                value: new Date(inquiry.createdAt).toLocaleDateString("en-GB"), 
                icon: <Calendar className="w-4 h-4" /> 
              },
              { 
                label: "Car ID", 
                value: inquiry.car._id ? `#${inquiry.car._id.slice(-6).toUpperCase()}` : "N/A", 
                icon: <Hash className="w-4 h-4" /> 
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <p className="font-bold text-base text-[#1a1f2c] truncate">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Message Section */}
          {inquiry.buyerMessage && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#1a1f2c] flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Buyer Message
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                "{inquiry.buyerMessage}"
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-gray-50/50 border-t flex justify-end gap-3 px-8 shrink-0">
          <Button
            variant="outline"
            className="rounded-lg h-10 px-6 font-bold border-gray-200 text-gray-600 hover:text-[#1a1f2c]"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          {/* <Button
            className="bg-[#0052cc] hover:bg-[#0041a3] rounded-lg h-10 px-6 font-bold flex items-center gap-2 shadow-sm text-white"
            onClick={() => {
              onOpenChange(false);
              onNegotiate(inquiry);
            }}
          >
            <MessageCircle className="w-4 h-4" /> Negotiate Deal
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};