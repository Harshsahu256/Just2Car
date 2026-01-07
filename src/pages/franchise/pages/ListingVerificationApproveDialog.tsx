import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";
import { CarListing } from "../../listing-verification/ListingVerification"; // Import types

interface ListingVerificationApproveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCar: CarListing | null;
  qualityRating: number;
  onQualityRatingChange: (rating: number) => void;
  onSubmit: () => Promise<void>;
  approving: boolean;
}

const ListingVerificationApproveDialog: React.FC<ListingVerificationApproveDialogProps> = ({
  open, onOpenChange, selectedCar, qualityRating, onQualityRatingChange, onSubmit, approving
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Final Approval: Go Live for {selectedCar?.make} {selectedCar?.model}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label className="font-bold" htmlFor="quality-rating-final">Assign Quality Rating (1-10)</Label>
            <Input
              id="quality-rating-final"
              type="number"
              min={1}
              max={10}
              value={qualityRating}
              onChange={e => onQualityRatingChange(parseInt(e.target.value))}
              className="text-lg font-bold"
            />
            <p className="text-xs text-muted-foreground italic">Higher rating helps in faster sales.</p>
          </div>

          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 flex gap-2">
              <CheckCircle2 className="w-5 h-5" />
              This car will be listed on the main marketplace for all customers to see.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} disabled={approving} className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
            {approving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "🚀 Publish Listing Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListingVerificationApproveDialog;