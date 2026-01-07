// src/components/franchise/listing-verification/dialogs/ListingVerificationDetailsDialog.tsx
import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User, Phone, MapPin, Fuel, Gauge, Users, Palette, Hash, IndianRupee, CarFront
} from "lucide-react";
import { CarListing } from "../../listing-verification/ListingVerification"; // Import types

interface ListingVerificationDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car: CarListing | null;
  formatPrice: (price?: number) => string;
}

const ListingVerificationDetailsDialog: React.FC<ListingVerificationDetailsDialogProps> = ({
  open, onOpenChange, car, formatPrice
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <CarFront className="w-6 h-6 text-primary" />
            {car?.make} {car?.model} {car?.variant}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">{car?.year} • {car?.kmDriven?.toLocaleString()} km driven</DialogDescription>
        </DialogHeader>
        {car && (
          <div className="space-y-6 py-4">
            {/* Image Gallery */}
            {car.images?.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {car.images.map((img, i) => (
                  <img key={i} src={img} alt="car" className="w-full h-24 object-cover rounded-lg border border-border/50" />
                ))}
              </div>
            )}

            {/* Seller Info */}
            <div className="p-4 rounded-xl space-y-3 bg-slate-50 border">
              <h4 className="font-semibold text-foreground">Seller Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{car.sellerName}</span></div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{car.sellerMobile}</span></div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{car.city}, {car.pincode}</span></div>
              </div>
            </div>

            {/* Specs */}
            <div className="p-4 rounded-xl space-y-3 bg-slate-50 border">
              <h4 className="font-semibold text-foreground">Car Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Fuel className="w-4 h-4" /><span>Fuel: {car.fuelType}</span></div>
                <div className="flex items-center gap-2"><Gauge className="w-4 h-4" /><span>Transmission: {car.transmission}</span></div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>Owners: {car.noOfOwners}</span></div>
                {car.color && <div className="flex items-center gap-2"><Palette className="w-4 h-4" /><span>Color: {car.color}</span></div>}
                <div className="flex items-center gap-2"><Hash className="w-4 h-4" /><span>Reg: {car.registrationNumber}</span></div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>Reg City: {car.registrationCity}</span></div>
              </div>
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-xl flex items-center gap-3 bg-green-50 border border-green-200">
              <IndianRupee className="w-5 h-5 text-green-700" />
              <span className="text-2xl font-bold text-green-700">{formatPrice(car.expectedPrice)}</span>
              {car.negotiable && <Badge variant="secondary">Negotiable</Badge>}
            </div>

            {/* Description */}
            {car.description && (
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{car.description}</p>
              </div>
            )}
            
            {/* Rejection Reason (if applicable) */}
            {car.status === 'rejected' && car.rejectionReason && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-900 shadow-sm">
                <p className="text-sm font-bold flex items-center gap-2"><XCircle className="w-4 h-4" /> Rejection Reason:</p>
                <p className="text-sm mt-1 italic">"{car.rejectionReason}"</p>
              </div>
            )}
          </div>
        )}
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListingVerificationDetailsDialog;