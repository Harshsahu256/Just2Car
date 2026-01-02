// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Car } from "lucide-react";

// const ListingVerification = () => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Listing Verification</h1>
//         <p className="text-muted-foreground mt-1">Verify and approve car listings</p>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Car className="h-5 w-5" />
//             Pending Verifications
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground">Listing verification interface coming soon</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ListingVerification;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Car,
//   MapPin,
//   Fuel,
//   Calendar,
//   User,
//   Phone,
//   FileText,
//   Video,
//   X,
//   Eye,
//   XCircle,
//   ImageIcon,
//   AlertCircle,
//   RefreshCw,
//   Gauge,
//   Users,
//   Palette,
//   Hash,
//   IndianRupee,
//   Clock,
//   CheckCircle2,
//   Ban,
//   ShoppingCart,
//   Loader2,
// } from "lucide-react";

// const API_BASE = "https://your-api-base.com";

// interface CarListing {
//   _id: string;
//   sellerName: string;
//   sellerMobile: string;
//   city: string;
//   pincode: string;
//   make: string;
//   model: string;
//   variant: string;
//   year: number;
//   kmDriven: number;
//   fuelType: string;
//   transmission: string;
//   registrationCity: string;
//   registrationNumber: string;
//   noOfOwners: number;
//   color: string;
//   expectedPrice: number;
//   negotiable: boolean;
//   description: string;
//   images: string[];
//   documents: string[];
//   inspectionVideo?: string;
//   sellerType: "franchise" | "individual";
//   listingType: "self" | "assisted";
//   status: "pending_verification" | "approved" | "live" | "sold" | "rejected";
//   qualityRating?: number;
//   createdAt: string;
// }

// type TabStatus = "pending_verification" | "approved" | "live" | "sold" | "rejected";

// const statusConfig: Record<TabStatus, { label: string; color: string; icon: React.ReactNode }> = {
//   pending_verification: { label: "Pending", color: "bg-warning/20 text-warning border-warning/30", icon: <Clock className="w-3 h-3" /> },
//   approved: { label: "Approved", color: "bg-primary/20 text-primary border-primary/30", icon: <CheckCircle2 className="w-3 h-3" /> },
//   live: { label: "Live", color: "bg-success/20 text-success border-success/30", icon: <CheckCircle2 className="w-3 h-3" /> },
//   sold: { label: "Sold", color: "bg-success/20 text-success border-success/30", icon: <ShoppingCart className="w-3 h-3" /> },
//   rejected: { label: "Rejected", color: "bg-destructive/20 text-destructive border-destructive/30", icon: <Ban className="w-3 h-3" /> },
// };

// const ListingVerification = () => {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState<TabStatus>("pending_verification");
//   const [listings, setListings] = useState<CarListing[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
//   const [detailsOpen, setDetailsOpen] = useState(false);

//   const [rejectCar, setRejectCar] = useState<CarListing | null>(null);
//   const [rejectOpen, setRejectOpen] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [rejecting, setRejecting] = useState(false);

//   const fetchListings = async (status: TabStatus) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.get(`${API_BASE}/franchise-car-listings`, {
//         params: { status },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setListings(response.data.data || []);
//     } catch (err) {
//       setError("Failed to fetch listings. Please try again.");
//       setListings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListings(activeTab);
//   }, [activeTab]);

//   const handleTabChange = (value: string) => {
//     setActiveTab(value as TabStatus);
//   };

//   const openDetails = (car: CarListing) => {
//     setSelectedCar(car);
//     setDetailsOpen(true);
//   };

//   const openReject = (car: CarListing) => {
//     setRejectCar(car);
//     setRejectReason("");
//     setRejectOpen(true);
//   };

//   const handleReject = async () => {
//     if (!rejectCar || !rejectReason.trim()) {
//       toast({
//         title: "Rejection reason required",
//         description: "Please provide a reason for rejection.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setRejecting(true);
//     try {
//       const token = localStorage.getItem("authToken");
//       await axios.put(
//         `${API_BASE}/listings/reject/${rejectCar._id}`,
//         { reason: rejectReason },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast({
//         title: "Listing Rejected",
//         description: `${rejectCar.make} ${rejectCar.model} has been rejected.`,
//       });

//       setRejectOpen(false);
//       setRejectCar(null);
//       setRejectReason("");
//       fetchListings(activeTab);
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to reject listing. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setRejecting(false);
//     }
//   };

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="animate-fade-in">
//           <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
//             Listing Verification
//           </h1>
//           <p className="text-muted-foreground mt-2">
//             Verify and manage car listings
//           </p>
//         </div>

//         {/* Tabs */}
//         <Tabs value={activeTab} onValueChange={handleTabChange} className="animate-slide-up">
//           <TabsList className="glass-card border border-border/50 p-1 h-auto flex-wrap gap-1">
//             <TabsTrigger
//               value="pending_verification"
//               className="data-[state=active]:bg-warning/20 data-[state=active]:text-warning rounded-lg px-4 py-2 transition-all"
//             >
//               <Clock className="w-4 h-4 mr-2" />
//               Pending
//             </TabsTrigger>
//             <TabsTrigger
//               value="approved"
//               className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg px-4 py-2 transition-all"
//             >
//               <CheckCircle2 className="w-4 h-4 mr-2" />
//               Approved
//             </TabsTrigger>
//             <TabsTrigger
//               value="live"
//               className="data-[state=active]:bg-success/20 data-[state=active]:text-success rounded-lg px-4 py-2 transition-all"
//             >
//               <CheckCircle2 className="w-4 h-4 mr-2" />
//               Live
//             </TabsTrigger>
//             <TabsTrigger
//               value="sold"
//               className="data-[state=active]:bg-success/20 data-[state=active]:text-success rounded-lg px-4 py-2 transition-all"
//             >
//               <ShoppingCart className="w-4 h-4 mr-2" />
//               Sold
//             </TabsTrigger>
//             <TabsTrigger
//               value="rejected"
//               className="data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive rounded-lg px-4 py-2 transition-all"
//             >
//               <Ban className="w-4 h-4 mr-2" />
//               Rejected
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value={activeTab} className="mt-6">
//             {/* Loading State */}
//             {loading && (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(6)].map((_, i) => (
//                   <Card key={i} className="glass-card border border-border/50 overflow-hidden">
//                     <Skeleton className="h-48 w-full" />
//                     <CardContent className="p-4 space-y-3">
//                       <Skeleton className="h-6 w-3/4" />
//                       <Skeleton className="h-5 w-1/2" />
//                       <Skeleton className="h-4 w-full" />
//                       <div className="flex gap-2">
//                         <Skeleton className="h-6 w-16" />
//                         <Skeleton className="h-6 w-16" />
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}

//             {/* Error State */}
//             {error && !loading && (
//               <Card className="glass-card border border-destructive/30 p-8">
//                 <div className="flex flex-col items-center justify-center text-center space-y-4">
//                   <div className="p-4 rounded-full bg-destructive/10">
//                     <AlertCircle className="w-8 h-8 text-destructive" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-foreground">Something went wrong</h3>
//                     <p className="text-muted-foreground mt-1">{error}</p>
//                   </div>
//                   <Button
//                     onClick={() => fetchListings(activeTab)}
//                     variant="outline"
//                     className="gap-2"
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                     Try Again
//                   </Button>
//                 </div>
//               </Card>
//             )}

//             {/* Empty State */}
//             {!loading && !error && listings.length === 0 && (
//               <Card className="glass-card border border-border/50 p-12">
//                 <div className="flex flex-col items-center justify-center text-center space-y-4">
//                   <div className="p-6 rounded-full bg-muted/50">
//                     <Car className="w-12 h-12 text-muted-foreground" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-foreground">No listings found</h3>
//                     <p className="text-muted-foreground mt-2">
//                       There are no {statusConfig[activeTab].label.toLowerCase()} listings at the moment.
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             )}

//             {/* Listings Grid */}
//             {!loading && !error && listings.length > 0 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {listings.map((car, index) => (
//                   <Card
//                     key={car._id}
//                     className="glass-card border border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-scale-in"
//                     style={{ animationDelay: `${index * 50}ms` }}
//                   >
//                     {/* Image */}
//                     <div className="relative h-48 overflow-hidden bg-muted/30">
//                       {car.images && car.images.length > 0 ? (
//                         <img
//                           src={car.images[0]}
//                           alt={`${car.make} ${car.model}`}
//                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
//                         </div>
//                       )}
//                       <Badge
//                         className={`absolute top-3 right-3 ${statusConfig[car.status].color} border backdrop-blur-sm`}
//                       >
//                         {statusConfig[car.status].icon}
//                         <span className="ml-1">{statusConfig[car.status].label}</span>
//                       </Badge>
//                     </div>

//                     <CardContent className="p-4 space-y-4">
//                       {/* Title & Price */}
//                       <div>
//                         <h3 className="text-lg font-semibold text-foreground truncate">
//                           {car.make} {car.model} {car.variant}
//                         </h3>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-xl font-bold text-primary">
//                             {formatPrice(car.expectedPrice)}
//                           </span>
//                           {car.negotiable && (
//                             <Badge variant="secondary" className="text-xs">
//                               Negotiable
//                             </Badge>
//                           )}
//                         </div>
//                       </div>

//                       {/* Details */}
//                       <div className="space-y-2 text-sm text-muted-foreground">
//                         <div className="flex items-center gap-2">
//                           <MapPin className="w-4 h-4" />
//                           <span>{car.city}, {car.pincode}</span>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <div className="flex items-center gap-1">
//                             <Fuel className="w-4 h-4" />
//                             <span>{car.fuelType}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Gauge className="w-4 h-4" />
//                             <span>{car.transmission}</span>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4" />
//                           <span>{car.year} • {car.kmDriven?.toLocaleString()} km</span>
//                         </div>
//                       </div>

//                       {/* Badges */}
//                       <div className="flex flex-wrap gap-2">
//                         <Badge variant="outline" className="text-xs capitalize">
//                           {car.sellerType}
//                         </Badge>
//                         <Badge variant="outline" className="text-xs capitalize">
//                           {car.listingType}
//                         </Badge>
//                       </div>

//                       {/* Date */}
//                       <div className="text-xs text-muted-foreground flex items-center gap-1">
//                         <Clock className="w-3 h-3" />
//                         Listed on {formatDate(car.createdAt)}
//                       </div>

//                       {/* Actions - Only for Pending */}
//                       {activeTab === "pending_verification" && (
//                         <div className="flex gap-3 pt-2">
//                           <Button
//                             onClick={() => openDetails(car)}
//                             className="flex-1 gap-2"
//                             variant="outline"
//                           >
//                             <Eye className="w-4 h-4" />
//                             View Details
//                           </Button>
//                           <Button
//                             onClick={() => openReject(car)}
//                             variant="destructive"
//                             className="gap-2"
//                           >
//                             <XCircle className="w-4 h-4" />
//                             Reject
//                           </Button>
//                         </div>
//                       )}

//                       {/* View Details for other tabs */}
//                       {activeTab !== "pending_verification" && (
//                         <Button
//                           onClick={() => openDetails(car)}
//                           className="w-full gap-2"
//                           variant="outline"
//                         >
//                           <Eye className="w-4 h-4" />
//                           View Details
//                         </Button>
//                       )}
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Details Dialog */}
//       <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
//         <DialogContent className="glass-card border border-border/50 max-w-3xl max-h-[90vh] overflow-y-auto">
//           {selectedCar && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="text-2xl font-bold">
//                   {selectedCar.make} {selectedCar.model} {selectedCar.variant}
//                 </DialogTitle>
//                 <DialogDescription>
//                   {selectedCar.year} • {selectedCar.kmDriven?.toLocaleString()} km driven
//                 </DialogDescription>
//               </DialogHeader>

//               <div className="space-y-6 py-4">
//                 {/* Image Gallery */}
//                 {selectedCar.images && selectedCar.images.length > 0 && (
//                   <div className="space-y-3">
//                     <h4 className="font-semibold text-foreground flex items-center gap-2">
//                       <ImageIcon className="w-4 h-4" />
//                       Photos ({selectedCar.images.length})
//                     </h4>
//                     <div className="grid grid-cols-3 gap-3">
//                       {selectedCar.images.map((img, i) => (
//                         <img
//                           key={i}
//                           src={img}
//                           alt={`Car image ${i + 1}`}
//                           className="w-full h-24 object-cover rounded-lg border border-border/50"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Seller Info */}
//                 <div className="glass p-4 rounded-xl space-y-3">
//                   <h4 className="font-semibold text-foreground">Seller Information</h4>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <User className="w-4 h-4" />
//                       <span>{selectedCar.sellerName}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Phone className="w-4 h-4" />
//                       <span>{selectedCar.sellerMobile}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <MapPin className="w-4 h-4" />
//                       <span>{selectedCar.city}, {selectedCar.pincode}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Badge variant="outline" className="capitalize">
//                         {selectedCar.sellerType}
//                       </Badge>
//                       <Badge variant="outline" className="capitalize">
//                         {selectedCar.listingType}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Car Specifications */}
//                 <div className="glass p-4 rounded-xl space-y-3">
//                   <h4 className="font-semibold text-foreground">Car Specifications</h4>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Fuel className="w-4 h-4" />
//                       <span>Fuel: {selectedCar.fuelType}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Gauge className="w-4 h-4" />
//                       <span>Transmission: {selectedCar.transmission}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Users className="w-4 h-4" />
//                       <span>Owners: {selectedCar.noOfOwners}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Palette className="w-4 h-4" />
//                       <span>Color: {selectedCar.color}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Hash className="w-4 h-4" />
//                       <span>Reg: {selectedCar.registrationNumber}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <MapPin className="w-4 h-4" />
//                       <span>Reg City: {selectedCar.registrationCity}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="glass p-4 rounded-xl space-y-2">
//                   <h4 className="font-semibold text-foreground">Pricing</h4>
//                   <div className="flex items-center gap-3">
//                     <IndianRupee className="w-5 h-5 text-primary" />
//                     <span className="text-2xl font-bold text-primary">
//                       {formatPrice(selectedCar.expectedPrice)}
//                     </span>
//                     {selectedCar.negotiable && (
//                       <Badge variant="secondary">Negotiable</Badge>
//                     )}
//                   </div>
//                 </div>

//                 {/* Description */}
//                 {selectedCar.description && (
//                   <div className="space-y-2">
//                     <h4 className="font-semibold text-foreground">Description</h4>
//                     <p className="text-sm text-muted-foreground leading-relaxed">
//                       {selectedCar.description}
//                     </p>
//                   </div>
//                 )}

//                 {/* Documents */}
//                 {selectedCar.documents && selectedCar.documents.length > 0 && (
//                   <div className="space-y-3">
//                     <h4 className="font-semibold text-foreground flex items-center gap-2">
//                       <FileText className="w-4 h-4" />
//                       Documents ({selectedCar.documents.length})
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedCar.documents.map((doc, i) => (
//                         <a
//                           key={i}
//                           href={doc}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm"
//                         >
//                           <FileText className="w-4 h-4" />
//                           Document {i + 1}
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Inspection Video */}
//                 {selectedCar.inspectionVideo && (
//                   <div className="space-y-3">
//                     <h4 className="font-semibold text-foreground flex items-center gap-2">
//                       <Video className="w-4 h-4" />
//                       Inspection Video
//                     </h4>
//                     <video
//                       src={selectedCar.inspectionVideo}
//                       controls
//                       className="w-full rounded-xl border border-border/50"
//                     />
//                   </div>
//                 )}
//               </div>

//               <DialogFooter>
//                 <Button variant="outline" onClick={() => setDetailsOpen(false)}>
//                   Close
//                 </Button>
//               </DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Reject Dialog */}
//       <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
//         <DialogContent className="glass-card border border-border/50">
//           <DialogHeader>
//             <DialogTitle className="text-destructive flex items-center gap-2">
//               <XCircle className="w-5 h-5" />
//               Reject Listing
//             </DialogTitle>
//             <DialogDescription>
//               {rejectCar && (
//                 <>
//                   Are you sure you want to reject <strong>{rejectCar.make} {rejectCar.model}</strong>?
//                 </>
//               )}
//             </DialogDescription>
//           </DialogHeader>

//           <div className="py-4">
//             <Textarea
//               placeholder="Enter rejection reason (required)..."
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//               className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary/50"
//             />
//           </div>

//           <DialogFooter className="gap-3">
//             <Button
//               variant="outline"
//               onClick={() => setRejectOpen(false)}
//               disabled={rejecting}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleReject}
//               disabled={rejecting || !rejectReason.trim()}
//               className="gap-2"
//             >
//               {rejecting ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Rejecting...
//                 </>
//               ) : (
//                 <>
//                   <XCircle className="w-4 h-4" />
//                   Reject Listing
//                 </>
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ListingVerification;


// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Car,
//   MapPin,
//   Fuel,
//   Calendar,
//   User,
//   Phone,
//   FileText,
//   Video,
//   X,
//   Eye,
//   XCircle,
//   ImageIcon,
//   AlertCircle,
//   RefreshCw,
//   Gauge,
//   Users,
//   Palette,
//   Hash,
//   IndianRupee,
//   Clock,
//   CheckCircle2,
//   Ban,
//   ShoppingCart,
//   Loader2,
// } from "lucide-react";

// // --- API Service Imports ---
// import { getFranchiseCarListings, rejectCarListing } from "@/services/franchiseService"; // Assuming these are in your franchiseService.js
// // You might also need a way to get the auth token, assuming it's in a utility or context
// import { getAuthToken } from "@/utils/auth"; // Placeholder, adjust path as needed


// interface CarListing {
//   _id: string;
//   sellerName: string;
//   sellerMobile: string;
//   city: string;
//   pincode: string;
//   make: string;
//   model: string;
//   variant: string;
//   year: number;
//   kmDriven: number;
//   fuelType: string;
//   rejectionReason?: string;
//   transmission: string;
//   registrationCity: string;
//   registrationNumber: string;
//   noOfOwners: number;
//   color: string;
//   expectedPrice: number;
//   negotiable: boolean;
//   description: string;
//   images: string[];
//   documents: string[];
//   inspectionVideo?: string;
//   sellerType: "franchise" | "individual";
//   listingType: "self" | "assisted";
//   status: "pending_verification" | "approved" | "live" | "sold" | "rejected";
//   qualityRating?: number;
//   createdAt: string;
// }

// type TabStatus = "pending_verification" | "approved" | "live" | "sold" | "rejected";

// const statusConfig: Record<TabStatus, { label: string; color: string; icon: React.ReactNode }> = {
//   pending_verification: { label: "Pending", color: "bg-warning/20 text-warning border-warning/30", icon: <Clock className="w-3 h-3" /> },
//   approved: { label: "Approved", color: "bg-primary/20 text-primary border-primary/30", icon: <CheckCircle2 className="w-3 h-3" /> },
//   live: { label: "Live", color: "bg-success/20 text-success border-success/30", icon: <CheckCircle2 className="w-3 h-3" /> },
//   sold: { label: "Sold", color: "bg-success/20 text-success border-success/30", icon: <ShoppingCart className="w-3 h-3" /> },
//   rejected: { label: "Rejected", color: "bg-destructive/20 text-destructive border-destructive/30", icon: <Ban className="w-3 h-3" /> },
// };

// const ListingVerification = () => {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState<TabStatus>("pending_verification");
//   const [listings, setListings] = useState<CarListing[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
//   const [detailsOpen, setDetailsOpen] = useState(false);

//   const [rejectCar, setRejectCar] = useState<CarListing | null>(null);
//   const [rejectOpen, setRejectOpen] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [rejecting, setRejecting] = useState(false);

//   // --- INTEGRATED API CALL for fetching listings ---
//   const fetchListings = async (status: TabStatus) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getFranchiseCarListings(status);
//       if (response.success) {
//         setListings(response.data || []);
//       } else {
//         throw new Error(response.message || "Failed to fetch listings");
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch listings. Please try again.");
//       setListings([]);
//       toast({
//         title: "Error",
//         description: err.message || "Failed to fetch listings.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListings(activeTab);
//   }, [activeTab]);

//   const handleTabChange = (value: string) => {
//     setActiveTab(value as TabStatus);
//   };

//   const openDetails = (car: CarListing) => {
//     setSelectedCar(car);
//     setDetailsOpen(true);
//   };

//   const openReject = (car: CarListing) => {
//     setRejectCar(car);
//     setRejectReason("");
//     setRejectOpen(true);
//   };

//   // --- INTEGRATED API CALL for rejecting a listing ---
//   const handleReject = async () => {
//     if (!rejectCar || !rejectReason.trim()) {
//       toast({
//         title: "Rejection reason required",
//         description: "Please provide a reason for rejection.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setRejecting(true);
//     try {
//       const response = await rejectCarListing(rejectCar._id, rejectReason);
//       if (response.success) {
//         toast({
//           title: "Listing Rejected",
//           description: `${rejectCar.make} ${rejectCar.model} has been rejected.`,
//         });

//         setRejectOpen(false);
//         setRejectCar(null);
//         setRejectReason("");
//         fetchListings(activeTab); // Refresh listings to reflect the change
//       } else {
//         throw new Error(response.message || "Failed to reject listing.");
//       }
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err.message || "Failed to reject listing. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setRejecting(false);
//     }
//   };

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="animate-fade-in">
//           <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
//             Listing Verification
//           </h1>
//           <p className="text-muted-foreground mt-2">
//             Verify and manage car listings
//           </p>
//         </div>

//         {/* Tabs */}
//         <Tabs value={activeTab} onValueChange={handleTabChange} className="animate-slide-up">
//           <TabsList className="glass-card border border-border/50 p-1 h-auto flex-wrap gap-1">
//             <TabsTrigger
//               value="pending_verification"
//               className="data-[state=active]:bg-warning/20 data-[state=active]:text-warning rounded-lg px-4 py-2 transition-all"
//             >
//               <Clock className="w-4 h-4 mr-2" />
//               Pending
//             </TabsTrigger>
//             <TabsTrigger
//               value="approved"
//               className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg px-4 py-2 transition-all"
//             >
//               <CheckCircle2 className="w-4 h-4 mr-2" />
//               Approved
//             </TabsTrigger>
//             <TabsTrigger
//               value="live"
//               className="data-[state=active]:bg-success/20 data-[state=active]:text-success rounded-lg px-4 py-2 transition-all"
//             >
//               <CheckCircle2 className="w-4 h-4 mr-2" />
//               Live
//             </TabsTrigger>
//             <TabsTrigger
//               value="sold"
//               className="data-[state=active]:bg-success/20 data-[state=active]:text-success rounded-lg px-4 py-2 transition-all"
//             >
//               <ShoppingCart className="w-4 h-4 mr-2" />
//               Sold
//             </TabsTrigger>
//             <TabsTrigger
//               value="rejected"
//               className="data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive rounded-lg px-4 py-2 transition-all"
//             >
//               <Ban className="w-4 h-4 mr-2" />
//               Rejected
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value={activeTab} className="mt-6">
//             {/* Loading State */}
//             {loading && (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(6)].map((_, i) => (
//                   <Card key={i} className="glass-card border border-border/50 overflow-hidden">
//                     <Skeleton className="h-48 w-full" />
//                     <CardContent className="p-4 space-y-3">
//                       <Skeleton className="h-6 w-3/4" />
//                       <Skeleton className="h-5 w-1/2" />
//                       <Skeleton className="h-4 w-full" />
//                       <div className="flex gap-2">
//                         <Skeleton className="h-6 w-16" />
//                         <Skeleton className="h-6 w-16" />
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}

//             {/* Error State */}
//             {error && !loading && (
//               <Card className="glass-card border border-destructive/30 p-8">
//                 <div className="flex flex-col items-center justify-center text-center space-y-4">
//                   <div className="p-4 rounded-full bg-destructive/10">
//                     <AlertCircle className="w-8 h-8 text-destructive" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-foreground">Something went wrong</h3>
//                     <p className="text-muted-foreground mt-1">{error}</p>
//                   </div>
//                   <Button
//                     onClick={() => fetchListings(activeTab)}
//                     variant="outline"
//                     className="gap-2"
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                     Try Again
//                   </Button>
//                 </div>
//               </Card>
//             )}

//             {/* Empty State */}
//             {!loading && !error && listings.length === 0 && (
//               <Card className="glass-card border border-border/50 p-12">
//                 <div className="flex flex-col items-center justify-center text-center space-y-4">
//                   <div className="p-6 rounded-full bg-muted/50">
//                     <Car className="w-12 h-12 text-muted-foreground" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-foreground">No listings found</h3>
//                     <p className="text-muted-foreground mt-2">
//                       There are no {statusConfig[activeTab].label.toLowerCase()} listings at the moment.
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             )}

//             {/* Listings Grid */}
//             {!loading && !error && listings.length > 0 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {listings.map((car, index) => (
//                   <Card
//                     key={car._id}
//                     className="glass-card border border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-scale-in"
//                     style={{ animationDelay: `${index * 50}ms` }}
//                   >
//                     {/* Image */}
//                     <div className="relative h-48 overflow-hidden bg-muted/30">
//                       {car.images && car.images.length > 0 ? (
//                         <img
//                           src={car.images[0]}
//                           alt={`${car.make} ${car.model}`}
//                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
//                         </div>
//                       )}
//                       <Badge
//                         className={`absolute top-3 right-3 ${statusConfig[car.status].color} border backdrop-blur-sm`}
//                       >
//                         {statusConfig[car.status].icon}
//                         <span className="ml-1">{statusConfig[car.status].label}</span>
//                       </Badge>
//                     </div>

//                     <CardContent className="p-4 space-y-4">
//                       {/* Title & Price */}
//                       <div>
//                         <h3 className="text-lg font-semibold text-foreground truncate">
//                           {car.make} {car.model} {car.variant}
//                         </h3>

//                     <div className="text-xl font-bold text-red-600">
//   <span>{car.rejectionReason}</span>
// </div>

//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-xl font-bold text-primary">
//                             {formatPrice(car.expectedPrice)}
//                           </span>
//                           {car.negotiable && (
//                             <Badge variant="secondary" className="text-xs">
//                               Negotiable
//                             </Badge>
//                           )}
//                         </div>
//                       </div>

//                       {/* Details */}
//                       <div className="space-y-2 text-sm text-muted-foreground">
//                         <div className="flex items-center gap-2">
//                           <MapPin className="w-4 h-4" />
//                           <span>{car.city}, {car.pincode}</span>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <div className="flex items-center gap-1">
//                             <Fuel className="w-4 h-4" />
//                             <span>{car.fuelType}</span>
                                     
//                           </div>
                        
//                           <div className="flex items-center gap-1">
//                             <Gauge className="w-4 h-4" />
//                             <span>{car.transmission}</span>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4" />
//                           <span>{car.year} • {car.kmDriven?.toLocaleString()} km</span>
//                         </div>
//                       </div>

//                       {/* Badges */}
//                       <div className="flex flex-wrap gap-2">
//                         <Badge variant="outline" className="text-xs capitalize">
//                           {car.sellerType}
//                         </Badge>
//                         <Badge variant="outline" className="text-xs capitalize">
//                           {car.listingType}
//                         </Badge>
//                       </div>

//                       {/* Date */}
//                       <div className="text-xs text-muted-foreground flex items-center gap-1">
//                         <Clock className="w-3 h-3" />
//                         Listed on {formatDate(car.createdAt)}
//                       </div>

//                       {/* Actions - Only for Pending */}
//                       {activeTab === "pending_verification" && (
//                         <div className="flex gap-3 pt-2">
//                           <Button
//                             onClick={() => openDetails(car)}
//                             className="flex-1 gap-2"
//                             variant="outline"
//                           >
//                             <Eye className="w-4 h-4" />
//                             View Details
//                           </Button>
//                           <Button
//                             onClick={() => openReject(car)}
//                             variant="destructive"
//                             className="gap-2"
//                           >
//                             <XCircle className="w-4 h-4" />
//                             Reject
//                           </Button>
//                         </div>
//                       )}

//                       {/* View Details for other tabs */}
//                       {activeTab !== "pending_verification" && (
//                         <Button
//                           onClick={() => openDetails(car)}
//                           className="w-full gap-2"
//                           variant="outline"
//                         >
//                           <Eye className="w-4 h-4" />
//                           View Details
//                         </Button>
//                       )}
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Details Dialog */}
//       <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
//         <DialogContent className="glass-card border border-border/50 max-w-3xl max-h-[90vh] overflow-y-auto">
//           {selectedCar && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="text-2xl font-bold">
//                   {selectedCar.make} {selectedCar.model} {selectedCar.variant}
//                 </DialogTitle>
//                 <DialogDescription>
//                   {selectedCar.year} • {selectedCar.kmDriven?.toLocaleString()} km driven
//                 </DialogDescription>
//               </DialogHeader>

//               <div className="space-y-6 py-4">
//                 {/* Image Gallery */}
//                 {selectedCar.images && selectedCar.images.length > 0 && (
//                   <div className="space-y-3">
//                     <h4 className="font-semibold text-foreground flex items-center gap-2">
//                       <ImageIcon className="w-4 h-4" />
//                       Photos ({selectedCar.images.length})
//                     </h4>
//                     <div className="grid grid-cols-3 gap-3">
//                       {selectedCar.images.map((img, i) => (
//                         <img
//                           key={i}
//                           src={img}
//                           alt={`Car image ${i + 1}`}
//                           className="w-full h-24 object-cover rounded-lg border border-border/50"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Seller Info */}
//                 <div className="glass p-4 rounded-xl space-y-3">
//                   <h4 className="font-semibold text-foreground">Seller Information</h4>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <User className="w-4 h-4" />
//                       <span>{selectedCar.sellerName}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Phone className="w-4 h-4" />
//                       <span>{selectedCar.sellerMobile}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <MapPin className="w-4 h-4" />
//                       <span>{selectedCar.city}, {selectedCar.pincode}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Badge variant="outline" className="capitalize">
//                         {selectedCar.sellerType}
//                       </Badge>
//                       <Badge variant="outline" className="capitalize">
//                         {selectedCar.listingType}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Car Specifications */}
//                 <div className="glass p-4 rounded-xl space-y-3">
//                   <h4 className="font-semibold text-foreground">Car Specifications</h4>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Fuel className="w-4 h-4" />
//                       <span>Fuel: {selectedCar.fuelType}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Gauge className="w-4 h-4" />
//                       <span>Transmission: {selectedCar.transmission}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Users className="w-4 h-4" />
//                       <span>Owners: {selectedCar.noOfOwners}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Palette className="w-4 h-4" />
//                       <span>Color: {selectedCar.color}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Hash className="w-4 h-4" />
//                       <span>Reg: {selectedCar.registrationNumber}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <MapPin className="w-4 h-4" />
//                       <span>Reg City: {selectedCar.registrationCity}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="glass p-4 rounded-xl space-y-2">
//                   <h4 className="font-semibold text-foreground">Pricing</h4>
//                   <div className="flex items-center gap-3">
//                     <IndianRupee className="w-5 h-5 text-primary" />
//                     <span className="text-2xl font-bold text-primary">
//                       {formatPrice(selectedCar.expectedPrice)}
//                     </span>
//                     {selectedCar.negotiable && (
//                       <Badge variant="secondary">Negotiable</Badge>
//                     )}
//                   </div>
//                 </div>

//                 {/* Description */}
//                 {selectedCar.description && (
//                   <div className="space-y-2">
//                     <h4 className="font-semibold text-foreground">Description</h4>
//                     <p className="text-sm text-muted-foreground leading-relaxed">
//                       {selectedCar.description}
//                     </p>
//                   </div>
//                 )}

//                 {/* Documents */}
//                 {selectedCar.documents && selectedCar.documents.length > 0 && (
//                   <div className="space-y-3">
//                     <h4 className="font-semibold text-foreground flex items-center gap-2">
//                       <FileText className="w-4 h-4" />
//                       Documents ({selectedCar.documents.length})
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedCar.documents.map((doc, i) => (
//                         <a
//                           key={i}
//                           href={doc}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm"
//                         >
//                           <FileText className="w-4 h-4" />
//                           Document {i + 1}
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Inspection Video */}
//                 {selectedCar.inspectionVideo && (
//                   <div className="space-y-3">
//                     <h4 className="font-semibold text-foreground flex items-center gap-2">
//                       <Video className="w-4 h-4" />
//                       Inspection Video
//                     </h4>
//                     <video
//                       src={selectedCar.inspectionVideo}
//                       controls
//                       className="w-full rounded-xl border border-border/50"
//                     />
//                   </div>
//                 )}
//               </div>

//               <DialogFooter>
//                 <Button variant="outline" onClick={() => setDetailsOpen(false)}>
//                   Close
//                 </Button>
//               </DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Reject Dialog */}
//       <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
//         <DialogContent className="glass-card border border-border/50">
//           <DialogHeader>
//             <DialogTitle className="text-destructive flex items-center gap-2">
//               <XCircle className="w-5 h-5" />
//               Reject Listing
//             </DialogTitle>
//             <DialogDescription>
//               {rejectCar && (
//                 <>
//                   Are you sure you want to reject <strong>{rejectCar.make} {rejectCar.model}</strong>?
//                 </>
//               )}
//             </DialogDescription>
//           </DialogHeader>

//           <div className="py-4">
//             <Textarea
//               placeholder="Enter rejection reason (required)..."
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//               className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary/50"
//             />
//           </div>

//           <DialogFooter className="gap-3">
//             <Button
//               variant="outline"
//               onClick={() => setRejectOpen(false)}
//               disabled={rejecting}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleReject}
//               disabled={rejecting || !rejectReason.trim()}
//               className="gap-2"
//             >
//               {rejecting ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Rejecting...
//                 </>
//               ) : (
//                 <>
//                   <XCircle className="w-4 h-4" />
//                   Reject Listing
//                 </>
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ListingVerification;





















import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Car,
  MapPin,
  Fuel,
  Calendar,
  User,
  Phone,
  FileText,
  Video,
  X,
  Eye,
  XCircle,
  ImageIcon,
  AlertCircle,
  RefreshCw,
  Gauge,
  Users,
  Palette,
  Hash,
  IndianRupee,
  Clock,
  CheckCircle2,
  Ban,
  ShoppingCart,
  Loader2,
  Edit3,
  Check,
} from "lucide-react";

// --- API Service Imports ---
import { 
  getFranchiseCarListings, 
  rejectCarListing, 
  approveCarListing, 
  editFranchiseListing 
} from "@/services/franchiseService"; 

interface CarListing {
  _id: string;
  sellerName: string;
  sellerMobile: string;
  city: string;
  pincode: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  kmDriven: number;
  fuelType: string;
  rejectionReason?: string;
  approvalRemark?: string; // For comments in approved section
  transmission: string;
  registrationCity: string;
  registrationNumber: string;
  noOfOwners: number;
  color: string;
  expectedPrice: number;
  negotiable: boolean;
  description: string;
  images: string[];
  documents: string[];
  inspectionVideo?: string;
  sellerType: "franchise" | "individual";
  listingType: "self" | "assisted";
  status: "pending_verification" | "approved" | "live" | "sold" | "rejected";
  qualityRating?: number;
  createdAt: string;
}

type TabStatus = "pending_verification" | "approved" | "live" | "sold" | "rejected";

const statusConfig: Record<TabStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending_verification: { label: "Pending", color: "bg-warning/20 text-warning border-warning/30", icon: <Clock className="w-3 h-3" /> },
  approved: { label: "Approved", color: "bg-primary/20 text-primary border-primary/30", icon: <CheckCircle2 className="w-3 h-3" /> },
  live: { label: "Live", color: "bg-success/20 text-success border-success/30", icon: <CheckCircle2 className="w-3 h-3" /> },
  sold: { label: "Sold", color: "bg-success/20 text-success border-success/30", icon: <ShoppingCart className="w-3 h-3" /> },
  rejected: { label: "Rejected", color: "bg-destructive/20 text-destructive border-destructive/30", icon: <Ban className="w-3 h-3" /> },
};

const ListingVerification = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabStatus>("pending_verification");
  const [listings, setListings] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // View Details State
  const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Rejection State
  const [rejectCar, setRejectCar] = useState<CarListing | null>(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejecting, setRejecting] = useState(false);

  // Approval State
  const [approveCar, setApproveCar] = useState<CarListing | null>(null);
  const [approveOpen, setApproveOpen] = useState(false);
  const [approveComment, setApproveComment] = useState("");
  const [approving, setApproving] = useState(false);

  // Edit State
  const [editCar, setEditCar] = useState<CarListing | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    make: "",
    model: "",
    variant: "",
    year: 0,
    kmDriven: 0,
    expectedPrice: 0,
  });

  const fetchListings = async (status: TabStatus) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFranchiseCarListings(status);
      if (response.success) {
        setListings(response.data || []);
      } else {
        throw new Error(response.message || "Failed to fetch listings");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch listings. Please try again.");
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabStatus);
  };

  // --- Handlers ---
  const handleReject = async () => {
    if (!rejectCar || !rejectReason.trim()) return;
    setRejecting(true);
    try {
      const response = await rejectCarListing(rejectCar._id, rejectReason);
      if (response.success) {
        toast({ title: "Listing Rejected", description: "Successfully rejected." });
        setRejectOpen(false);
        fetchListings(activeTab);
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setRejecting(false);
    }
  };

  const handleApprove = async () => {
    if (!approveCar || !approveComment.trim()) return;
    setApproving(true);
    try {
      const response = await approveCarListing(approveCar._id, approveComment);
      if (response.success) {
        toast({ title: "Listing Approved", description: "Listing is now Live." });
        setApproveOpen(false);
        setApproveComment("");
        fetchListings(activeTab);
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setApproving(false);
    }
  };

  const openEdit = (car: CarListing) => {
    setEditCar(car);
    setEditForm({
      make: car.make,
      model: car.model,
      variant: car.variant,
      year: car.year,
      kmDriven: car.kmDriven,
      expectedPrice: car.expectedPrice,
    });
    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!editCar) return;
    setEditing(true);
    try {
      const response = await editFranchiseListing(editCar._id, editForm);
      if (response.success) {
        toast({ title: "Updated", description: "Listing updated successfully." });
        setEditOpen(false);
        fetchListings(activeTab);
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setEditing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Listing Verification</h1>
          <p className="text-muted-foreground mt-2">Verify and manage car listings</p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="animate-slide-up">
          <TabsList className="glass-card border border-border/50 p-1 h-auto flex-wrap gap-1">
            {Object.keys(statusConfig).map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className={`data-[state=active]:${statusConfig[key as TabStatus].color} rounded-lg px-4 py-2 transition-all`}
              >
                {statusConfig[key as TabStatus].icon}
                <span className="ml-2">{statusConfig[key as TabStatus].label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="glass-card border border-border/50 overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-4 space-y-3">
                      <Skeleton className="h-6 w-3/4" /><Skeleton className="h-5 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && listings.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((car, index) => (
                  <Card
                    key={car._id}
                    className="glass-card border border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-scale-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden bg-muted/30">
                      {car.images?.length > 0 ? (
                        <img src={car.images[0]} alt={car.model} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-16 h-16 text-muted-foreground/30" /></div>
                      )}
                      <Badge className={`absolute top-3 right-3 ${statusConfig[car.status].color} border backdrop-blur-sm`}>
                        {statusConfig[car.status].icon}
                        <span className="ml-1">{statusConfig[car.status].label}</span>
                      </Badge>
                    </div>

                    <CardContent className="p-4 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground truncate">{car.make} {car.model} {car.variant}</h3>
                        
                        {/* Status Comments Logic */}
                        {car.rejectionReason && activeTab === "rejected" && (
                          <div className="text-sm font-bold text-destructive mt-1">Reason: {car.rejectionReason}</div>
                        )}
                        {car.approvalRemark && (activeTab === "approved" || activeTab === "live") && (
                          <div className="text-sm font-bold text-primary mt-1 italic">Remark: {car.approvalRemark}</div>
                        )}

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xl font-bold text-primary">{formatPrice(car.expectedPrice)}</span>
                          {car.negotiable && <Badge variant="secondary" className="text-xs">Negotiable</Badge>}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{car.city}, {car.pincode}</span></div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1"><Fuel className="w-4 h-4" /><span>{car.fuelType}</span></div>
                          <div className="flex items-center gap-1"><Gauge className="w-4 h-4" /><span>{car.transmission}</span></div>
                        </div>
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{car.year} • {car.kmDriven?.toLocaleString()} km</span></div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs capitalize">{car.sellerType}</Badge>
                        <Badge variant="outline" className="text-xs capitalize">{car.listingType}</Badge>
                      </div>

                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Listed on {formatDate(car.createdAt)}
                      </div>

                      {/* --- Pending Verification Actions --- */}
                      {activeTab === "pending_verification" ? (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <Button onClick={() => { setSelectedCar(car); setDetailsOpen(true); }} className="gap-2" variant="outline" size="sm">
                            <Eye className="w-4 h-4" /> Details
                          </Button>
                          <Button onClick={() => openEdit(car)} variant="outline" size="sm" className="gap-2 border-primary/50 text-primary">
                            <Edit3 className="w-4 h-4" /> Edit
                          </Button>
                          <Button onClick={() => { setApproveCar(car); setApproveOpen(true); }} size="sm" className="gap-2 bg-success hover:bg-success/90">
                            <Check className="w-4 h-4" /> Approve
                          </Button>
                          <Button onClick={() => { setRejectCar(car); setRejectOpen(true); }} variant="destructive" size="sm" className="gap-2">
                            <XCircle className="w-4 h-4" /> Reject
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => { setSelectedCar(car); setDetailsOpen(true); }} className="w-full gap-2" variant="outline">
                          <Eye className="w-4 h-4" /> View Details
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* --- Details Dialog (Untouched UI) --- */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="glass-card border border-border/50 max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedCar && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedCar.make} {selectedCar.model} {selectedCar.variant}</DialogTitle>
                <DialogDescription>{selectedCar.year} • {selectedCar.kmDriven?.toLocaleString()} km driven</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Image Gallery */}
                <div className="grid grid-cols-3 gap-3">
                  {selectedCar.images?.map((img, i) => (
                    <img key={i} src={img} alt="car" className="w-full h-24 object-cover rounded-lg border border-border/50" />
                  ))}
                </div>

                {/* Approved Remark Display */}
                {selectedCar.approvalRemark && (
                  <div className="glass p-4 rounded-xl border border-primary/20 bg-primary/5">
                    <h4 className="font-semibold text-primary flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4" /> Approval Remark
                    </h4>
                    <p className="text-sm text-foreground">{selectedCar.approvalRemark}</p>
                  </div>
                )}

                {/* Seller Info */}
                <div className="glass p-4 rounded-xl space-y-3">
                  <h4 className="font-semibold text-foreground">Seller Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{selectedCar.sellerName}</span></div>
                    <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{selectedCar.sellerMobile}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{selectedCar.city}, {selectedCar.pincode}</span></div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="capitalize">{selectedCar.sellerType}</Badge>
                      <Badge variant="outline" className="capitalize">{selectedCar.listingType}</Badge>
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className="glass p-4 rounded-xl space-y-3">
                  <h4 className="font-semibold text-foreground">Car Specifications</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Fuel className="w-4 h-4" /><span>Fuel: {selectedCar.fuelType}</span></div>
                    <div className="flex items-center gap-2"><Gauge className="w-4 h-4" /><span>Transmission: {selectedCar.transmission}</span></div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>Owners: {selectedCar.noOfOwners}</span></div>
                    <div className="flex items-center gap-2"><Palette className="w-4 h-4" /><span>Color: {selectedCar.color}</span></div>
                    <div className="flex items-center gap-2"><Hash className="w-4 h-4" /><span>Reg: {selectedCar.registrationNumber}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>Reg City: {selectedCar.registrationCity}</span></div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="glass p-4 rounded-xl flex items-center gap-3">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">{formatPrice(selectedCar.expectedPrice)}</span>
                  {selectedCar.negotiable && <Badge variant="secondary">Negotiable</Badge>}
                </div>

                {/* Description */}
                {selectedCar.description && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Description</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedCar.description}</p>
                  </div>
                )}
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button></DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* --- Approve Dialog (Matches Main UI Style) --- */}
      <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
        <DialogContent className="glass-card border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Approve Listing
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <Label>Verification Comment (Internal)</Label>
            <Textarea 
              placeholder="e.g. Engine checked, RC verified..." 
              value={approveComment} 
              onChange={(e) => setApproveComment(e.target.value)}
              className="min-h-[120px] bg-background/50"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveOpen(false)}>Cancel</Button>
            <Button onClick={handleApprove} disabled={approving || !approveComment.trim()} className="bg-success hover:bg-success/90">
              {approving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Approve"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Edit Dialog (Matches Main UI Style) --- */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="glass-card border border-border/50 max-w-lg">
          <DialogHeader><DialogTitle>Edit Listing Details</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-1"><Label>Make</Label><Input value={editForm.make} onChange={(e) => setEditForm({...editForm, make: e.target.value})} /></div>
            <div className="space-y-1"><Label>Model</Label><Input value={editForm.model} onChange={(e) => setEditForm({...editForm, model: e.target.value})} /></div>
            <div className="space-y-1"><Label>Variant</Label><Input value={editForm.variant} onChange={(e) => setEditForm({...editForm, variant: e.target.value})} /></div>
            <div className="space-y-1"><Label>Year</Label><Input type="number" value={editForm.year} onChange={(e) => setEditForm({...editForm, year: parseInt(e.target.value)})} /></div>
            <div className="space-y-1"><Label>KM Driven</Label><Input type="number" value={editForm.kmDriven} onChange={(e) => setEditForm({...editForm, kmDriven: parseInt(e.target.value)})} /></div>
            <div className="space-y-1"><Label>Price (₹)</Label><Input type="number" value={editForm.expectedPrice} onChange={(e) => setEditForm({...editForm, expectedPrice: parseInt(e.target.value)})} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit} disabled={editing}>{editing ? "Saving..." : "Save Changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Reject Dialog (Untouched UI) --- */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent className="glass-card border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2"><XCircle className="w-5 h-5" /> Reject Listing</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              placeholder="Enter rejection reason (required)..." 
              value={rejectReason} 
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[120px] bg-background/50"
            />
          </div>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setRejectOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject} disabled={rejecting || !rejectReason.trim()}>
              {rejecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reject Listing"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListingVerification;






// import { useState, useEffect } from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { useToast } from "@/hooks/use-toast";
// import { Clock, CheckCircle2, Ban, ShoppingCart } from "lucide-react";

// // --- API Service Imports ---
// import { getFranchiseCarListings, rejectCarListing } from "@/services/franchiseService";

// // Child Components
// import { ListingGrid } from "../franchise/pages/ListingGrid";
// import { DetailsDialog, RejectDialog } from "../franchise/pages/ListingDialogs";

// type TabStatus = "pending_verification" | "approved" | "live" | "sold" | "rejected";

// const statusConfig: Record<
//   TabStatus,
//   { label: string; color: string; icon: React.ReactNode }
// > = {
//   pending_verification: { label: "Pending", color: "bg-warning/20 text-warning border-warning/30", icon: <Clock className="w-3 h-3" /> },
//   approved: { label: "Approved", color: "bg-primary/20 text-primary border-primary/30", icon: <CheckCircle2 className="w-3 h-3" /> },
//   live: { label: "Live", color: "bg-success/20 text-success border-success/30", icon: <CheckCircle2 className="w-3 h-3" /> },
//   sold: { label: "Sold", color: "bg-success/20 text-success border-success/30", icon: <ShoppingCart className="w-3 h-3" /> },
//   rejected: { label: "Rejected", color: "bg-destructive/20 text-destructive border-destructive/30", icon: <Ban className="w-3 h-3" /> },
// };

// const ListingVerification = () => {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState<TabStatus>("pending_verification");
//   const [listings, setListings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [selectedCar, setSelectedCar] = useState<any | null>(null);
//   const [detailsOpen, setDetailsOpen] = useState(false);

//   const [rejectCar, setRejectCar] = useState<any | null>(null);
//   const [rejectOpen, setRejectOpen] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [rejecting, setRejecting] = useState(false);

//   // --- API CALL for fetching listings ---
//   const fetchListings = async (status: TabStatus) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getFranchiseCarListings(status);
//       if (response.success) {
//         setListings(response.data || []);
//       } else {
//         throw new Error(response.message || "Failed to fetch listings");
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch listings. Please try again.");
//       setListings([]);
//       toast({
//         title: "Error",
//         description: err.message || "Failed to fetch listings.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListings(activeTab);
//   }, [activeTab]);

//   const handleTabChange = (value: string) => {
//     setActiveTab(value as TabStatus);
//   };

//   const openDetails = (car: any) => {
//     setSelectedCar(car);
//     setDetailsOpen(true);
//   };

//   const openReject = (car: any) => {
//     setRejectCar(car);
//     setRejectReason("");
//     setRejectOpen(true);
//   };

//   // --- API CALL for rejecting a listing ---
//   const handleReject = async () => {
//     if (!rejectCar || !rejectReason.trim()) {
//       toast({
//         title: "Rejection reason required",
//         description: "Please provide a reason for rejection.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setRejecting(true);
//     try {
//       const response = await rejectCarListing(rejectCar._id, rejectReason);
//       if (response.success) {
//         toast({
//           title: "Listing Rejected",
//           description: `${rejectCar.make} ${rejectCar.model} has been rejected.`,
//         });

//         setRejectOpen(false);
//         setRejectCar(null);
//         setRejectReason("");
//         fetchListings(activeTab); // Refresh listings
//       } else {
//         throw new Error(response.message || "Failed to reject listing.");
//       }
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err.message || "Failed to reject listing. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setRejecting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="animate-fade-in">
//           <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
//             Listing Verification
//           </h1>
//           <p className="text-muted-foreground mt-2">
//             Verify and manage car listings
//           </p>
//         </div>

//         {/* Tabs */}
//         <Tabs value={activeTab} onValueChange={handleTabChange} className="animate-slide-up">
//           <TabsList className="glass-card border border-border/50 p-1 h-auto flex-wrap gap-1">
//             <TabsTrigger value="pending_verification" className="data-[state=active]:bg-warning/20 data-[state=active]:text-warning rounded-lg px-4 py-2 transition-all">
//               <Clock className="w-4 h-4 mr-2" /> Pending
//             </TabsTrigger>
//             {/* <TabsTrigger value="approved" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg px-4 py-2 transition-all">
//               <CheckCircle2 className="w-4 h-4 mr-2" /> Approved
//             </TabsTrigger> */}
//             <TabsTrigger value="live" className="data-[state=active]:bg-success/20 data-[state=active]:text-success rounded-lg px-4 py-2 transition-all">
//               <CheckCircle2 className="w-4 h-4 mr-2" /> Live
//             </TabsTrigger>
//             <TabsTrigger value="sold" className="data-[state=active]:bg-success/20 data-[state=active]:text-success rounded-lg px-4 py-2 transition-all">
//               <ShoppingCart className="w-4 h-4 mr-2" /> Sold
//             </TabsTrigger>
//             <TabsTrigger value="rejected" className="data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive rounded-lg px-4 py-2 transition-all">
//               <Ban className="w-4 h-4 mr-2" /> Rejected
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value={activeTab} className="mt-6">
//             <ListingGrid 
//               loading={loading}
//               error={error}
//               listings={listings}
//               activeTab={activeTab}
//               onRetry={() => fetchListings(activeTab)}
//               onView={openDetails}
//               onReject={openReject}
//               statusConfig={statusConfig}
//             />
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Modals */}
//       <DetailsDialog 
//         open={detailsOpen} 
//         onOpenChange={setDetailsOpen} 
//         car={selectedCar} 
//       />

//       <RejectDialog 
//         open={rejectOpen} 
//         onOpenChange={setRejectOpen}
//         car={rejectCar}
//         reason={rejectReason}
//         setReason={setRejectReason}
//         onConfirm={handleReject}
//         loading={rejecting}
//       />
//     </div>
//   );
// };

// export default ListingVerification;