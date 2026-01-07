// src/components/franchise/listing-verification/dialogs/ListingVerificationScheduleDialog.tsx
import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CarListing } from "../../listing-verification/ListingVerification"; // Import types

interface ListingVerificationScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCar: CarListing | null;
  scheduleData: { date: string; time: string };
  onScheduleDataChange: React.Dispatch<React.SetStateAction<{ date: string; time: string }>>;
  onSubmit: () => Promise<void>;
}

const ListingVerificationScheduleDialog: React.FC<ListingVerificationScheduleDialogProps> = ({
  open, onOpenChange, selectedCar, scheduleData, onScheduleDataChange, onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader><DialogTitle>Schedule Inspection for {selectedCar?.make} {selectedCar?.model}</DialogTitle></DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="schedule-date">Date</Label>
            <Input
              id="schedule-date"
              type="date"
              className="w-full"
              onChange={e => onScheduleDataChange({ ...scheduleData, date: e.target.value })}
              value={scheduleData.date}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule-time">Time Slot</Label>
            <Input
              id="schedule-time"
              type="time"
              className="w-full"
              onChange={e => onScheduleDataChange({ ...scheduleData, time: e.target.value })}
              value={scheduleData.time}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} className="w-full">Send Schedule to User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListingVerificationScheduleDialog;