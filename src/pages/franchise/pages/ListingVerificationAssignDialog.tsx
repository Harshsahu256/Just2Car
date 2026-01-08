// src/components/franchise/listing-verification/dialogs/ListingVerificationAssignDialog.tsx
import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CarListing, inspection } from "../../listing-verification/ListingVerification"; // Import types

interface ListingVerificationAssignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCar: CarListing | null;
  inspections: inspection[];
  selectedinspectionId: string;
  oninspectionIdChange: (id: string) => void;
  onSubmit: () => Promise<void>;
}

const ListingVerificationAssignDialog: React.FC<ListingVerificationAssignDialogProps> = ({
  open, onOpenChange, selectedCar, inspections, selectedinspectionId, oninspectionIdChange, onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Select inspection for {selectedCar?.make} {selectedCar?.model}</DialogTitle></DialogHeader>
        <div className="py-4">
          <select
            className="w-full border p-3 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            onChange={e => oninspectionIdChange(e.target.value)}
            value={selectedinspectionId}
          >
            <option value="">-- Choose an inspection --</option>
            {inspections.map(i => (
              <option key={i._id} value={i._id}>{i.fullName} ({i.phone})</option>
            ))}
          </select>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} disabled={!selectedinspectionId} className="w-full bg-purple-600">
            Confirm Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListingVerificationAssignDialog;