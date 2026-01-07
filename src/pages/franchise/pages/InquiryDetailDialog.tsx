import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Car, MapPin, User, Phone, Mail, Handshake, Send, X, Trash2, Loader2 } from "lucide-react";

export const InquiryDetailDialog = ({ 
  open, setOpen, inquiry, statusStyles, formatPrice, formatDate, 
  onUpdateStatus, onStartFinalize, onDelete, isUpdating 
}: any) => {
  if (!inquiry) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="glass-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center"><Car className="h-5 w-5 text-primary" /></div>
            <span>{inquiry.car?.make} {inquiry.car?.model}</span>
          </DialogTitle>
          <DialogDescription>Inquiry received on {formatDate(inquiry.createdAt)}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Car Image & Badge */}
          <div className="relative h-48 rounded-xl overflow-hidden">
            <img src={inquiry.car?.images?.[0]} className="w-full h-full object-cover" alt="car" />
            <div className="absolute top-3 right-3">
              <Badge className={`${statusStyles.className} border backdrop-blur-sm`}>{inquiry.status}</Badge>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground">Expected Price</p>
              <p className="text-xl font-bold text-primary">{formatPrice(inquiry.car?.expectedPrice)}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="text-xl font-bold flex items-center gap-2"><MapPin className="h-5 w-5" /> {inquiry.car?.city}</p>
            </div>
          </div>

          {/* Buyer Info */}
          <div className="p-4 rounded-xl bg-muted/50 space-y-3">
            <h4 className="font-semibold flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Buyer Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /> {inquiry.buyerName}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> {inquiry.buyerPhone}</div>
              {inquiry.buyer?.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> {inquiry.buyer.email}</div>}
            </div>
          </div>

          {/* Negotiation Logic (Simplified UI for demo, matching your logic) */}
          {inquiry.status === "converted" && (
            <div className="p-4 rounded-xl bg-success/10 border border-success/20 space-y-4">
              <h4 className="font-semibold flex items-center gap-2 text-success"><Handshake className="h-5 w-5" /> Negotiation</h4>
              <Button className="w-full bg-success hover:bg-success/90" onClick={onStartFinalize}>Finalize Deal</Button>
            </div>
          )}

          {/* Status Update Buttons */}
          {inquiry.status !== "sold" && (
            <div className="flex flex-wrap gap-2 pt-2">
              {["pending", "contacted", "closed", "converted"].map((s) => (
                <Button key={s} variant={inquiry.status === s ? "default" : "outline"} size="sm" 
                        onClick={() => onUpdateStatus(inquiry._id, s)} disabled={isUpdating}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}><X className="h-4 w-4 mr-2" /> Close</Button>
          <Button variant="destructive" onClick={() => { setOpen(false); onDelete(inquiry); }}><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};