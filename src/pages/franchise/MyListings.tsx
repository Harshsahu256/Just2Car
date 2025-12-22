// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { FileText } from "lucide-react";

// const MyListings = () => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">My Listings</h1>
//         <p className="text-muted-foreground mt-1">View and manage your car listings</p>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <FileText className="h-5 w-5" />
//             Your Listings
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground">My listings interface coming soon</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default MyListings;

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   PlusCircle,
//   Car,
//   Eye,
//   Pencil,
//   Trash2,
//   Fuel,
//   MapPin,
//   Gauge,
//   IndianRupee,
//   Users,
//   Calendar,
//   Settings2,
//   FileText,
//   ImageIcon,
//   Upload,
//   X
// } from "lucide-react";

// // Types
// interface CarListing {
//   _id: string;
//   sellerType: string;
//   make: string;
//   model: string;
//   variant?: string;
//   color?: string;
//   year: number;
//   noOfOwners: number;
//   kmDriven: number;
//   registrationYearCity: string;
//   fuelType: string;
//   transmission: string;
//   city: string;
//   pincode: string;
//   expectedPrice: number;
//   negotiable: boolean;
//   description?: string;
//   images: string[];
//   documents: string[];
//   status: "live" | "pending" | "sold" | "rejected";
//   createdAt: string;
// }

// // Mock data
// const mockListings: CarListing[] = [
//   {
//     _id: "1", sellerType: "franchise", make: "Toyota", model: "Fortuner", variant: "Legender 4x4",
//     color: "Pearl White", year: 2023, noOfOwners: 1, kmDriven: 12500, registrationYearCity: "2023 / Mumbai",
//     fuelType: "Diesel", transmission: "Automatic", city: "Mumbai", pincode: "400001", expectedPrice: 4500000,
//     negotiable: true, description: "Pristine condition Toyota Fortuner.",
//     images: ["https://imgd.aeplcdn.com/1280x720/n/cw/ec/134287/fortuner-legender-exterior-right-front-three-quarter-2.jpeg?isig=0"],
//     documents: [], status: "live", createdAt: "2024-01-15T10:00:00.000Z",
//   },
//   {
//     _id: "2", sellerType: "individual", make: "Honda", model: "City", variant: "ZX CVT", color: "Radiant Red",
//     year: 2022, noOfOwners: 1, kmDriven: 28000, registrationYearCity: "2022 / Delhi", fuelType: "Petrol",
//     transmission: "Automatic", city: "Delhi", pincode: "110001", expectedPrice: 1350000, negotiable: true,
//     description: "Well-maintained Honda City.",
//     images: ["https://imgd.aeplcdn.com/1280x720/n/cw/ec/133535/honda-city-right-front-three-quarter6.jpeg?isig=0"],
//     documents: [], status: "live", createdAt: "2024-01-20T10:00:00.000Z",
//   },
// ];

// const MyListings = () => {
//   const [listings, setListings] = useState<CarListing[]>([]);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);

//   useEffect(() => {
//     setListings(mockListings);
//   }, []);

//   const handleView = (car: CarListing) => {
//     setSelectedCar(car);
//     setIsViewModalOpen(true);
//   };

//   const formatPrice = (price: number) => {
//     if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
//     return `₹${price.toLocaleString()}`;
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "live": return "bg-green-100 text-green-800 border-green-300";
//       case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-300";
//       case "sold": return "bg-blue-100 text-blue-800 border-blue-300";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">My Car Listings</h1>
//             <p className="text-muted-foreground mt-1">
//               Manage your inventory and add new cars to your listings
//             </p>
//           </div>
//           <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//             <DialogTrigger asChild>
//               <Button><PlusCircle className="h-5 w-5 mr-2" />List New Car</Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//               <DialogHeader>
//                 <DialogTitle className="text-2xl font-bold">Create a New Car Listing</DialogTitle>
//                 <DialogDescription>Fill in the details below to list your car.</DialogDescription>
//               </DialogHeader>
//               <NewCarForm onSuccess={() => setIsAddModalOpen(false)} />
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Listings Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {listings.map((car) => (
//             <Card key={car._id} className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
//               <AspectRatio ratio={16 / 9}><img src={car.images[0]} alt={`${car.make} ${car.model}`} className="object-cover w-full h-full" /></AspectRatio>
//               <CardHeader className="p-4">
//                 <div className="flex justify-between items-start">
//                   <CardTitle className="text-lg">{car.make} {car.model} <span className="text-sm font-normal text-muted-foreground">({car.year})</span></CardTitle>
//                   <Badge variant="outline" className={`capitalize ${getStatusColor(car.status)}`}>{car.status}</Badge>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4 pt-0">
//                 <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
//                   <p className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4 text-gray-500"/> <span className="font-semibold text-gray-800">{formatPrice(car.expectedPrice)}</span></p>
//                   <p className="flex items-center gap-1.5"><Gauge className="w-4 h-4 text-gray-500"/> {car.kmDriven.toLocaleString()} km</p>
//                   <p className="flex items-center gap-1.5"><Fuel className="w-4 h-4 text-gray-500"/> {car.fuelType}</p>
//                   <p className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-500"/> {car.city}</p>
//                 </div>
//               </CardContent>
//               <CardFooter className="p-4 pt-2 border-t flex justify-between items-center">
//                  {/* Icons Hata Diye */}
//                  <div></div>
//                 <div className="flex gap-1">
//                   <Button size="icon" variant="ghost" onClick={() => handleView(car)}><Eye className="w-4 h-4" /></Button>
//                   <Button size="icon" variant="ghost"><Pencil className="w-4 h-4" /></Button>
//                   <Button size="icon" variant="ghost"><Trash2 className="w-4 h-4 text-red-500" /></Button>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
        
//         {/* View Modal (Ye pehle jaisa hi hai) */}
//         <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
//             {/* ... View Modal ka poora code yahan ... */}
//         </Dialog>

//       </div>
//     </div>
//   );
// };

// // =================================================================
// //          NEW CAR FORM (Alag se component bana diya)
// // =================================================================
// const NewCarForm = ({ onSuccess }) => {
//   const [formData, setFormData] = useState({});
//   // ... Baaki form state (imageFiles, etc.) yahan aayengi

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//     alert("Car Submitted! (Check console)");
//     if(onSuccess) onSuccess(); // Modal band karne ke liye
//   };
  
//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 py-4">
//       {/* Basic Info */}
//       <div className="p-4 border rounded-lg space-y-4">
//         <h3 className="font-semibold">Basic Information</h3>
//         <div className="grid grid-cols-2 gap-4">
//           <div><Label>Seller Type</Label><Select name="sellerType"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="franchise">Franchise</SelectItem></SelectContent></Select></div>
//           <div><Label>Make</Label><Input name="make" placeholder="e.g., Toyota" /></div>
//           <div><Label>Model</Label><Input name="model" placeholder="e.g., Fortuner" /></div>
//           <div><Label>Variant</Label><Input name="variant" placeholder="e.g., Legender" /></div>
//           <div><Label>Color</Label><Input name="color" placeholder="e.g., White" /></div>
//           <div><Label>Year</Label><Input name="year" type="number" placeholder="e.g., 2023" /></div>
//         </div>
//       </div>
      
//       {/* Vehicle Details */}
//       <div className="p-4 border rounded-lg space-y-4">
//         <h3 className="font-semibold">Vehicle Details</h3>
//         <div className="grid grid-cols-2 gap-4">
//           <div><Label>No. of Owners</Label><Input name="noOfOwners" type="number" placeholder="e.g., 1" /></div>
//           <div><Label>KM Driven</Label><Input name="kmDriven" type="number" placeholder="e.g., 12000" /></div>
//           <div><Label>Fuel Type</Label><Select name="fuelType"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Petrol">Petrol</SelectItem><SelectItem value="Diesel">Diesel</SelectItem></SelectContent></Select></div>
//           <div><Label>Transmission</Label><Select name="transmission"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Manual">Manual</SelectItem><SelectItem value="Automatic">Automatic</SelectItem></SelectContent></Select></div>
//         </div>
//       </div>

//        {/* Location & Pricing */}
//       <div className="p-4 border rounded-lg space-y-4">
//         <h3 className="font-semibold">Location & Price</h3>
//         <div className="grid grid-cols-2 gap-4">
//             <div><Label>Registration City</Label><Input name="registrationYearCity" placeholder="e.g., Mumbai" /></div>
//             <div><Label>Pincode</Label><Input name="pincode" placeholder="e.g., 400001" /></div>
//             <div><Label>Expected Price</Label><Input name="expectedPrice" type="number" placeholder="e.g., 4500000" /></div>
//             <div className="flex items-center space-x-2 pt-6"><Switch id="negotiable" /><Label htmlFor="negotiable">Negotiable</Label></div>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="p-4 border rounded-lg"><Label>Description</Label><Textarea name="description" /></div>

//        {/* Images & Documents */}
//        <div className="p-4 border rounded-lg space-y-4">
//           <div><Label>Car Photos</Label><Input name="images" type="file" multiple /></div>
//           <div><Label>Documents</Label><Input name="documents" type="file" multiple /></div>
//        </div>

//       <DialogFooter>
//         <Button type="button" variant="outline" onClick={onSuccess}>Cancel</Button>
//         <Button type="submit">Submit Listing</Button>
//       </DialogFooter>
//     </form>
//   );
// };

// export default MyListings;


// import { useState, useEffect } from "react";
// import {
//   getMyFranchiseListings,
//    createFranchiseCar,
// } from "@/services/franchiseService"; // API services
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   PlusCircle,
//   Car,
//   Eye,
//   Pencil,
//   Trash2,
//   Fuel,
//   MapPin,
//   Gauge,
//   IndianRupee,
//   Users,
//   Calendar,
//   Settings2,
//   FileText,
//   Loader2,
//   X,
//   Upload,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// // Types
// interface CarListing {
//   _id: string;
//   sellerType: string;
//   make: string;
//   model: string;
//   variant?: string;
//   color?: string;
//   year: number;
//   noOfOwners: number;
//   kmDriven: number;
//   registrationCity: string;
//   fuelType: string;
//   transmission: string;
//   city: string;
//   pincode: string;
//   expectedPrice: number;
//   negotiable: boolean;
//   description?: string;
//   images: string[];
//   documents: string[];
//   status: "live" | "pending_verification" | "sold" | "rejected";
//   createdAt: string;
// }

// const MyListings = () => {
//   // FIX: Initial state is an empty array
//   const [listings, setListings] = useState<CarListing[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   const fetchListings = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getMyFranchiseListings();
//       setListings(data || []); // API se null/undefined aane par crash nahi hoga
//     } catch (error) {
//       setListings([]); // Error aane par bhi empty array set karo
//       toast({
//         title: "Failed to Fetch Listings",
//         description: error.response?.data?.message || "Could not load your cars.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleView = (car: CarListing) => {
//     setSelectedCar(car);
//     setIsViewModalOpen(true);
//   };

//   const formatPrice = (price: number) => {
//     if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
//     return `₹${price.toLocaleString()}`;
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "live": return "bg-green-100 text-green-800";
//       case "pending_verification": return "bg-yellow-100 text-yellow-800";
//       case "sold": return "bg-blue-100 text-blue-800";
//       case "rejected": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//           <div>
//             <h1 className="text-3xl font-bold">My Car Listings</h1>
//             <p className="text-muted-foreground mt-1">Manage your inventory</p>
//           </div>
//           <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//             <DialogTrigger asChild>
//               <Button><PlusCircle className="h-5 w-5 mr-2" />List New Car</Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//               <DialogHeader>
//                 <DialogTitle className="text-2xl font-bold">Create a New Listing</DialogTitle>
//                 <DialogDescription>Fill in the details to list your car.</DialogDescription>
//               </DialogHeader>
//               <NewCarForm
//                 onSuccess={() => {
//                   setIsAddModalOpen(false);
//                   fetchListings(); // List refresh hogi
//                 }}
//               />
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Listings Grid */}
//         {isLoading ? (
//           <p>Loading your listings...</p>
//         ) : listings && listings.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {listings.map((car) => (
//               <Card key={car._id} className="overflow-hidden shadow-sm">
//                 <AspectRatio ratio={16 / 9}><img src={car.images[0]} alt={car.model} className="object-cover w-full h-full" /></AspectRatio>
//                 <CardHeader className="p-4">
//                   <div className="flex justify-between items-start">
//                     <CardTitle className="text-lg">{car.make} {car.model} ({car.year})</CardTitle>
//                     <Badge variant="outline" className={`capitalize ${getStatusColor(car.status)}`}>{car.status.replace('_', ' ')}</Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
//                     <p className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4"/>{formatPrice(car.expectedPrice)}</p>
//                     <p className="flex items-center gap-1.5"><Gauge className="w-4 h-4"/>{car.kmDriven.toLocaleString()} km</p>
//                     <p className="flex items-center gap-1.5"><Fuel className="w-4 h-4"/>{car.fuelType}</p>
//                     <p className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/>{car.city}</p>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="p-4 pt-2 border-t flex justify-end">
//                   <div className="flex gap-1">
//                     <Button size="icon" variant="ghost" onClick={() => handleView(car)}><Eye className="w-4 h-4" /></Button>
//                     <Button size="icon" variant="ghost"><Pencil className="w-4 h-4" /></Button>
//                     <Button size="icon" variant="ghost"><Trash2 className="w-4 h-4 text-red-500" /></Button>
//                   </div>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <p>You have no listings yet. Click "List New Car" to get started.</p>
//         )}

//         {/* View Modal */}
//         <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
//           {/* ... View Modal ka UI yahan ... */}
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// // =================================================================
// //          NEW CAR FORM (Updated with API call and state management)
// // =================================================================
// const NewCarForm = ({ onSuccess }) => {
//     const [formData, setFormData] = useState({});
//     const [imageFiles, setImageFiles] = useState<File[]>([]);
//     const [documentFiles, setDocumentFiles] = useState<File[]>([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const { toast } = useToast();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };
    
//     const handleSelectChange = (name, value) => {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSwitchChange = (name, checked) => {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     };
  
//     const handleImageChange = (e) => {
//       setImageFiles(Array.from(e.target.files));
//     };
    
//     const handleDocumentChange = (e) => {
//       setDocumentFiles(Array.from(e.target.files));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         const data = new FormData();
//         Object.entries(formData).forEach(([key, value]) => data.append(key, String(value)));
//         imageFiles.forEach(file => data.append('images', file));
//         documentFiles.forEach(file => data.append('documents', file));

//         try {
//             const response = await createFranchiseCar(data);
//             toast({
//                 title: "Success!",
//                 description: response.message,
//             });
//             if (onSuccess) onSuccess();
//         } catch (error) {
//             toast({
//                 title: "Submission Failed",
//                 description: error.response?.data?.message || error.message,
//                 variant: "destructive",
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
  
//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 py-4">
//         <div className="grid grid-cols-2 gap-4">
//             <div><Label>Make</Label><Input name="make" onChange={handleInputChange} required /></div>
//             <div><Label>Model</Label><Input name="model" onChange={handleInputChange} required /></div>
//             <div><Label>Year</Label><Input name="year" type="number" onChange={handleInputChange} required /></div>
//             <div><Label>Expected Price</Label><Input name="expectedPrice" type="number" onChange={handleInputChange} required /></div>
//             <div><Label>KM Driven</Label><Input name="kmDriven" type="number" onChange={handleInputChange} required /></div>
//             <div><Label>Fuel Type</Label><Select name="fuelType" onValueChange={v => handleSelectChange('fuelType', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Petrol">Petrol</SelectItem><SelectItem value="Diesel">Diesel</SelectItem></SelectContent></Select></div>
//             <div><Label>Transmission</Label><Select name="transmission" onValueChange={v => handleSelectChange('transmission', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Manual">Manual</SelectItem><SelectItem value="Automatic">Automatic</SelectItem></SelectContent></Select></div>
//             <div><Label>Registration City</Label><Input name="registrationCity" onChange={handleInputChange} required /></div>
//             <div><Label>Color</Label><Input name="color" onChange={handleInputChange} /></div>
//             <div><Label>No. of Owners</Label><Input name="noOfOwners" type="number" onChange={handleInputChange} /></div>
//             <div className="flex items-center space-x-2 pt-6"><Switch name="negotiable" onCheckedChange={c => handleSwitchChange('negotiable', c)} /><Label>Negotiable</Label></div>
//         </div>
//         <div><Label>Description</Label><Textarea name="description" onChange={handleInputChange} /></div>
//         <div><Label>Car Photos</Label><Input name="images" type="file" multiple onChange={handleImageChange} required /></div>
//         <div><Label>Documents</Label><Input name="documents" type="file" multiple onChange={handleDocumentChange} /></div>

//         <DialogFooter>
//             <Button type="button" variant="outline" onClick={onSuccess}>Cancel</Button>
//             <Button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Listing"}
//             </Button>
//         </DialogFooter>
//     </form>
//   );
// };

// export default MyListings;

// import { useState, useEffect } from "react";
// import {
//   getMyFranchiseListings,
//   createFranchiseCar,
// } from "@/services/franchiseService"; // API services
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   PlusCircle,
//   Car,
//   Eye,
//   Pencil,
//   Trash2,
//   Fuel,
//   MapPin,
//   Gauge,
//   IndianRupee,
//   Users,
//   Calendar,
//   Settings2,
//   FileText,
//   Loader2,
//   X,
//   Upload,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// // Types
// interface CarListing {
//   _id: string;
//   make: string;
//   model: string;
//   variant?: string;
//   year: number;
//   kmDriven: number;
//   fuelType: string;
//   transmission: string;
//   expectedPrice: number;
//   city: string;
//   pincode: string;
//   registrationCity: string;
//   images: string[];
//   status: "live" | "pending_verification" | "sold" | "rejected";
// }

// const MyListings = () => {
//   // FIX: Initial state is an empty array
//   const [listings, setListings] = useState<CarListing[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   const fetchListings = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getMyFranchiseListings();
//       setListings(data || []); // API se null/undefined aane par crash nahi hoga
//     } catch (error) {
//       setListings([]); // Error aane par bhi empty array set karo
//       toast({
//         title: "Failed to Fetch Listings",
//         description: error.response?.data?.message || "Could not load your cars.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleView = (car: CarListing) => {
//     setSelectedCar(car);
//     setIsViewModalOpen(true);
//   };

//   const formatPrice = (price: number) => {
//     if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
//     return `₹${price.toLocaleString()}`;
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "live": return "bg-green-100 text-green-800";
//       case "pending_verification": return "bg-yellow-100 text-yellow-800";
//       case "sold": return "bg-blue-100 text-blue-800";
//       case "rejected": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//           <div>
//             <h1 className="text-3xl font-bold">My Car Listings</h1>
//             <p className="text-muted-foreground mt-1">Manage your inventory</p>
//           </div>
//           <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//             <DialogTrigger asChild>
//               <Button><PlusCircle className="h-5 w-5 mr-2" />List New Car</Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//               <DialogHeader>
//                 <DialogTitle className="text-2xl font-bold">Create a New Listing</DialogTitle>
//                 <DialogDescription>Fill in the details to list your car.</DialogDescription>
//               </DialogHeader>
//               <NewCarForm
//                 onSuccess={() => {
//                   setIsAddModalOpen(false);
//                   fetchListings(); // List refresh hogi
//                 }}
//               />
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Listings Grid */}
//         {isLoading ? (
//           <p>Loading your listings...</p>
//         ) : listings && listings.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {listings.map((car) => (
//               <Card key={car._id} className="overflow-hidden shadow-sm">
//                 <AspectRatio ratio={16 / 9}><img src={car.images[0]} alt={car.model} className="object-cover w-full h-full" /></AspectRatio>
//                 <CardHeader className="p-4">
//                   <div className="flex justify-between items-start">
//                     <CardTitle className="text-lg">{car.make} {car.model} ({car.year})</CardTitle>
//                     <Badge variant="outline" className={`capitalize ${getStatusColor(car.status)}`}>{car.status.replace('_', ' ')}</Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
//                     <p className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4"/>{formatPrice(car.expectedPrice)}</p>
//                     <p className="flex items-center gap-1.5"><Gauge className="w-4 h-4"/>{car.kmDriven.toLocaleString()} km</p>
//                     <p className="flex items-center gap-1.5"><Fuel className="w-4 h-4"/>{car.fuelType}</p>
//                     <p className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/>{car.city}</p>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="p-4 pt-2 border-t flex justify-end">
//                   <div className="flex gap-1">
//                     <Button size="icon" variant="ghost" onClick={() => handleView(car)}><Eye className="w-4 h-4" /></Button>
//                     <Button size="icon" variant="ghost"><Pencil className="w-4 h-4" /></Button>
//                     <Button size="icon" variant="ghost"><Trash2 className="w-4 h-4 text-red-500" /></Button>
//                   </div>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <p>You have no listings yet. Click "List New Car" to get started.</p>
//         )}

//         {/* View Modal */}
//         <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
//           {/* ... View Modal ka UI yahan ... */}
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// // =================================================================
// //          NEW CAR FORM (Updated with API call and state management)
// // =================================================================
// const NewCarForm = ({ onSuccess }) => {
//     const [formData, setFormData] = useState({
//         make: "", model: "", variant: "", year: "", kmDriven: "",
//         fuelType: "", transmission: "", expectedPrice: "", city: "",
//         pincode: "", registrationCity: "",
//     });
//     const [imageFiles, setImageFiles] = useState<File[]>([]);
//     const [documentFiles, setDocumentFiles] = useState<File[]>([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const { toast } = useToast();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };
    
//     const handleSelectChange = (name, value) => {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSwitchChange = (name, checked) => {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     };
  
//     const handleImageChange = (e) => {
//       if (e.target.files) setImageFiles(Array.from(e.target.files));
//     };
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         const data = new FormData();
//         Object.entries(formData).forEach(([key, value]) => data.append(key, value));
//         imageFiles.forEach(file => data.append('images', file));

//         try {
//             const response = await createFranchiseCar(data);
//             toast({ title: "Success!", description: response.message });
//             if (onSuccess) onSuccess();
//         } catch (error) {
//             toast({
//                 title: "Submission Failed",
//                 description: error.response?.data?.message || error.message,
//                 variant: "destructive",
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
  
//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 py-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div><Label>Make</Label><Input name="make" value={formData.make} onChange={handleInputChange} required /></div>
//         <div><Label>Model</Label><Input name="model" value={formData.model} onChange={handleInputChange} required /></div>
//         <div><Label>Variant</Label><Input name="variant" value={formData.variant} onChange={handleInputChange} /></div>
//         <div><Label>Year</Label><Input name="year" type="number" value={formData.year} onChange={handleInputChange} required /></div>
//         <div><Label>KM Driven</Label><Input name="kmDriven" type="number" value={formData.kmDriven} onChange={handleInputChange} required /></div>
//         <div>
//           <Label>Fuel Type</Label>
//           <Select name="fuelType" onValueChange={v => handleSelectChange('fuelType', v)} required>
//             <SelectTrigger><SelectValue placeholder="Select Fuel Type" /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Petrol">Petrol</SelectItem>
//               <SelectItem value="Diesel">Diesel</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <Label>Transmission</Label>
//           <Select name="transmission" onValueChange={v => handleSelectChange('transmission', v)} required>
//             <SelectTrigger><SelectValue placeholder="Select Transmission" /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Manual">Manual</SelectItem>
//               <SelectItem value="Automatic">Automatic</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div><Label>Expected Price</Label><Input name="expectedPrice" type="number" value={formData.expectedPrice} onChange={handleInputChange} required /></div>
//         <div><Label>City</Label><Input name="city" value={formData.city} onChange={handleInputChange} required /></div>
//         <div><Label>Pincode</Label><Input name="pincode" value={formData.pincode} onChange={handleInputChange} required /></div>
//         <div><Label>Registration City</Label><Input name="registrationCity" value={formData.registrationCity} onChange={handleInputChange} required /></div>
//       </div>
      
//       <div><Label>Car Photos</Label><Input name="images" type="file" multiple onChange={handleImageChange} required /></div>

//       <DialogFooter>
//         <Button type="button" variant="outline" onClick={onSuccess}>Cancel</Button>
//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Listing"}
//         </Button>
//       </DialogFooter>
//     </form>
//   );
// };

// export default MyListings;


// import { useState, useEffect } from "react";
// import {
//   getMyFranchiseListings,
//   createFranchiseCar,
// } from "@/services/franchiseService"; 
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   PlusCircle,
//   Car,
//   Eye,
//   Pencil,
//   Trash2,
//   Fuel,
//   MapPin,
//   Gauge,
//   IndianRupee,
//   Settings2,
//   FileText,
//   Loader2,
//   X,
//   Upload,
//   ImageIcon,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// // --- Types ---
// interface CarListing {
//   _id: string;
//   make: string;
//   model: string;
//   variant?: string;
//   year: number;
//   kmDriven: number;
//   fuelType: string;
//   transmission: string;
//   expectedPrice: number;
//   city: string;
//   images: string[];
//   status: "live" | "pending_verification" | "sold" | "rejected";
// }

// // --- Main Component ---
// const MyListings = () => {
//   const [listings, setListings] = useState<CarListing[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   const fetchListings = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getMyFranchiseListings();
//       setListings(data || []);
//     } catch (error: any) {
//       setListings([]);
//       toast({
//         title: "Failed to Fetch",
//         description: error.response?.data?.message || "Could not load cars.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatPrice = (price: number) => {
//     if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
//     return `₹${price.toLocaleString()}`;
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "live": return "bg-green-100 text-green-800 border-green-200";
//       case "pending_verification": return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "sold": return "bg-blue-100 text-blue-800 border-blue-200";
//       case "rejected": return "bg-red-100 text-red-800 border-red-200";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">My Car Listings</h1>
//             <p className="text-muted-foreground mt-1">Manage and track your car inventory.</p>
//           </div>
//           <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//             <DialogTrigger asChild>
//               <Button className="shadow-lg"><PlusCircle className="h-5 w-5 mr-2" />List New Car</Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//               <DialogHeader>
//                 <DialogTitle className="text-2xl font-bold flex items-center gap-2">
//                     <Car className="text-primary" /> Create New Listing
//                 </DialogTitle>
//                 <DialogDescription>Enter all details below to list your vehicle.</DialogDescription>
//               </DialogHeader>
//               <NewCarForm onSuccess={() => { setIsAddModalOpen(false); fetchListings(); }} />
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Listings Grid */}
//         {isLoading ? (
//           <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>
//         ) : listings.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {listings.map((car) => (
//               <Card key={car._id} className="overflow-hidden hover:shadow-md transition-shadow">
//                 <AspectRatio ratio={16 / 9}>
//                   <img src={car.images[0] || "https://placehold.co/600x400?text=No+Image"} alt={car.model} className="object-cover w-full h-full" />
//                 </AspectRatio>
//                 <CardHeader className="p-4">
//                   <div className="flex justify-between items-start">
//                     <CardTitle className="text-lg font-bold">{car.make} {car.model}</CardTitle>
//                     <Badge variant="outline" className={getStatusColor(car.status)}>{car.status.replace('_', ' ')}</Badge>
//                   </div>
//                   <p className="text-sm text-muted-foreground">{car.variant} • {car.year}</p>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div className="flex items-center gap-2 text-foreground font-medium"><IndianRupee className="w-4 h-4 text-primary"/>{formatPrice(car.expectedPrice)}</div>
//                     <div className="flex items-center gap-2 text-muted-foreground"><Gauge className="w-4 h-4"/>{car.kmDriven.toLocaleString()} km</div>
//                     <div className="flex items-center gap-2 text-muted-foreground"><Fuel className="w-4 h-4"/>{car.fuelType}</div>
//                     <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4"/>{car.city}</div>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="p-4 pt-2 border-t bg-gray-50/50 flex justify-end gap-2">
//                   <Button size="sm" variant="outline" onClick={() => { setSelectedCar(car); setIsViewModalOpen(true); }}><Eye className="w-4 h-4 mr-1" /> View</Button>
//                   <Button size="sm" variant="outline"><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
//                   <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <Card className="p-20 text-center border-dashed">
//             <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium">No cars listed yet</h3>
//             <p className="text-muted-foreground mb-6">Start selling by adding your first car listing.</p>
//             <Button onClick={() => setIsAddModalOpen(true)}><PlusCircle className="mr-2 h-4 w-4" /> Add Car</Button>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// // --- Form Component (ALL FIELDS INCLUDED) ---
// const NewCarForm = ({ onSuccess }: { onSuccess: () => void }) => {
//   const [formData, setFormData] = useState({
//     sellerType: "", make: "", model: "", variant: "", color: "",
//     year: "", noOfOwners: "", kmDriven: "", fuelType: "", transmission: "",
//     registrationCity: "", city: "", pincode: "", expectedPrice: "",
//     negotiable: false, description: ""
//   });

//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [documentFiles, setDocumentFiles] = useState<File[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const data = new FormData();
//     // Text fields
//     Object.entries(formData).forEach(([key, value]) => data.append(key, value.toString()));
//     // Media
//     imageFiles.forEach(file => data.append("images", file));
//     documentFiles.forEach(file => data.append("documents", file));

//     try {
//       await createFranchiseCar(data);
//       toast({ title: "Success!", description: "Vehicle listed successfully." });
//       onSuccess();
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "Something went wrong",
//         variant: "destructive"
//       });
//     } finally { setIsSubmitting(false); }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8 py-4">
//       {/* 1. Basic Info */}
//       <div className="space-y-4">
//         <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2"><Settings2 className="h-5 w-5 text-primary" /> Basic Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="space-y-1">
//             <Label>Seller Type</Label>
//             <Select onValueChange={(v) => handleSelectChange("sellerType", v)} required>
//               <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Individual">Individual</SelectItem>
//                 <SelectItem value="Dealer">Dealer</SelectItem>
//                 <SelectItem value="Franchise">Franchise</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-1"><Label>Make</Label><Input name="make" placeholder="Toyota" onChange={handleInputChange} required /></div>
//           <div className="space-y-1"><Label>Model</Label><Input name="model" placeholder="Fortuner" onChange={handleInputChange} required /></div>
//           <div className="space-y-1"><Label>Variant</Label><Input name="variant" placeholder="Legender" onChange={handleInputChange} /></div>
//           <div className="space-y-1"><Label>Color</Label><Input name="color" placeholder="Pearl White" onChange={handleInputChange} /></div>
//           <div className="space-y-1"><Label>Year</Label><Input name="year" type="number" onChange={handleInputChange} required /></div>
//         </div>
//       </div>

//       {/* 2. Vehicle Details */}
//       <div className="space-y-4">
//         <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2"><Gauge className="h-5 w-5 text-primary" /> Vehicle Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="space-y-1"><Label>No. of Owners</Label><Input name="noOfOwners" type="number" onChange={handleInputChange} /></div>
//           <div className="space-y-1"><Label>KM Driven</Label><Input name="kmDriven" type="number" onChange={handleInputChange} required /></div>
//           <div className="space-y-1">
//             <Label>Fuel Type</Label>
//             <Select onValueChange={(v) => handleSelectChange("fuelType", v)} required>
//               <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Petrol">Petrol</SelectItem>
//                 <SelectItem value="Diesel">Diesel</SelectItem>
//                 <SelectItem value="Electric">Electric</SelectItem>
//                 <SelectItem value="CNG">CNG</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-1">
//             <Label>Transmission</Label>
//             <Select onValueChange={(v) => handleSelectChange("transmission", v)} required>
//               <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Manual">Manual</SelectItem>
//                 <SelectItem value="Automatic">Automatic</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* 3. Location */}
//       <div className="space-y-4">
//         <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2"><MapPin className="h-5 w-5 text-primary" /> Location</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="space-y-1"><Label>Registration City</Label><Input name="registrationCity" placeholder="Mumbai" onChange={handleInputChange} /></div>
//           <div className="space-y-1"><Label>Current City</Label><Input name="city" placeholder="Mumbai" onChange={handleInputChange} required /></div>
//           <div className="space-y-1"><Label>Pincode / RTO Code</Label><Input name="pincode" placeholder="400001" onChange={handleInputChange} required /></div>
//         </div>
//       </div>

//       {/* 4. Pricing */}
//       <div className="space-y-4">
//         <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2"><IndianRupee className="h-5 w-5 text-primary" /> Pricing & Description</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-1"><Label>Expected Price (₹)</Label><Input name="expectedPrice" type="number" onChange={handleInputChange} required /></div>
//           <div className="flex items-center justify-between p-3 border rounded-lg h-10 mt-6">
//             <Label className="text-sm font-normal">Is Price Negotiable?</Label>
//             <Switch checked={formData.negotiable} onCheckedChange={(v) => setFormData(p=>({...p, negotiable: v}))} />
//           </div>
//         </div>
//         <div className="space-y-1"><Label>Description</Label><Textarea name="description" placeholder="Car condition, features, etc." onChange={handleInputChange} rows={3} /></div>
//       </div>

//       {/* 5. Uploads */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <Label className="flex items-center gap-2"><ImageIcon className="h-4 w-4"/> Car Photos</Label>
//           <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative">
//             <Input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setImageFiles(prev => [...prev, ...Array.from(e.target.files!)])} />
//             <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
//             <p className="text-xs text-muted-foreground mt-2">Upload exterior, interior and engine photos</p>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {imageFiles.map((f, i) => (
//               <Badge key={i} variant="secondary" className="gap-1">{f.name} <X className="h-3 w-3 cursor-pointer" onClick={() => setImageFiles(p => p.filter((_, idx) => idx !== i))} /></Badge>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="flex items-center gap-2"><FileText className="h-4 w-4"/> Documents (RC, Insurance)</Label>
//           <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative">
//             <Input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setDocumentFiles(prev => [...prev, ...Array.from(e.target.files!)])} />
//             <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
//             <p className="text-xs text-muted-foreground mt-2">PDF or Images accepted</p>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {documentFiles.map((f, i) => (
//               <Badge key={i} variant="secondary" className="gap-1">{f.name} <X className="h-3 w-3 cursor-pointer" onClick={() => setDocumentFiles(p => p.filter((_, idx) => idx !== i))} /></Badge>
//             ))}
//           </div>
//         </div>
//       </div>

//       <DialogFooter className="gap-2 sm:gap-0">
//         <Button type="button" variant="ghost" onClick={onSuccess}>Cancel</Button>
//         <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
//           {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Publish Listing"}
//         </Button>
//       </DialogFooter>
//     </form>
//   );
// };

// export default MyListings;

// import { useState, useEffect } from "react";
// import {
//   getMyFranchiseListings,
//   createFranchiseCar,
// } from "@/services/franchiseService"; 
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   PlusCircle,
//   Car,
//   Eye,
//   Pencil,
//   Trash2,
//   Fuel,
//   MapPin,
//   Gauge,
//   IndianRupee,
//   Settings2,
//   FileText,
//   Loader2,
//   X,
//   Upload,
//   ImageIcon,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// // --- Types ---
// interface CarListing {
//   _id: string;
//   make: string;
//   model: string;
//   variant?: string;
//   year: number;
//   kmDriven: number;
//   fuelType: string;
//   transmission: string;
//   expectedPrice: number;
//   city: string;
//   images: string[];
//   status: "live" | "pending_verification" | "sold" | "rejected";
// }

// // --- Main Component ---
// const MyListings = () => {
//   const [listings, setListings] = useState<CarListing[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   const fetchListings = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getMyFranchiseListings();
//       setListings(data || []);
//     } catch (error: any) {
//       setListings([]);
//       toast({
//         title: "Failed to Fetch",
//         description: error.response?.data?.message || "Could not load cars.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatPrice = (price: number) => {
//     if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
//     return `₹${price.toLocaleString()}`;
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "live": return "bg-green-100 text-green-800 border-green-200";
//       case "pending_verification": return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "sold": return "bg-blue-100 text-blue-800 border-blue-200";
//       case "rejected": return "bg-red-100 text-red-800 border-red-200";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header - Sirf yahin se List New Car open hoga */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">My Car Listings</h1>
//             <p className="text-muted-foreground mt-1">Manage and track your car inventory.</p>
//           </div>
//           <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//             <DialogTrigger asChild>
//               <Button className="shadow-lg"><PlusCircle className="h-5 w-5 mr-2" />List New Car</Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//               <DialogHeader>
//                 <DialogTitle className="text-2xl font-bold flex items-center gap-2">
//                     <Car className="text-primary" /> Create New Listing
//                 </DialogTitle>
//                 <DialogDescription>Enter all details below to list your vehicle.</DialogDescription>
//               </DialogHeader>
//               <NewCarForm onSuccess={() => { setIsAddModalOpen(false); fetchListings(); }} />
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Listings Content */}
//         {isLoading ? (
//           <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>
//         ) : listings.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {listings.map((car) => (
//               <Card key={car._id} className="overflow-hidden hover:shadow-md transition-shadow">
//                 <AspectRatio ratio={16 / 9}>
//                   <img src={car.images[0] || "https://placehold.co/600x400?text=No+Image"} alt={car.model} className="object-cover w-full h-full" />
//                 </AspectRatio>
//                 <CardHeader className="p-4">
//                   <div className="flex justify-between items-start">
//                     <CardTitle className="text-lg font-bold">{car.make} {car.model}</CardTitle>
// <Badge
//   variant="outline"
//   className={getStatusColor(car.status || "pending_verification")}
// >
//   {(car.status || "pending_verification").replace("_", " ")}
// </Badge>

//                   </div>
//                   <p className="text-sm text-muted-foreground">{car.variant} • {car.year}</p>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div className="flex items-center gap-2 text-foreground font-medium"><IndianRupee className="w-4 h-4 text-primary"/>{formatPrice(car.expectedPrice)}</div>
//                     <div className="flex items-center gap-2 text-muted-foreground"><Gauge className="w-4 h-4"/>{car.kmDriven.toLocaleString()} km</div>
//                     <div className="flex items-center gap-2 text-muted-foreground"><Fuel className="w-4 h-4"/>{car.fuelType}</div>
//                     <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4"/>{car.registrationCity}</div>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="p-4 pt-2 border-t bg-gray-50/50 flex justify-end gap-2">
//                   <Button size="sm" variant="outline" onClick={() => { setSelectedCar(car); setIsViewModalOpen(true); }}><Eye className="w-4 h-4 mr-1" /> View</Button>
//                   <Button size="sm" variant="outline"><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
//                   <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           /* Empty State - Button removed from here as requested */
//           <Card className="p-20 text-center border-dashed">
//             <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium">No cars listed yet</h3>
//             <p className="text-muted-foreground">Your listed cars will appear here. Use the "List New Car" button above to get started.</p>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// // --- Form Component (SAB FIELDS WAISE HI HAIN) ---
// const NewCarForm = ({ onSuccess }: { onSuccess: () => void }) => {
//   const [formData, setFormData] = useState({
//     sellerType: "", make: "", model: "", variant: "", color: "",
//     year: "", noOfOwners: "", kmDriven: "", fuelType: "", transmission: "",
//     registrationCity: "", city: "", pincode: "", expectedPrice: "",
//     negotiable: false, description: ""
//   });

//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [documentFiles, setDocumentFiles] = useState<File[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => data.append(key, value.toString()));
//     imageFiles.forEach(file => data.append("images", file));
//     documentFiles.forEach(file => data.append("documents", file));

//     try {
//       await createFranchiseCar(data);
//       toast({ title: "Success!", description: "Vehicle listed successfully." });
//       onSuccess();
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "Something went wrong",
//         variant: "destructive"
//       });
//     } finally { setIsSubmitting(false); }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8 py-4">
//       {/* 1. Basic Info */}
//       <div className="space-y-4">
//         <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2"><Settings2 className="h-5 w-5 text-primary" /> Basic Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="space-y-1">
//             <Label>Seller Type</Label>
//             <Select onValueChange={(v) => handleSelectChange("sellerType", v)} required>
//               <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Individual">Individual</SelectItem>
//                 <SelectItem value="Dealer">Dealer</SelectItem>
//                 <SelectItem value="Franchise">Franchise</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-1"><Label>Make</Label><Input name="make" placeholder="Toyota" onChange={handleInputChange} required /></div>
//           <div className="space-y-1"><Label>Model</Label><Input name="model" placeholder="Fortuner" onChange={handleInputChange} required /></div>
//           <div className="space-y-1"><Label>Variant</Label><Input name="variant" placeholder="Legender" onChange={handleInputChange} /></div>
//           <div className="space-y-1"><Label>Color</Label><Input name="color" placeholder="Pearl White" onChange={handleInputChange} /></div>
//           <div className="space-y-1"><Label>Year</Label><Input name="year" type="number" onChange={handleInputChange} required /></div>
//         </div>
//       </div>

//       {/* 2. Vehicle Details */}
//       <div className="space-y-4">
//         <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2"><Gauge className="h-5 w-5 text-primary" /> Vehicle Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="space-y-1"><Label>No. of Owners</Label><Input name="noOfOwners" type="number" onChange={handleInputChange} /></div>
//           <div className="space-y-1"><Label>KM Driven</Label><Input name="kmDriven" type="number" onChange={handleInputChange} required /></div>
//           <div className="space-y-1">
//             <Label>Fuel Type</Label>
//             <Select onValueChange={(v) => handleSelectChange("fuelType", v)} required>
//               <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Petrol">Petrol</SelectItem>
//                 <SelectItem value="Diesel">Diesel</SelectItem>
//                 <SelectItem value="Electric">Electric</SelectItem>
//                 <SelectItem value="CNG">CNG</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-1">
//             <Label>Transmission</Label>
//             <Select onValueChange={(v) => handleSelectChange("transmission", v)} required>
//               <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Manual">Manual</SelectItem>
//                 <SelectItem value="Automatic">Automatic</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* 3. Location */}
//       <div className="space-y-4">
//         <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2"><MapPin className="h-5 w-5 text-primary" /> Location</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="space-y-1"><Label>Registration City</Label><Input name="registrationCity" placeholder="Mumbai" onChange={handleInputChange} /></div>
//           <div className="space-y-1"><Label>Current City</Label><Input name="city" placeholder="Mumbai" onChange={handleInputChange} required /></div>
//           <div className="space-y-1"><Label>Pincode / RTO Code</Label><Input name="pincode" placeholder="400001" onChange={handleInputChange} required /></div>
//         </div>
//       </div>

//       {/* 4. Pricing */}
//       <div className="space-y-4">
//         <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2"><IndianRupee className="h-5 w-5 text-primary" /> Pricing & Description</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-1"><Label>Expected Price (₹)</Label><Input name="expectedPrice" type="number" onChange={handleInputChange} required /></div>
//           <div className="flex items-center justify-between p-3 border rounded-lg h-10 mt-6">
//             <Label className="text-sm font-normal">Is Price Negotiable?</Label>
//             <Switch checked={formData.negotiable} onCheckedChange={(v) => setFormData(p=>({...p, negotiable: v}))} />
//           </div>
//         </div>
//         <div className="space-y-1"><Label>Description</Label><Textarea name="description" placeholder="Car condition, features, etc." onChange={handleInputChange} rows={3} /></div>
//       </div>

//       {/* 5. Uploads */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <Label className="flex items-center gap-2"><ImageIcon className="h-4 w-4"/> Car Photos</Label>
//           <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative">
//             <Input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setImageFiles(prev => [...prev, ...Array.from(e.target.files!)])} />
//             <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
//             <p className="text-xs text-muted-foreground mt-2">Upload exterior, interior and engine photos</p>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {imageFiles.map((f, i) => (
//               <Badge key={i} variant="secondary" className="gap-1">{f.name} <X className="h-3 w-3 cursor-pointer" onClick={() => setImageFiles(p => p.filter((_, idx) => idx !== i))} /></Badge>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label className="flex items-center gap-2"><FileText className="h-4 w-4"/> Documents (RC, Insurance)</Label>
//           <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative">
//             <Input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setDocumentFiles(prev => [...prev, ...Array.from(e.target.files!)])} />
//             <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
//             <p className="text-xs text-muted-foreground mt-2">PDF or Images accepted</p>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {documentFiles.map((f, i) => (
//               <Badge key={i} variant="secondary" className="gap-1">{f.name} <X className="h-3 w-3 cursor-pointer" onClick={() => setDocumentFiles(p => p.filter((_, idx) => idx !== i))} /></Badge>
//             ))}
//           </div>
//         </div>
//       </div>

//       <DialogFooter className="gap-2 sm:gap-0">
//         <Button type="button" variant="ghost" onClick={onSuccess}>Cancel</Button>
//         <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
//           {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Publish Listing"}
//         </Button>
//       </DialogFooter>
//     </form>
//   );
// };

// export default MyListings;





// import { useState, useEffect } from "react";
// import {
//   getMyFranchiseListings,
//   createFranchiseCar,
//   editFranchiseCar,
//   deleteFranchiseCar,
// } from "@/services/franchiseService";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   PlusCircle,
//   Car,
//   Eye,
//   Pencil,
//   Trash2,
//   Fuel,
//   MapPin,
//   Gauge,
//   IndianRupee,
//   Settings2,
//   FileText,
//   Loader2,
//   X,
//   Upload,
//   ImageIcon,
//   Calendar,
//   Users,
//   MessageSquare,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// // --- Types ---
// interface CarListing {
//   _id: string;
//   sellerType: string;
//   make: string;
//   model: string;
//   variant?: string;
//   year: number;
//   kmDriven: number;
//   fuelType: string;
//   transmission: string;
//   expectedPrice: number;
//   city: string;
//   pincode: string;
//   registrationCity: string;
//   noOfOwners: number;
//   color: string;
//   negotiable: boolean;
//   description: string;
//   images: string[];
//   documents: string[];
//   status: "live" | "pending_verification" | "sold" | "rejected";
//   views?: number;
//   inquiries?: number;
//   createdAt: string;
// }

// // --- Main Component ---
// const MyListings = () => {
//   const [listings, setListings] = useState<CarListing[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
//   const [editData, setEditData] = useState<CarListing | null>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   const fetchListings = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getMyFranchiseListings();
//       setListings(data || []);
//     } catch (error: any) {
//       setListings([]);
//       toast({
//         title: "Failed to Fetch",
//         description: error.response?.data?.message || "Could not load cars.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this listing?")) return;
//     try {
//       await deleteFranchiseCar(id);
//       toast({ title: "Deleted", description: "Car listing removed successfully." });
//       fetchListings();
//     } catch (error: any) {
//       toast({
//         title: "Delete Failed",
//         description: error.response?.data?.message || "Could not delete car.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleEdit = (car: CarListing) => {
//     setEditData(car);
//     setIsModalOpen(true);
//   };

//   const formatPrice = (price: number) => {
//     if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
//     return `₹${price.toLocaleString()}`;
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "live": return "bg-green-100 text-green-800 border-green-200";
//       case "pending_verification": return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "sold": return "bg-blue-100 text-blue-800 border-blue-200";
//       case "rejected": return "bg-red-100 text-red-800 border-red-200";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">My Car Listings</h1>
//             <p className="text-muted-foreground mt-1">Manage and track your car inventory.</p>
//           </div>
//           <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if (!open) setEditData(null); }}>
//             <DialogTrigger asChild>
//               <Button className="shadow-lg"><PlusCircle className="h-5 w-5 mr-2" />List New Car</Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//               <DialogHeader>
//                 <DialogTitle className="text-2xl font-bold flex items-center gap-2">
//                     <Car className="text-primary" /> {editData ? "Edit Listing" : "Create New Listing"}
//                 </DialogTitle>
//                 <DialogDescription>Enter details below to {editData ? "update" : "list"} your vehicle.</DialogDescription>
//               </DialogHeader>
//               <CarForm 
//                 editData={editData} 
//                 onSuccess={() => { setIsModalOpen(false); setEditData(null); fetchListings(); }} 
//               />
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Listings Grid */}
//         {isLoading ? (
//           <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>
//         ) : listings.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {listings.map((car) => (
//               <Card key={car._id} className="overflow-hidden hover:shadow-md transition-shadow">
//                 <AspectRatio ratio={16 / 9}>
//                   <img src={car.images[0] || "https://placehold.co/600x400?text=No+Image"} alt={car.model} className="object-cover w-full h-full" />
//                 </AspectRatio>
//                 <CardHeader className="p-4">
//                   <div className="flex justify-between items-start">
//                     <CardTitle className="text-lg font-bold">{car.make} {car.model}</CardTitle>
//                     <Badge variant="outline" className={getStatusColor(car.status || "pending_verification")}>
//                       {(car.status || "pending_verification").replace("_", " ")}
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-muted-foreground">{car.variant} • {car.year}</p>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div className="flex items-center gap-2 text-foreground font-medium"><IndianRupee className="w-4 h-4 text-primary"/>{formatPrice(car.expectedPrice)}</div>
//                     <div className="flex items-center gap-2 text-muted-foreground"><Gauge className="w-4 h-4"/>{car.kmDriven.toLocaleString()} km</div>
//                     <div className="flex items-center gap-2 text-muted-foreground"><Fuel className="w-4 h-4"/>{car.fuelType}</div>
//                     <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4"/>{car.registrationCity}</div>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="p-4 pt-2 border-t bg-gray-50/50 flex justify-end gap-2">
//                   <Button size="sm" variant="outline" onClick={() => { setSelectedCar(car); setIsViewModalOpen(true); }}><Eye className="w-4 h-4 mr-1" /> View</Button>
//                   <Button size="sm" variant="outline" onClick={() => handleEdit(car)}><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
//                   <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(car._id)}><Trash2 className="w-4 h-4" /></Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <Card className="p-20 text-center border-dashed">
//             <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium">No cars listed yet</h3>
//             <p className="text-muted-foreground">Your listed cars will appear here. Use the button above to get started.</p>
//           </Card>
//         )}

//         {/* View Details Modal (Image 2 & 3 Matching) */}
//         <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
//           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//             {selectedCar && (
//               <>
//                 <DialogHeader>
//                   <DialogTitle className="text-2xl font-bold">{selectedCar.make} {selectedCar.model}</DialogTitle>
//                   <DialogDescription>{selectedCar.variant} • {selectedCar.year}</DialogDescription>
//                 </DialogHeader>

//                 <div className="space-y-6 py-4">
//                   <AspectRatio ratio={16 / 9}>
//                     <img src={selectedCar.images[0]} alt={selectedCar.model} className="object-cover w-full h-full rounded-lg" />
//                   </AspectRatio>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <span className="text-3xl font-bold text-primary">{formatPrice(selectedCar.expectedPrice)}</span>
//                       {selectedCar.negotiable && <Badge variant="secondary" className="ml-2">Negotiable</Badge>}
//                     </div>
//                     <Badge className={getStatusColor(selectedCar.status)}>{selectedCar.status.replace('_', ' ')}</Badge>
//                   </div>

//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     <div className="p-3 bg-gray-50 rounded-lg border">
//                       <p className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Gauge className="w-3 h-3"/> KM Driven</p>
//                       <p className="font-semibold">{selectedCar.kmDriven.toLocaleString()} km</p>
//                     </div>
//                     <div className="p-3 bg-gray-50 rounded-lg border">
//                       <p className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Fuel className="w-3 h-3"/> Fuel Type</p>
//                       <p className="font-semibold">{selectedCar.fuelType}</p>
//                     </div>
//                     <div className="p-3 bg-gray-50 rounded-lg border">
//                       <p className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Settings2 className="w-3 h-3"/> Transmission</p>
//                       <p className="font-semibold">{selectedCar.transmission}</p>
//                     </div>
//                     <div className="p-3 bg-gray-50 rounded-lg border">
//                       <p className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Users className="w-3 h-3"/> Owners</p>
//                       <p className="font-semibold">{selectedCar.noOfOwners} Owner</p>
//                     </div>
//                     <div className="p-3 bg-gray-50 rounded-lg border">
//                       <p className="text-xs text-muted-foreground uppercase flex items-center gap-1"><MapPin className="w-3 h-3"/> Location</p>
//                       <p className="font-semibold">{selectedCar.registrationCity}</p>
//                     </div>
//                     <div className="p-3 bg-gray-50 rounded-lg border">
//                       <p className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Calendar className="w-3 h-3"/> Listed On</p>
//                       <p className="font-semibold">{new Date(selectedCar.createdAt).toLocaleDateString()}</p>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="font-semibold mb-2">Description</h4>
//                     <p className="text-sm text-muted-foreground leading-relaxed">{selectedCar.description || "No description provided."}</p>
//                   </div>

//                   <div className="flex items-center gap-6 pt-4 border-t text-sm text-muted-foreground">
//                     <span className="flex items-center gap-1"><Eye className="w-4 h-4"/> {selectedCar.views || 0} Views</span>
//                     <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4"/> {selectedCar.inquiries || 0} Inquiries</span>
//                   </div>
//                 </div>
//                 <DialogFooter className="gap-2">
//                     <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
//                     <Button onClick={() => { setIsViewModalOpen(false); handleEdit(selectedCar); }}><Pencil className="w-4 h-4 mr-2"/> Edit Listing</Button>
//                 </DialogFooter>
//               </>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// // --- Combined Form Component (Create & Edit) ---
// const CarForm = ({ editData, onSuccess }: { editData: CarListing | null, onSuccess: () => void }) => {
//   const [formData, setFormData] = useState({
//     sellerType: "franchise", make: "", model: "", variant: "", color: "",
//     year: "", noOfOwners: "1", kmDriven: "", fuelType: "", transmission: "",
//     registrationCity: "", city: "", pincode: "", expectedPrice: "",
//     negotiable: false, description: ""
//   });

//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [documentFiles, setDocumentFiles] = useState<File[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   // Pre-fill form if editing
//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         sellerType: editData.sellerType || "franchise",
//         make: editData.make,
//         model: editData.model,
//         variant: editData.variant || "",
//         color: editData.color || "",
//         year: editData.year.toString(),
//         noOfOwners: editData.noOfOwners.toString(),
//         kmDriven: editData.kmDriven.toString(),
//         fuelType: editData.fuelType,
//         transmission: editData.transmission,
//         registrationCity: editData.registrationCity,
//         city: editData.city || "",
//         pincode: editData.pincode || "",
//         expectedPrice: editData.expectedPrice.toString(),
//         negotiable: editData.negotiable,
//         description: editData.description || ""
//       });
//     }
//   }, [editData]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => data.append(key, value.toString()));
//     imageFiles.forEach(file => data.append("images", file));
//     documentFiles.forEach(file => data.append("documents", file));

//     try {
//       if (editData) {
//         await editFranchiseCar(editData._id, data);
//         toast({ title: "Updated", description: "Listing updated successfully." });
//       } else {
//         await createFranchiseCar(data);
//         toast({ title: "Success", description: "Vehicle listed successfully." });
//       }
//       onSuccess();
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "Something went wrong",
//         variant: "destructive"
//       });
//     } finally { setIsSubmitting(false); }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8 py-4">
//       {/* Basic Info Section */}
//       <div className="space-y-4">
//         <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2"><Settings2 className="h-5 w-5 text-primary" /> Basic Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="space-y-1"><Label>Make</Label><Input name="make" value={formData.make} onChange={handleInputChange} required /></div>
//           <div className="space-y-1"><Label>Model</Label><Input name="model" value={formData.model} onChange={handleInputChange} required /></div>
//           <div className="space-y-1"><Label>Variant</Label><Input name="variant" value={formData.variant} onChange={handleInputChange} /></div>
//           <div className="space-y-1"><Label>Color</Label><Input name="color" value={formData.color} onChange={handleInputChange} /></div>
//           <div className="space-y-1"><Label>Year</Label><Input name="year" type="number" value={formData.year} onChange={handleInputChange} required /></div>
//           <div className="space-y-1">
//             <Label>Fuel Type</Label>
//             <Select value={formData.fuelType} onValueChange={(v) => setFormData(p=>({...p, fuelType: v}))}>
//               <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Petrol">Petrol</SelectItem>
//                 <SelectItem value="Diesel">Diesel</SelectItem>
//                 <SelectItem value="Electric">Electric</SelectItem>
//                 <SelectItem value="CNG">CNG</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Details Section */}
//       <div className="space-y-4">
//         <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2"><Gauge className="h-5 w-5 text-primary" /> Vehicle Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="space-y-1"><Label>KM Driven</Label><Input name="kmDriven" type="number" value={formData.kmDriven} onChange={handleInputChange} required /></div>
//           <div className="space-y-1"><Label>Owners</Label><Input name="noOfOwners" type="number" value={formData.noOfOwners} onChange={handleInputChange} /></div>
//           <div className="space-y-1">
//             <Label>Transmission</Label>
//             <Select value={formData.transmission} onValueChange={(v) => setFormData(p=>({...p, transmission: v}))}>
//               <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Manual">Manual</SelectItem>
//                 <SelectItem value="Automatic">Automatic</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-1"><Label>Registration City</Label><Input name="registrationCity" value={formData.registrationCity} onChange={handleInputChange} required /></div>
//         </div>
//       </div>

//       {/* Price Section */}
//       <div className="space-y-4">
//         <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2"><IndianRupee className="h-5 w-5 text-primary" /> Pricing</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-1"><Label>Expected Price (₹)</Label><Input name="expectedPrice" type="number" value={formData.expectedPrice} onChange={handleInputChange} required /></div>
//           <div className="flex items-center justify-between p-3 border rounded-lg h-10 mt-6">
//             <Label className="text-sm font-normal">Negotiable?</Label>
//             <Switch checked={formData.negotiable} onCheckedChange={(v) => setFormData(p=>({...p, negotiable: v}))} />
//           </div>
//         </div>
//         <div className="space-y-1"><Label>Description</Label><Textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} /></div>
//       </div>

//       {/* Media Uploads */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <Label className="flex items-center gap-2"><ImageIcon className="h-4 w-4"/> Photos {editData && "(Upload new to change)"}</Label>
//           <div className="border-2 border-dashed rounded-xl p-6 text-center relative hover:bg-gray-50">
//             <Input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setImageFiles(Array.from(e.target.files))} />
//             <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
//             <p className="text-xs text-muted-foreground mt-2">Click to upload photos</p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {imageFiles.map((f, i) => <Badge key={i} variant="secondary" className="text-[10px]">{f.name}</Badge>)}
//           </div>
//         </div>
//         <div className="space-y-2">
//           <Label className="flex items-center gap-2"><FileText className="h-4 w-4"/> Documents</Label>
//           <div className="border-2 border-dashed rounded-xl p-6 text-center relative hover:bg-gray-50">
//             <Input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setDocumentFiles(Array.from(e.target.files))} />
//             <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
//             <p className="text-xs text-muted-foreground mt-2">Upload RC/Insurance</p>
//           </div>
//           {documentFiles.map((f, i) => <Badge key={i} variant="secondary" className="text-[10px]">{f.name}</Badge>)}
//         </div>
//       </div>

//       <DialogFooter className="gap-2">
//         <Button type="button" variant="ghost" onClick={onSuccess}>Cancel</Button>
//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//           {editData ? "Update Listing" : "Publish Listing"}
//         </Button>
//       </DialogFooter>
//     </form>
//   );
// };

// export default MyListings;

import { useState, useEffect } from "react";
import {
  getMyFranchiseListings,
  createFranchiseCar,
  editFranchiseCar,
  deleteFranchiseCar,
} from "@/services/franchiseService";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Car,
  Eye,
  Pencil,
  Trash2,
  Fuel,
  MapPin,
  Gauge,
  IndianRupee,
  Settings2,
  X,
  Upload,
  Calendar,
  Users,
  MessageSquare,
  Loader2,
  ImageIcon,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// --- Types ---
interface CarListing {
  _id: string;
  sellerType: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  kmDriven: number;
  fuelType: string;
  transmission: string;
  expectedPrice: number;
  city: string;
  pincode: string;
  registrationCity: string;
  noOfOwners: number;
  color: string;
  negotiable: boolean;
  description: string;
  images: string[];
  documents: string[];
  status: "live" | "pending_verification" | "sold" | "rejected";
  views?: number;
  inquiries?: number;
  createdAt: string;
}

const MyListings = () => {
  const [listings, setListings] = useState<CarListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
  const [editData, setEditData] = useState<CarListing | null>(null);
  const { toast } = useToast();

  useEffect(() => { fetchListings(); }, []);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const data = await getMyFranchiseListings();
      setListings(data || []);
    } catch (error: any) {
      setListings([]);
      toast({ title: "Error", description: "Could not load cars.", variant: "destructive" });
    } finally { setIsLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteFranchiseCar(id);
      toast({ title: "Deleted", description: "Car listing removed." });
      fetchListings();
    } catch (error: any) {
      toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
    }
  };

  // --- Edit Functionality ---
  const handleEdit = (car: CarListing) => {
    setEditData(car);
    setIsModalOpen(true);
  };

  const formatPrice = (price: number) => {
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="p-6 md:p-8 bg-[#f8f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1f2c]">My Car Listings</h1>
            <p className="text-gray-500 mt-1">Manage and track your car inventory.</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if (!open) setEditData(null); }}>
            <DialogTrigger asChild>
              <Button className="bg-[#0052cc] hover:bg-[#0041a3] shadow-md rounded-lg">
                <PlusCircle className="h-5 w-5 mr-2" />List New Car
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                    <Car className="text-[#0052cc]" /> {editData ? "Edit Vehicle Listing" : "Create New Vehicle Listing"}
                </DialogTitle>
                <DialogDescription>Fill in the details below to {editData ? "update" : "list"} your vehicle.</DialogDescription>
              </DialogHeader>
              <CarForm 
                editData={editData} 
                onSuccess={() => { setIsModalOpen(false); setEditData(null); fetchListings(); }} 
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Listings Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-[#0052cc]" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((car) => (
              <Card key={car._id} className="border-none rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-2xl">
                <AspectRatio ratio={16 / 10}>
                  <img src={car.images[0] || "https://placehold.co/600x400?text=No+Image"} alt={car.model} className="object-cover w-full h-full" />
                </AspectRatio>
                <CardHeader className="p-5 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold text-[#1a1f2c]">{car.make} {car.model}</CardTitle>
                      <p className="text-sm text-gray-500 font-medium">{car.variant} • {car.year}</p>
                    </div>
                    <Badge className="bg-green-50 text-green-600 border-none rounded-full px-3 py-0.5 text-[10px] font-bold uppercase">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-2">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                    <div className="flex items-center gap-2 text-[#0052cc] font-bold text-lg leading-none">
                       <IndianRupee className="w-4 h-4" /> {formatPrice(car.expectedPrice).replace('₹', '')}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                      <Gauge className="w-4 h-4 text-gray-300" /> {car.kmDriven.toLocaleString()} km
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                      <Fuel className="w-4 h-4 text-gray-300" /> {car.fuelType}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                      <MapPin className="w-4 h-4 text-gray-300" /> {car.registrationCity || car.city}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0 flex justify-between items-center border-t border-gray-50 mt-2">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                    <Eye className="h-4 w-4" /> {car.views || 0}
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-[#0052cc]" onClick={() => { setSelectedCar(car); setIsViewModalOpen(true); }}><Eye className="w-5 h-5" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-[#0052cc]" onClick={() => handleEdit(car)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-500" onClick={() => handleDelete(car._id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* View Details Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl p-0 rounded-2xl overflow-hidden border-none flex flex-col max-h-[90vh] shadow-2xl bg-white">
            {selectedCar && (
              <>
                <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1a1f2c]">{selectedCar.make} {selectedCar.model}</h2>
                      <p className="text-gray-500 font-medium">{selectedCar.variant} • {selectedCar.year}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400" onClick={() => setIsViewModalOpen(false)}><X className="h-5 w-5"/></Button>
                  </div>
                  
                  <AspectRatio ratio={16 / 9} className="rounded-2xl overflow-hidden shadow-sm">
                    <img src={selectedCar.images[0]} alt="car" className="object-cover w-full h-full" />
                  </AspectRatio>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-extrabold text-[#0052cc]">{formatPrice(selectedCar.expectedPrice)}</span>
                      {selectedCar.negotiable && <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Negotiable</span>}
                    </div>
                    <Badge className="bg-green-50 text-green-600 border-none rounded-full px-4 py-1 text-xs font-bold uppercase">Active</Badge>
                  </div>

                  {/* Icon Grid Style */}
                  <div className="grid grid-cols-3 gap-y-10 gap-x-4">
                    {[
                      { label: "KM Driven", value: `${selectedCar.kmDriven.toLocaleString()} km`, icon: <Gauge className="w-4 h-4"/> },
                      { label: "Fuel Type", value: selectedCar.fuelType, icon: <Fuel className="w-4 h-4"/> },
                      { label: "Transmission", value: selectedCar.transmission, icon: <Settings2 className="w-4 h-4"/> },
                      { label: "Owners", value: `${selectedCar.noOfOwners || 1}st Owner`, icon: <Users className="w-4 h-4"/> },
                      { label: "Location", value: selectedCar.registrationCity || selectedCar.city, icon: <MapPin className="w-4 h-4"/> },
                      { label: "Listed On", value: selectedCar.createdAt ? new Date(selectedCar.createdAt).toLocaleDateString('en-GB') : "23/12/2025", icon: <Calendar className="w-4 h-4"/> },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-400">
                           {item.icon}
                           <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                        </div>
                        <p className="font-bold text-base text-[#1a1f2c]">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-[#1a1f2c]">Description</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      {selectedCar.description || "Well maintained vehicle in pristine condition."}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-gray-400 pt-2 font-medium">
                    <span className="flex items-center gap-1.5 text-gray-400"><Eye className="h-4 w-4" /> {selectedCar.views || 0} Views</span>
                    <span className="flex items-center gap-1.5 text-gray-400"><MessageSquare className="h-4 w-4" /> {selectedCar.inquiries || 0} Inquiries</span>
                  </div>
                </div>

                {/* Footer buttons - EDIT CLICK LOGIC ADDED HERE */}
                <div className="p-5 bg-gray-50/50 border-t flex justify-end gap-3 px-8 shrink-0">
                  <Button variant="outline" className="rounded-lg h-10 px-6 font-bold border-gray-200 text-gray-600" onClick={() => setIsViewModalOpen(false)}>Close</Button>
                  <Button 
                    className="bg-[#0052cc] hover:bg-[#0041a3] rounded-lg h-10 px-6 font-bold flex items-center gap-2 shadow-sm" 
                    onClick={() => { 
                      setIsViewModalOpen(false); // Close View Modal
                      handleEdit(selectedCar);   // Open Edit Form Modal
                    }}
                  >
                    <Pencil className="w-4 h-4" /> Edit Listing
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// --- Full Form Component ---
const CarForm = ({ editData, onSuccess }: { editData: CarListing | null, onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    sellerType: "franchise", make: "", model: "", variant: "", color: "",
    year: "", noOfOwners: "1", kmDriven: "", fuelType: "", transmission: "",
    registrationCity: "", city: "", pincode: "", expectedPrice: "",
    negotiable: false, description: ""
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editData) {
      setFormData({
        sellerType: "franchise", make: editData.make, model: editData.model, variant: editData.variant || "",
        color: editData.color || "", year: editData.year.toString(), noOfOwners: editData.noOfOwners?.toString() || "1",
        kmDriven: editData.kmDriven.toString(), fuelType: editData.fuelType, transmission: editData.transmission,
        registrationCity: editData.registrationCity, city: editData.city || "", pincode: editData.pincode || "",
        expectedPrice: editData.expectedPrice.toString(), negotiable: editData.negotiable || false, description: editData.description || ""
      });
    }
  }, [editData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v.toString()));
    imageFiles.forEach(file => data.append("images", file));
    documentFiles.forEach(file => data.append("documents", file));

    try {
      if (editData) await editFranchiseCar(editData._id, data);
      else await createFranchiseCar(data);
      toast({ title: "Success!", description: "Car listing saved successfully." });
      onSuccess();
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Something went wrong", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 py-4">
      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2 text-[#1a1f2c]"><Settings2 className="h-5 w-5 text-[#0052cc]" /> Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1"><Label>Make</Label><Input name="make" value={formData.make} placeholder="Toyota" onChange={handleInputChange} required /></div>
          <div className="space-y-1"><Label>Model</Label><Input name="model" value={formData.model} placeholder="Fortuner" onChange={handleInputChange} required /></div>
          <div className="space-y-1"><Label>Variant</Label><Input name="variant" value={formData.variant} placeholder="Legender" onChange={handleInputChange} /></div>
          <div className="space-y-1"><Label>Color</Label><Input name="color" value={formData.color} placeholder="Pearl White" onChange={handleInputChange} /></div>
          <div className="space-y-1"><Label>Year</Label><Input name="year" type="number" value={formData.year} onChange={handleInputChange} required /></div>
          <div className="space-y-1">
            <Label>Fuel Type</Label>
            <Select value={formData.fuelType} onValueChange={(v) => setFormData(p=>({...p, fuelType: v}))}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Petrol">Petrol</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="CNG">CNG</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2 text-[#1a1f2c]"><Gauge className="h-5 w-5 text-[#0052cc]" /> Vehicle Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1"><Label>KM Driven</Label><Input name="kmDriven" type="number" value={formData.kmDriven} onChange={handleInputChange} required /></div>
          <div className="space-y-1"><Label>Owners</Label><Input name="noOfOwners" type="number" value={formData.noOfOwners} onChange={handleInputChange} /></div>
          <div className="space-y-1">
            <Label>Transmission</Label>
            <Select value={formData.transmission} onValueChange={(v) => setFormData(p=>({...p, transmission: v}))}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Automatic">Automatic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1"><Label>Registration City</Label><Input name="registrationCity" value={formData.registrationCity} onChange={handleInputChange} required /></div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2 text-[#1a1f2c]"><IndianRupee className="h-5 w-5 text-[#0052cc]" /> Pricing & Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1"><Label>Expected Price (₹)</Label><Input name="expectedPrice" type="number" value={formData.expectedPrice} onChange={handleInputChange} required /></div>
          <div className="flex items-center justify-between p-3 border rounded-lg h-10 mt-6">
            <Label className="text-sm font-normal">Negotiable?</Label>
            <Switch checked={formData.negotiable} onCheckedChange={(v) => setFormData(p=>({...p, negotiable: v}))} />
          </div>
        </div>
        <div className="space-y-1"><Label>Description</Label><Textarea name="description" value={formData.description} placeholder="Enter car description" onChange={handleInputChange} rows={3} /></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2"><ImageIcon className="h-4 w-4"/> Photos</Label>
          <div className="border-2 border-dashed rounded-xl p-6 text-center relative hover:bg-gray-50 transition-colors">
            <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setImageFiles(Array.from(e.target.files))} />
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="text-xs text-gray-400 mt-2 font-medium">Click to upload photos</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {imageFiles.map((f, i) => <Badge key={i} variant="secondary" className="text-[10px] gap-1">{f.name} <X className="h-3 w-3 cursor-pointer" onClick={() => setImageFiles(prev => prev.filter((_, idx) => idx !== i))} /></Badge>)}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2"><FileText className="h-4 w-4"/> Documents</Label>
          <div className="border-2 border-dashed rounded-xl p-6 text-center relative hover:bg-gray-50 transition-colors">
            <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setDocumentFiles(Array.from(e.target.files))} />
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="text-xs text-gray-400 mt-2 font-medium">Upload RC/Insurance</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {documentFiles.map((f, i) => <Badge key={i} variant="secondary" className="text-[10px] gap-1">{f.name} <X className="h-3 w-3 cursor-pointer" onClick={() => setDocumentFiles(prev => prev.filter((_, idx) => idx !== i))} /></Badge>)}
          </div>
        </div>
      </div>

      <DialogFooter className="gap-2 sm:gap-0 mt-8">
        <Button type="button" variant="ghost" className="rounded-lg" onClick={onSuccess}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting} className="bg-[#0052cc] hover:bg-[#0041a3] rounded-lg px-8">
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : (editData ? "Update Listing" : "Publish Listing")}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default MyListings;