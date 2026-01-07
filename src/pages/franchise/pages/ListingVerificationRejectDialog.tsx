// src/components/franchise/listing-verification/dialogs/ListingVerificationRejectDialog.tsx
import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { XCircle, Loader2 } from "lucide-react";
import { CarListing } from "../../listing-verification/ListingVerification"; // Import types

interface ListingVerificationRejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCar: CarListing | null;
  rejectReason: string;
  onRejectReasonChange: (reason: string) => void;
  onSubmit: () => Promise<void>;
  rejecting: boolean;
}

const ListingVerificationRejectDialog: React.FC<ListingVerificationRejectDialogProps> = ({
  open, onOpenChange, selectedCar, rejectReason, onRejectReasonChange, onSubmit, rejecting
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            <XCircle className="w-5 h-5" /> Reject Listing: {selectedCar?.make} {selectedCar?.model}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="reject-reason">Rejection Reason</Label>
          <textarea
            id="reject-reason"
            placeholder="Enter rejection reason (required)..."
            value={rejectReason}
            onChange={(e) => onRejectReasonChange(e.target.value)}
            className="w-full p-2 border rounded-md min-h-[120px]"
          />
        </div>
        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={() => { onOpenChange(false); onRejectReasonChange(""); }}>Cancel</Button>
          <Button variant="destructive" onClick={onSubmit} disabled={rejecting || !rejectReason.trim()}>
            {rejecting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Reject Listing"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListingVerificationRejectDialog;