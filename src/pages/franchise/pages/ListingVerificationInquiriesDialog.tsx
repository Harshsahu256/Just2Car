// src/components/franchise/listing-verification/dialogs/ListingVerificationInquiriesDialog.tsx
import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, User, Phone, MessageSquareText
} from "lucide-react";
import { CarListing, CarInquiry } from "../../listing-verification/ListingVerification"; // Import types

interface ListingVerificationInquiriesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCar: CarListing | null;
  carInquiries: CarInquiry[];
  totalInquiriesCount: number;
  inquiriesLoading: boolean;
  formatDateTime: (dt?: string) => string;
}

const ListingVerificationInquiriesDialog: React.FC<ListingVerificationInquiriesDialogProps> = ({
  open, onOpenChange, selectedCar, carInquiries, totalInquiriesCount, inquiriesLoading, formatDateTime
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2 text-teal-700">
            <MessageSquareText className="w-6 h-6" /> Inquiries for {selectedCar?.make} {selectedCar?.model}
          </DialogTitle>
          <DialogDescription>
            Total: {totalInquiriesCount} inquiries. List of potential buyers who inquired about this car.
          </DialogDescription>
        </DialogHeader>
        {inquiriesLoading ? (
          <div className="py-10 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <p className="text-muted-foreground">Fetching inquiries...</p>
          </div>
        ) : carInquiries.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">No inquiries found for this car yet.</div>
        ) : (
          <div className="space-y-4 py-4">
            {carInquiries.map(inquiry => (
              <Card key={inquiry._id} className="p-4 bg-gray-50 border border-gray-200 shadow-sm">
                <CardContent className="p-0 space-y-1">
                  <p className="font-semibold text-lg">{inquiry.buyerName}</p>
                  <p className="text-sm text-gray-700 flex items-center gap-2"><Phone className="w-4 h-4" /> {inquiry.buyerPhone}</p>
                  {inquiry.buyerEmail && <p className="text-sm text-gray-700 flex items-center gap-2"><User className="w-4 h-4" /> {inquiry.buyerEmail}</p>}
                  {inquiry.buyerMessage && <p className="text-sm text-gray-600 italic mt-2">"{inquiry.buyerMessage}"</p>}
                  <p className="text-xs text-gray-500 mt-2">Inquired on: {formatDateTime(inquiry.createdAt)}</p>
                  <Badge variant="outline" className="text-xs capitalize mt-1">{inquiry.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListingVerificationInquiriesDialog;