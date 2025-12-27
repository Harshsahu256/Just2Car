// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   MapPin,
//   Fuel,
//   User,
//   Phone,
//   FileText,
//   Video,
//   ImageIcon,
//   Gauge,
//   Users,
//   Palette,
//   Hash,
//   IndianRupee,
//   XCircle,
//   Loader2,
// } from "lucide-react";

// // Helper
// const formatPrice = (price: number) => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(price);
// };

// export const DetailsDialog = ({ open, onOpenChange, car }: any) => {
//   if (!car) return null;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="glass-card border border-border/50 max-w-3xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">
//             {car.make} {car.model} {car.variant}
//           </DialogTitle>
//           <DialogDescription>
//             {car.year} • {car.kmDriven?.toLocaleString()} km driven
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-6 py-4">
//           {/* Image Gallery */}
//           {car.images && car.images.length > 0 && (
//             <div className="space-y-3">
//               <h4 className="font-semibold text-foreground flex items-center gap-2">
//                 <ImageIcon className="w-4 h-4" />
//                 Photos ({car.images.length})
//               </h4>
//               <div className="grid grid-cols-3 gap-3">
//                 {car.images.map((img: string, i: number) => (
//                   <img
//                     key={i}
//                     src={img}
//                     alt={`Car image ${i + 1}`}
//                     className="w-full h-24 object-cover rounded-lg border border-border/50"
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Seller Info */}
//           <div className="glass p-4 rounded-xl space-y-3">
//             <h4 className="font-semibold text-foreground">Seller Information</h4>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <User className="w-4 h-4" />
//                 <span>{car.sellerName}</span>
//               </div>
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <Phone className="w-4 h-4" />
//                 <span>{car.sellerMobile}</span>
//               </div>
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <MapPin className="w-4 h-4" />
//                 <span>{car.city}, {car.pincode}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Badge variant="outline" className="capitalize">
//                   {car.sellerType}
//                 </Badge>
//                 <Badge variant="outline" className="capitalize">
//                   {car.listingType}
//                 </Badge>
//               </div>
//             </div>
//           </div>

//           {/* Car Specifications */}
//           <div className="glass p-4 rounded-xl space-y-3">
//             <h4 className="font-semibold text-foreground">Car Specifications</h4>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <Fuel className="w-4 h-4" />
//                 <span>Fuel: {car.fuelType}</span>
//               </div>
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <Gauge className="w-4 h-4" />
//                 <span>Transmission: {car.transmission}</span>
//               </div>
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <Users className="w-4 h-4" />
//                 <span>Owners: {car.noOfOwners}</span>
//               </div>
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <Palette className="w-4 h-4" />
//                 <span>Color: {car.color}</span>
//               </div>
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <Hash className="w-4 h-4" />
//                 <span>Reg: {car.registrationNumber}</span>
//               </div>
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <MapPin className="w-4 h-4" />
//                 <span>Reg City: {car.registrationCity}</span>
//               </div>
//             </div>
//           </div>

//           {/* Price */}
//           <div className="glass p-4 rounded-xl space-y-2">
//             <h4 className="font-semibold text-foreground">Pricing</h4>
//             <div className="flex items-center gap-3">
//               <IndianRupee className="w-5 h-5 text-primary" />
//               <span className="text-2xl font-bold text-primary">
//                 {formatPrice(car.expectedPrice)}
//               </span>
//               {car.negotiable && <Badge variant="secondary">Negotiable</Badge>}
//             </div>
//           </div>

//           {/* Description */}
//           {car.description && (
//             <div className="space-y-2">
//               <h4 className="font-semibold text-foreground">Description</h4>
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 {car.description}
//               </p>
//             </div>
//           )}

//           {/* Documents */}
//           {car.documents && car.documents.length > 0 && (
//             <div className="space-y-3">
//               <h4 className="font-semibold text-foreground flex items-center gap-2">
//                 <FileText className="w-4 h-4" />
//                 Documents ({car.documents.length})
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {car.documents.map((doc: string, i: number) => (
//                   <a
//                     key={i}
//                     href={doc}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm"
//                   >
//                     <FileText className="w-4 h-4" />
//                     Document {i + 1}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Inspection Video */}
//           {car.inspectionVideo && (
//             <div className="space-y-3">
//               <h4 className="font-semibold text-foreground flex items-center gap-2">
//                 <Video className="w-4 h-4" />
//                 Inspection Video
//               </h4>
//               <video
//                 src={car.inspectionVideo}
//                 controls
//                 className="w-full rounded-xl border border-border/50"
//               />
//             </div>
//           )}
//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Close
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export const RejectDialog = ({
//   open,
//   onOpenChange,
//   car,
//   reason,
//   setReason,
//   onConfirm,
//   loading,
// }: any) => {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="glass-card border border-border/50">
//         <DialogHeader>
//           <DialogTitle className="text-destructive flex items-center gap-2">
//             <XCircle className="w-5 h-5" />
//             Reject Listing
//           </DialogTitle>
//           <DialogDescription>
//             {car && (
//               <>
//                 Are you sure you want to reject{" "}
//                 <strong>
//                   {car.make} {car.model}
//                 </strong>
//                 ?
//               </>
//             )}
//           </DialogDescription>
//         </DialogHeader>

//         <div className="py-4">
//           <Textarea
//             placeholder="Enter rejection reason (required)..."
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary/50"
//           />
//         </div>

//         <DialogFooter className="gap-3">
//           <Button
//             variant="outline"
//             onClick={() => onOpenChange(false)}
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="destructive"
//             onClick={onConfirm}
//             disabled={loading || !reason.trim()}
//             className="gap-2"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Rejecting...
//               </>
//             ) : (
//               <>
//                 <XCircle className="w-4 h-4" />
//                 Reject Listing
//               </>
//             )}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Fuel,
  User,
  Phone,
  FileText,
  Video,
  ImageIcon,
  Gauge,
  Users,
  Palette,
  Hash,
  IndianRupee,
  XCircle,
  Loader2,
  X,
  Settings2,
  Calendar,
} from "lucide-react";

// Helper
const formatPrice = (price: number) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString()}`;
};

export const DetailsDialog = ({ open, onOpenChange, car }: any) => {
  if (!car) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 rounded-2xl overflow-hidden border-none flex flex-col max-h-[90vh] shadow-2xl bg-white">
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#1a1f2c]">
                {car.make} {car.model}
              </h2>
              <p className="text-gray-500 font-medium">
                {car.variant} • {car.year}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-gray-400 hover:bg-gray-100"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Image Gallery */}
          {car.images && car.images.length > 0 ? (
            <div className="space-y-3">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                 {/* Main large image */}
                 <div className="md:col-span-2 h-64 rounded-2xl overflow-hidden">
                    <img 
                      src={car.images[0]} 
                      alt="Main Car" 
                      className="w-full h-full object-cover"
                    />
                 </div>
                 {/* Thumbnails (show up to 2 more) */}
                 {car.images.slice(1, 3).map((img: string, i: number) => (
                    <div key={i} className="h-32 rounded-xl overflow-hidden">
                       <img src={img} alt={`Car ${i}`} className="w-full h-full object-cover" />
                    </div>
                 ))}
               </div>
               <p className="text-xs text-gray-400 flex items-center gap-1">
                 <ImageIcon className="w-3 h-3" /> Total {car.images.length} Photos
               </p>
            </div>
          ) : (
            <div className="h-48 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
               <ImageIcon className="w-10 h-10" />
            </div>
          )}

          {/* Price & Status */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-[#0052cc]">
                {formatPrice(car.expectedPrice)}
              </span>
              {car.negotiable && (
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded">
                  Negotiable
                </span>
              )}
            </div>
            <Badge className="bg-green-50 text-green-600 hover:bg-green-50 border-none rounded-full px-4 py-1 text-xs font-bold uppercase">
              {car.status === 'pending_verification' ? 'Pending' : car.status}
            </Badge>
          </div>

          {/* Icon Grid Style (Specs) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
            {[
              { label: "KM Driven", value: `${car.kmDriven?.toLocaleString()} km`, icon: <Gauge className="w-4 h-4"/> },
              { label: "Fuel Type", value: car.fuelType, icon: <Fuel className="w-4 h-4"/> },
              { label: "Transmission", value: car.transmission, icon: <Settings2 className="w-4 h-4"/> },
              { label: "Owners", value: `${car.noOfOwners || 1}st Owner`, icon: <Users className="w-4 h-4"/> },
              { label: "Color", value: car.color, icon: <Palette className="w-4 h-4"/> },
              { label: "Listed On", value: car.createdAt ? new Date(car.createdAt).toLocaleDateString('en-GB') : "N/A", icon: <Calendar className="w-4 h-4"/> },
              { label: "Registration", value: car.registrationNumber, icon: <Hash className="w-4 h-4"/> },
              { label: "Location", value: `${car.city}, ${car.registrationCity}`, icon: <MapPin className="w-4 h-4"/> },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                   {item.icon}
                   <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </div>
                <p className="font-bold text-base text-[#1a1f2c]">{item.value || "N/A"}</p>
              </div>
            ))}
          </div>

          {/* Seller Info (Styled as a Card) */}
          <div className="bg-[#f8f9fb] p-5 rounded-xl border border-gray-100 space-y-3">
            <h4 className="font-bold text-[#1a1f2c] flex items-center gap-2">
              <User className="w-4 h-4 text-[#0052cc]" /> Seller Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                 <p className="text-xs text-gray-400 font-bold uppercase">Name</p>
                 <p className="font-medium text-[#1a1f2c]">{car.sellerName}</p>
              </div>
              <div className="space-y-1">
                 <p className="text-xs text-gray-400 font-bold uppercase">Contact</p>
                 <p className="font-medium text-[#1a1f2c]">{car.sellerMobile}</p>
              </div>
              <div className="space-y-1">
                 <p className="text-xs text-gray-400 font-bold uppercase">Type</p>
                 <div className="flex gap-2">
                    <Badge variant="outline" className="capitalize bg-white text-gray-600">{car.sellerType}</Badge>
                    <Badge variant="outline" className="capitalize bg-white text-gray-600">{car.listingType}</Badge>
                 </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {car.description && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#1a1f2c]">Description</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                {car.description}
              </p>
            </div>
          )}

          {/* Documents & Video Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Documents */}
            {car.documents && car.documents.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#1a1f2c] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0052cc]" /> Documents
                </h4>
                <div className="flex flex-wrap gap-2">
                  {car.documents.map((doc: string, i: number) => (
                    <a
                      key={i}
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-[#0052cc] transition-colors text-xs font-bold"
                    >
                      View Doc {i + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {car.inspectionVideo && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#1a1f2c] flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#0052cc]" /> Inspection Video
                </h4>
                <video
                  src={car.inspectionVideo}
                  controls
                  className="w-full rounded-xl border border-gray-100 shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-gray-50/50 border-t flex justify-end px-8 shrink-0">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="rounded-lg h-10 px-6 font-bold border-gray-200 text-gray-600 hover:text-[#1a1f2c]"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// --- REJECT DIALOG (Matched Style) ---
export const RejectDialog = ({
  open,
  onOpenChange,
  car,
  reason,
  setReason,
  onConfirm,
  loading,
}: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 rounded-2xl overflow-hidden border-none shadow-2xl bg-white">
        <div className="p-6 pb-0">
          <div className="flex items-center gap-3 text-red-600 mb-2">
             <div className="p-2 bg-red-50 rounded-full">
                <XCircle className="w-6 h-6" />
             </div>
             <h2 className="text-lg font-bold">Reject Listing</h2>
          </div>
          <DialogDescription className="text-gray-500 font-medium ml-1">
            {car && (
              <>
                Are you sure you want to reject <span className="text-[#1a1f2c] font-bold">{car.make} {car.model}</span>?
                This action will notify the dealer.
              </>
            )}
          </DialogDescription>
        </div>

        <div className="p-6 pt-4">
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Reason for Rejection</label>
          <Textarea
            placeholder="E.g. Price is too high, Images are blurry..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[120px] bg-gray-50 border-gray-200 focus:border-red-300 focus:ring-red-100 rounded-xl resize-none font-medium text-[#1a1f2c]"
          />
        </div>

        <div className="p-5 bg-gray-50/50 border-t flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="font-bold text-gray-500 hover:text-[#1a1f2c]"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading || !reason.trim()}
            className="gap-2 rounded-lg font-bold bg-red-600 hover:bg-red-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Rejecting...
              </>
            ) : (
              <>
                Confirm Rejection
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};