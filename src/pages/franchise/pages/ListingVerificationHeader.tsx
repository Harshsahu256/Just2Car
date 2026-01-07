// src/components/franchise/listing-verification/ListingVerificationHeader.tsx
import React from "react";
import { Button } from "@/components/ui/button";

interface ListingVerificationHeaderProps {
  onRefresh: () => void;
}

const ListingVerificationHeader: React.FC<ListingVerificationHeaderProps> = ({ onRefresh }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Listing & Inspection Management</h1>
      <Button onClick={onRefresh} variant="outline" size="sm">Refresh</Button>
    </div>
  );
};

export default ListingVerificationHeader;