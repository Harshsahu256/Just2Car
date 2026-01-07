// src/components/franchise/listing-verification/dialogs/ListingVerificationEditDialog.tsx
import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { CarListing } from "../../listing-verification/ListingVerification"; // Import types

interface EditFormState {
  make: string;
  model: string;
  variant: string;
  year: number;
  kmDriven: number;
  expectedPrice: number;
}

interface ListingVerificationEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCar: CarListing | null;
  editForm: EditFormState;
  onEditFormChange: (field: keyof EditFormState, value: string | number) => void;
  onSubmit: () => Promise<void>;
  editing: boolean;
}

const ListingVerificationEditDialog: React.FC<ListingVerificationEditDialogProps> = ({
  open, onOpenChange, selectedCar, editForm, onEditFormChange, onSubmit, editing
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Edit Listing Details for {selectedCar?.make} {selectedCar?.model}</DialogTitle></DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="edit-make">Make</Label>
            <Input id="edit-make" value={editForm.make} onChange={(e) => onEditFormChange("make", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-model">Model</Label>
            <Input id="edit-model" value={editForm.model} onChange={(e) => onEditFormChange("model", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-variant">Variant</Label>
            <Input id="edit-variant" value={editForm.variant} onChange={(e) => onEditFormChange("variant", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-year">Year</Label>
            <Input id="edit-year" type="number" value={editForm.year} onChange={(e) => onEditFormChange("year", parseInt(e.target.value) || 0)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-km">KM Driven</Label>
            <Input id="edit-km" type="number" value={editForm.kmDriven} onChange={(e) => onEditFormChange("kmDriven", parseInt(e.target.value) || 0)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="edit-price">Price (₹)</Label>
            <Input id="edit-price" type="number" value={editForm.expectedPrice} onChange={(e) => onEditFormChange("expectedPrice", parseInt(e.target.value) || 0)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSubmit} disabled={editing}>{editing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListingVerificationEditDialog;