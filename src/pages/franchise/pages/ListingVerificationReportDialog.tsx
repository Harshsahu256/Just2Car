// src/components/franchise/listing-verification/dialogs/ListingVerificationReportDialog.tsx
import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  XCircle, Loader2, User, FileText, CheckCircle2, AlertCircle, Gauge, CarFront, IndianRupee,
} from "lucide-react";
import { CarListing } from "../../listing-verification/ListingVerification"; // Import types

interface ListingVerificationReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car: CarListing | null; // The initially selected car
  reportData: CarListing | null; // The car data with inspection report details
  reportLoading: boolean;
  formatPrice: (price?: number) => string;
  onApproveGoLive: (car: CarListing, avgScore: number) => void;
}

const ListingVerificationReportDialog: React.FC<ListingVerificationReportDialogProps> = ({
  open, onOpenChange, car, reportData, reportLoading, formatPrice, onApproveGoLive
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-3xl font-bold flex items-center gap-3 text-blue-800">
            <FileText className="w-8 h-8" />
            Inspection Report
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">
            Detailed inspection results for {reportData?.make} {reportData?.model} ({reportData?.year})
          </DialogDescription>
        </DialogHeader>

        {reportLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <p className="text-muted-foreground font-medium">Fetching inspection details...</p>
            <Skeleton className="h-48 w-3/4" />
          </div>
        ) : reportData ? (
          <div className="space-y-8 py-6 px-6">
            {/* Car & Seller Overview */}
            <div className="grid md:grid-cols-2 gap-6 bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
              <div className="space-y-2">
                <h4 className="font-bold text-lg text-blue-800 flex items-center gap-2"><CarFront className="w-5 h-5" /> Vehicle Overview</h4>
                <p className="text-sm text-slate-700"><b>Make:</b> {reportData.make}</p>
                <p className="text-sm text-slate-700"><b>Model:</b> {reportData.model}</p>
                <p className="text-sm text-slate-700"><b>Variant:</b> {reportData.variant || 'N/A'}</p>
                <p className="text-sm text-slate-700"><b>Year:</b> {reportData.year}</p>
                <p className="text-sm text-slate-700"><b>Kms Driven:</b> {reportData.kmDriven?.toLocaleString()} km</p>
                <p className="text-sm text-slate-700"><b>Expected Price:</b> {formatPrice(reportData.expectedPrice)} {reportData.negotiable ? "(Negotiable)" : "(Fixed)"}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-lg text-blue-800 flex items-center gap-2"><User className="w-5 h-5" /> Seller Information</h4>
                <p className="text-sm text-slate-700"><b>Name:</b> {reportData.sellerName}</p>
                <p className="text-sm text-slate-700"><b>Mobile:</b> {reportData.sellerMobile}</p>
                {reportData.sellerEmail && <p className="text-sm text-slate-700"><b>Email:</b> {reportData.sellerEmail}</p>}
                <p className="text-sm text-slate-700"><b>Location:</b> {reportData.city}, {reportData.pincode}</p>
                {reportData.listedBy && (
                  <div className="text-xs text-slate-600 border-t border-blue-100 pt-2 mt-2">
                    <p><b>Listed By:</b> {reportData.listedBy.email} (ID: {reportData.listedBy._id.slice(-6)})</p>
                  </div>
                )}
              </div>
            </div>

            {/* Health Scores Section */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-slate-800 border-b pb-2 mb-4 flex items-center gap-2"><Gauge className="w-5 h-5 text-purple-600" /> Health Scores</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Exterior", score: reportData.inspectionReport?.exteriorScore },
                  { label: "Interior", score: reportData.inspectionReport?.interiorScore },
                  { label: "Engine", score: reportData.inspectionReport?.engineMechanicalScore },
                  { label: "Tyres/Brakes", score: reportData.inspectionReport?.tyresBrakesScore },
                ].map((item) => (
                  <div key={item.label} className="bg-white border-2 border-purple-100 rounded-xl p-4 text-center shadow-sm">
                    <p className="text-xs font-bold uppercase text-purple-500 mb-2">{item.label}</p>
                    <p className="text-3xl font-black text-purple-600">{item.score !== undefined ? item.score : 'N/A'}<span className="text-sm text-slate-400">/10</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Checklist */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-slate-800 border-b pb-2 mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-600" /> Technical Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Odometer Reading: <b>{reportData.inspectionReport?.odometerReading?.toLocaleString() || 'N/A'} km</b></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Tyre Condition: <b>{reportData.inspectionReport?.tyreCondition || 'N/A'}</b></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span>Accident History: <b>{reportData.inspectionReport?.accidentHistory || 'N/A'}</b></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>VIN Chassis Verified: <b>{reportData.inspectionReport?.vinChassisVerified ? "Yes" : "No"}</b></span>
                </div>
              </div>
              {reportData.inspectionReport?.minorIssues && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-900 shadow-sm">
                  <p className="text-sm font-bold flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Inspector's Remarks:</p>
                  <p className="text-sm mt-1 italic">"{reportData.inspectionReport.minorIssues}"</p>
                </div>
              )}
            </div>

            {/* Inspection Photos */}
            {reportData.inspectionReport?.photos?.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-xl text-slate-800 border-b pb-2 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-gray-600" /> Inspection Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {reportData.inspectionReport.photos.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Inspection Photo ${i + 1}`}
                      className="rounded-lg border object-cover h-36 w-full shadow-sm hover:shadow-md transition-shadow"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">Report data not found.</div>
        )}
        <DialogFooter className="p-6 pt-0 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">Close</Button>
          {reportData && reportData.status !== "live" && reportData.status !== "sold" && (
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
              onClick={() => {
                const avgScore = (
                  (reportData.inspectionReport?.exteriorScore || 0) +
                  (reportData.inspectionReport?.interiorScore || 0) +
                  (reportData.inspectionReport?.engineMechanicalScore || 0) +
                  (reportData.inspectionReport?.tyresBrakesScore || 0)
                ) / 4;
                onApproveGoLive(reportData, avgScore);
              }}>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Approve & Go Live
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListingVerificationReportDialog;