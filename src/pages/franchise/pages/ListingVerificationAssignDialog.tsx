// src/components/franchise/listing-verification/dialogs/ListingVerificationAssignDialog.tsx
import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CarListing, Inspector } from "../../listing-verification/ListingVerification"; // Import types

interface ListingVerificationAssignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCar: CarListing | null;
  inspectors: Inspector[];
  selectedInspectorId: string;
  onInspectorIdChange: (id: string) => void;
  onSubmit: () => Promise<void>;
}

const ListingVerificationAssignDialog: React.FC<ListingVerificationAssignDialogProps> = ({
  open, onOpenChange, selectedCar, inspectors, selectedInspectorId, onInspectorIdChange, onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Select Inspector for {selectedCar?.make} {selectedCar?.model}</DialogTitle></DialogHeader>
        <div className="py-4">
          <select
            className="w-full border p-3 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            onChange={e => onInspectorIdChange(e.target.value)}
            value={selectedInspectorId}
          >
            <option value="">-- Choose an Inspector --</option>
            {inspectors.map(i => (
              <option key={i._id} value={i._id}>{i.fullName} ({i.phone})</option>
            ))}
          </select>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} disabled={!selectedInspectorId} className="w-full bg-purple-600">
            Confirm Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListingVerificationAssignDialog;