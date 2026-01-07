    

 
// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import { UserPlus, Phone, Mail, MapPin } from "lucide-react";
 
// import {
//   getMyInspectors,
//   createFranchiseInspector,
// } from "@/services/franchiseService";
 
// /* ================= INTERFACE ================= */
 
// interface Inspector {
//   _id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   pincode: string;
//   createdAt: string;
//   profileImage?: string;
// }
 
// /* ================= COMPONENT ================= */
 
// const Inspectors = () => {
//   const { toast } = useToast();
 
//   const [inspectors, setInspectors] = useState<Inspector[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
 
//   const [preview, setPreview] = useState<string | null>(null);
 
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     pincode: "",
//     profileImage: null as File | null,
//   });
 
//   /* ================= FETCH ================= */
 
//   const fetchInspectors = async () => {
//     try {
//       const res = await getMyInspectors();
//       if (res.success) setInspectors(res.data);
//     } catch {
//       toast({
//         title: "Failed to load inspectors",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   useEffect(() => {
//     fetchInspectors();
//   }, []);
 
//   /* ================= IMAGE CHANGE ================= */
 
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
 
//     setForm({ ...form, profileImage: file });
//     setPreview(URL.createObjectURL(file));
//   };
 
//   /* ================= CREATE ================= */
 
//   const handleCreate = async () => {
//     try {
//       const res = await createFranchiseInspector(form);
//       if (res.success) {
//         toast({ title: "Inspector created successfully" });
//         setOpen(false);
//         fetchInspectors();
 
//         setForm({
//           fullName: "",
//           email: "",
//           phone: "",
//           password: "",
//           pincode: "",
//           profileImage: null,
//         });
 
//         setPreview(null);
//       }
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err?.response?.data?.message || "Failed",
//         variant: "destructive",
//       });
//     }
//   };
 
//   /* ================= UI ================= */
 
//   return (
//     <div className="p-6 space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">My Inspectors</h1>
//         <Button onClick={() => setOpen(true)} className="gap-2">
//           <UserPlus className="w-4 h-4" />
//           Add Inspector
//         </Button>
//       </div>
 
//       {/* LIST */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {!loading &&
//           inspectors.map((i) => (
//             <Card key={i._id} className="glass-card">
//               <CardContent className="p-4 space-y-3">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={i.profileImage || "/avatar.png"}
//                     alt={i.fullName}
//                     className="w-14 h-14 rounded-full object-cover border"
//                   />
//                   <h3 className="text-lg font-semibold">{i.fullName}</h3>
//                 </div>
 
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Mail className="w-4 h-4" /> {i.email}
//                 </div>
 
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Phone className="w-4 h-4" /> {i.phone}
//                 </div>
 
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <MapPin className="w-4 h-4" /> {i.pincode}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//       </div>
 
//       {/* CREATE DIALOG */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create Inspector</DialogTitle>
//           </DialogHeader>
 
//           {/* IMAGE PREVIEW */}
//           <div className="flex justify-center">
//             <div className="w-24 h-24 rounded-full border overflow-hidden">
//               <img
//                 src={preview || "/avatar.png"}
//                 alt="Preview"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
 
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
 
//           <div className="space-y-3">
//             <Input
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={(e) =>
//                 setForm({ ...form, fullName: e.target.value })
//               }
//             />
//             <Input
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) =>
//                 setForm({ ...form, email: e.target.value })
//               }
//             />
//             <Input
//               placeholder="Phone"
//               value={form.phone}
//               onChange={(e) =>
//                 setForm({ ...form, phone: e.target.value })
//               }
//             />
//             <Input
//               placeholder="Pincode"
//               value={form.pincode}
//               onChange={(e) =>
//                 setForm({ ...form, pincode: e.target.value })
//               }
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) =>
//                 setForm({ ...form, password: e.target.value })
//               }
//             />
//           </div>
 
//           <Button onClick={handleCreate} className="mt-4 w-full">
//             Create Inspector
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
 
// export default Inspectors;
 
//  import { useState, useEffect, useRef } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Plus,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Users,
//   UserPlus,
//   Camera,
//   Loader2,
//   Shield,
// } from "lucide-react";

// // Types
// interface Inspector {
//   _id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   pincode: string;
//   profileImage: string;
//   createdAt: string;
// }

// // Mock API functions - replace with real APIs
// const getMyInspectors = async (): Promise<Inspector[]> => {
//   await new Promise((resolve) => setTimeout(resolve, 800));
//   return [
//     {
//       _id: "1",
//       fullName: "Rahul Sharma",
//       email: "rahul.sharma@example.com",
//       phone: "+91 98765 43210",
//       pincode: "110001",
//       profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//       createdAt: "2024-01-15T10:30:00Z",
//     },
//     {
//       _id: "2",
//       fullName: "Priya Patel",
//       email: "priya.patel@example.com",
//       phone: "+91 87654 32109",
//       pincode: "400001",
//       profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
//       createdAt: "2024-02-20T14:45:00Z",
//     },
//     {
//       _id: "3",
//       fullName: "Amit Kumar",
//       email: "amit.kumar@example.com",
//       phone: "+91 76543 21098",
//       pincode: "560001",
//       profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//       createdAt: "2024-03-10T09:15:00Z",
//     },
//   ];
// };

// const createFranchiseInspector = async (data: FormData): Promise<Inspector> => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return {
//     _id: Date.now().toString(),
//     fullName: data.get("fullName") as string,
//     email: data.get("email") as string,
//     phone: data.get("phone") as string,
//     pincode: data.get("pincode") as string,
//     profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
//     createdAt: new Date().toISOString(),
//   };
// };

// const Inspectors = () => {
//   const { toast } = useToast();
//   const [inspectors, setInspectors] = useState<Inspector[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [creating, setCreating] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Form state
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     pincode: "",
//   });

//   // Fetch inspectors on mount
//   useEffect(() => {
//     fetchInspectors();
//   }, []);

//   const fetchInspectors = async () => {
//     try {
//       setLoading(true);
//       const data = await getMyInspectors();
//       setInspectors(data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch inspectors",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.fullName || !formData.email || !formData.phone || !formData.pincode) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill all required fields",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       setCreating(true);
//       const form = new FormData();
//       form.append("fullName", formData.fullName);
//       form.append("email", formData.email);
//       form.append("phone", formData.phone);
//       form.append("pincode", formData.pincode);
      
//       if (fileInputRef.current?.files?.[0]) {
//         form.append("profileImage", fileInputRef.current.files[0]);
//       }

//       await createFranchiseInspector(form);
      
//       toast({
//         title: "Success!",
//         description: "Inspector added successfully",
//       });

//       // Reset form and close dialog
//       setFormData({ fullName: "", email: "", phone: "", pincode: "" });
//       setImagePreview(null);
//       setDialogOpen(false);
      
//       // Refresh list
//       fetchInspectors();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to create inspector",
//         variant: "destructive",
//       });
//     } finally {
//       setCreating(false);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // Loading State
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//           <p className="text-muted-foreground text-sm">Loading inspectors...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
//           <div>
//             <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">
//               Inspectors
//             </h1>
//             <p className="text-muted-foreground mt-1.5">
//               Manage your franchise inspection team
//             </p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             {/* Inspector count badge */}
//             {inspectors.length > 0 && (
//               <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
//                 <Users className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm font-medium text-foreground">
//                   {inspectors.length} {inspectors.length === 1 ? "Inspector" : "Inspectors"}
//                 </span>
//               </div>
//             )}
            
//             {/* Add Inspector Dialog */}
//             <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button className="gap-2 shadow-sm">
//                   <Plus className="h-4 w-4" />
//                   Add Inspector
//                 </Button>
//               </DialogTrigger>
              
//               <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
//                 <DialogHeader className="pb-2">
//                   <DialogTitle className="text-xl font-semibold">Add New Inspector</DialogTitle>
//                 </DialogHeader>
                
//                 <form onSubmit={handleSubmit} className="space-y-6 pt-2">
//                   {/* Avatar Upload */}
//                   <div className="flex justify-center">
//                     <div
//                       onClick={() => fileInputRef.current?.click()}
//                       className="relative cursor-pointer group"
//                     >
//                       <div className="h-24 w-24 rounded-full bg-secondary border-2 border-dashed border-border overflow-hidden flex items-center justify-center transition-all group-hover:border-primary group-hover:bg-secondary/80">
//                         {imagePreview ? (
//                           <img
//                             src={imagePreview}
//                             alt="Preview"
//                             className="h-full w-full object-cover"
//                           />
//                         ) : (
//                           <Camera className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
//                         )}
//                       </div>
//                       <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-primary rounded-full flex items-center justify-center shadow-md">
//                         <Plus className="h-4 w-4 text-primary-foreground" />
//                       </div>
//                       <input
//                         ref={fileInputRef}
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="hidden"
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Form Fields - 2 column grid on desktop */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="sm:col-span-2 space-y-2">
//                       <Label htmlFor="fullName" className="text-sm font-medium">
//                         Full Name <span className="text-destructive">*</span>
//                       </Label>
//                       <Input
//                         id="fullName"
//                         placeholder="Enter full name"
//                         value={formData.fullName}
//                         onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                         className="h-10"
//                       />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <Label htmlFor="email" className="text-sm font-medium">
//                         Email <span className="text-destructive">*</span>
//                       </Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="email@example.com"
//                         value={formData.email}
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                         className="h-10"
//                       />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <Label htmlFor="phone" className="text-sm font-medium">
//                         Phone <span className="text-destructive">*</span>
//                       </Label>
//                       <Input
//                         id="phone"
//                         placeholder="+91 98765 43210"
//                         value={formData.phone}
//                         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                         className="h-10"
//                       />
//                     </div>
                    
//                     <div className="sm:col-span-2 space-y-2">
//                       <Label htmlFor="pincode" className="text-sm font-medium">
//                         Pincode <span className="text-destructive">*</span>
//                       </Label>
//                       <Input
//                         id="pincode"
//                         placeholder="Enter pincode"
//                         value={formData.pincode}
//                         onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
//                         className="h-10"
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Submit Button */}
//                   <Button
//                     type="submit"
//                     className="w-full h-11 gap-2"
//                     disabled={creating}
//                   >
//                     {creating ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         Creating...
//                       </>
//                     ) : (
//                       <>
//                         <UserPlus className="h-4 w-4" />
//                         Add Inspector
//                       </>
//                     )}
//                   </Button>
//                 </form>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>

//         {/* Empty State */}
//         {inspectors.length === 0 ? (
//           <div className="flex items-center justify-center py-20">
//             <Card className="max-w-sm w-full p-8 text-center border border-border/50 shadow-sm">
//               <div className="h-16 w-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-5">
//                 <Shield className="h-8 w-8 text-muted-foreground" />
//               </div>
//               <h3 className="text-lg font-semibold text-foreground mb-2">
//                 No inspectors yet
//               </h3>
//               <p className="text-muted-foreground text-sm mb-6">
//                 Get started by adding your first inspector to the team.
//               </p>
//               <Button onClick={() => setDialogOpen(true)} className="gap-2">
//                 <Plus className="h-4 w-4" />
//                 Add your first Inspector
//               </Button>
//             </Card>
//           </div>
//         ) : (
//           /* Inspector Grid */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {inspectors.map((inspector, index) => (
//               <Card
//                 key={inspector._id}
//                 className="group p-5 border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-in"
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >
//                 {/* Top Section - Avatar & Name */}
//                 <div className="flex items-start gap-4 mb-4">
//                   <div className="relative">
//                     <img
//                       src={inspector.profileImage}
//                       alt={inspector.fullName}
//                       className="h-14 w-14 rounded-full object-cover ring-2 ring-background shadow-sm"
//                     />
//                     <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-success rounded-full border-2 border-card" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-foreground truncate">
//                       {inspector.fullName}
//                     </h3>
//                     <span className="inline-flex items-center px-2 py-0.5 mt-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
//                       Inspector
//                     </span>
//                   </div>
//                 </div>

//                 {/* Details */}
//                 <div className="space-y-2.5">
//                   <div className="flex items-center gap-3 text-sm">
//                     <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <span className="text-muted-foreground truncate">
//                       {inspector.email}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3 text-sm">
//                     <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <span className="text-muted-foreground">
//                       {inspector.phone}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3 text-sm">
//                     <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <span className="text-muted-foreground">
//                       {inspector.pincode}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Footer - Date */}
//                 <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
//                   <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
//                   <span className="text-xs text-muted-foreground">
//                     Added {formatDate(inspector.createdAt)}
//                   </span>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Inspectors;


// import { useState, useEffect, useRef } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Plus,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Users,
//   UserPlus,
//   Camera,
//   Loader2,
//   Shield,
//   MoreVertical,
//   Pencil,
//   Trash2,
//   Lock,
// } from "lucide-react";

// // --- API Service Imports ---
// import {
//   getMyInspectors,
//   createFranchiseInspector,
//   updateFranchiseInspector,
//   deleteFranchiseInspector,
// } from "@/services/franchiseService";

// // Types
// interface Inspector {
//   _id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   pincode: string;
//   profileImage: string;
//   createdAt: string;
// }

// const Inspectors = () => {
//   const { toast } = useToast();
  
//   // --- State Management ---
//   const [inspectors, setInspectors] = useState<Inspector[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false); // Unified loading for create/update
  
//   // --- Edit/Delete State ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentInspectorId, setCurrentInspectorId] = useState<string | null>(null);

//   // --- Image Handling State ---
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // --- Form Data State ---
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     pincode: "",
//     password: "", 
//   });

//   // --- Initial Fetch ---
//   useEffect(() => {
//     fetchInspectors();
//   }, []);

//   const fetchInspectors = async () => {
//     try {
//       setLoading(true);
//       const response = await getMyInspectors();
//       // Handle response structure safely
//       const data = Array.isArray(response) ? response : (response as any).data || [];
//       setInspectors(data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch inspectors.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Handlers ---

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file); // Save file for API
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string); // Preview for UI
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const resetForm = () => {
//     setFormData({ fullName: "", email: "", phone: "", pincode: "", password: "" });
//     setImagePreview(null);
//     setImageFile(null);
//     setIsEditing(false);
//     setCurrentInspectorId(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleOpenCreate = () => {
//     resetForm();
//     setDialogOpen(true);
//   };

//   const handleOpenEdit = (inspector: Inspector) => {
//     setIsEditing(true);
//     setCurrentInspectorId(inspector._id);
//     setFormData({
//       fullName: inspector.fullName,
//       email: inspector.email,
//       phone: inspector.phone,
//       pincode: inspector.pincode,
//       password: "", // Password remains empty on edit unless user wants to change it
//     });
//     setImagePreview(inspector.profileImage);
//     setDialogOpen(true);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.fullName || !formData.email || !formData.phone || !formData.pincode) {
//       toast({ title: "Required Fields", description: "Please fill all required fields.", variant: "destructive" });
//       return;
//     }

//     if (!isEditing && !formData.password) {
//       toast({ title: "Password Required", description: "Password is required for new inspectors.", variant: "destructive" });
//       return;
//     }

//     try {
//       setSubmitting(true);
      
//       // Prepare FormData for Multipart Upload
//       const payload = new FormData();
//       payload.append("fullName", formData.fullName);
//       payload.append("email", formData.email);
//       payload.append("phone", formData.phone);
//       payload.append("pincode", formData.pincode);
      
//       // Only append password if provided (Edit mode optional, Create mode required)
//       if (formData.password) {
//         payload.append("password", formData.password);
//       }
      
//       // Only append image if a new file is selected
//       if (imageFile) {
//         payload.append("profileImage", imageFile);
//       }

//       if (isEditing && currentInspectorId) {
//         // --- UPDATE API Call ---
//         await updateFranchiseInspector(currentInspectorId, payload);
//         toast({ title: "Updated", description: "Inspector details updated successfully." });
//       } else {
//         // --- CREATE API Call ---
//         await createFranchiseInspector(payload);
//         toast({ title: "Created", description: "New inspector added successfully." });
//       }

//       setDialogOpen(false);
//       resetForm();
//       fetchInspectors(); // Refresh List
//     } catch (error: any) {
//       console.error(error);
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || error.message || "Operation failed.",
//         variant: "destructive",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if(!confirm("Are you sure you want to delete this inspector? This action cannot be undone.")) return;
    
//     try {
//         await deleteFranchiseInspector(id);
//         toast({ title: "Deleted", description: "Inspector removed successfully." });
//         fetchInspectors(); // Refresh List
//     } catch (error: any) {
//         toast({ 
//           title: "Error", 
//           description: error.response?.data?.message || error.message || "Failed to delete.", 
//           variant: "destructive" 
//         });
//     }
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // --- Render ---

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//           <p className="text-muted-foreground text-sm">Loading inspectors...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
//           <div>
//             <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">
//               Inspectors
//             </h1>
//             <p className="text-muted-foreground mt-1.5">
//               Manage your franchise inspection team
//             </p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             {/* Count Badge */}
//             {inspectors.length > 0 && (
//               <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
//                 <Users className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm font-medium text-foreground">
//                   {inspectors.length} {inspectors.length === 1 ? "Inspector" : "Inspectors"}
//                 </span>
//               </div>
//             )}
            
//             {/* Create Dialog Trigger */}
//             <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button className="gap-2 shadow-sm" onClick={handleOpenCreate}>
//                   <Plus className="h-4 w-4" />
//                   Add Inspector
//                 </Button>
//               </DialogTrigger>
              
//               <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
//                 <DialogHeader className="pb-2">
//                   <DialogTitle className="text-xl font-semibold">
//                     {isEditing ? "Edit Inspector" : "Add New Inspector"}
//                   </DialogTitle>
//                 </DialogHeader>
                
//                 <form onSubmit={handleSubmit} className="space-y-6 pt-2">
//                   {/* Avatar Upload */}
//                   <div className="flex justify-center">
//                     <div
//                       onClick={() => fileInputRef.current?.click()}
//                       className="relative cursor-pointer group"
//                     >
//                       <div className="h-24 w-24 rounded-full bg-secondary border-2 border-dashed border-border overflow-hidden flex items-center justify-center transition-all group-hover:border-primary group-hover:bg-secondary/80">
//                         {imagePreview ? (
//                           <img
//                             src={imagePreview}
//                             alt="Preview"
//                             className="h-full w-full object-cover"
//                           />
//                         ) : (
//                           <Camera className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
//                         )}
//                       </div>
//                       <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-primary rounded-full flex items-center justify-center shadow-md">
//                         <Plus className="h-4 w-4 text-primary-foreground" />
//                       </div>
//                       <input
//                         ref={fileInputRef}
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="hidden"
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Form Fields */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="sm:col-span-2 space-y-2">
//                       <Label htmlFor="fullName" className="text-sm font-medium">
//                         Full Name <span className="text-destructive">*</span>
//                       </Label>
//                       <Input
//                         id="fullName"
//                         placeholder="Enter full name"
//                         value={formData.fullName}
//                         onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                         className="h-10"
//                       />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <Label htmlFor="email" className="text-sm font-medium">
//                         Email <span className="text-destructive">*</span>
//                       </Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="email@example.com"
//                         value={formData.email}
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                         className="h-10"
//                       />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <Label htmlFor="phone" className="text-sm font-medium">
//                         Phone <span className="text-destructive">*</span>
//                       </Label>
//                       <Input
//                         id="phone"
//                         placeholder="+91 98765 43210"
//                         value={formData.phone}
//                         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                         className="h-10"
//                       />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <Label htmlFor="pincode" className="text-sm font-medium">
//                         Pincode <span className="text-destructive">*</span>
//                       </Label>
//                       <Input
//                         id="pincode"
//                         placeholder="Enter pincode"
//                         value={formData.pincode}
//                         onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
//                         className="h-10"
//                       />
//                     </div>

//                     {/* Password Field */}
//                     <div className="space-y-2 sm:col-span-2">
//                         <Label htmlFor="password" className="text-sm font-medium">
//                             {isEditing ? "New Password (Optional)" : "Password"} <span className="text-destructive">*</span>
//                         </Label>
//                         <div className="relative">
//                             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                             <Input
//                                 id="password"
//                                 type="password"
//                                 placeholder={isEditing ? "Leave blank to keep current" : "Create password"}
//                                 value={formData.password}
//                                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                                 className="pl-10 h-10"
//                                 required={!isEditing}
//                             />
//                         </div>
//                     </div>
//                   </div>
                  
//                   {/* Submit Action */}
//                   <Button
//                     type="submit"
//                     className="w-full h-11 gap-2"
//                     disabled={submitting}
//                   >
//                     {submitting ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         {isEditing ? "Updating..." : "Creating..."}
//                       </>
//                     ) : (
//                       <>
//                         {isEditing ? <Pencil className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
//                         {isEditing ? "Update Inspector" : "Add Inspector"}
//                       </>
//                     )}
//                   </Button>
//                 </form>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>

//         {/* Content Area */}
//         {inspectors.length === 0 ? (
//           // Empty State
//           <div className="flex items-center justify-center py-20">
//             <Card className="max-w-sm w-full p-8 text-center border border-border/50 shadow-sm">
//               <div className="h-16 w-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-5">
//                 <Shield className="h-8 w-8 text-muted-foreground" />
//               </div>
//               <h3 className="text-lg font-semibold text-foreground mb-2">
//                 No inspectors yet
//               </h3>
//               <p className="text-muted-foreground text-sm mb-6">
//                 Get started by adding your first inspector to the team.
//               </p>
//               <Button onClick={handleOpenCreate} className="gap-2">
//                 <Plus className="h-4 w-4" />
//                 Add your first Inspector
//               </Button>
//             </Card>
//           </div>
//         ) : (
//           // Grid View
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {inspectors.map((inspector, index) => (
//               <Card
//                 key={inspector._id}
//                 className="group relative p-5 border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-in"
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >
//                 {/* === EDIT/DELETE DROPDOWN MENU === */}
//                 <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon" className="h-8 w-8">
//                                 <MoreVertical className="h-4 w-4 text-muted-foreground" />
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                             <DropdownMenuItem onClick={() => handleOpenEdit(inspector)}>
//                                 <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={() => handleDelete(inspector._id)} className="text-destructive focus:text-destructive">
//                                 <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>

//                 {/* Card Top: Avatar & Name */}
//                 <div className="flex items-start gap-4 mb-4">
//                   <div className="relative">
//                     <img
//                       src={inspector.profileImage}
//                       alt={inspector.fullName}
//                       className="h-14 w-14 rounded-full object-cover ring-2 ring-background shadow-sm"
//                     />
//                     <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-success rounded-full border-2 border-card" />
//                   </div>
//                   <div className="flex-1 min-w-0 pt-1">
//                     <h3 className="font-semibold text-foreground truncate">
//                       {inspector.fullName}
//                     </h3>
//                     <span className="inline-flex items-center px-2 py-0.5 mt-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
//                       Inspector
//                     </span>
//                   </div>
//                 </div>

//                 {/* Card Details */}
//                 <div className="space-y-2.5">
//                   <div className="flex items-center gap-3 text-sm">
//                     <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <span className="text-muted-foreground truncate">
//                       {inspector.email}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3 text-sm">
//                     <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <span className="text-muted-foreground">
//                       {inspector.phone}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3 text-sm">
//                     <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <span className="text-muted-foreground">
//                       {inspector.pincode}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Card Footer */}
//                 <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
//                   <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
//                   <span className="text-xs text-muted-foreground">
//                     Added {formatDate(inspector.createdAt)}
//                   </span>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Inspectors;


import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InspectorCard } from "../franchise/pages/InspectorCard";
import { InspectorForm } from "../franchise/pages/InspectorForm";
import { getMyInspectors, createFranchiseInspector, updateFranchiseInspector, deleteFranchiseInspector } from "@/services/franchiseService";

const Inspectors = () => {
  const { toast } = useToast();
  const [inspectors, setInspectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", pincode: "", password: "" });

  useEffect(() => { fetchInspectors(); }, []);

  const fetchInspectors = async () => {
    try {
      setLoading(true);
      const res = await getMyInspectors();
      setInspectors(Array.isArray(res) ? res : res.data || []);
    } catch (err) { toast({ title: "Error", description: "Failed to fetch", variant: "destructive" }); }
    finally { setLoading(false); }
  };

  const handleOpenCreate = () => {
    setFormData({ fullName: "", email: "", phone: "", pincode: "", password: "" });
    setImagePreview(null); setImageFile(null); setIsEditing(false); setDialogOpen(true);
  };

  const handleOpenEdit = (ins) => {
    setIsEditing(true); setCurrentId(ins._id);
    setFormData({ fullName: ins.fullName, email: ins.email, phone: ins.phone, pincode: ins.pincode, password: "" });
    setImagePreview(ins.profileImage); setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = new FormData();
      Object.keys(formData).forEach(key => { if(formData[key]) payload.append(key, formData[key]); });
      if (imageFile) payload.append("profileImage", imageFile);

      if (isEditing) await updateFranchiseInspector(currentId, payload);
      else await createFranchiseInspector(payload);

      setDialogOpen(false); fetchInspectors();
      toast({ title: "Success", description: `Inspector ${isEditing ? 'updated' : 'added'}` });
    } catch (err) { toast({ title: "Error", description: "Action failed", variant: "destructive" }); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if(!confirm("Delete this inspector?")) return;
    try { await deleteFranchiseInspector(id); fetchInspectors(); } catch (err) { /* toast error */ }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-semibold">Inspectors</h1>
          <p className="text-muted-foreground">Manage your team</p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Inspector</Button>
      </div>

      {inspectors.length === 0 ? (
        <div className="text-center py-20 border rounded-lg"><Shield className="mx-auto h-12 w-12 mb-4" /><h3>No inspectors</h3></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {inspectors.map((ins, i) => (
            <InspectorCard key={ins._id} inspector={ins} onEdit={handleOpenEdit} onDelete={handleDelete} formatDate={(d) => new Date(d).toLocaleDateString()} />
          ))}
        </div>
      )}

      <InspectorForm 
        open={dialogOpen} setOpen={setDialogOpen} isEditing={isEditing} formData={formData} 
        setFormData={setFormData} imagePreview={imagePreview} fileInputRef={fileInputRef}
        handleImageChange={(e) => {
            const file = e.target.files[0];
            if(file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
        }}
        handleSubmit={handleSubmit} submitting={submitting}
      />
    </div>
  );
};

export default Inspectors;