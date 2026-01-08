// src/components/franchise/listing-verification/ListingVerificationListingsGrid.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import ListingVerificationCarCard from "./ListingVerificationCarCard";
import { CarListing, TabStatus, statusConfig, inspection } from "../listing-verification/ListingVerification"; // Import types

interface ListingVerificationListingsGridProps {
  loading: boolean;
  error: string | null;
  listings: CarListing[];
  activeTab: TabStatus;
  statusConfig: typeof statusConfig; // Use typeof to correctly type statusConfig
  inspections: inspection[];
  getinspectionName: (id?: string) => string;
  getinspectionPhone: (id?: string) => string;
  formatDate: (d?: string) => string;
  formatPrice: (price?: number) => string;
  onScheduleClick: (car: CarListing) => void;
  onAssignClick: (car: CarListing) => void;
  onViewReportClick: (car: CarListing) => Promise<void>;
  onDetailsClick: (car: CarListing) => void;
  onEditClick: (car: CarListing) => void;
  onRejectClick: (car: CarListing) => void;
  onViewInquiriesClick: (car: CarListing) => Promise<void>;
}

const ListingVerificationListingsGrid: React.FC<ListingVerificationListingsGridProps> = ({
  loading,
  error,
  listings,
  activeTab,
  statusConfig,
  inspections,
  getinspectionName,
  getinspectionPhone,
  formatDate,
  formatPrice,
  onScheduleClick,
  onAssignClick,
  onViewReportClick,
  onDetailsClick,
  onEditClick,
  onRejectClick,
  onViewInquiriesClick,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-80 w-full rounded-xl" />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-destructive border-2 border-dashed rounded-xl bg-red-50">
        <AlertCircle className="w-10 h-10 mx-auto mb-4" />
        <p className="font-medium text-lg">{error}</p>
        <p className="text-sm">Please try refreshing the page.</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl">
        No cars found in this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map(car => (
        <ListingVerificationCarCard
          key={car._id}
          car={car}
          activeTab={activeTab}
          statusConfig={statusConfig}
          inspections={inspections}
          getinspectionName={getinspectionName}
          getinspectionPhone={getinspectionPhone}
          formatDate={formatDate}
          formatPrice={formatPrice}
          onScheduleClick={onScheduleClick}
          onAssignClick={onAssignClick}
          onViewReportClick={onViewReportClick}
          onDetailsClick={onDetailsClick}
          onEditClick={onEditClick}
          onRejectClick={onRejectClick}
          onViewInquiriesClick={onViewInquiriesClick}
        />
      ))}
    </div>
  );
};

export default ListingVerificationListingsGrid;