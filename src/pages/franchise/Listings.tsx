

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
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
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
//   Edit3,
//   Check,
// } from "lucide-react";

// // --- API Service Imports ---
// import { 
//   getFranchiseCarListings, 
//   rejectCarListing, 
//   approveCarListing, 
//   editFranchiseListing 
// } from "@/services/franchiseService"; 

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
//   approvalRemark?: string; // For comments in approved section
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

//   // View Details State
//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
//   const [detailsOpen, setDetailsOpen] = useState(false);

//   // Rejection State
//   const [rejectCar, setRejectCar] = useState<CarListing | null>(null);
//   const [rejectOpen, setRejectOpen] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [rejecting, setRejecting] = useState(false);

//   // Approval State
//   const [approveCar, setApproveCar] = useState<CarListing | null>(null);
//   const [approveOpen, setApproveOpen] = useState(false);
//   const [approveComment, setApproveComment] = useState("");
//   const [approving, setApproving] = useState(false);

//   // Edit State
//   const [editCar, setEditCar] = useState<CarListing | null>(null);
//   const [editOpen, setEditOpen] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [editForm, setEditForm] = useState({
//     make: "",
//     model: "",
//     variant: "",
//     year: 0,
//     kmDriven: 0,
//     expectedPrice: 0,
//   });

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

//   // --- Handlers ---
//   const handleReject = async () => {
//     if (!rejectCar || !rejectReason.trim()) return;
//     setRejecting(true);
//     try {
//       const response = await rejectCarListing(rejectCar._id, rejectReason);
//       if (response.success) {
//         toast({ title: "Listing Rejected", description: "Successfully rejected." });
//         setRejectOpen(false);
//         fetchListings(activeTab);
//       }
//     } catch (err: any) {
//       toast({ title: "Error", description: err.message, variant: "destructive" });
//     } finally {
//       setRejecting(false);
//     }
//   };

//   const handleApprove = async () => {
//     if (!approveCar || !approveComment.trim()) return;
//     setApproving(true);
//     try {
//       const response = await approveCarListing(approveCar._id, approveComment);
//       if (response.success) {
//         toast({ title: "Listing Approved", description: "Listing is now Live." });
//         setApproveOpen(false);
//         setApproveComment("");
//         fetchListings(activeTab);
//       }
//     } catch (err: any) {
//       toast({ title: "Error", description: err.message, variant: "destructive" });
//     } finally {
//       setApproving(false);
//     }
//   };

//   const openEdit = (car: CarListing) => {
//     setEditCar(car);
//     setEditForm({
//       make: car.make,
//       model: car.model,
//       variant: car.variant,
//       year: car.year,
//       kmDriven: car.kmDriven,
//       expectedPrice: car.expectedPrice,
//     });
//     setEditOpen(true);
//   };

//   const handleEditSubmit = async () => {
//     if (!editCar) return;
//     setEditing(true);
//     try {
//       const response = await editFranchiseListing(editCar._id, editForm);
//       if (response.success) {
//         toast({ title: "Updated", description: "Listing updated successfully." });
//         setEditOpen(false);
//         fetchListings(activeTab);
//       }
//     } catch (err: any) {
//       toast({ title: "Error", description: err.message, variant: "destructive" });
//     } finally {
//       setEditing(false);
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
//       day: "numeric", month: "short", year: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="animate-fade-in">
//           <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Listing Verification</h1>
//           <p className="text-muted-foreground mt-2">Verify and manage car listings</p>
//         </div>

//         <Tabs value={activeTab} onValueChange={handleTabChange} className="animate-slide-up">
//           <TabsList className="glass-card border border-border/50 p-1 h-auto flex-wrap gap-1">
//             {Object.keys(statusConfig).map((key) => (
//               <TabsTrigger
//                 key={key}
//                 value={key}
//                 className={`data-[state=active]:${statusConfig[key as TabStatus].color} rounded-lg px-4 py-2 transition-all`}
//               >
//                 {statusConfig[key as TabStatus].icon}
//                 <span className="ml-2">{statusConfig[key as TabStatus].label}</span>
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           <TabsContent value={activeTab} className="mt-6">
//             {loading && (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(6)].map((_, i) => (
//                   <Card key={i} className="glass-card border border-border/50 overflow-hidden">
//                     <Skeleton className="h-48 w-full" />
//                     <CardContent className="p-4 space-y-3">
//                       <Skeleton className="h-6 w-3/4" /><Skeleton className="h-5 w-1/2" />
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}

//             {!loading && listings.length > 0 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {listings.map((car, index) => (
//                   <Card
//                     key={car._id}
//                     className="glass-card border border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-scale-in"
//                     style={{ animationDelay: `${index * 50}ms` }}
//                   >
//                     <div className="relative h-48 overflow-hidden bg-muted/30">
//                       {car.images?.length > 0 ? (
//                         <img src={car.images[0]} alt={car.model} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-16 h-16 text-muted-foreground/30" /></div>
//                       )}
//                       <Badge className={`absolute top-3 right-3 ${statusConfig[car.status].color} border backdrop-blur-sm`}>
//                         {statusConfig[car.status].icon}
//                         <span className="ml-1">{statusConfig[car.status].label}</span>
//                       </Badge>
//                     </div>

//                     <CardContent className="p-4 space-y-4">
//                       <div>
//                         <h3 className="text-lg font-semibold text-foreground truncate">{car.make} {car.model} {car.variant}</h3>
                        
//                         {/* Status Comments Logic */}
//                         {car.rejectionReason && activeTab === "rejected" && (
//                           <div className="text-sm font-bold text-destructive mt-1">Reason: {car.rejectionReason}</div>
//                         )}
//                         {car.approvalRemark && (activeTab === "approved" || activeTab === "live") && (
//                           <div className="text-sm font-bold text-primary mt-1 italic">Remark: {car.approvalRemark}</div>
//                         )}

//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-xl font-bold text-primary">{formatPrice(car.expectedPrice)}</span>
//                           {car.negotiable && <Badge variant="secondary" className="text-xs">Negotiable</Badge>}
//                         </div>
//                       </div>

//                       <div className="space-y-2 text-sm text-muted-foreground">
//                         <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{car.city}, {car.pincode}</span></div>
//                         <div className="flex items-center gap-4">
//                           <div className="flex items-center gap-1"><Fuel className="w-4 h-4" /><span>{car.fuelType}</span></div>
//                           <div className="flex items-center gap-1"><Gauge className="w-4 h-4" /><span>{car.transmission}</span></div>
//                         </div>
//                         <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{car.year} • {car.kmDriven?.toLocaleString()} km</span></div>
//                       </div>

//                       <div className="flex flex-wrap gap-2">
//                         <Badge variant="outline" className="text-xs capitalize">{car.sellerType}</Badge>
//                         <Badge variant="outline" className="text-xs capitalize">{car.listingType}</Badge>
//                       </div>

//                       <div className="text-xs text-muted-foreground flex items-center gap-1">
//                         <Clock className="w-3 h-3" /> Listed on {formatDate(car.createdAt)}
//                       </div>

//                       {/* --- Pending Verification Actions --- */}
//                       {activeTab === "pending_verification" ? (
//                         <div className="grid grid-cols-2 gap-2 pt-2">
//                           <Button onClick={() => { setSelectedCar(car); setDetailsOpen(true); }} className="gap-2" variant="outline" size="sm">
//                             <Eye className="w-4 h-4" /> Details
//                           </Button>
//                           <Button onClick={() => openEdit(car)} variant="outline" size="sm" className="gap-2 border-primary/50 text-primary">
//                             <Edit3 className="w-4 h-4" /> Edit
//                           </Button>
//                           <Button onClick={() => { setApproveCar(car); setApproveOpen(true); }} size="sm" className="gap-2 bg-success hover:bg-success/90">
//                             <Check className="w-4 h-4" /> Approve
//                           </Button>
//                           <Button onClick={() => { setRejectCar(car); setRejectOpen(true); }} variant="destructive" size="sm" className="gap-2">
//                             <XCircle className="w-4 h-4" /> Reject
//                           </Button>
//                         </div>
//                       ) : (
//                         <Button onClick={() => { setSelectedCar(car); setDetailsOpen(true); }} className="w-full gap-2" variant="outline">
//                           <Eye className="w-4 h-4" /> View Details
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

//       {/* --- Details Dialog (Untouched UI) --- */}
//       <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
//         <DialogContent className="glass-card border border-border/50 max-w-3xl max-h-[90vh] overflow-y-auto">
//           {selectedCar && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="text-2xl font-bold">{selectedCar.make} {selectedCar.model} {selectedCar.variant}</DialogTitle>
//                 <DialogDescription>{selectedCar.year} • {selectedCar.kmDriven?.toLocaleString()} km driven</DialogDescription>
//               </DialogHeader>
//               <div className="space-y-6 py-4">
//                 {/* Image Gallery */}
//                 <div className="grid grid-cols-3 gap-3">
//                   {selectedCar.images?.map((img, i) => (
//                     <img key={i} src={img} alt="car" className="w-full h-24 object-cover rounded-lg border border-border/50" />
//                   ))}
//                 </div>

//                 {/* Approved Remark Display */}
//                 {selectedCar.approvalRemark && (
//                   <div className="glass p-4 rounded-xl border border-primary/20 bg-primary/5">
//                     <h4 className="font-semibold text-primary flex items-center gap-2 mb-1">
//                       <CheckCircle2 className="w-4 h-4" /> Approval Remark
//                     </h4>
//                     <p className="text-sm text-foreground">{selectedCar.approvalRemark}</p>
//                   </div>
//                 )}

//                 {/* Seller Info */}
//                 <div className="glass p-4 rounded-xl space-y-3">
//                   <h4 className="font-semibold text-foreground">Seller Information</h4>
//                   <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{selectedCar.sellerName}</span></div>
//                     <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{selectedCar.sellerMobile}</span></div>
//                     <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{selectedCar.city}, {selectedCar.pincode}</span></div>
//                     <div className="flex gap-2">
//                       <Badge variant="outline" className="capitalize">{selectedCar.sellerType}</Badge>
//                       <Badge variant="outline" className="capitalize">{selectedCar.listingType}</Badge>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Specs */}
//                 <div className="glass p-4 rounded-xl space-y-3">
//                   <h4 className="font-semibold text-foreground">Car Specifications</h4>
//                   <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-2"><Fuel className="w-4 h-4" /><span>Fuel: {selectedCar.fuelType}</span></div>
//                     <div className="flex items-center gap-2"><Gauge className="w-4 h-4" /><span>Transmission: {selectedCar.transmission}</span></div>
//                     <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>Owners: {selectedCar.noOfOwners}</span></div>
//                     <div className="flex items-center gap-2"><Palette className="w-4 h-4" /><span>Color: {selectedCar.color}</span></div>
//                     <div className="flex items-center gap-2"><Hash className="w-4 h-4" /><span>Reg: {selectedCar.registrationNumber}</span></div>
//                     <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>Reg City: {selectedCar.registrationCity}</span></div>
//                   </div>
//                 </div>

//                 {/* Pricing */}
//                 <div className="glass p-4 rounded-xl flex items-center gap-3">
//                   <IndianRupee className="w-5 h-5 text-primary" />
//                   <span className="text-2xl font-bold text-primary">{formatPrice(selectedCar.expectedPrice)}</span>
//                   {selectedCar.negotiable && <Badge variant="secondary">Negotiable</Badge>}
//                 </div>

//                 {/* Description */}
//                 {selectedCar.description && (
//                   <div className="space-y-2">
//                     <h4 className="font-semibold text-foreground">Description</h4>
//                     <p className="text-sm text-muted-foreground leading-relaxed">{selectedCar.description}</p>
//                   </div>
//                 )}
//               </div>
//               <DialogFooter><Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button></DialogFooter>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* --- Approve Dialog (Matches Main UI Style) --- */}
//       <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
//         <DialogContent className="glass-card border border-border/50">
//           <DialogHeader>
//             <DialogTitle className="text-primary flex items-center gap-2">
//               <CheckCircle2 className="w-5 h-5" /> Approve Listing
//             </DialogTitle>
//           </DialogHeader>
//           <div className="py-4 space-y-3">
//             <Label>Verification Comment (Internal)</Label>
//             <Textarea 
//               placeholder="e.g. Engine checked, RC verified..." 
//               value={approveComment} 
//               onChange={(e) => setApproveComment(e.target.value)}
//               className="min-h-[120px] bg-background/50"
//             />
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setApproveOpen(false)}>Cancel</Button>
//             <Button onClick={handleApprove} disabled={approving || !approveComment.trim()} className="bg-success hover:bg-success/90">
//               {approving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Approve"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* --- Edit Dialog (Matches Main UI Style) --- */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent className="glass-card border border-border/50 max-w-lg">
//           <DialogHeader><DialogTitle>Edit Listing Details</DialogTitle></DialogHeader>
//           <div className="grid grid-cols-2 gap-4 py-4">
//             <div className="space-y-1"><Label>Make</Label><Input value={editForm.make} onChange={(e) => setEditForm({...editForm, make: e.target.value})} /></div>
//             <div className="space-y-1"><Label>Model</Label><Input value={editForm.model} onChange={(e) => setEditForm({...editForm, model: e.target.value})} /></div>
//             <div className="space-y-1"><Label>Variant</Label><Input value={editForm.variant} onChange={(e) => setEditForm({...editForm, variant: e.target.value})} /></div>
//             <div className="space-y-1"><Label>Year</Label><Input type="number" value={editForm.year} onChange={(e) => setEditForm({...editForm, year: parseInt(e.target.value)})} /></div>
//             <div className="space-y-1"><Label>KM Driven</Label><Input type="number" value={editForm.kmDriven} onChange={(e) => setEditForm({...editForm, kmDriven: parseInt(e.target.value)})} /></div>
//             <div className="space-y-1"><Label>Price (₹)</Label><Input type="number" value={editForm.expectedPrice} onChange={(e) => setEditForm({...editForm, expectedPrice: parseInt(e.target.value)})} /></div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
//             <Button onClick={handleEditSubmit} disabled={editing}>{editing ? "Saving..." : "Save Changes"}</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* --- Reject Dialog (Untouched UI) --- */}
//       <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
//         <DialogContent className="glass-card border border-border/50">
//           <DialogHeader>
//             <DialogTitle className="text-destructive flex items-center gap-2"><XCircle className="w-5 h-5" /> Reject Listing</DialogTitle>
//           </DialogHeader>
//           <div className="py-4">
//             <Textarea 
//               placeholder="Enter rejection reason (required)..." 
//               value={rejectReason} 
//               onChange={(e) => setRejectReason(e.target.value)}
//               className="min-h-[120px] bg-background/50"
//             />
//           </div>
//           <DialogFooter className="gap-3">
//             <Button variant="outline" onClick={() => setRejectOpen(false)}>Cancel</Button>
//             <Button variant="destructive" onClick={handleReject} disabled={rejecting || !rejectReason.trim()}>
//               {rejecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reject Listing"}
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
//   Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Eye, XCircle, Loader2, UserPlus, CalendarDays,
//   Check, ClipboardCheck, User, Phone, FileText,
//   CheckCircle2, AlertCircle, Gauge, CarFront
// } from "lucide-react";
 
// import {
//   getFranchiseCarListings,
//   approveCarListing,
//   scheduleInspection,
//   assignInspector,
//   getMyInspectors,
//   getCompletedInspectionByCarId, // Make sure this is exported in your service
// } from "@/services/franchiseService";
 
// const ListingVerification = () => {
//   const { toast } = useToast();
 
//   const [activeTab, setActiveTab] = useState("pending_verification");
//   const [listings, setListings] = useState([]);
//   const [inspectors, setInspectors] = useState([]);
//   const [loading, setLoading] = useState(true);
 
//   // Dialog open/close states
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [scheduleOpen, setScheduleOpen] = useState(false);
//   const [assignOpen, setAssignOpen] = useState(false);
//   const [approveOpen, setApproveOpen] = useState(false);
//   const [reportOpen, setReportOpen] = useState(false);
 
//   // Data states
//   const [scheduleData, setScheduleData] = useState({ date: "", time: "" });
//   const [selectedInspectorId, setSelectedInspectorId] = useState("");
//   const [qualityRating, setQualityRating] = useState(5);
//   const [reportData, setReportData] = useState(null);
//   const [reportLoading, setReportLoading] = useState(false);
 
//   // ---------------- FETCH DATA ----------------
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await getFranchiseCarListings(activeTab);
//       setListings(res.data || []);
 
//       const ins = await getMyInspectors();
//       setInspectors(ins.data || []);
//     } catch (err) {
//       toast({ title: "Failed to load listings", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);
 
//   // ---------------- HELPERS ----------------
//   const getInspectorName = (id) =>
//     inspectors.find(i => i._id === id)?.fullName || "Inspector";
 
//   const getInspectorPhone = (id) =>
//     inspectors.find(i => i._id === id)?.phone || "N/A";
 
//   const formatDate = (d) =>
//     new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
 
//   // ---------------- ACTIONS ----------------
 
//   // Naya Function: Inspection Report Dekhne Ke Liye
//   const handleViewReport = async (carId) => {
//     setReportLoading(true);
//     setReportOpen(true);
//     try {
//       const res = await getCompletedInspectionByCarId(carId);
//       setReportData(res.data);
//     } catch (error) {
//       toast({ title: "Report fetch karne mein error aayi", variant: "destructive" });
//       setReportOpen(false);
//     } finally {
//       setReportLoading(false);
//     }
//   };
 
//   const handleSchedule = async () => {
//     try {
//       await scheduleInspection({ carId: selectedCar._id, ...scheduleData });
//       toast({ title: "Inspection scheduled successfully" });
//       setScheduleOpen(false);
//       fetchData();
//     } catch {
//       toast({ title: "Schedule failed", variant: "destructive" });
//     }
//   };
 
//   const handleAssign = async () => {
//     try {
//       await assignInspector({ carId: selectedCar._id, inspectorId: selectedInspectorId });
//       toast({ title: "Inspector assigned successfully" });
//       setAssignOpen(false);
//       fetchData();
//     } catch {
//       toast({ title: "Assignment failed", variant: "destructive" });
//     }
//   };
 
//   const handleApprove = async () => {
//     try {
//       // selectedCar humne report modal ya direct card se set kiya hoga
//       await approveCarListing(selectedCar._id, qualityRating);
//       toast({ title: "Car is now LIVE for buyers! 🚀" });
//       setApproveOpen(false);
//       setReportOpen(false);
//       fetchData();
//     } catch {
//       toast({ title: "Approval failed", variant: "destructive" });
//     }
//   };
  
//   // ---------------- UI ----------------
//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Listing & Inspection Management</h1>
//         <Button onClick={fetchData} variant="outline" size="sm">Refresh</Button>
//       </div>
 
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="bg-slate-100 p-1">
//           {["pending_verification", "approved", "live", "rejected", "sold"].map(t => (
//             <TabsTrigger key={t} value={t} className="capitalize">
//               {t.replace("_", " ")}
//             </TabsTrigger>
//           ))}
//         </TabsList>
 
//         <TabsContent value={activeTab} className="mt-6">
//           {loading ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {[1, 2, 3].map(i => <Skeleton key={i} className="h-80 w-full rounded-xl" />)}
//             </div>
//           ) : listings.length === 0 ? (
//             <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl">
//               No cars found in this category.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {listings.map(car => (
//                 <Card key={car._id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="h-48 relative">
//                     <img src={car.images?.[0] || "https://placehold.co/600x400?text=No+Image"} className="w-full h-full object-cover" alt="car" />
//                     <Badge className="absolute top-3 right-3 capitalize shadow-md" variant={car.inspectionStatus === 'completed' ? 'success' : 'secondary'}>
//                       {car.inspectionStatus}
//                     </Badge>
//                     <Badge className="absolute top-1  capitalize shadow-md" variant={car.inspectionStatus === 'completed' ? 'success' : 'secondary'}>
//                       {car.status}
//                     </Badge>
//                   </div>
 
//                   <CardContent className="p-5 space-y-4">
//                     <div>
//                       <h3 className="font-bold text-xl">{car.make} {car.model}</h3>
//                       <p className="text-sm text-muted-foreground font-medium">
//                         {car.year} • {car.fuelType} • {car.kmsDriven?.toLocaleString()} km
//                       </p>
//                     </div>
 
//                     {/* INSPECTION BADGE INFO */}
//                     {(car.scheduledDate || car.assignedInspector) && (
//                       <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-1.5 text-xs text-blue-800">
//                         <p className="font-bold flex items-center gap-1.5">
//                           <ClipboardCheck className="w-4 h-4" /> Inspection Details
//                         </p>
//                         {car.scheduledDate && (
//                           <p className="flex items-center gap-1 font-medium">
//                             <CalendarDays className="w-3.5 h-3.5" /> {formatDate(car.scheduledDate)} at {car.scheduledTime}
//                           </p>
//                         )}
//                         {car.assignedInspector && (
//                           <div className="flex flex-col gap-1">
//                             <p className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {getInspectorName(car.assignedInspector)}</p>
//                             <p className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {getInspectorPhone(car.assignedInspector)}</p>
//                           </div>
//                         )}
//                       </div>
//                     )}
 
//                     {/* STATUS BASED ACTIONS */}
//                     <div className="space-y-2 pt-2">
//                       {car.inspectionStatus === "pending" && (
//                         <Button className="w-full" onClick={() => { setSelectedCar(car); setScheduleOpen(true); }}>
//                           <CalendarDays className="w-4 h-4 mr-2" /> Schedule Now
//                         </Button>
//                       )}
 
//                       {car.inspectionStatus === "user_accepted" && (
//                         <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => { setSelectedCar(car); setAssignOpen(true); }}>
//                           <UserPlus className="w-4 h-4 mr-2" /> Assign Inspector
//                         </Button>
//                       )}
 
//                       {car.inspectionStatus === "completed" && car.status !== "live" && (
//                         <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => handleViewReport(car._id)}>
//                           <FileText className="w-4 h-4 mr-2" /> View Report & Make Live
//                         </Button>
//                       )}
 
//                       <div className="grid grid-cols-2 gap-2">
//                         <Button variant="outline" size="sm" className="w-full">
//                           <Eye className="w-4 h-4 mr-2" /> Details
//                         </Button>
//                         <Button variant="ghost" size="sm" className="w-full text-destructive hover:bg-red-50">
//                           <XCircle className="w-4 h-4 mr-2" /> Reject
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
 
//       {/* ------------------- DIALOGS (MODALS) ------------------- */}
 
//       {/* 1. VIEW INSPECTION REPORT DIALOG */}
//       <Dialog open={reportOpen} onOpenChange={setReportOpen}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="text-2xl flex items-center gap-2">
//               <ClipboardCheck className="text-blue-600 w-6 h-6" />
//               Inspection Report
//             </DialogTitle>
//           </DialogHeader>
 
//           {reportLoading ? (
//             <div className="py-20 flex flex-col items-center justify-center gap-4">
//               <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
//               <p className="text-muted-foreground font-medium">Fetching inspection details...</p>
//             </div>
//           ) : reportData ? (
//             <div className="space-y-6">
 
//               {/* Seller & Car Details */}
// <div className="space-y-4 bg-white p-4 rounded-xl border">
//   <h4 className="font-bold text-sm mb-2 underline underline-offset-4">Seller & Car Details</h4>
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//     <div className="text-sm text-slate-600 space-y-1">
//       <p><b>Seller Name:</b> {reportData.sellerName}</p>
//       <p><b>Mobile:</b> {reportData.sellerMobile}</p>
//       {reportData.sellerEmail && <p><b>Email:</b> {reportData.sellerEmail}</p>}
//       <p><b>City:</b> {reportData.city}</p>
//       <p><b>Pincode:</b> {reportData.pincode}</p>
//           <p><b>Make:</b> {reportData.make}</p>
//       <p><b>Model:</b> {reportData.model}</p>
//       <p><b>Variant:</b> {reportData.variant}</p>
//     </div>
//     <div className="text-sm text-slate-600 space-y-1">
 
//       <p><b>Year:</b> {reportData.year}</p>
//       <p><b>Kilometers Driven:</b> {reportData.kmDriven}</p>
//       <p><b>Fuel Type:</b> {reportData.fuelType}</p>
//       <p><b>Transmission:</b> {reportData.transmission}</p>
//       <p><b>Registration City:</b> {reportData.registrationCity}</p>
//       <p><b>Registration Number:</b> {reportData.registrationNumber}</p>
//       <p><b>No. of Owners:</b> {reportData.noOfOwners}</p>
//       <p><b>Expected Price:</b> ₹{reportData.expectedPrice?.toLocaleString()} {reportData.negotiable ? "(Negotiable)" : "(Fixed)"}</p>
//     </div>
//   </div>
//   {reportData.description && (
//     <p className="text-sm text-slate-600 mt-2"><b>Description:</b> {reportData.description}</p>
//   )}
//   {reportData.images?.length > 0 && (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
//       {reportData.images.map((img, idx) => (
//         <img key={idx} src={img} alt="car" className="rounded-lg border object-cover h-30 w-full" />
//       ))}
//     </div>
//   )}
 
//   {/* Listed By Info */}
// {reportData.listedBy && (
//   <div className="bg-slate-50 p-4 rounded-xl border mt-4 text-sm text-slate-600">
//     <h4 className="font-bold text-sm mb-2 underline underline-offset-4">Listed By</h4>
//     <p><b>ID:</b> {reportData.listedBy._id.slice(-6)}</p>
//     <p><b>Email:</b> {reportData.listedBy.email}</p>
//     <p><b>Phone:</b> {reportData.listedBy.phone}</p>
//   </div>
// )}
// </div>
 
             
//               {/* Summary Header */}
//               <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border">
//                 <div>
//                   <Label className="text-xs uppercase text-slate-500">Vehicle Info</Label>
//                   <p className="font-bold text-lg">{reportData.make} {reportData.model}</p>
//                   <p className="text-sm text-slate-600">{reportData.year} Model • ₹{reportData.expectedPrice?.toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <Label className="text-xs uppercase text-slate-500">Inspector Info</Label>
//                   <p className="font-bold text-lg">{reportData.inspectionReport?.inspectorName}</p>
//                       <p className="font-bold text-sm">{reportData.inspectionReport.inspector?.phone}</p>
//                   <p className="text-sm text-slate-600">ID: {reportData.inspectionReport?.inspector?._id.slice(-6)}</p>
//                 </div>
//               </div>
 
//               {/* Health Scores */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 {[
//                   { label: "Exterior", score: reportData.inspectionReport?.exteriorScore, icon: CarFront },
//                   { label: "Interior", score: reportData.inspectionReport?.interiorScore, icon: User },
//                   { label: "Engine", score: reportData.inspectionReport?.engineMechanicalScore, icon: Gauge },
//                   { label: "Tyres", score: reportData.inspectionReport?.tyresBrakesScore, icon: Gauge },
//                 ].map((item) => (
//                   <div key={item.label} className="bg-white border-2 border-slate-100 rounded-xl p-3 text-center">
//                     <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">{item.label}</p>
//                     <p className="text-2xl font-black text-blue-600">{item.score}<span className="text-xs text-slate-400">/10</span></p>
//                   </div>
//                 ))}
//               </div>
 
//               {/* Technical Details */}
//               <div className="space-y-3 bg-slate-50 p-4 rounded-xl border">
//                 <h4 className="font-bold text-sm flex items-center gap-2 underline underline-offset-4">
//                   Technical Checklist
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                     <span className="text-slate-600">Odometer: <b>{reportData.inspectionReport?.odometerReading} km</b></span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                     <span className="text-slate-600">Tyre Condition: <b>{reportData.inspectionReport?.tyreCondition}</b></span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <AlertCircle className="w-4 h-4 text-orange-500" />
//                     <span className="text-slate-600">Accident History: <b>{reportData.inspectionReport?.accidentHistory}</b></span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                     <span className="text-slate-600">VIN Verified: <b>{reportData.inspectionReport?.vinChassisVerified ? "Yes" : "No"}</b></span>
//                   </div>
//                 </div>
//                 <div className="mt-3 p-3 bg-orange-100/50 border border-orange-200 rounded-lg">
//                   <p className="text-xs font-bold text-orange-800 uppercase">Inspector's Remarks:</p>
//                   <p className="text-sm text-orange-900 mt-1 italic">"{reportData.inspectionReport?.minorIssues || "No major issues reported by inspector."}"</p>
//                 </div>
//               </div>
 
 
//                 {/* 📸 PHOTOS */}
//         {reportData.inspectionReport?.photos?.length > 0 && (
//           <div>
//             <h4 className="font-bold text-sm mb-2">Inspection Photos</h4>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {reportData.inspectionReport.photos.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   alt="inspection"
//                   className="rounded-lg border object-cover h-32 w-full"
//                 />
//               ))}
//             </div>
//           </div>
//         )}
 
 
//               <DialogFooter className="flex gap-2">
//                 <Button variant="outline" onClick={() => setReportOpen(false)} className="flex-1">Close</Button>
//                 <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
//                   onClick={() => {
//                     setSelectedCar(reportData);
//                     setApproveOpen(true);
//                   }}>
//                   <Check className="w-4 h-4 mr-2" /> Approve & Go Live
//                 </Button>
//               </DialogFooter>
//             </div>
//           ) : (
//             <div className="text-center py-10">Report data not found.</div>
//           )}
//         </DialogContent>
//       </Dialog>
 
//       {/* 2. SCHEDULE INSPECTION DIALOG */}
//       <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader><DialogTitle>Schedule Inspection</DialogTitle></DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="space-y-2">
//               <Label>Date</Label>
//               <Input type="date" className="w-full" onChange={e => setScheduleData({ ...scheduleData, date: e.target.value })} />
//             </div>
//             <div className="space-y-2">
//               <Label>Time Slot</Label>
//               <Input type="time" className="w-full" onChange={e => setScheduleData({ ...scheduleData, time: e.target.value })} />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleSchedule} className="w-full">Send Schedule to User</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
 
//       {/* 3. ASSIGN INSPECTOR DIALOG */}
//       <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
//         <DialogContent>
//           <DialogHeader><DialogTitle>Select Inspector</DialogTitle></DialogHeader>
//           <div className="py-4">
//             <select
//               className="w-full border p-3 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
//               onChange={e => setSelectedInspectorId(e.target.value)}
//               value={selectedInspectorId}
//             >
//               <option value="">-- Choose an Inspector --</option>
//               {inspectors.map(i => (
//                 <option key={i._id} value={i._id}>{i.fullName} ({i.phone})</option>
//               ))}
//             </select>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleAssign} disabled={!selectedInspectorId} className="w-full bg-purple-600">
//               Confirm Assignment
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
 
//       {/* 4. FINAL APPROVAL DIALOG (MAKE LIVE) */}
//       <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Final Approval: Go Live</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-5 py-4">
//             <div className="space-y-2">
//               <Label className="font-bold">Assign Quality Rating (1-10)</Label>
//               <Input
//                 type="number"
//                 min={1}
//                 max={10}
//                 value={qualityRating}
//                 onChange={e => setQualityRating(parseInt(e.target.value))}
//                 className="text-lg font-bold"
//               />
//               <p className="text-xs text-muted-foreground italic">Higher rating helps in faster sales.</p>
//             </div>
           
//             <div className="p-3 bg-green-50 rounded-lg border border-green-200">
//               <p className="text-sm text-green-800 flex gap-2">
//                 <CheckCircle2 className="w-5 h-5" />
//                 This car will be listed on the main marketplace for all customers to see.
//               </p>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleApprove} className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
//               🚀 Publish Listing Now
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
//   Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Eye, XCircle, Loader2, UserPlus, CalendarDays,
//   Check, ClipboardCheck, User, Phone, FileText,
//   CheckCircle2, AlertCircle, Gauge, CarFront,
//   MapPin, Fuel, Users, Palette, Hash, IndianRupee
// } from "lucide-react";
 
// import {
//   getFranchiseCarListings,
//   approveCarListing,
//   scheduleInspection,
//   assignInspector,
//   getMyInspectors,
//   getCompletedInspectionByCarId,
//   rejectCarListing
// } from "@/services/franchiseService";

// // Enhanced CarListing Interface
// interface CarListing {
//   _id: string;
//   sellerName: string;
//   sellerMobile: string;
//   sellerEmail?: string;
//   city: string;
//   pincode: string;
//   make: string;
//   model: string;
//   variant?: string;
//   year: number;
//   kmDriven: number;
//   fuelType: string;
//   rejectionReason?: string;
//   approvalRemark?: string;
//   transmission: string;
//   registrationCity: string;
//   registrationNumber: string;
//   noOfOwners: number;
//   color?: string;
//   expectedPrice: number;
//   negotiable: boolean;
//   description?: string;
//   images: string[];
//   inspectionVideo?: string;
//   status: "pending_verification" | "approved" | "live" | "sold" | "rejected";
//   qualityRating?: number;
//   createdAt: string;

//   inspectionStatus: "pending" | "user_accepted" | "scheduled" | "assigned" | "completed" | "rejected";
//   scheduledDate?: string;
//   scheduledTime?: string;
//   assignedInspector?: string;
//   listedBy?: {
//     _id: string;
//     email: string;
//     phone: string;
//   };
//   inspectionReport?: {
//     _id: string;
//     carId: string;
//     inspector?: { _id: string; fullName: string; phone: string; email: string; };
//     inspectorName?: string;
//     odometerReading?: number;
//     exteriorScore?: number;
//     interiorScore?: number;
//     engineMechanicalScore?: number;
//     tyresBrakesScore?: number;
//     tyreCondition?: string;
//     accidentHistory?: string;
//     vinChassisVerified?: boolean;
//     minorIssues?: string;
//     photos?: string[];
//   };
// }

// // Interface for inspector data
// interface Inspector {
//   _id: string;
//   fullName: string;
//   phone: string;
//   email: string;
// }
 
// const ListingVerification = () => {
//   const { toast } = useToast();
 
//   const [activeTab, setActiveTab] = useState("pending_verification");
//   const [listings, setListings] = useState<CarListing[]>([]);
//   const [inspectors, setInspectors] = useState<Inspector[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
 
//   // Dialog open/close states
//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
//   const [scheduleOpen, setScheduleOpen] = useState(false);
//   const [assignOpen, setAssignOpen] = useState(false);
//   const [approveOpen, setApproveOpen] = useState(false);
//   const [rejectOpen, setRejectOpen] = useState(false);
//   const [reportOpen, setReportOpen] = useState(false);
//   const [detailsOpen, setDetailsOpen] = useState(false);
 
//   // Data states
//   const [scheduleData, setScheduleData] = useState({ date: "", time: "" });
//   const [selectedInspectorId, setSelectedInspectorId] = useState("");
//   const [qualityRating, setQualityRating] = useState(7);
//   const [reportData, setReportData] = useState<CarListing | null>(null);
//   const [reportLoading, setReportLoading] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");

//   // Loading states for actions
//   const [approving, setApproving] = useState(false);
//   const [rejecting, setRejecting] = useState(false);
 
//   // ---------------- FETCH DATA ----------------
//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const listingsRes = await getFranchiseCarListings(activeTab);
//       if (listingsRes.success) {
//         setListings(listingsRes.data || []);
//       } else {
//         throw new Error(listingsRes.message || "Failed to fetch listings");
//       }
 
//       const inspectorsRes = await getMyInspectors();
//       if (inspectorsRes.success) {
//         setInspectors(inspectorsRes.data || []);
//       } else {
//         toast({ title: "Failed to load inspectors", variant: "destructive" });
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to load data.");
//       toast({ title: "Failed to load listings", description: err.message, variant: "destructive" });
//       setListings([]);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);
 
//   // ---------------- HELPERS ----------------
//   const getInspectorName = (id?: string) =>
//     inspectors.find(i => i._id === id)?.fullName || "Unassigned";
 
//   const getInspectorPhone = (id?: string) =>
//     inspectors.find(i => i._id === id)?.phone || "N/A";
 
//   const formatDate = (d?: string) =>
//     d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A";

//   const formatPrice = (price?: number) => {
//     if (price === undefined || price === null) return "N/A";
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };
 
//   // ---------------- ACTIONS ----------------
 
//   const handleViewReport = async (car: CarListing) => {
//     setSelectedCar(car);
//     setReportLoading(true);
//     setReportOpen(true);
//     try {
//       const res = await getCompletedInspectionByCarId(car._id);
//       if (res.success) {
//         setReportData(res.data);
//       } else {
//         throw new Error(res.message || "Report fetch failed");
//       }
//     } catch (error: any) {
//       toast({ title: "Report fetch karne mein error aayi", description: error.message, variant: "destructive" });
//       setReportOpen(false);
//       setReportData(null);
//     } finally {
//       setReportLoading(false);
//     }
//   };
 
//   const handleSchedule = async () => {
//     if (!selectedCar || !scheduleData.date || !scheduleData.time) {
//       toast({ title: "Please select date and time", variant: "destructive" });
//       return;
//     }
//     try {
//       const res = await scheduleInspection({ carId: selectedCar._id, ...scheduleData });
//       if (res.success) {
//         toast({ title: "Inspection scheduled successfully" });
//         setScheduleOpen(false);
//         setScheduleData({ date: "", time: "" });
//         fetchData();
//       } else {
//         throw new Error(res.message || "Schedule failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Schedule failed", description: err.message, variant: "destructive" });
//     }
//   };
 
//   const handleAssign = async () => {
//     if (!selectedCar || !selectedInspectorId) {
//       toast({ title: "Please select an inspector", variant: "destructive" });
//       return;
//     }
//     try {
//       const res = await assignInspector({ carId: selectedCar._id, inspectorId: selectedInspectorId });
//       if (res.success) {
//         toast({ title: "Inspector assigned successfully" });
//         setAssignOpen(false);
//         setSelectedInspectorId("");
//         fetchData();
//       } else {
//         throw new Error(res.message || "Assignment failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Assignment failed", description: err.message, variant: "destructive" });
//     }
//   };
 
//   const handleApproveGoLive = async () => {
//     if (!selectedCar || qualityRating < 1 || qualityRating > 10) {
//       toast({ title: "Invalid quality rating", variant: "destructive" });
//       return;
//     }
//     setApproving(true);
//     try {
//       const res = await approveCarListing(selectedCar._id, { qualityRating: qualityRating });
//       if (res.success) {
//         toast({ title: "Car is now LIVE for buyers! 🚀" });
//         setApproveOpen(false);
//         setReportOpen(false);
//         fetchData();
//       } else {
//         throw new Error(res.message || "Approval failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Approval failed", description: err.message, variant: "destructive" });
//     } finally {
//       setApproving(false);
//     }
//   };

//   const handleRejectListing = async () => {
//     if (!selectedCar || !rejectReason.trim()) {
//       toast({ title: "Rejection reason is required", variant: "destructive" });
//       return;
//     }
//     setRejecting(true);
//     try {
//       const res = await rejectCarListing(selectedCar._id, rejectReason);
//       if (res.success) {
//         toast({ title: "Listing Rejected", description: "Car listing has been moved to rejected status." });
//         setRejectOpen(false);
//         setRejectReason("");
//         fetchData();
//       } else {
//         throw new Error(res.message || "Rejection failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Rejection failed", description: err.message, variant: "destructive" });
//     } finally {
//       setRejecting(false);
//     }
//   };
  
//   // ---------------- UI ----------------
//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Listing & Inspection Management</h1>
//         <Button onClick={fetchData} variant="outline" size="sm">Refresh</Button>
//       </div>
 
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="bg-slate-100 p-1">
//           {["pending_verification", "approved", "live", "rejected", "sold"].map(t => (
//             <TabsTrigger key={t} value={t} className="capitalize">
//               {t.replace("_", " ")}
//             </TabsTrigger>
//           ))}
//         </TabsList>
 
//         <TabsContent value={activeTab} className="mt-6">
//           {loading ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {[1, 2, 3].map(i => <Skeleton key={i} className="h-80 w-full rounded-xl" />)}
//             </div>
//           ) : error ? (
//             <div className="text-center py-20 text-destructive border-2 border-dashed rounded-xl bg-red-50">
//                 <AlertCircle className="w-10 h-10 mx-auto mb-4" />
//                 <p className="font-medium text-lg">{error}</p>
//                 <p className="text-sm">Please try refreshing the page.</p>
//               </div>
//           ) : listings.length === 0 ? (
//             <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl">
//               No cars found in this category.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {listings.map(car => (
//                 <Card key={car._id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="h-48 relative">
//                     <img src={car.images?.[0] || "https://placehold.co/600x400?text=No+Image"} className="w-full h-full object-cover" alt="car" />
//                     <Badge className="absolute top-3 right-3 capitalize shadow-md" variant={car.inspectionStatus === 'completed' ? 'success' : 'secondary'}>
//                       {car.inspectionStatus}
//                     </Badge>
//                     <Badge className="absolute top-1 left-3 capitalize shadow-md" variant={car.status === 'live' ? 'success' : 'default'}>
//                       {car.status}
//                     </Badge>
//                   </div>
 
//                   <CardContent className="p-5 space-y-4">
//                     <div>
//                       <h3 className="font-bold text-xl">{car.make} {car.model}</h3>
//                       <p className="text-sm text-muted-foreground font-medium">
//                         {car.year} • {car.fuelType} • {car.kmDriven?.toLocaleString()} km
//                       </p>
//                     </div>
 
//                     {/* INSPECTION BADGE INFO */}
//                     {(car.scheduledDate || car.assignedInspector) && car.inspectionStatus !== 'completed' && (
//                       <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-1.5 text-xs text-blue-800">
//                         <p className="font-bold flex items-center gap-1.5">
//                           <ClipboardCheck className="w-4 h-4" /> Inspection Details
//                         </p>
//                         {car.scheduledDate && (
//                           <p className="flex items-center gap-1 font-medium">
//                             <CalendarDays className="w-3.5 h-3.5" /> {formatDate(car.scheduledDate)} at {car.scheduledTime}
//                           </p>
//                         )}
//                         {car.assignedInspector && (
//                           <div className="flex flex-col gap-1">
//                             <p className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {getInspectorName(car.assignedInspector)}</p>
//                             <p className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {getInspectorPhone(car.assignedInspector)}</p>
//                           </div>
//                         )}
//                       </div>
//                     )}
 
//                     {/* STATUS BASED ACTIONS */}
//                     <div className="space-y-2 pt-2">
//                       {/* Conditional rendering for primary inspection actions */}
//                       {car.inspectionStatus === "pending" ? (
//                         <Button className="w-full" onClick={() => { setSelectedCar(car); setScheduleOpen(true); }}>
//                           <CalendarDays className="w-4 h-4 mr-2" /> Schedule Now
//                         </Button>
//                       ) : car.inspectionStatus === "user_accepted" ? (
//                         <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => { setSelectedCar(car); setAssignOpen(true); }}>
//                           <UserPlus className="w-4 h-4 mr-2" /> Assign Inspector
//                         </Button>
//                       ) : car.inspectionStatus === "completed" && car.status !== "live" ? (
//                         <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => handleViewReport(car)}>
//                           <FileText className="w-4 h-4 mr-2" /> View Report & Make Live
//                         </Button>
//                       ) : null /* Render nothing if no specific inspection action is pending */
//                       }
 
//                       <div className="grid grid-cols-2 gap-2">
//                         {/* Generic Details Button (always available) */}
//                         <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedCar(car); setDetailsOpen(true); }}>
//                           <Eye className="w-4 h-4 mr-2" /> Details
//                         </Button>
//                         {/* Reject Button (only for pending_verification tab) */}
//                         {activeTab === "pending_verification" && (
//                              <Button variant="ghost" size="sm" className="w-full text-destructive hover:bg-red-50" onClick={() => { setSelectedCar(car); setRejectOpen(true); }}>
//                                 <XCircle className="w-4 h-4 mr-2" /> Reject
//                             </Button>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
 
//       {/* ------------------- DIALOGS (MODALS) ------------------- */}

//       {/* NEW: GENERIC VIEW DETAILS DIALOG */}
//       <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="text-2xl font-bold">{selectedCar?.make} {selectedCar?.model} {selectedCar?.variant}</DialogTitle>
//             <DialogDescription className="text-muted-foreground">{selectedCar?.year} • {selectedCar?.kmDriven?.toLocaleString()} km driven</DialogDescription>
//           </DialogHeader>
//           {selectedCar && (
//             <div className="space-y-6 py-4">
//               {/* Image Gallery */}
//               <div className="grid grid-cols-3 gap-3">
//                 {selectedCar.images?.map((img, i) => (
//                   <img key={i} src={img} alt="car" className="w-full h-24 object-cover rounded-lg border border-border/50" />
//                 ))}
//               </div>

//               {/* Seller Info */}
//               <div className="p-4 rounded-xl space-y-3 bg-slate-50 border">
//                 <h4 className="font-semibold text-foreground">Seller Information</h4>
//                 <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
//                   <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{selectedCar.sellerName}</span></div>
//                   <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{selectedCar.sellerMobile}</span></div>
//                   <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{selectedCar.city}, {selectedCar.pincode}</span></div>
//                 </div>
//               </div>

//               {/* Specs */}
//               <div className="p-4 rounded-xl space-y-3 bg-slate-50 border">
//                 <h4 className="font-semibold text-foreground">Car Specifications</h4>
//                 <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
//                   <div className="flex items-center gap-2"><Fuel className="w-4 h-4" /><span>Fuel: {selectedCar.fuelType}</span></div>
//                   <div className="flex items-center gap-2"><Gauge className="w-4 h-4" /><span>Transmission: {selectedCar.transmission}</span></div>
//                   <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>Owners: {selectedCar.noOfOwners}</span></div>
//                   {selectedCar.color && <div className="flex items-center gap-2"><Palette className="w-4 h-4" /><span>Color: {selectedCar.color}</span></div>}
//                   <div className="flex items-center gap-2"><Hash className="w-4 h-4" /><span>Reg: {selectedCar.registrationNumber}</span></div>
//                   <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>Reg City: {selectedCar.registrationCity}</span></div>
//                 </div>
//               </div>

//               {/* Pricing */}
//               <div className="p-4 rounded-xl flex items-center gap-3 bg-green-50 border border-green-200">
//                 <IndianRupee className="w-5 h-5 text-green-700" />
//                 <span className="text-2xl font-bold text-green-700">{formatPrice(selectedCar.expectedPrice)}</span>
//                 {selectedCar.negotiable && <Badge variant="secondary">Negotiable</Badge>}
//               </div>

//               {/* Description */}
//               {selectedCar.description && (
//                 <div className="space-y-2">
//                   <h4 className="font-semibold text-foreground">Description</h4>
//                   <p className="text-sm text-muted-foreground leading-relaxed">{selectedCar.description}</p>
//                 </div>
//               )}
//             </div>
//           )}
//           <DialogFooter><Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button></DialogFooter>
//         </DialogContent>
//       </Dialog>
 
//       {/* 1. VIEW INSPECTION REPORT DIALOG (Existing) */}
//       <Dialog open={reportOpen} onOpenChange={setReportOpen}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="text-2xl flex items-center gap-2">
//               <ClipboardCheck className="text-blue-600 w-6 h-6" />
//               Inspection Report for {reportData?.make} {reportData?.model}
//             </DialogTitle>
//           </DialogHeader>
 
//           {reportLoading ? (
//             <div className="py-20 flex flex-col items-center justify-center gap-4">
//               <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
//               <p className="text-muted-foreground font-medium">Fetching inspection details...</p>
//             </div>
//           ) : reportData ? (
//             <div className="space-y-6">
 
//               {/* Seller & Car Details */}
//               <div className="space-y-4 bg-white p-4 rounded-xl border">
//                 <h4 className="font-bold text-sm mb-2 underline underline-offset-4">Seller & Car Details</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <div className="text-sm text-slate-600 space-y-1">
//                     <p><b>Seller Name:</b> {reportData.sellerName}</p>
//                     <p><b>Mobile:</b> {reportData.sellerMobile}</p>
//                     {reportData.sellerEmail && <p><b>Email:</b> {reportData.sellerEmail}</p>}
//                     <p><b>City:</b> {reportData.city}</p>
//                     <p><b>Pincode:</b> {reportData.pincode}</p>
//                     <p><b>Make:</b> {reportData.make}</p>
//                     <p><b>Model:</b> {reportData.model}</p>
//                     <p><b>Variant:</b> {reportData.variant || 'N/A'}</p>
//                   </div>
//                   <div className="text-sm text-slate-600 space-y-1">
//                     <p><b>Year:</b> {reportData.year}</p>
//                     <p><b>Kilometers Driven:</b> {reportData.kmDriven?.toLocaleString()}</p>
//                     <p><b>Fuel Type:</b> {reportData.fuelType}</p>
//                     <p><b>Transmission:</b> {reportData.transmission}</p>
//                     <p><b>Registration City:</b> {reportData.registrationCity}</p>
//                     <p><b>Registration Number:</b> {reportData.registrationNumber}</p>
//                     <p><b>No. of Owners:</b> {reportData.noOfOwners}</p>
//                     <p><b>Expected Price:</b> {formatPrice(reportData.expectedPrice)} {reportData.negotiable ? "(Negotiable)" : "(Fixed)"}</p>
//                   </div>
//                 </div>
//                 {reportData.description && (
//                   <p className="text-sm text-slate-600 mt-2"><b>Description:</b> {reportData.description}</p>
//                 )}
//                 {reportData.images?.length > 0 && (
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
//                     {reportData.images.map((img, idx) => (
//                       <img key={idx} src={img} alt="car" className="rounded-lg border object-cover h-30 w-full" />
//                     ))}
//                   </div>
//                 )}
              
//                 {/* Listed By Info */}
//                 {reportData.listedBy && (
//                   <div className="bg-slate-50 p-4 rounded-xl border mt-4 text-sm text-slate-600">
//                     <h4 className="font-bold text-sm mb-2 underline underline-offset-4">Listed By</h4>
//                     <p><b>ID:</b> {reportData.listedBy._id.slice(-6)}</p>
//                     <p><b>Email:</b> {reportData.listedBy.email}</p>
//                     <p><b>Phone:</b> {reportData.listedBy.phone}</p>
//                   </div>
//                 )}
//               </div>
             
//               {/* Summary Header */}
//               <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border">
//                 <div>
//                   <Label className="text-xs uppercase text-slate-500">Vehicle Info</Label>
//                   <p className="font-bold text-lg">{reportData.make} {reportData.model}</p>
//                   <p className="text-sm text-slate-600">{reportData.year} Model • {formatPrice(reportData.expectedPrice)}</p>
//                 </div>
//                 <div>
//                   <Label className="text-xs uppercase text-slate-500">Inspector Info</Label>
//                   <p className="font-bold text-lg">{reportData.inspectionReport?.inspectorName || 'N/A'}</p>
//                   <p className="font-bold text-sm">{reportData.inspectionReport?.inspector?.phone || 'N/A'}</p>
//                   <p className="text-sm text-slate-600">ID: {reportData.inspectionReport?.inspector?._id?.slice(-6) || 'N/A'}</p>
//                 </div>
//               </div>
 
//               {/* Health Scores */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 {[
//                   { label: "Exterior", score: reportData.inspectionReport?.exteriorScore, icon: CarFront },
//                   { label: "Interior", score: reportData.inspectionReport?.interiorScore, icon: User },
//                   { label: "Engine", score: reportData.inspectionReport?.engineMechanicalScore, icon: Gauge },
//                   { label: "Tyres", score: reportData.inspectionReport?.tyresBrakesScore, icon: Gauge },
//                 ].map((item) => (
//                   <div key={item.label} className="bg-white border-2 border-slate-100 rounded-xl p-3 text-center">
//                     <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">{item.label}</p>
//                     <p className="text-2xl font-black text-blue-600">{item.score !== undefined ? item.score : 'N/A'}<span className="text-xs text-slate-400">/10</span></p>
//                   </div>
//                 ))}
//               </div>
 
//               {/* Technical Details */}
//               <div className="space-y-3 bg-slate-50 p-4 rounded-xl border">
//                 <h4 className="font-bold text-sm flex items-center gap-2 underline underline-offset-4">
//                   Technical Checklist
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                     <span className="text-slate-600">Odometer: <b>{reportData.inspectionReport?.odometerReading?.toLocaleString() || 'N/A'} km</b></span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                     <span className="text-slate-600">Tyre Condition: <b>{reportData.inspectionReport?.tyreCondition || 'N/A'}</b></span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <AlertCircle className="w-4 h-4 text-orange-500" />
//                     <span className="text-slate-600">Accident History: <b>{reportData.inspectionReport?.accidentHistory || 'N/A'}</b></span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                     <span className="text-slate-600">VIN Verified: <b>{reportData.inspectionReport?.vinChassisVerified ? "Yes" : "No"}</b></span>
//                   </div>
//                 </div>
//                 <div className="mt-3 p-3 bg-orange-100/50 border border-orange-200 rounded-lg">
//                   <p className="text-xs font-bold text-orange-800 uppercase">Inspector's Remarks:</p>
//                   <p className="text-sm text-orange-900 mt-1 italic">"{reportData.inspectionReport?.minorIssues || "No major issues reported by inspector."}"</p>
//                 </div>
//               </div>
 
//                 {/* 📸 PHOTOS */}
//                 {reportData.inspectionReport?.photos?.length > 0 && (
//                   <div>
//                     <h4 className="font-bold text-sm mb-2">Inspection Photos</h4>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                       {reportData.inspectionReport.photos.map((img, i) => (
//                         <img
//                           key={i}
//                           src={img}
//                           alt="inspection"
//                           className="rounded-lg border object-cover h-32 w-full"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}
 
//               <DialogFooter className="flex gap-2">
//                 <Button variant="outline" onClick={() => setReportOpen(false)} className="flex-1">Close</Button>
//                 <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
//                   onClick={() => {
//                     const avgScore = (
//                       (reportData.inspectionReport?.exteriorScore || 0) +
//                       (reportData.inspectionReport?.interiorScore || 0) +
//                       (reportData.inspectionReport?.engineMechanicalScore || 0) +
//                       (reportData.inspectionReport?.tyresBrakesScore || 0)
//                     ) / 4;
//                     setQualityRating(Math.round(avgScore) || 7);
//                     setSelectedCar(reportData);
//                     setApproveOpen(true);
//                   }}>
//                   <Check className="w-4 h-4 mr-2" /> Approve & Go Live
//                 </Button>
//               </DialogFooter>
//             </div>
//           ) : (
//             <div className="text-center py-10">Report data not found.</div>
//           )}
//         </DialogContent>
//       </Dialog>
 
//       {/* 2. SCHEDULE INSPECTION DIALOG (Existing) */}
//       <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader><DialogTitle>Schedule Inspection for {selectedCar?.make} {selectedCar?.model}</DialogTitle></DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="schedule-date">Date</Label>
//               <Input id="schedule-date" type="date" className="w-full" onChange={e => setScheduleData({ ...scheduleData, date: e.target.value })} value={scheduleData.date} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="schedule-time">Time Slot</Label>
//               <Input id="schedule-time" type="time" className="w-full" onChange={e => setScheduleData({ ...scheduleData, time: e.target.value })} value={scheduleData.time} />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleSchedule} className="w-full">Send Schedule to User</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
 
//       {/* 3. ASSIGN INSPECTOR DIALOG (Existing) */}
//       <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
//         <DialogContent>
//           <DialogHeader><DialogTitle>Select Inspector for {selectedCar?.make} {selectedCar?.model}</DialogTitle></DialogHeader>
//           <div className="py-4">
//             <select
//               className="w-full border p-3 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
//               onChange={e => setSelectedInspectorId(e.target.value)}
//               value={selectedInspectorId}
//             >
//               <option value="">-- Choose an Inspector --</option>
//               {inspectors.map(i => (
//                 <option key={i._id} value={i._id}>{i.fullName} ({i.phone})</option>
//               ))}
//             </select>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleAssign} disabled={!selectedInspectorId} className="w-full bg-purple-600">
//               Confirm Assignment
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
 
//       {/* 4. FINAL APPROVAL DIALOG (MAKE LIVE) (Existing) */}
//       <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Final Approval: Go Live for {selectedCar?.make} {selectedCar?.model}</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-5 py-4">
//             <div className="space-y-2">
//               <Label className="font-bold" htmlFor="quality-rating-final">Assign Quality Rating (1-10)</Label>
//               <Input
//                 id="quality-rating-final"
//                 type="number"
//                 min={1}
//                 max={10}
//                 value={qualityRating}
//                 onChange={e => setQualityRating(parseInt(e.target.value))}
//                 className="text-lg font-bold"
//               />
//               <p className="text-xs text-muted-foreground italic">Higher rating helps in faster sales.</p>
//             </div>
           
//             <div className="p-3 bg-green-50 rounded-lg border border-green-200">
//               <p className="text-sm text-green-800 flex gap-2">
//                 <CheckCircle2 className="w-5 h-5" />
//                 This car will be listed on the main marketplace for all customers to see.
//               </p>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleApproveGoLive} disabled={approving} className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
//               {approving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "🚀 Publish Listing Now"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* NEW: REJECT LISTING DIALOG */}
//       <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-destructive flex items-center gap-2"><XCircle className="w-5 h-5" /> Reject Listing: {selectedCar?.make} {selectedCar?.model}</DialogTitle>
//           </DialogHeader>
//           <div className="py-4">
//             <Label htmlFor="reject-reason">Rejection Reason</Label>
//             <textarea
//               id="reject-reason"
//               placeholder="Enter rejection reason (required)..."
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//               className="w-full p-2 border rounded-md min-h-[120px]"
//             />
//           </div>
//           <DialogFooter className="gap-3">
//             <Button variant="outline" onClick={() => { setRejectOpen(false); setRejectReason(""); }}>Cancel</Button>
//             <Button variant="destructive" onClick={handleRejectListing} disabled={rejecting || !rejectReason.trim()}>
//               {rejecting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Reject Listing"}
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
//   Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Eye, XCircle, Loader2, UserPlus, CalendarDays,
//   Check, ClipboardCheck, User, Phone, FileText,
//   CheckCircle2, AlertCircle, Gauge, CarFront,
//   MapPin, Fuel, Users, Palette, Hash, IndianRupee,
//   Edit3, MessageSquareText // Added Edit3 for edit button, MessageSquareText for inquiries
// } from "lucide-react";
 
// import {
//   getFranchiseCarListings,
//   approveCarListing, // Flexible approve function
//   scheduleInspection,
//   assignInspector,
//   getMyInspectors,
//   getCompletedInspectionByCarId,
//   rejectCarListing,
//   editFranchiseListing, // Imported for edit functionality
//   getCarInquiries, // Imported for inquiries functionality
// } from "@/services/franchiseService";

// // Interface for a single Car Inquiry (UPDATED)
// interface CarInquiry {
//   _id: string;
//   carId: string;
//   buyerName: string;
//   buyerPhone: string;
//   buyerEmail?: string;
//   buyerMessage?: string; // Corrected to buyerMessage
//   status: string; // Added status field
//   createdAt: string; // Corrected to createdAt
// }

// // Interface for the entire Inquiry API Response (NEW)
// interface CarInquiriesResponse {
//   success: boolean;
//   car: {
//     make: string;
//     model: string;
//     variant: string;
//     year: number;
//   };
//   totalInquiries: number;
//   inquiries: CarInquiry[];
// }


// // Enhanced CarListing Interface
// interface CarListing {
//   _id: string;
//   sellerName: string;
//   sellerMobile: string;
//   sellerEmail?: string;
//   city: string;
//   pincode: string;
//   make: string;
//   model: string;
//   variant?: string;
//   year: number;
//   kmDriven: number;
//   fuelType: string;
//   rejectionReason?: string;
//   approvalRemark?: string;
//   transmission: string;
//   registrationCity: string;
//   registrationNumber: string;
//   noOfOwners: number;
//   color?: string;
//   expectedPrice: number;
//   negotiable: boolean;
//   description?: string;
//   images: string[];
//   inspectionVideo?: string;
//   status: "pending_verification" | "approved" | "live" | "sold" | "rejected";
//   qualityRating?: number;
//   createdAt: string;

//   inspectionStatus: "pending" | "user_accepted" | "scheduled" | "assigned" | "completed" | "rejected";
//   scheduledDate?: string;
//   scheduledTime?: string;
//   assignedInspector?: string;
//   listedBy?: {
//     _id: string;
//     email: string;
//     phone: string;
//   };
//   inspectionReport?: {
//     _id: string;
//     carId: string;
//     inspector?: { _id: string; fullName: string; phone: string; email: string; };
//     inspectorName?: string;
//     odometerReading?: number;
//     exteriorScore?: number;
//     interiorScore?: number;
//     engineMechanicalScore?: number;
//     tyresBrakesScore?: number;
//     tyreCondition?: string;
//     accidentHistory?: string;
//     vinChassisVerified?: boolean;
//     minorIssues?: string;
//     photos?: string[];
//   };
// }

// // Interface for inspector data
// interface Inspector {
//   _id: string;
//   fullName: string;
//   phone: string;
//   email: string;
// }

// // Define the types for your tabs
// type TabStatus = "pending_verification" | "approved" | "live" | "sold" | "rejected";

// // Configuration for tab badges (used for both tabs and card status badge)
// const statusConfig: Record<TabStatus, { label: string; color: string; icon: React.ReactNode }> = {
//   pending_verification: { label: "Pending Verification", color: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30", icon: <Loader2 className="w-3 h-3 animate-spin" /> },
//   approved: { label: "Approved", color: "bg-blue-500/20 text-blue-700 border-blue-500/30", icon: <CheckCircle2 className="w-3 h-3" /> },
//   live: { label: "Live", color: "bg-green-500/20 text-green-700 border-green-500/30", icon: <CheckCircle2 className="w-3 h-3" /> }, // Green for live
//   sold: { label: "Sold", color: "bg-indigo-500/20 text-indigo-700 border-indigo-500/30", icon: <CheckCircle2 className="w-3 h-3" /> },
//   rejected: { label: "Rejected", color: "bg-red-500/20 text-red-700 border-red-500/30", icon: <XCircle className="w-3 h-3" /> },
// };
 
// const ListingVerification = () => {
//   const { toast } = useToast();
 
//   const [activeTab, setActiveTab] = useState<TabStatus>("pending_verification");
//   const [listings, setListings] = useState<CarListing[]>([]);
//   const [inspectors, setInspectors] = useState<Inspector[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
 
//   // Dialog open/close states
//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
//   const [scheduleOpen, setScheduleOpen] = useState(false);
//   const [assignOpen, setAssignOpen] = useState(false);
//   const [approveOpen, setApproveOpen] = useState(false); // For final 'Go Live' approval
//   const [rejectOpen, setRejectOpen] = useState(false);
//   const [reportOpen, setReportOpen] = useState(false);
//   const [detailsOpen, setDetailsOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [inquiriesOpen, setInquiriesOpen] = useState(false);

//   // Data states
//   const [scheduleData, setScheduleData] = useState({ date: "", time: "" });
//   const [selectedInspectorId, setSelectedInspectorId] = useState("");
//   const [qualityRating, setQualityRating] = useState(7);
//   const [reportData, setReportData] = useState<CarListing | null>(null);
//   const [reportLoading, setReportLoading] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [editForm, setEditForm] = useState({
//     make: "",
//     model: "",
//     variant: "",
//     year: 0,
//     kmDriven: 0,
//     expectedPrice: 0,
//   });
//   const [carInquiries, setCarInquiries] = useState<CarInquiry[]>([]);
//   const [totalInquiriesCount, setTotalInquiriesCount] = useState(0); // NEW: To store total inquiries count
//   const [inquiriesLoading, setInquiriesLoading] = useState(false);

//   // Loading states for actions
//   const [approving, setApproving] = useState(false);
//   const [rejecting, setRejecting] = useState(false);
//   const [editing, setEditing] = useState(false);
 
//   // ---------------- FETCH DATA ----------------
//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const listingsRes = await getFranchiseCarListings(activeTab);
//       if (listingsRes.success) {
//         setListings(listingsRes.data || []);
//       } else {
//         throw new Error(listingsRes.message || "Failed to fetch listings");
//       }
 
//       // Only fetch inspectors if needed (e.g., when viewing pending or user_accepted)
//       if (activeTab === "pending_verification") {
//         const inspectorsRes = await getMyInspectors();
//         if (inspectorsRes.success) {
//           setInspectors(inspectorsRes.data || []);
//         } else {
//           toast({ title: "Failed to load inspectors", variant: "destructive" });
//         }
//       } else {
//         setInspectors([]);
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to load data.");
//       toast({ title: "Failed to load listings", description: err.message, variant: "destructive" });
//       setListings([]);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);
 
//   // ---------------- HELPERS ----------------
//   const getInspectorName = (id?: string) =>
//     inspectors.find(i => i._id === id)?.fullName || "Unassigned";
 
//   const getInspectorPhone = (id?: string) =>
//     inspectors.find(i => i._id === id)?.phone || "N/A";
 
//   const formatDate = (d?: string) =>
//     d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A";

//   const formatDateTime = (dt?: string) => {
//     if (!dt) return "N/A";
//     const date = new Date(dt);
//     return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) +
//            " " +
//            date.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', hour12: true });
//   };

//   const formatPrice = (price?: number) => {
//     if (price === undefined || price === null) return "N/A";
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };
 
//   // ---------------- ACTIONS ----------------
 
//   const handleViewReport = async (car: CarListing) => {
//     setSelectedCar(car);
//     setReportLoading(true);
//     setReportOpen(true);
//     try {
//       const res = await getCompletedInspectionByCarId(car._id);
//       if (res.success) {
//         setReportData(res.data);
//       } else {
//         throw new Error(res.message || "Report fetch failed");
//       }
//     } catch (error: any) {
//       toast({ title: "Report fetch karne mein error aayi", description: error.message, variant: "destructive" });
//       setReportOpen(false);
//       setReportData(null);
//     } finally {
//       setReportLoading(false);
//     }
//   };
 
//   const handleSchedule = async () => {
//     if (!selectedCar || !scheduleData.date || !scheduleData.time) {
//       toast({ title: "Please select date and time", variant: "destructive" });
//       return;
//     }
//     try {
//       const res = await scheduleInspection({ carId: selectedCar._id, scheduledDate: scheduleData.date, scheduledTime: scheduleData.time });
//       if (res.success) {
//         toast({ title: "Inspection scheduled successfully" });
//         setScheduleOpen(false);
//         setScheduleData({ date: "", time: "" });
//         fetchData();
//       } else {
//         throw new Error(res.message || "Schedule failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Schedule failed", description: err.message, variant: "destructive" });
//     }
//   };
 
//   const handleAssign = async () => {
//     if (!selectedCar || !selectedInspectorId) {
//       toast({ title: "Please select an inspector", variant: "destructive" });
//       return;
//     }
//     try {
//       const res = await assignInspector({ carId: selectedCar._id, inspectorId: selectedInspectorId });
//       if (res.success) {
//         toast({ title: "Inspector assigned successfully" });
//         setAssignOpen(false);
//         setSelectedInspectorId("");
//         fetchData();
//       } else {
//         throw new Error(res.message || "Assignment failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Assignment failed", description: err.message, variant: "destructive" });
//     }
//   };
 
//   const handleApproveGoLive = async () => {
//     if (!selectedCar || qualityRating < 1 || qualityRating > 10) {
//       toast({ title: "Invalid quality rating", variant: "destructive" });
//       return;
//     }
//     setApproving(true);
//     try {
//       const res = await approveCarListing(selectedCar._id, { qualityRating: qualityRating });
//       if (res.success) {
//         toast({ title: "Car is now LIVE for buyers! 🚀" });
//         setApproveOpen(false);
//         setReportOpen(false);
//         fetchData();
//       } else {
//         throw new Error(res.message || "Approval failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Approval failed", description: err.message, variant: "destructive" });
//     } finally {
//       setApproving(false);
//     }
//   };

//   const handleRejectListing = async () => {
//     if (!selectedCar || !rejectReason.trim()) {
//       toast({ title: "Rejection reason is required", variant: "destructive" });
//       return;
//     }
//     setRejecting(true);
//     try {
//       const res = await rejectCarListing(selectedCar._id, rejectReason);
//       if (res.success) {
//         toast({ title: "Listing Rejected", description: "Car listing has been moved to rejected status." });
//         setRejectOpen(false);
//         setRejectReason("");
//         fetchData();
//       } else {
//         throw new Error(res.message || "Rejection failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Rejection failed", description: err.message, variant: "destructive" });
//     } finally {
//       setRejecting(false);
//     }
//   };

//   const openEditDialog = (car: CarListing) => {
//     setSelectedCar(car);
//     setEditForm({
//       make: car.make,
//       model: car.model,
//       variant: car.variant || '',
//       year: car.year,
//       kmDriven: car.kmDriven,
//       expectedPrice: car.expectedPrice,
//     });
//     setEditOpen(true);
//   };

//   const handleEditSubmit = async () => {
//     if (!selectedCar) return;
//     setEditing(true);
//     try {
//       const res = await editFranchiseListing(selectedCar._id, editForm);
//       if (res.success) {
//         toast({ title: "Listing Updated", description: "Car details have been successfully updated." });
//         setEditOpen(false);
//         fetchData();
//       } else {
//         throw new Error(res.message || "Edit failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Edit failed", description: err.message, variant: "destructive" });
//     } finally {
//       setEditing(false);
//     }
//   };

//   const handleViewInquiries = async (car: CarListing) => {
//     setSelectedCar(car);
//     setInquiriesLoading(true);
//     setInquiriesOpen(true);
//     setCarInquiries([]); // Clear previous inquiries
//     setTotalInquiriesCount(0); // Clear previous count
//     try {
//       const res: CarInquiriesResponse = await getCarInquiries(car._id); // Type assertion for response
//       if (res.success) {
//         setCarInquiries(res.inquiries || []); // Access the 'inquiries' array
//         setTotalInquiriesCount(res.totalInquiries || 0); // Set total count
//       } else {
//         throw new Error(res.message || "Failed to fetch inquiries");
//       }
//     } catch (error: any) {
//       toast({ title: "Failed to fetch inquiries", description: error.message, variant: "destructive" });
//       setInquiriesOpen(false);
//     } finally {
//       setInquiriesLoading(false);
//     }
//   };
  
//   // ---------------- UI ----------------
//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Listing & Inspection Management</h1>
//         <Button onClick={fetchData} variant="outline" size="sm">Refresh</Button>
//       </div>
 
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="bg-slate-100 p-1">
//           {["pending_verification", "approved", "live", "rejected", "sold"].map(t => (
//             <TabsTrigger key={t} value={t} className="capitalize">
//               {t.replace("_", " ")}
//             </TabsTrigger>
//           ))}
//         </TabsList>
 
//         <TabsContent value={activeTab} className="mt-6">
//           {loading ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {[1, 2, 3].map(i => <Skeleton key={i} className="h-80 w-full rounded-xl" />)}
//             </div>
//           ) : error ? (
//             <div className="text-center py-20 text-destructive border-2 border-dashed rounded-xl bg-red-50">
//                 <AlertCircle className="w-10 h-10 mx-auto mb-4" />
//                 <p className="font-medium text-lg">{error}</p>
//                 <p className="text-sm">Please try refreshing the page.</p>
//               </div>
//           ) : listings.length === 0 ? (
//             <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl">
//               No cars found in this category.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {listings.map(car => (
//                 <Card key={car._id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="h-48 relative">
//                     <img src={car.images?.[0] || "https://placehold.co/600x400?text=No+Image"} className="w-full h-full object-cover" alt="car" />
//                     {/* Inspection Status Badge */}
//                     <Badge className="absolute top-3 right-3 capitalize shadow-md" variant={car.inspectionStatus === 'completed' ? 'success' : 'secondary'}>
//                       {car.inspectionStatus}
//                     </Badge>
//                     {/* Main Car Status Badge (uses statusConfig for colors) */}
//                     <Badge className={`absolute top-1 left-3 capitalize shadow-md ${statusConfig[car.status]?.color || 'bg-gray-200 text-gray-800'}`}>
//                       {statusConfig[car.status]?.icon} <span className="ml-1">{statusConfig[car.status]?.label}</span>
//                     </Badge>
//                   </div>
 
//                   <CardContent className="p-5 space-y-4">
//                     <div>
//                       <h3 className="font-bold text-xl">{car.make} {car.model} {car.variant}</h3>
//                       <p className="text-sm text-muted-foreground font-medium">
//                         {car.year} • {car.fuelType} • {car.kmDriven?.toLocaleString()} km
//                       </p>
//                     </div>
 
//                     {/* INSPECTION BADGE INFO (only for pending_verification) */}
//                     {activeTab === "pending_verification" && (car.scheduledDate || car.assignedInspector) && car.inspectionStatus !== 'completed' && (
//                       <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-1.5 text-xs text-blue-800">
//                         <p className="font-bold flex items-center gap-1.5">
//                           <ClipboardCheck className="w-4 h-4" /> Inspection Details
//                         </p>
//                         {car.scheduledDate && (
//                           <p className="flex items-center gap-1 font-medium">
//                             <CalendarDays className="w-3.5 h-3.5" /> {formatDate(car.scheduledDate)} at {car.scheduledTime}
//                           </p>
//                         )}
//                         {car.assignedInspector && (
//                           <div className="flex flex-col gap-1">
//                             <p className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {getInspectorName(car.assignedInspector)}</p>
//                             <p className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {getInspectorPhone(car.assignedInspector)}</p>
//                           </div>
//                         )}
//                       </div>
//                     )}
 
//                     {/* STATUS BASED ACTIONS */}
//                     <div className="space-y-2 pt-2">
//                       {activeTab === "pending_verification" && (
//                         <>
//                           {car.inspectionStatus === "pending" && (
//                             <Button className="w-full" onClick={() => { setSelectedCar(car); setScheduleOpen(true); }}>
//                               <CalendarDays className="w-4 h-4 mr-2" /> Schedule Now
//                             </Button>
//                           )}
//                           {car.inspectionStatus === "user_accepted" && (
//                             <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => { setSelectedCar(car); setAssignOpen(true); }}>
//                               <UserPlus className="w-4 h-4 mr-2" /> Assign Inspector
//                             </Button>
//                           )}
//                           {car.inspectionStatus === "completed" && car.status !== "live" && (
//                             <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => handleViewReport(car)}>
//                               <FileText className="w-4 h-4 mr-2" /> View Report & Make Live
//                             </Button>
//                           )}
//                            {/* Default Actions for Pending Verification */}
//                           <div className="grid grid-cols-2 gap-2">
//                             <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedCar(car); setDetailsOpen(true); }}>
//                               <Eye className="w-4 h-4 mr-2" /> Details
//                             </Button>
//                             <Button variant="outline" size="sm" className="w-full" onClick={() => openEditDialog(car)}>
//                                <Edit3 className="w-4 h-4 mr-2" /> Edit
//                             </Button>
//                           </div>
//                           <Button variant="destructive" size="sm" className="w-full" onClick={() => { setSelectedCar(car); setRejectOpen(true); }}>
//                               <XCircle className="w-4 h-4 mr-2" /> Reject Listing
//                           </Button>
//                         </>
//                       )}

//                       {activeTab === "approved" && (
//                         <>
//                           {car.inspectionStatus === "completed" && (
//                             <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => handleViewReport(car)}>
//                               <FileText className="w-4 h-4 mr-2" /> View Report & Make Live
//                             </Button>
//                           )}
//                            <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedCar(car); setDetailsOpen(true); }}>
//                               <Eye className="w-4 h-4 mr-2" /> View Details
//                             </Button>
//                         </>
//                       )}
                      
//                       {activeTab === "live" && (
//                         <>
//                           {car.inspectionStatus === "completed" && (
//                             <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => handleViewReport(car)}>
//                               <FileText className="w-4 h-4 mr-2" /> View Report
//                             </Button>
//                           )}
//                            <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedCar(car); setDetailsOpen(true); }}>
//                               <Eye className="w-4 h-4 mr-2" /> View Details
//                             </Button>
//                             <Button className="w-full bg-teal-600 hover:bg-teal-700 font-bold mt-2" onClick={() => handleViewInquiries(car)}>
//                                 <MessageSquareText className="w-4 h-4 mr-2" /> View Inquiries
//                             </Button>
//                         </>
//                       )}

//                       {activeTab === "sold" && ( // No Approve/Make Live button for sold cars
//                         <>
//                           {car.inspectionStatus === "completed" && (
//                             <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => handleViewReport(car)}>
//                               <FileText className="w-4 h-4 mr-2" /> View Report
//                             </Button>
//                           )}
//                            <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedCar(car); setDetailsOpen(true); }}>
//                               <Eye className="w-4 h-4 mr-2" /> View Details
//                             </Button>
//                         </>
//                       )}

//                       {activeTab === "rejected" && (
//                         <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedCar(car); setDetailsOpen(true); }}>
//                            <Eye className="w-4 h-4 mr-2" /> View Details
//                         </Button>
//                       )}

//                     </div> {/* End of STATUS BASED ACTIONS */}
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
 
//       {/* ------------------- DIALOGS (MODALS) ------------------- */}

//       {/* NEW: GENERIC VIEW DETAILS DIALOG */}
//       <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="text-2xl font-bold">{selectedCar?.make} {selectedCar?.model} {selectedCar?.variant}</DialogTitle>
//             <DialogDescription className="text-muted-foreground">{selectedCar?.year} • {selectedCar?.kmDriven?.toLocaleString()} km driven</DialogDescription>
//           </DialogHeader>
//           {selectedCar && (
//             <div className="space-y-6 py-4">
//               {/* Image Gallery */}
//               <div className="grid grid-cols-3 gap-3">
//                 {selectedCar.images?.map((img, i) => (
//                   <img key={i} src={img} alt="car" className="w-full h-24 object-cover rounded-lg border border-border/50" />
//                 ))}
//               </div>

//               {/* Seller Info */}
//               <div className="p-4 rounded-xl space-y-3 bg-slate-50 border">
//                 <h4 className="font-semibold text-foreground">Seller Information</h4>
//                 <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
//                   <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{selectedCar.sellerName}</span></div>
//                   <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{selectedCar.sellerMobile}</span></div>
//                   <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{selectedCar.city}, {selectedCar.pincode}</span></div>
//                 </div>
//               </div>

//               {/* Specs */}
//               <div className="p-4 rounded-xl space-y-3 bg-slate-50 border">
//                 <h4 className="font-semibold text-foreground">Car Specifications</h4>
//                 <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
//                   <div className="flex items-center gap-2"><Fuel className="w-4 h-4" /><span>Fuel: {selectedCar.fuelType}</span></div>
//                   <div className="flex items-center gap-2"><Gauge className="w-4 h-4" /><span>Transmission: {selectedCar.transmission}</span></div>
//                   <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>Owners: {selectedCar.noOfOwners}</span></div>
//                   {selectedCar.color && <div className="flex items-center gap-2"><Palette className="w-4 h-4" /><span>Color: {selectedCar.color}</span></div>}
//                   <div className="flex items-center gap-2"><Hash className="w-4 h-4" /><span>Reg: {selectedCar.registrationNumber}</span></div>
//                   <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>Reg City: {selectedCar.registrationCity}</span></div>
//                 </div>
//               </div>

//               {/* Pricing */}
//               <div className="p-4 rounded-xl flex items-center gap-3 bg-green-50 border border-green-200">
//                 <IndianRupee className="w-5 h-5 text-green-700" />
//                 <span className="text-2xl font-bold text-green-700">{formatPrice(selectedCar.expectedPrice)}</span>
//                 {selectedCar.negotiable && <Badge variant="secondary">Negotiable</Badge>}
//               </div>

//               {/* Description */}
//               {selectedCar.description && (
//                 <div className="space-y-2">
//                   <h4 className="font-semibold text-foreground">Description</h4>
//                   <p className="text-sm text-muted-foreground leading-relaxed">{selectedCar.description}</p>
//                 </div>
//               )}
//             </div>
//           )}
//           <DialogFooter><Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button></DialogFooter>
//         </DialogContent>
//       </Dialog>
 
//       {/* 1. VIEW INSPECTION REPORT DIALOG (Enhanced UI) */}
//       <Dialog open={reportOpen} onOpenChange={setReportOpen}>
//         <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
//           <DialogHeader className="p-6 pb-0">
//             <DialogTitle className="text-3xl font-bold flex items-center gap-3 text-blue-800">
//               <ClipboardCheck className="w-8 h-8" />
//               Inspection Report
//             </DialogTitle>
//             <DialogDescription className="text-muted-foreground mt-1">
//                 Detailed inspection results for {reportData?.make} {reportData?.model} ({reportData?.year})
//             </DialogDescription>
//           </DialogHeader>
 
//           {reportLoading ? (
//             <div className="py-20 flex flex-col items-center justify-center gap-4">
//               <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
//               <p className="text-muted-foreground font-medium">Fetching inspection details...</p>
//             </div>
//           ) : reportData ? (
//             <div className="space-y-8 py-6 px-6">
              
//               {/* Car & Seller Overview */}
//               <div className="grid md:grid-cols-2 gap-6 bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
//                 <div className="space-y-2">
//                   <h4 className="font-bold text-lg text-blue-800 flex items-center gap-2"><CarFront className="w-5 h-5" /> Vehicle Overview</h4>
//                   <p className="text-sm text-slate-700"><b>Make:</b> {reportData.make}</p>
//                   <p className="text-sm text-slate-700"><b>Model:</b> {reportData.model}</p>
//                   <p className="text-sm text-slate-700"><b>Variant:</b> {reportData.variant || 'N/A'}</p>
//                   <p className="text-sm text-slate-700"><b>Year:</b> {reportData.year}</p>
//                   <p className="text-sm text-slate-700"><b>Kms Driven:</b> {reportData.kmDriven?.toLocaleString()} km</p>
//                   <p className="text-sm text-slate-700"><b>Expected Price:</b> {formatPrice(reportData.expectedPrice)} {reportData.negotiable ? "(Negotiable)" : "(Fixed)"}</p>
//                 </div>
//                 <div className="space-y-2">
//                   <h4 className="font-bold text-lg text-blue-800 flex items-center gap-2"><User className="w-5 h-5" /> Seller Information</h4>
//                   <p className="text-sm text-slate-700"><b>Name:</b> {reportData.sellerName}</p>
//                   <p className="text-sm text-slate-700"><b>Mobile:</b> {reportData.sellerMobile}</p>
//                   {reportData.sellerEmail && <p className="text-sm text-slate-700"><b>Email:</b> {reportData.sellerEmail}</p>}
//                   <p className="text-sm text-slate-700"><b>Location:</b> {reportData.city}, {reportData.pincode}</p>
//                   {reportData.listedBy && (
//                     <div className="text-xs text-slate-600 border-t border-blue-100 pt-2 mt-2">
//                       <p><b>Listed By:</b> {reportData.listedBy.email} (ID: {reportData.listedBy._id.slice(-6)})</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Health Scores Section */}
//               <div className="space-y-3">
//                 <h3 className="font-bold text-xl text-slate-800 border-b pb-2 mb-4 flex items-center gap-2"><Gauge className="w-5 h-5 text-purple-600" /> Health Scores</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {[
//                     { label: "Exterior", score: reportData.inspectionReport?.exteriorScore },
//                     { label: "Interior", score: reportData.inspectionReport?.interiorScore },
//                     { label: "Engine", score: reportData.inspectionReport?.engineMechanicalScore },
//                     { label: "Tyres/Brakes", score: reportData.inspectionReport?.tyresBrakesScore },
//                   ].map((item) => (
//                     <div key={item.label} className="bg-white border-2 border-purple-100 rounded-xl p-4 text-center shadow-sm">
//                       <p className="text-xs font-bold uppercase text-purple-500 mb-2">{item.label}</p>
//                       <p className="text-3xl font-black text-purple-600">{item.score !== undefined ? item.score : 'N/A'}<span className="text-sm text-slate-400">/10</span></p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
 
//               {/* Technical Checklist */}
//               <div className="space-y-3">
//                 <h3 className="font-bold text-xl text-slate-800 border-b pb-2 mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-600" /> Technical Checklist</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center gap-3 text-sm text-slate-700">
//                     <CheckCircle2 className="w-5 h-5 text-green-500" />
//                     <span>Odometer Reading: <b>{reportData.inspectionReport?.odometerReading?.toLocaleString() || 'N/A'} km</b></span>
//                   </div>
//                   <div className="flex items-center gap-3 text-sm text-slate-700">
//                     <CheckCircle2 className="w-5 h-5 text-green-500" />
//                     <span>Tyre Condition: <b>{reportData.inspectionReport?.tyreCondition || 'N/A'}</b></span>
//                   </div>
//                   <div className="flex items-center gap-3 text-sm text-slate-700">
//                     <AlertCircle className="w-5 h-5 text-orange-500" />
//                     <span>Accident History: <b>{reportData.inspectionReport?.accidentHistory || 'N/A'}</b></span>
//                   </div>
//                   <div className="flex items-center gap-3 text-sm text-slate-700">
//                     <CheckCircle2 className="w-5 h-5 text-green-500" />
//                     <span>VIN Chassis Verified: <b>{reportData.inspectionReport?.vinChassisVerified ? "Yes" : "No"}</b></span>
//                   </div>
//                 </div>
//                 {reportData.inspectionReport?.minorIssues && (
//                   <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-900 shadow-sm">
//                     <p className="text-sm font-bold flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Inspector's Remarks:</p>
//                     <p className="text-sm mt-1 italic">"{reportData.inspectionReport.minorIssues}"</p>
//                   </div>
//                 )}
//               </div>
 
//               {/* Inspection Photos */}
//               {reportData.inspectionReport?.photos?.length > 0 && (
//                 <div className="space-y-3">
//                   <h3 className="font-bold text-xl text-slate-800 border-b pb-2 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-gray-600" /> Inspection Photos</h3>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     {reportData.inspectionReport.photos.map((img, i) => (
//                       <img
//                         key={i}
//                         src={img}
//                         alt={`Inspection Photo ${i + 1}`}
//                         className="rounded-lg border object-cover h-36 w-full shadow-sm hover:shadow-md transition-shadow"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="text-center py-10 text-muted-foreground">Report data not found.</div>
//           )}
//           <DialogFooter className="p-6 pt-0 border-t">
//             <Button variant="outline" onClick={() => setReportOpen(false)} className="flex-1">Close</Button>
//             {reportData && selectedCar?.status !== "live" && selectedCar?.status !== "sold" && (
//               <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
//                 onClick={() => {
//                   const avgScore = (
//                     (reportData.inspectionReport?.exteriorScore || 0) +
//                     (reportData.inspectionReport?.interiorScore || 0) +
//                     (reportData.inspectionReport?.engineMechanicalScore || 0) +
//                     (reportData.inspectionReport?.tyresBrakesScore || 0)
//                   ) / 4;
//                   setQualityRating(Math.round(avgScore) || 7);
//                   setSelectedCar(reportData);
//                   setApproveOpen(true);
//                 }}>
//                 <Check className="w-4 h-4 mr-2" /> Approve & Go Live
//               </Button>
//             )}
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
 
//       {/* 2. SCHEDULE INSPECTION DIALOG (Existing) */}
//       <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader><DialogTitle>Schedule Inspection for {selectedCar?.make} {selectedCar?.model}</DialogTitle></DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="schedule-date">Date</Label>
//               <Input id="schedule-date" type="date" className="w-full" onChange={e => setScheduleData({ ...scheduleData, date: e.target.value })} value={scheduleData.date} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="schedule-time">Time Slot</Label>
//               <Input id="schedule-time" type="time" className="w-full" onChange={e => setScheduleData({ ...scheduleData, time: e.target.value })} value={scheduleData.time} />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleSchedule} className="w-full">Send Schedule to User</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
 
//       {/* 3. ASSIGN INSPECTOR DIALOG (Existing) */}
//       <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
//         <DialogContent>
//           <DialogHeader><DialogTitle>Select Inspector for {selectedCar?.make} {selectedCar?.model}</DialogTitle></DialogHeader>
//           <div className="py-4">
//             <select
//               className="w-full border p-3 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
//               onChange={e => setSelectedInspectorId(e.target.value)}
//               value={selectedInspectorId}
//             >
//               <option value="">-- Choose an Inspector --</option>
//               {inspectors.map(i => (
//                 <option key={i._id} value={i._id}>{i.fullName} ({i.phone})</option>
//               ))}
//             </select>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleAssign} disabled={!selectedInspectorId} className="w-full bg-purple-600">
//               Confirm Assignment
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
 
//       {/* 4. FINAL APPROVAL DIALOG (MAKE LIVE) (Existing) */}
//       <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Final Approval: Go Live for {selectedCar?.make} {selectedCar?.model}</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-5 py-4">
//             <div className="space-y-2">
//               <Label className="font-bold" htmlFor="quality-rating-final">Assign Quality Rating (1-10)</Label>
//               <Input
//                 id="quality-rating-final"
//                 type="number"
//                 min={1}
//                 max={10}
//                 value={qualityRating}
//                 onChange={e => setQualityRating(parseInt(e.target.value))}
//                 className="text-lg font-bold"
//               />
//               <p className="text-xs text-muted-foreground italic">Higher rating helps in faster sales.</p>
//             </div>
           
//             <div className="p-3 bg-green-50 rounded-lg border border-green-200">
//               <p className="text-sm text-green-800 flex gap-2">
//                 <CheckCircle2 className="w-5 h-5" />
//                 This car will be listed on the main marketplace for all customers to see.
//               </p>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleApproveGoLive} disabled={approving} className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
//               {approving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "🚀 Publish Listing Now"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* NEW: REJECT LISTING DIALOG */}
//       <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-destructive flex items-center gap-2"><XCircle className="w-5 h-5" /> Reject Listing: {selectedCar?.make} {selectedCar?.model}</DialogTitle>
//           </DialogHeader>
//           <div className="py-4">
//             <Label htmlFor="reject-reason">Rejection Reason</Label>
//             <textarea
//               id="reject-reason"
//               placeholder="Enter rejection reason (required)..."
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//               className="w-full p-2 border rounded-md min-h-[120px]"
//             />
//           </div>
//           <DialogFooter className="gap-3">
//             <Button variant="outline" onClick={() => { setRejectOpen(false); setRejectReason(""); }}>Cancel</Button>
//             <Button variant="destructive" onClick={handleRejectListing} disabled={rejecting || !rejectReason.trim()}>
//               {rejecting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Reject Listing"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* NEW: EDIT LISTING DIALOG */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent className="max-w-lg">
//           <DialogHeader><DialogTitle>Edit Listing Details for {selectedCar?.make} {selectedCar?.model}</DialogTitle></DialogHeader>
//           <div className="grid grid-cols-2 gap-4 py-4">
//             <div className="space-y-1">
//               <Label htmlFor="edit-make">Make</Label>
//               <Input id="edit-make" value={editForm.make} onChange={(e) => setEditForm({...editForm, make: e.target.value})} />
//             </div>
//             <div className="space-y-1">
//               <Label htmlFor="edit-model">Model</Label>
//               <Input id="edit-model" value={editForm.model} onChange={(e) => setEditForm({...editForm, model: e.target.value})} />
//             </div>
//             <div className="space-y-1">
//               <Label htmlFor="edit-variant">Variant</Label>
//               <Input id="edit-variant" value={editForm.variant} onChange={(e) => setEditForm({...editForm, variant: e.target.value})} />
//             </div>
//             <div className="space-y-1">
//               <Label htmlFor="edit-year">Year</Label>
//               <Input id="edit-year" type="number" value={editForm.year} onChange={(e) => setEditForm({...editForm, year: parseInt(e.target.value)})} />
//             </div>
//             <div className="space-y-1">
//               <Label htmlFor="edit-km">KM Driven</Label>
//               <Input id="edit-km" type="number" value={editForm.kmDriven} onChange={(e) => setEditForm({...editForm, kmDriven: parseInt(e.target.value)})} />
//             </div>
//             <div className="space-y-1">
//               <Label htmlFor="edit-price">Price (₹)</Label>
//               <Input id="edit-price" type="number" value={editForm.expectedPrice} onChange={(e) => setEditForm({...editForm, expectedPrice: parseInt(e.target.value)})} />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
//             <Button onClick={handleEditSubmit} disabled={editing}>{editing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Changes"}</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* NEW: CAR INQUIRIES DIALOG */}
//       <Dialog open={inquiriesOpen} onOpenChange={setInquiriesOpen}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="text-2xl flex items-center gap-2 text-teal-700">
//               <MessageSquareText className="w-6 h-6" /> Inquiries for {selectedCar?.make} {selectedCar?.model}
//             </DialogTitle>
//             <DialogDescription>
//                 Total: {totalInquiriesCount} inquiries. List of potential buyers who inquired about this car.
//             </DialogDescription>
//           </DialogHeader>
//           {inquiriesLoading ? (
//             <div className="py-10 flex flex-col items-center justify-center gap-4">
//               <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
//               <p className="text-muted-foreground">Fetching inquiries...</p>
//             </div>
//           ) : carInquiries.length === 0 ? (
//             <div className="py-10 text-center text-muted-foreground">No inquiries found for this car yet.</div>
//           ) : (
//             <div className="space-y-4 py-4">
//               {carInquiries.map(inquiry => (
//                 <Card key={inquiry._id} className="p-4 bg-gray-50 border border-gray-200 shadow-sm">
//                   <CardContent className="p-0 space-y-1">
//                     <p className="font-semibold text-lg">{inquiry.buyerName}</p>
//                     <p className="text-sm text-gray-700 flex items-center gap-2"><Phone className="w-4 h-4" /> {inquiry.buyerPhone}</p>
//                     {inquiry.buyerEmail && <p className="text-sm text-gray-700 flex items-center gap-2"><User className="w-4 h-4" /> {inquiry.buyerEmail}</p>}
//                     {inquiry.buyerMessage && <p className="text-sm text-gray-600 italic mt-2">"{inquiry.buyerMessage}"</p>} {/* Corrected field name */}
//                     <p className="text-xs text-gray-500 mt-2">Inquired on: {formatDateTime(inquiry.createdAt)}</p> {/* Corrected field name */}
//                     <Badge variant="outline" className="text-xs capitalize mt-1">{inquiry.status}</Badge> {/* Show status */}
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setInquiriesOpen(false)}>Close</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//     </div>
//   );
// };
 
// export default ListingVerification;




// import { useState, useEffect, useCallback } from "react";
// import { useToast } from "@/hooks/use-toast";

// // UI Components from shadcn/ui
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { AlertCircle, CheckCircle2, XCircle, Loader2 } from "lucide-react";

// // Service Imports
// import {
//   getFranchiseCarListings,
//   approveCarListing,
//   scheduleInspection,
//   assignInspector,
//   getMyInspectors,
//   getCompletedInspectionByCarId,
//   rejectCarListing,
//   editFranchiseListing,
//   getCarInquiries,
// } from "@/services/franchiseService";

// // Child Component Imports
// import ListingVerificationHeader from "../franchise/pages/ListingVerificationHeader";
// import ListingVerificationListingsGrid from "../franchise/pages/ListingVerificationListingsGrid";
// import ListingVerificationDetailsDialog from "../franchise/pages/ListingVerificationDetailsDialog";
// import ListingVerificationReportDialog from "../franchise/pages/ListingVerificationReportDialog";
// import ListingVerificationScheduleDialog from "../franchise/pages/ListingVerificationScheduleDialog";
// import ListingVerificationAssignDialog from "../franchise/pages/ListingVerificationAssignDialog";
// import ListingVerificationApproveDialog from "../franchise/pages/ListingVerificationApproveDialog";
// import ListingVerificationRejectDialog from "../franchise/pages/ListingVerificationRejectDialog";
// import ListingVerificationEditDialog from "../franchise/pages/ListingVerificationEditDialog";
// import ListingVerificationInquiriesDialog from "../franchise/pages/ListingVerificationInquiriesDialog";

// // Interface for a single Car Inquiry
// export interface CarInquiry {
//   _id: string;
//   carId: string;
//   buyerName: string;
//   buyerPhone: string;
//   buyerEmail?: string;
//   buyerMessage?: string;
//   status: string;
//   createdAt: string;
// }

// // Interface for the entire Inquiry API Response
// export interface CarInquiriesResponse {
//   success: boolean;
//   message?: string;
//   car: {
//     make: string;
//     model: string;
//     variant: string;
//     year: number;
//   };
//   totalInquiries: number;
//   inquiries: CarInquiry[];
// }

// // Enhanced CarListing Interface
// export interface CarListing {
//   _id: string;
//   sellerName: string;
//   sellerMobile: string;
//   sellerEmail?: string;
//   city: string;
//   pincode: string;
//   make: string;
//   model: string;
//   variant?: string;
//   year: number;
//   kmDriven: number;
//   fuelType: string;
//   rejectionReason?: string;
//   approvalRemark?: string;
//   transmission: string;
//   registrationCity: string;
//   registrationNumber: string;
//   noOfOwners: number;
//   color?: string;
//   expectedPrice: number;
//   negotiable: boolean;
//   description?: string;
//   images: string[];
//   inspectionVideo?: string;
//   status: "pending_verification" | "approved" | "live" | "sold" | "rejected";
//   qualityRating?: number;
//   createdAt: string;

//   inspectionStatus: "pending" | "user_accepted" | "scheduled" | "assigned" | "completed" | "rejected";
//   scheduledDate?: string;
//   scheduledTime?: string;
//   assignedInspector?: string;
//   listedBy?: {
//     _id: string;
//     email: string;
//     phone: string;
//   };
//   inspectionReport?: {
//     _id: string;
//     carId: string;
//     inspector?: { _id: string; fullName: string; phone: string; email: string; };
//     inspectorName?: string;
//     odometerReading?: number;
//     exteriorScore?: number;
//     interiorScore?: number;
//     engineMechanicalScore?: number;
//     tyresBrakesScore?: number;
//     tyreCondition?: string;
//     accidentHistory?: string;
//     vinChassisVerified?: boolean;
//     minorIssues?: string;
//     photos?: string[];
//   };
// }

// // Interface for inspector data
// export interface Inspector {
//   _id: string;
//   fullName: string;
//   phone: string;
//   email: string;
// }

// // Define the types for your tabs
// export type TabStatus = "pending_verification" | "approved" | "live" | "sold" | "rejected";

// // Configuration for tab badges (used for both tabs and card status badge)
// export const statusConfig: Record<TabStatus, { label: string; color: string; icon: React.ReactNode }> = {
//   pending_verification: { label: "Pending Verification", color: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30", icon: <Loader2 className="w-3 h-3 animate-spin" /> },
//   approved: { label: "Approved", color: "bg-blue-500/20 text-blue-700 border-blue-500/30", icon: <CheckCircle2 className="w-3 h-3" /> },
//   live: { label: "Live", color: "bg-green-500/20 text-green-700 border-green-500/30", icon: <CheckCircle2 className="w-3 h-3" /> },
//   sold: { label: "Sold", color: "bg-indigo-500/20 text-indigo-700 border-indigo-500/30", icon: <CheckCircle2 className="w-3 h-3" /> },
//   rejected: { label: "Rejected", color: "bg-red-500/20 text-red-700 border-red-500/30", icon: <XCircle className="w-3 h-3" /> },
// };

// const ListingVerification = () => {
//   const { toast } = useToast();

//   const [activeTab, setActiveTab] = useState<TabStatus>("pending_verification");
//   const [listings, setListings] = useState<CarListing[]>([]);
//   const [inspectors, setInspectors] = useState<Inspector[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Dialog open/close states
//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
//   const [scheduleOpen, setScheduleOpen] = useState(false);
//   const [assignOpen, setAssignOpen] = useState(false);
//   const [approveOpen, setApproveOpen] = useState(false);
//   const [rejectOpen, setRejectOpen] = useState(false);
//   const [reportOpen, setReportOpen] = useState(false);
//   const [detailsOpen, setDetailsOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [inquiriesOpen, setInquiriesOpen] = useState(false);

//   // Data states for dialogs
//   const [scheduleData, setScheduleData] = useState({ date: "", time: "" });
//   const [selectedInspectorId, setSelectedInspectorId] = useState("");
//   const [qualityRating, setQualityRating] = useState(7);
//   const [reportData, setReportData] = useState<CarListing | null>(null);
//   const [reportLoading, setReportLoading] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [editForm, setEditForm] = useState({
//     make: "",
//     model: "",
//     variant: "",
//     year: 0,
//     kmDriven: 0,
//     expectedPrice: 0,
//   });
//   const [carInquiries, setCarInquiries] = useState<CarInquiry[]>([]);
//   const [totalInquiriesCount, setTotalInquiriesCount] = useState(0);
//   const [inquiriesLoading, setInquiriesLoading] = useState(false);

//   // Loading states for actions
//   const [approving, setApproving] = useState(false);
//   const [rejecting, setRejecting] = useState(false);
//   const [editing, setEditing] = useState(false);

//   // ---------------- FETCH DATA ----------------
//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const listingsRes = await getFranchiseCarListings(activeTab);
//       if (listingsRes.success) {
//         setListings(listingsRes.data || []);
//       } else {
//         throw new Error(listingsRes.message || "Failed to fetch listings");
//       }

//       if (activeTab === "pending_verification" || activeTab === "approved") { // Fetch inspectors for assign/report view
//         const inspectorsRes = await getMyInspectors();
//         if (inspectorsRes.success) {
//           setInspectors(inspectorsRes.data || []);
//         } else {
//           toast({ title: "Failed to load inspectors", variant: "destructive" });
//         }
//       } else {
//         setInspectors([]);
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to load data.");
//       toast({ title: "Failed to load listings", description: err.message, variant: "destructive" });
//       setListings([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [activeTab, toast]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // ---------------- HELPERS ----------------
//   const getInspectorName = useCallback((id?: string) =>
//     inspectors.find(i => i._id === id)?.fullName || "Unassigned", [inspectors]);

//   const getInspectorPhone = useCallback((id?: string) =>
//     inspectors.find(i => i._id === id)?.phone || "N/A", [inspectors]);

//   const formatDate = useCallback((d?: string) =>
//     d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A", []);

//   const formatDateTime = useCallback((dt?: string) => {
//     if (!dt) return "N/A";
//     const date = new Date(dt);
//     return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) +
//            " " +
//            date.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', hour12: true });
//   }, []);

//   const formatPrice = useCallback((price?: number) => {
//     if (price === undefined || price === null) return "N/A";
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   }, []);

//   // ---------------- ACTION HANDLERS (passed to children) ----------------

//   const handleViewReport = async (car: CarListing) => {
//     setSelectedCar(car);
//     setReportLoading(true);
//     setReportOpen(true);
//     try {
//       const res = await getCompletedInspectionByCarId(car._id);
//       if (res.success) {
//         setReportData(res.data);
//       } else {
//         throw new Error(res.message || "Report fetch failed");
//       }
//     } catch (error: any) {
//       toast({ title: "Report fetch karne mein error aayi", description: error.message, variant: "destructive" });
//       setReportOpen(false);
//       setReportData(null);
//     } finally {
//       setReportLoading(false);
//     }
//   };

//   const handleScheduleSubmit = async () => {
//     if (!selectedCar || !scheduleData.date || !scheduleData.time) {
//       toast({ title: "Please select date and time", variant: "destructive" });
//       return;
//     }
//     try {
//       const res = await scheduleInspection({ carId: selectedCar._id, scheduledDate: scheduleData.date, scheduledTime: scheduleData.time });
//       if (res.success) {
//         toast({ title: "Inspection scheduled successfully" });
//         setScheduleOpen(false);
//         setScheduleData({ date: "", time: "" });
//         fetchData();
//       } else {
//         throw new Error(res.message || "Schedule failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Schedule failed", description: err.message, variant: "destructive" });
//     }
//   };

//   const handleAssignSubmit = async () => {
//     if (!selectedCar || !selectedInspectorId) {
//       toast({ title: "Please select an inspector", variant: "destructive" });
//       return;
//     }
//     try {
//       const res = await assignInspector({ carId: selectedCar._id, inspectorId: selectedInspectorId });
//       if (res.success) {
//         toast({ title: "Inspector assigned successfully" });
//         setAssignOpen(false);
//         setSelectedInspectorId("");
//         fetchData();
//       } else {
//         throw new Error(res.message || "Assignment failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Assignment failed", description: err.message, variant: "destructive" });
//     }
//   };

//   const handleApproveGoLive = async (carToApprove: CarListing, rating: number) => {
//     if (!carToApprove || rating < 1 || rating > 10) {
//       toast({ title: "Invalid quality rating", variant: "destructive" });
//       return;
//     }
//     setApproving(true);
//     try {
//       const res = await approveCarListing(carToApprove._id, { qualityRating: rating });
//       if (res.success) {
//         toast({ title: "Car is now LIVE for buyers! 🚀" });
//         setApproveOpen(false);
//         setReportOpen(false); // Close report dialog if open
//         fetchData();
//       } else {
//         throw new Error(res.message || "Approval failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Approval failed", description: err.message, variant: "destructive" });
//     } finally {
//       setApproving(false);
//     }
//   };

//   const handleRejectListingSubmit = async () => {
//     if (!selectedCar || !rejectReason.trim()) {
//       toast({ title: "Rejection reason is required", variant: "destructive" });
//       return;
//     }
//     setRejecting(true);
//     try {
//       const res = await rejectCarListing(selectedCar._id, rejectReason);
//       if (res.success) {
//         toast({ title: "Listing Rejected", description: "Car listing has been moved to rejected status." });
//         setRejectOpen(false);
//         setRejectReason("");
//         fetchData();
//       } else {
//         throw new Error(res.message || "Rejection failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Rejection failed", description: err.message, variant: "destructive" });
//     } finally {
//       setRejecting(false);
//     }
//   };

//   const handleEditSubmit = async () => {
//     if (!selectedCar) return;
//     setEditing(true);
//     try {
//       const res = await editFranchiseListing(selectedCar._id, editForm);
//       if (res.success) {
//         toast({ title: "Listing Updated", description: "Car details have been successfully updated." });
//         setEditOpen(false);
//         fetchData();
//       } else {
//         throw new Error(res.message || "Edit failed");
//       }
//     } catch (err: any) {
//       toast({ title: "Edit failed", description: err.message, variant: "destructive" });
//     } finally {
//       setEditing(false);
//     }
//   };

//   const handleViewInquiries = async (car: CarListing) => {
//     setSelectedCar(car);
//     setInquiriesLoading(true);
//     setInquiriesOpen(true);
//     setCarInquiries([]);
//     setTotalInquiriesCount(0);
//     try {
//       const res: CarInquiriesResponse = await getCarInquiries(car._id);
//       if (res.success) {
//         setCarInquiries(res.inquiries || []);
//         setTotalInquiriesCount(res.totalInquiries || 0);
//       } else {
//         throw new Error(res.message || "Failed to fetch inquiries");
//       }
//     } catch (error: any) {
//       toast({ title: "Failed to fetch inquiries", description: error.message, variant: "destructive" });
//       setInquiriesOpen(false);
//     } finally {
//       setInquiriesLoading(false);
//     }
//   };

//   // Callback for opening edit dialog (to pre-fill form)
//   const openEditDialog = (car: CarListing) => {
//     setSelectedCar(car);
//     setEditForm({
//       make: car.make,
//       model: car.model,
//       variant: car.variant || '',
//       year: car.year,
//       kmDriven: car.kmDriven,
//       expectedPrice: car.expectedPrice,
//     });
//     setEditOpen(true);
//   };

//   // Callback for opening approve dialog (from report dialog)
//   const openApproveDialogFromReport = (car: CarListing, avgScore: number) => {
//     setSelectedCar(car);
//     setQualityRating(Math.round(avgScore) || 7);
//     setApproveOpen(true);
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       <ListingVerificationHeader onRefresh={fetchData} />

//       <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabStatus)}>
//         <TabsList className="bg-slate-100 p-1">
//           {["pending_verification", "approved", "live", "rejected", "sold"].map(t => (
//             <TabsTrigger key={t} value={t} className="capitalize">
//               {t.replace("_", " ")}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         <TabsContent value={activeTab} className="mt-6">
//           <ListingVerificationListingsGrid
//             loading={loading}
//             error={error}
//             listings={listings}
//             activeTab={activeTab}
//             statusConfig={statusConfig}
//             inspectors={inspectors}
//             getInspectorName={getInspectorName}
//             getInspectorPhone={getInspectorPhone}
//             formatDate={formatDate}
//             formatPrice={formatPrice}
//             onScheduleClick={(car) => { setSelectedCar(car); setScheduleOpen(true); }}
//             onAssignClick={(car) => { setSelectedCar(car); setAssignOpen(true); }}
//             onViewReportClick={handleViewReport}
//             onDetailsClick={(car) => { setSelectedCar(car); setDetailsOpen(true); }}
//             onEditClick={openEditDialog}
//             onRejectClick={(car) => { setSelectedCar(car); setRejectOpen(true); }}
//             onViewInquiriesClick={handleViewInquiries}
//           />
//         </TabsContent>
//       </Tabs>

//       {/* ------------------- DIALOGS (MODALS) ------------------- */}

//       <ListingVerificationDetailsDialog
//         open={detailsOpen}
//         onOpenChange={setDetailsOpen}
//         car={selectedCar}
//         formatPrice={formatPrice}
//       />

//       <ListingVerificationReportDialog
//         open={reportOpen}
//         onOpenChange={setReportOpen}
//         car={selectedCar} // Pass selectedCar for overall context
//         reportData={reportData}
//         reportLoading={reportLoading}
//         formatPrice={formatPrice}
//         onApproveGoLive={openApproveDialogFromReport}
//       />

//       <ListingVerificationScheduleDialog
//         open={scheduleOpen}
//         onOpenChange={setScheduleOpen}
//         selectedCar={selectedCar}
//         scheduleData={scheduleData}
//         onScheduleDataChange={setScheduleData}
//         onSubmit={handleScheduleSubmit}
//       />

//       <ListingVerificationAssignDialog
//         open={assignOpen}
//         onOpenChange={setAssignOpen}
//         selectedCar={selectedCar}
//         inspectors={inspectors}
//         selectedInspectorId={selectedInspectorId}
//         onInspectorIdChange={setSelectedInspectorId}
//         onSubmit={handleAssignSubmit}
//       />

//       <ListingVerificationApproveDialog
//         open={approveOpen}
//         onOpenChange={setApproveOpen}
//         selectedCar={selectedCar}
//         qualityRating={qualityRating}
//         onQualityRatingChange={setQualityRating}
//         onSubmit={() => handleApproveGoLive(selectedCar!, qualityRating)} // Assert non-null for selectedCar
//         approving={approving}
//       />

//       <ListingVerificationRejectDialog
//         open={rejectOpen}
//         onOpenChange={setRejectOpen}
//         selectedCar={selectedCar}
//         rejectReason={rejectReason}
//         onRejectReasonChange={setRejectReason}
//         onSubmit={handleRejectListingSubmit}
//         rejecting={rejecting}
//       />

//       <ListingVerificationEditDialog
//         open={editOpen}
//         onOpenChange={setEditOpen}
//         selectedCar={selectedCar}
//         editForm={editForm}
//         onEditFormChange={(field, value) => setEditForm(prev => ({ ...prev, [field]: value }))}
//         onSubmit={handleEditSubmit}
//         editing={editing}
//       />

//       <ListingVerificationInquiriesDialog
//         open={inquiriesOpen}
//         onOpenChange={setInquiriesOpen}
//         selectedCar={selectedCar}
//         carInquiries={carInquiries}
//         totalInquiriesCount={totalInquiriesCount}
//         inquiriesLoading={inquiriesLoading}
//         formatDateTime={formatDateTime}
//       />
//     </div>
//   );
// };

// export default ListingVerification;


// src/components/franchise/listing-verification/ListingVerification.tsx
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

// UI Components from shadcn/ui
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle2, XCircle, Loader2 } from "lucide-react";

// Service Imports
import {
  getFranchiseCarListings,
  approveCarListing,
  scheduleInspection,
  assignInspector,
  getMyInspectors,
  getCompletedInspectionByCarId,
  rejectCarListing,
  editFranchiseListing,
  getCarInquiries,
} from "@/services/franchiseService";

// Child Component Imports
import ListingVerificationHeader from "../franchise/pages/ListingVerificationHeader";
import ListingVerificationListingsGrid from "../franchise/pages/ListingVerificationListingsGrid";
import ListingVerificationDetailsDialog from "../franchise/pages/ListingVerificationDetailsDialog";
import ListingVerificationReportDialog from "../franchise/pages/ListingVerificationReportDialog";
import ListingVerificationScheduleDialog from "../franchise/pages/ListingVerificationScheduleDialog";
import ListingVerificationAssignDialog from "../franchise/pages/ListingVerificationAssignDialog";
import ListingVerificationApproveDialog from "../franchise/pages/ListingVerificationApproveDialog";
import ListingVerificationRejectDialog from "../franchise/pages/ListingVerificationRejectDialog";
import ListingVerificationEditDialog from "../franchise/pages/ListingVerificationEditDialog";
import ListingVerificationInquiriesDialog from "../franchise/pages/ListingVerificationInquiriesDialog";

// Interface for a single Car Inquiry
export interface CarInquiry {
  _id: string;
  carId: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  buyerMessage?: string;
  status: string;
  createdAt: string;
}

// Interface for the entire Inquiry API Response
export interface CarInquiriesResponse {
  success: boolean;
  message?: string;
  car: {
    make: string;
    model: string;
    variant: string;
    year: number;
  };
  totalInquiries: number;
  inquiries: CarInquiry[];
}

// Enhanced CarListing Interface
export interface CarListing {
  _id: string;
  sellerName: string;
  sellerMobile: string;
  sellerEmail?: string;
  city: string;
  pincode: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  kmDriven: number;
  fuelType: string;
  rejectionReason?: string;
  approvalRemark?: string;
  transmission: string;
  registrationCity: string;
  registrationNumber: string;
  noOfOwners: number;
  color?: string;
  expectedPrice: number;
  negotiable: boolean;
  description?: string;
  images: string[];
  inspectionVideo?: string;
  status: "pending_verification" | "approved" | "live" | "sold" | "rejected";
  qualityRating?: number;
  createdAt: string;

  inspectionStatus: "pending" | "user_accepted" | "scheduled" | "assigned" | "completed" | "rejected";
  scheduledDate?: string;
  scheduledTime?: string;
  assignedInspector?: string;
  listedBy?: {
    _id: string;
    email: string;
    phone: string;
  };
  inspectionReport?: {
    _id: string;
    carId: string;
    inspector?: { _id: string; fullName: string; phone: string; email: string; };
    inspectorName?: string;
    odometerReading?: number;
    exteriorScore?: number;
    interiorScore?: number;
    engineMechanicalScore?: number;
    tyresBrakesScore?: number;
    tyreCondition?: string;
    accidentHistory?: string;
    vinChassisVerified?: boolean;
    minorIssues?: string;
    photos?: string[];
  };
}

// Interface for inspector data
export interface Inspector {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
}

// Define the types for your tabs
export type TabStatus = "pending_verification" | "approved" | "live" | "sold" | "rejected";

// Configuration for tab badges (used for both tabs and card status badge)
export const statusConfig: Record<TabStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending_verification: { label: "Pending Verification", color: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30", icon: <Loader2 className="w-3 h-3 animate-spin" /> },
  approved: { label: "Approved", color: "bg-blue-500/20 text-blue-700 border-blue-500/30", icon: <CheckCircle2 className="w-3 h-3" /> },
  live: { label: "Live", color: "bg-green-500/20 text-green-700 border-green-500/30", icon: <CheckCircle2 className="w-3 h-3" /> },
  sold: { label: "Sold", color: "bg-indigo-500/20 text-indigo-700 border-indigo-500/30", icon: <CheckCircle2 className="w-3 h-3" /> },
  rejected: { label: "Rejected", color: "bg-red-500/20 text-red-700 border-red-500/30", icon: <XCircle className="w-3 h-3" /> },
};

const ListingVerification = () => {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<TabStatus>("pending_verification");
  const [listings, setListings] = useState<CarListing[]>([]);
  const [inspectors, setInspectors] = useState<Inspector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dialog open/close states
  const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [inquiriesOpen, setInquiriesOpen] = useState(false);

  // Data states for dialogs
  const [scheduleData, setScheduleData] = useState({ date: "", time: "" });
  const [selectedInspectorId, setSelectedInspectorId] = useState("");
  const [qualityRating, setQualityRating] = useState(7);
  const [reportData, setReportData] = useState<CarListing | null>(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [editForm, setEditForm] = useState({
    make: "",
    model: "",
    variant: "",
    year: 0,
    kmDriven: 0,
    expectedPrice: 0,
  });
  const [carInquiries, setCarInquiries] = useState<CarInquiry[]>([]);
  const [totalInquiriesCount, setTotalInquiriesCount] = useState(0);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  // Loading states for actions
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [editing, setEditing] = useState(false);

  // ---------------- FETCH DATA ----------------
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const listingsRes = await getFranchiseCarListings(activeTab);
      if (listingsRes.success) {
        setListings(listingsRes.data || []);
      } else {
        throw new Error(listingsRes.message || "Failed to fetch listings");
      }

      // Only fetch inspectors for "pending_verification" tab, as per original logic
      if (activeTab === "pending_verification") {
        const inspectorsRes = await getMyInspectors();
        if (inspectorsRes.success) {
          setInspectors(inspectorsRes.data || []);
        } else {
          toast({ title: "Failed to load inspectors", variant: "destructive" });
        }
      } else {
        setInspectors([]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load data.");
      toast({ title: "Failed to load listings", description: err.message, variant: "destructive" });
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ---------------- HELPERS ----------------
  const getInspectorName = useCallback((id?: string) =>
    inspectors.find(i => i._id === id)?.fullName || "Unassigned", [inspectors]);

  const getInspectorPhone = useCallback((id?: string) =>
    inspectors.find(i => i._id === id)?.phone || "N/A", [inspectors]);

  const formatDate = useCallback((d?: string) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A", []);

  const formatDateTime = useCallback((dt?: string) => {
    if (!dt) return "N/A";
    const date = new Date(dt);
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) +
           " " +
           date.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', hour12: true });
  }, []);

  const formatPrice = useCallback((price?: number) => {
    if (price === undefined || price === null) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  // ---------------- ACTION HANDLERS (passed to children) ----------------

  const handleViewReport = async (car: CarListing) => {
    setSelectedCar(car);
    setReportLoading(true);
    setReportOpen(true);
    try {
      const res = await getCompletedInspectionByCarId(car._id);
      if (res.success) {
        setReportData(res.data);
      } else {
        throw new Error(res.message || "Report fetch failed");
      }
    } catch (error: any) {
      toast({ title: "Report fetch karne mein error aayi", description: error.message, variant: "destructive" });
      setReportOpen(false);
      setReportData(null);
    } finally {
      setReportLoading(false);
    }
  };

  const handleScheduleSubmit = async () => {
    if (!selectedCar || !scheduleData.date || !scheduleData.time) {
      toast({ title: "Please select date and time", variant: "destructive" });
      return;
    }
    try {
      const res = await scheduleInspection({ carId: selectedCar._id, scheduledDate: scheduleData.date, scheduledTime: scheduleData.time });
      if (res.success) {
        toast({ title: "Inspection scheduled successfully" });
        setScheduleOpen(false);
        setScheduleData({ date: "", time: "" });
        fetchData();
      } else {
        throw new Error(res.message || "Schedule failed");
      }
    } catch (err: any) {
      toast({ title: "Schedule failed", description: err.message, variant: "destructive" });
    }
  };

  const handleAssignSubmit = async () => {
    if (!selectedCar || !selectedInspectorId) {
      toast({ title: "Please select an inspector", variant: "destructive" });
      return;
    }
    try {
      const res = await assignInspector({ carId: selectedCar._id, inspectorId: selectedInspectorId });
      if (res.success) {
        toast({ title: "Inspector assigned successfully" });
        setAssignOpen(false);
        setSelectedInspectorId("");
        fetchData();
      } else {
        throw new Error(res.message || "Assignment failed");
      }
    } catch (err: any) {
      toast({ title: "Assignment failed", description: err.message, variant: "destructive" });
    }
  };

  const handleApproveGoLive = async (carToApprove: CarListing, rating: number) => {
    if (!carToApprove || rating < 1 || rating > 10) {
      toast({ title: "Invalid quality rating", variant: "destructive" });
      return;
    }
    setApproving(true);
    try {
      const res = await approveCarListing(carToApprove._id, { qualityRating: rating });
      if (res.success) {
        toast({ title: "Car is now LIVE for buyers! 🚀" });
        setApproveOpen(false);
        setReportOpen(false); // Close report dialog if open
        fetchData();
      } else {
        throw new Error(res.message || "Approval failed");
      }
    } catch (err: any) {
      toast({ title: "Approval failed", description: err.message, variant: "destructive" });
    } finally {
      setApproving(false);
    }
  };

  const handleRejectListingSubmit = async () => {
    if (!selectedCar || !rejectReason.trim()) {
      toast({ title: "Rejection reason is required", variant: "destructive" });
      return;
    }
    setRejecting(true);
    try {
      const res = await rejectCarListing(selectedCar._id, rejectReason);
      if (res.success) {
        toast({ title: "Listing Rejected", description: "Car listing has been moved to rejected status." });
        setRejectOpen(false);
        setRejectReason("");
        fetchData();
      } else {
        throw new Error(res.message || "Rejection failed");
      }
    } catch (err: any) {
      toast({ title: "Rejection failed", description: err.message, variant: "destructive" });
    } finally {
      setRejecting(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!selectedCar) return;
    setEditing(true);
    try {
      const res = await editFranchiseListing(selectedCar._id, editForm);
      if (res.success) {
        toast({ title: "Listing Updated", description: "Car details have been successfully updated." });
        setEditOpen(false);
        fetchData();
      } else {
        throw new Error(res.message || "Edit failed");
      }
    } catch (err: any) {
      toast({ title: "Edit failed", description: err.message, variant: "destructive" });
    } finally {
      setEditing(false);
    }
  };

  const handleViewInquiries = async (car: CarListing) => {
    setSelectedCar(car);
    setInquiriesLoading(true);
    setInquiriesOpen(true);
    setCarInquiries([]);
    setTotalInquiriesCount(0);
    try {
      const res: CarInquiriesResponse = await getCarInquiries(car._id);
      if (res.success) {
        setCarInquiries(res.inquiries || []);
        setTotalInquiriesCount(res.totalInquiries || 0);
      } else {
        throw new Error(res.message || "Failed to fetch inquiries");
      }
    } catch (error: any) {
      toast({ title: "Failed to fetch inquiries", description: error.message, variant: "destructive" });
      setInquiriesOpen(false);
    } finally {
      setInquiriesLoading(false);
    }
  };

  // Callback for opening edit dialog (to pre-fill form)
  const openEditDialog = (car: CarListing) => {
    setSelectedCar(car);
    setEditForm({
      make: car.make,
      model: car.model,
      variant: car.variant || '',
      year: car.year,
      kmDriven: car.kmDriven,
      expectedPrice: car.expectedPrice,
    });
    setEditOpen(true);
  };

  // Callback for opening approve dialog (from report dialog)
  const openApproveDialogFromReport = (car: CarListing, avgScore: number) => {
    setSelectedCar(car);
    setQualityRating(Math.round(avgScore) || 7);
    setApproveOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <ListingVerificationHeader onRefresh={fetchData} />

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabStatus)}>
        <TabsList className="bg-slate-100 p-1">
          {["pending_verification", "approved", "live", "rejected", "sold"].map(t => (
            <TabsTrigger key={t} value={t} className="capitalize">
              {t.replace("_", " ")}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <ListingVerificationListingsGrid
            loading={loading}
            error={error}
            listings={listings}
            activeTab={activeTab}
            statusConfig={statusConfig}
            inspectors={inspectors} // Passed, though mostly used by helpers for card content.
            getInspectorName={getInspectorName}
            getInspectorPhone={getInspectorPhone}
            formatDate={formatDate}
            formatPrice={formatPrice}
            onScheduleClick={(car) => { setSelectedCar(car); setScheduleOpen(true); }}
            onAssignClick={(car) => { setSelectedCar(car); setAssignOpen(true); }}
            onViewReportClick={handleViewReport}
            onDetailsClick={(car) => { setSelectedCar(car); setDetailsOpen(true); }}
            onEditClick={openEditDialog}
            onRejectClick={(car) => { setSelectedCar(car); setRejectOpen(true); }}
            onViewInquiriesClick={handleViewInquiries}
          />
        </TabsContent>
      </Tabs>

      {/* ------------------- DIALOGS (MODALS) ------------------- */}

      <ListingVerificationDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        car={selectedCar}
        formatPrice={formatPrice}
      />

      <ListingVerificationReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        car={selectedCar} // Pass selectedCar for overall context
        reportData={reportData}
        reportLoading={reportLoading}
        formatPrice={formatPrice}
        onApproveGoLive={openApproveDialogFromReport}
      />

      <ListingVerificationScheduleDialog
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        selectedCar={selectedCar}
        scheduleData={scheduleData}
        onScheduleDataChange={setScheduleData}
        onSubmit={handleScheduleSubmit}
      />

      <ListingVerificationAssignDialog
        open={assignOpen}
        onOpenChange={setAssignOpen}
        selectedCar={selectedCar}
        inspectors={inspectors}
        selectedInspectorId={selectedInspectorId}
        onInspectorIdChange={setSelectedInspectorId}
        onSubmit={handleAssignSubmit}
      />

      <ListingVerificationApproveDialog
        open={approveOpen}
        onOpenChange={setApproveOpen}
        selectedCar={selectedCar}
        qualityRating={qualityRating}
        onQualityRatingChange={setQualityRating}
        onSubmit={() => handleApproveGoLive(selectedCar!, qualityRating)} // Assert non-null for selectedCar
        approving={approving}
      />

      <ListingVerificationRejectDialog
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        selectedCar={selectedCar}
        rejectReason={rejectReason}
        onRejectReasonChange={setRejectReason}
        onSubmit={handleRejectListingSubmit}
        rejecting={rejecting}
      />

      <ListingVerificationEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        selectedCar={selectedCar}
        editForm={editForm}
        onEditFormChange={(field, value) => setEditForm(prev => ({ ...prev, [field]: value }))}
        onSubmit={handleEditSubmit}
        editing={editing}
      />

      <ListingVerificationInquiriesDialog
        open={inquiriesOpen}
        onOpenChange={setInquiriesOpen}
        selectedCar={selectedCar}
        carInquiries={carInquiries}
        totalInquiriesCount={totalInquiriesCount}
        inquiriesLoading={inquiriesLoading}
        formatDateTime={formatDateTime}
      />
    </div>
  );
};

export default ListingVerification;