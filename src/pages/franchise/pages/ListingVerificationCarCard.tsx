// // src/components/franchise/listing-verification/ListingVerificationCarCard.tsx
// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Eye, XCircle, Loader2, UserPlus, CalendarDays,
//   Check, ClipboardCheck, User, Phone, FileText,
//   CheckCircle2, Edit3, MessageSquareText // Added Edit3 for edit button, MessageSquareText for inquiries
// } from "lucide-react";
// import { CarListing, TabStatus, statusConfig, Inspector } from "../listing-verification/ListingVerification"; // Import types

// interface ListingVerificationCarCardProps {
//   car: CarListing;
//   activeTab: TabStatus;
//   statusConfig: typeof statusConfig;
//   inspectors: Inspector[]; // Needed for getInspectorName/Phone
//   getInspectorName: (id?: string) => string;
//   getInspectorPhone: (id?: string) => string;
//   formatDate: (d?: string) => string;
//   formatPrice: (price?: number) => string;
//   onScheduleClick: (car: CarListing) => void;
//   onAssignClick: (car: CarListing) => void;
//   onViewReportClick: (car: CarListing) => Promise<void>;
//   onDetailsClick: (car: CarListing) => void;
//   onEditClick: (car: CarListing) => void;
//   onRejectClick: (car: CarListing) => void;
//   onViewInquiriesClick: (car: CarListing) => Promise<void>;
// }

// const ListingVerificationCarCard: React.FC<ListingVerificationCarCardProps> = ({
//   car,
//   activeTab,
//   statusConfig,
//   getInspectorName,
//   getInspectorPhone,
//   formatDate,
//   formatPrice,
//   onScheduleClick,
//   onAssignClick,
//   onViewReportClick,
//   onDetailsClick,
//   onEditClick,
//   onRejectClick,
//   onViewInquiriesClick,
// }) => {
//   return (
//     <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
//       <div className="h-48 relative">
//         <img src={car.images?.[0] || "https://placehold.co/600x400?text=No+Image"} className="w-full h-full object-cover" alt="car" />
//         <Badge className="absolute top-3 right-3 capitalize shadow-md" variant={car.inspectionStatus === 'completed' ? 'secondary' : 'default'}>
//           {car.inspectionStatus}
//         </Badge>
//         <Badge className={`absolute top-1 left-3 capitalize shadow-md ${statusConfig[car.status]?.color || 'bg-gray-200 text-gray-800'}`}>
//           {statusConfig[car.status]?.icon} <span className="ml-1">{statusConfig[car.status]?.label}</span>
//         </Badge>
//       </div>

//       <CardContent className="p-5 space-y-4">
//         <div>
//           <h3 className="font-bold text-xl">{car.make} {car.model} {car.variant}</h3>
//           <p className="text-sm text-muted-foreground font-medium">
//             {car.year} • {car.fuelType} • {car.kmDriven?.toLocaleString()} km
//           </p>
//         </div>

//         {activeTab === "pending_verification" && (car.scheduledDate || car.assignedInspector) && car.inspectionStatus !== 'completed' && (
//           <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-1.5 text-xs text-blue-800">
//             <p className="font-bold flex items-center gap-1.5">
//               <ClipboardCheck className="w-4 h-4" /> Inspection Details
//             </p>
//             {car.scheduledDate && (
//               <p className="flex items-center gap-1 font-medium">
//                 <CalendarDays className="w-3.5 h-3.5" /> {formatDate(car.scheduledDate)} at {car.scheduledTime}
//               </p>
//             )}
//             {car.assignedInspector && (
//               <div className="flex flex-col gap-1">
//                 <p className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {getInspectorName(car.assignedInspector)}</p>
//                 <p className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {getInspectorPhone(car.assignedInspector)}</p>
//               </div>
//             )}
//           </div>
//         )}

//         <div className="space-y-2 pt-2">
//           {activeTab === "pending_verification" && (
//             <>
//               {car.inspectionStatus === "pending" && (
//                 <Button className="w-full" onClick={() => onScheduleClick(car)}>
//                   <CalendarDays className="w-4 h-4 mr-2" /> Schedule Now
//                 </Button>
//               )}
//               {car.inspectionStatus === "user_accepted" && (
//                 <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => onAssignClick(car)}>
//                   <UserPlus className="w-4 h-4 mr-2" /> Assign Inspector
//                 </Button>
//               )}
//               {car.inspectionStatus === "completed" && car.status !== "live" && (
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => onViewReportClick(car)}>
//                   <FileText className="w-4 h-4 mr-2" /> View Report & Make Live
//                 </Button>
//               )}
//               <div className="grid grid-cols-2 gap-2">
//                 <Button variant="outline" size="sm" className="w-full" onClick={() => onDetailsClick(car)}>
//                   <Eye className="w-4 h-4 mr-2" /> Details
//                 </Button>
//                 <Button variant="outline" size="sm" className="w-full" onClick={() => onEditClick(car)}>
//                   <Edit3 className="w-4 h-4 mr-2" /> Edit
//                 </Button>
//               </div>
//               <Button variant="destructive" size="sm" className="w-full" onClick={() => onRejectClick(car)}>
//                 <XCircle className="w-4 h-4 mr-2" /> Reject Listing
//               </Button>
//             </>
//           )}

//           {activeTab === "approved" && (
//             <>
//               {car.inspectionStatus === "completed" && (
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => onViewReportClick(car)}>
//                   <FileText className="w-4 h-4 mr-2" /> View Report & Make Live
//                 </Button>
//               )}
//               <Button variant="outline" size="sm" className="w-full" onClick={() => onDetailsClick(car)}>
//                 <Eye className="w-4 h-4 mr-2" /> View Details
//               </Button>
//             </>
//           )}

//           {activeTab === "live" && (
//             <>
//               {car.inspectionStatus === "completed" && (
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => onViewReportClick(car)}>
//                   <FileText className="w-4 h-4 mr-2" /> View Report
//                 </Button>
//               )}
//               <Button variant="outline" size="sm" className="w-full" onClick={() => onDetailsClick(car)}>
//                 <Eye className="w-4 h-4 mr-2" /> View Details
//               </Button>
//               <Button className="w-full bg-teal-600 hover:bg-teal-700 font-bold mt-2" onClick={() => onViewInquiriesClick(car)}>
//                 <MessageSquareText className="w-4 h-4 mr-2" /> View Inquiries
//               </Button>
//             </>
//           )}

//           {activeTab === "sold" && (
//             <>
//               {car.inspectionStatus === "completed" && (
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => onViewReportClick(car)}>
//                   <FileText className="w-4 h-4 mr-2" /> View Report
//                 </Button>
//               )}
//               <Button variant="outline" size="sm" className="w-full" onClick={() => onDetailsClick(car)}>
//                 <Eye className="w-4 h-4 mr-2" /> View Details
//               </Button>
//             </>
//           )}

//           {activeTab === "rejected" && (
//             <Button variant="outline" size="sm" className="w-full" onClick={() => onDetailsClick(car)}>
//               <Eye className="w-4 h-4 mr-2" /> View Details
//             </Button>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ListingVerificationCarCard;

// src/components/franchise/listing-verification/ListingVerificationCarCard.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye, XCircle, Loader2, UserPlus, CalendarDays,
  ClipboardCheck, User, Phone, FileText,
  CheckCircle2, Edit3, MessageSquareText
} from "lucide-react";
import { CarListing, TabStatus, statusConfig, Inspector } from "../listing-verification/ListingVerification"; // Import types

interface ListingVerificationCarCardProps {
  car: CarListing;
  activeTab: TabStatus;
  statusConfig: typeof statusConfig;
  inspectors: Inspector[]; // Needed for getInspectorName/Phone
  getInspectorName: (id?: string) => string;
  getInspectorPhone: (id?: string) => string;
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

const ListingVerificationCarCard: React.FC<ListingVerificationCarCardProps> = ({
  car,
  activeTab,
  statusConfig,
  getInspectorName,
  getInspectorPhone,
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
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-48 relative">
        <img src={car.images?.[0] || "https://placehold.co/600x400?text=No+Image"} className="w-full h-full object-cover" alt="car" />
        <Badge className="absolute top-3 right-3 capitalize shadow-md" variant={car.inspectionStatus === 'completed' ? 'secondary' : 'default'}>
          {car.inspectionStatus}
        </Badge>
        <Badge className={`absolute top-1 left-3 capitalize shadow-md ${statusConfig[car.status]?.color || 'bg-gray-200 text-gray-800'}`}>
          {statusConfig[car.status]?.icon} <span className="ml-1">{statusConfig[car.status]?.label}</span>
        </Badge>
      </div>

      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-xl">{car.make} {car.model} {car.variant}</h3>
          <p className="text-sm text-muted-foreground font-medium">
            {car.year} • {car.fuelType} • {car.kmDriven?.toLocaleString()} km
          </p>
        </div>

        {activeTab === "pending_verification" && (car.scheduledDate || car.assignedInspector) && car.inspectionStatus !== 'completed' && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-1.5 text-xs text-blue-800">
            <p className="font-bold flex items-center gap-1.5">
              <ClipboardCheck className="w-4 h-4" /> Inspection Details
            </p>
            {car.scheduledDate && (
              <p className="flex items-center gap-1 font-medium">
                <CalendarDays className="w-3.5 h-3.5" /> {formatDate(car.scheduledDate)} at {car.scheduledTime}
              </p>
            )}
            {car.assignedInspector && (
              <div className="flex flex-col gap-1">
                <p className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {getInspectorName(car.assignedInspector)}</p>
                <p className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {getInspectorPhone(car.assignedInspector)}</p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2 pt-2">
          {activeTab === "pending_verification" && (
            <>
              {car.inspectionStatus === "pending" && (
                <Button className="w-full" onClick={() => onScheduleClick(car)}>
                  <CalendarDays className="w-4 h-4 mr-2" /> Schedule Now
                </Button>
              )}
              {car.inspectionStatus === "user_accepted" && (
                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => onAssignClick(car)}>
                  <UserPlus className="w-4 h-4 mr-2" /> Assign Inspector
                </Button>
              )}
              {/* Corrected: Show "View Report & Make Live" only if not live and not sold */}
              {car.inspectionStatus === "completed" && car.status !== "live" && car.status !== "sold" && (
                <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => onViewReportClick(car)}>
                  <FileText className="w-4 h-4 mr-2" /> View Report & Make Live
                </Button>
              )}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full" onClick={() => onDetailsClick(car)}>
                  <Eye className="w-4 h-4 mr-2" /> Details
                </Button>
                <Button variant="outline" size="sm" className="w-full" onClick={() => onEditClick(car)}>
                   <Edit3 className="w-4 h-4 mr-2" /> Edit
                </Button>
              </div>
              <Button variant="destructive" size="sm" className="w-full" onClick={() => onRejectClick(car)}>
                  <XCircle className="w-4 h-4 mr-2" /> Reject Listing
              </Button>
            </>
          )}

          {activeTab === "approved" && (
            <>
              {/* Corrected: Show "View Report & Make Live" only if not live and not sold */}
              {car.inspectionStatus === "completed" && car.status !== "live" && car.status !== "sold" && (
                <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => onViewReportClick(car)}>
                  <FileText className="w-4 h-4 mr-2" /> View Report & Make Live
                </Button>
              )}
              <Button variant="outline" size="sm" className="w-full" onClick={() => onDetailsClick(car)}>
                <Eye className="w-4 h-4 mr-2" /> View Details
              </Button>
            </>
          )}

          {activeTab === "live" && (
            <>
              {car.inspectionStatus === "completed" && (
                <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => onViewReportClick(car)}>
                  <FileText className="w-4 h-4 mr-2" /> View Report
                </Button>
              )}
              <Button variant="outline" size="sm" className="w-full" onClick={() => onDetailsClick(car)}>
                <Eye className="w-4 h-4 mr-2" /> View Details
              </Button>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 font-bold mt-2" onClick={() => onViewInquiriesClick(car)}>
                  <MessageSquareText className="w-4 h-4 mr-2" /> View Inquiries
              </Button>
            </>
          )}

          {activeTab === "sold" && (
            <>
              {car.inspectionStatus === "completed" && (
                <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => onViewReportClick(car)}>
                  <FileText className="w-4 h-4 mr-2" /> View Report
                </Button>
              )}
               <Button variant="outline" size="sm" className="w-full" onClick={() => onDetailsClick(car)}>
                  <Eye className="w-4 h-4 mr-2" /> View Details
                </Button>
            </>
          )}

          {activeTab === "rejected" && (
            <Button variant="outline" size="sm" className="w-full" onClick={() => onDetailsClick(car)}>
               <Eye className="w-4 h-4 mr-2" /> View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingVerificationCarCard;