import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, MapPin, IndianRupee, User, Phone, Mail } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const InquiryCard = ({ inquiry, onOpen, onUpdateStatus, onDelete, isUpdating, formatPrice, getStatusStyles }: any) => {
  const styles = getStatusStyles(inquiry.status);
  const carImage = inquiry.car?.images?.[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400";

  return (
    <div className="inquiry-card glass-card border border-border/50 rounded-xl overflow-hidden animate-slide-up">
      <div className="relative h-40 overflow-hidden">
        <img src={carImage} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" alt="car" />
        <div className="absolute top-3 right-3">
          <Badge className={`${styles.className} gap-1 border backdrop-blur-sm`}>
            {styles.icon} {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
          <h3 className="font-bold text-lg">{inquiry.car?.make} {inquiry.car?.model}</h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4" /> {inquiry.car?.city}
          </div>
          <div className="flex items-center gap-1 text-primary font-semibold">
            <IndianRupee className="h-4 w-4" /> {formatPrice(inquiry.car?.expectedPrice).replace("₹", "")}
          </div>
        </div>

        <div className="space-y-2 p-3 rounded-lg bg-muted/50 text-sm">
          <div className="flex items-center gap-2"><User className="h-4 w-4" /> {inquiry.buyerName}</div>
          <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {inquiry.buyerPhone}</div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => onOpen(inquiry)}><Eye className="h-4 w-4" /> View</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1" disabled={isUpdating || inquiry.status === "sold"}>Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["pending", "contacted", "closed", "converted"].map((s) => (
                <DropdownMenuItem key={s} onClick={() => onUpdateStatus(inquiry._id, s)} className="capitalize">{s}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => onDelete(inquiry)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
};