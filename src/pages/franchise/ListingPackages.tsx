// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { Check, Zap, Loader2, Info } from "lucide-react";
// import { getListingPackages, createListingPackageOrder ,getFranchiseListingStats} from "@/services/franchiseService";
 
// // Razorpay script loader utility
// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };
 
// const ListingPackages = ({ userProfile }: any) => {
//   const { toast } = useToast();
//   const [packages, setPackages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [buyingId, setBuyingId] = useState<string | null>(null);
//   const [listingStats, setListingStats] = useState<any>(null);
 
 
//   useEffect(() => {
//     fetchPackages();
//       fetchListingStats();
//   }, []);
 
//   const fetchPackages = async () => {
//     try {
//       const res = await getListingPackages();
//       if (res.success) setPackages(res.data);
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to load packages", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const fetchListingStats = async () => {
//   try {
//     const res = await getFranchiseListingStats();
//     if (res.success) {
//       setListingStats(res.data);
//     }
//   } catch (error) {
//     toast({
//       title: "Error",
//       description: "Failed to load listing stats",
//       variant: "destructive",
//     });
//   }
// };
 
 
// const handlePurchase = async (pkg: any) => {
//   setBuyingId(pkg._id); // Loading start
 
//   try {
//     // 1. Script load karo
//     const isLoaded = await loadRazorpayScript();
//     if (!isLoaded) {
//       toast({ title: "Error", description: "Razorpay SDK failed to load" });
//       return;
//     }
 
//     // 2. Order Create Karo (SIRF pkg._id bhejo)
//     // PEHLE GALTI THI: createListingPackageOrder(franchiseId, pkg._id)
//     const res = await createListingPackageOrder(pkg._id);
 
//     if (res.success) {
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: res.order.amount,
//         currency: "INR",
//         name: "Car Listing Package",
//         description: pkg.name,
//         order_id: res.order.id,
//         handler: async (response: any) => {
//           toast({ title: "Payment Successful!", description: "Updating limits..." });
//           // Page refresh taaki naya limit dikhne lage
//           setTimeout(() => window.location.reload(), 2000);
//         },
//         prefill: {
//           name: userProfile?.fullName,
//           email: userProfile?.email,
//         },
//         theme: { color: "#000000" },
//       };
 
//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     }
//   } catch (error: any) {
//     console.error("Payment Error:", error);
//     toast({
//       title: "Order Failed",
//       description: error.response?.data?.message || "Failed to create order",
//       variant: "destructive"
//     });
//   } finally {
//     setBuyingId(null); // Loading stop
//   }
// };
//   if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
 
//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-8">
//       {/* Header */}
//       <div className="bg-slate-50 p-6 rounded-2xl border flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Listing Credits</h1>
// <p className="text-muted-foreground">
//   Total Limit: {listingStats?.totalLimit || 0} •
//   Used: {listingStats?.usedListings || 0} •
//   Remaining: {listingStats?.remainingListings || 0}
// </p>
 
//         </div>
//         <Zap className="text-yellow-500 w-10 h-10" />
//       </div>
 
//       {/* Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {packages.map((pkg) => (
//           <Card key={pkg._id} className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <CardTitle>{pkg.name}</CardTitle>
//               <CardDescription>Price: ₹{pkg.price}</CardDescription>
//             </CardHeader>
//             <CardContent>
//                <div className="text-3xl font-bold mb-4">{pkg.carListingLimit} Listings</div>
//                <ul className="space-y-2 text-sm">
//                   <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Instant Activation</li>
//                   <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Life-time Validity</li>
//                </ul>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 className="w-full"
//                 onClick={() => handlePurchase(pkg)}
//                 disabled={buyingId === pkg._id}
//               >
//                 {buyingId === pkg._id ? <Loader2 className="animate-spin" /> : "Buy Now"}
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };
 
// export default ListingPackages;              

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Check, Zap, Loader2, Package, Car, ShoppingCart } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";

// // Types
// interface ListingPackage {
//   id: string;
//   name: string;
//   price: number;
//   listingLimit: number;
//   features: string[];
//   popular?: boolean;
// }

// interface ListingStats {
//   totalListings: number;
//   usedListings: number;
//   remainingListings: number;
// }

// interface RazorpayOptions {
//   key: string;
//   amount: number;
//   currency: string;
//   name: string;
//   description: string;
//   order_id: string;
//   handler: (response: RazorpayResponse) => void;
//   prefill: {
//     name: string;
//     email: string;
//   };
//   theme: {
//     color: string;
//   };
// }

// interface RazorpayResponse {
//   razorpay_payment_id: string;
//   razorpay_order_id: string;
//   razorpay_signature: string;
// }

// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => { open: () => void };
//   }
// }

// // Mock API Functions (Replace with actual API calls)
// const getListingPackages = async (): Promise<ListingPackage[]> => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return [
//     {
//       id: "pkg_basic",
//       name: "Starter Pack",
//       price: 999,
//       listingLimit: 5,
//       features: ["Instant Activation", "Life-time Validity", "Basic Support"],
//     },
//     {
//       id: "pkg_standard",
//       name: "Growth Pack",
//       price: 2499,
//       listingLimit: 15,
//       features: ["Instant Activation", "Life-time Validity", "Priority Support", "Featured Listings"],
//       popular: true,
//     },
//     {
//       id: "pkg_premium",
//       name: "Premium Pack",
//       price: 4999,
//       listingLimit: 50,
//       features: ["Instant Activation", "Life-time Validity", "24/7 Support", "Featured Listings", "Analytics Dashboard"],
//     },
//     {
//       id: "pkg_enterprise",
//       name: "Enterprise Pack",
//       price: 9999,
//       listingLimit: 150,
//       features: ["Instant Activation", "Life-time Validity", "Dedicated Manager", "Featured Listings", "Advanced Analytics", "API Access"],
//     },
//   ];
// };

// const getFranchiseListingStats = async (): Promise<ListingStats> => {
//   await new Promise((resolve) => setTimeout(resolve, 800));
//   return {
//     totalListings: 25,
//     usedListings: 12,
//     remainingListings: 13,
//   };
// };

// const createListingPackageOrder = async (packageId: string): Promise<{ orderId: string; amount: number }> => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   const pkg = (await getListingPackages()).find((p) => p.id === packageId);
//   return {
//     orderId: `order_${Date.now()}`,
//     amount: (pkg?.price || 0) * 100,
//   };
// };

// // Mock user data
// const currentUser = {
//   name: "John Doe",
//   email: "john@example.com",
// };

// const ListingPackages = () => {
//   const [packages, setPackages] = useState<ListingPackage[]>([]);
//   const [stats, setStats] = useState<ListingStats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [buyingPackageId, setBuyingPackageId] = useState<string | null>(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [packagesData, statsData] = await Promise.all([
//         getListingPackages(),
//         getFranchiseListingStats(),
//       ]);
//       setPackages(packagesData);
//       setStats(statsData);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch packages. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadRazorpayScript = (): Promise<boolean> => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleBuyPackage = async (pkg: ListingPackage) => {
//     try {
//       setBuyingPackageId(pkg.id);

//       const scriptLoaded = await loadRazorpayScript();
//       if (!scriptLoaded) {
//         toast({
//           title: "Error",
//           description: "Failed to load payment gateway. Please try again.",
//           variant: "destructive",
//         });
//         return;
//       }

//       const orderData = await createListingPackageOrder(pkg.id);

//       const options: RazorpayOptions = {
//         key: "rzp_test_xxxxxxxxxxxxx", // Replace with actual Razorpay key
//         amount: orderData.amount,
//         currency: "INR",
//         name: "Car Franchise",
//         description: `Purchase ${pkg.name}`,
//         order_id: orderData.orderId,
//         handler: (response: RazorpayResponse) => {
//           toast({
//             title: "Payment Successful!",
//             description: `Your ${pkg.name} has been activated. Payment ID: ${response.razorpay_payment_id}`,
//           });
//           // Refresh page to update stats
//           setTimeout(() => window.location.reload(), 2000);
//         },
//         prefill: {
//           name: currentUser.name,
//           email: currentUser.email,
//         },
//         theme: {
//           color: "#6366f1",
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to create order. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setBuyingPackageId(null);
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="h-12 w-12 animate-spin text-primary" />
//           <p className="text-muted-foreground">Loading packages...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
//             Listing Packages
//           </h1>
//           <p className="text-muted-foreground text-lg">
//             Choose the perfect package to list your cars
//           </p>
//         </motion.div>

//         {/* Listing Stats Header */}
//         {stats && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="mb-10"
//           >
//             <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
//               <CardContent className="py-6">
//                 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                   <div className="flex items-center gap-4">
//                     <div className="p-3 rounded-full bg-primary/20">
//                       <Car className="h-8 w-8 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-foreground">Your Listing Summary</h3>
//                       <p className="text-sm text-muted-foreground">Manage your car listings efficiently</p>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap items-center gap-8">
//                     <div className="text-center">
//                       <p className="text-3xl font-bold text-foreground">{stats.totalListings}</p>
//                       <p className="text-sm text-muted-foreground">Total Listings</p>
//                     </div>
//                     <div className="h-12 w-px bg-border hidden md:block" />
//                     <div className="text-center">
//                       <p className="text-3xl font-bold text-orange-500">{stats.usedListings}</p>
//                       <p className="text-sm text-muted-foreground">Used</p>
//                     </div>
//                     <div className="h-12 w-px bg-border hidden md:block" />
//                     <div className="text-center">
//                       <p className="text-3xl font-bold text-emerald-500">{stats.remainingListings}</p>
//                       <p className="text-sm text-muted-foreground">Remaining</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}

//         {/* Packages Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {packages.map((pkg, index) => (
//             <motion.div
//               key={pkg.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <Card
//                 className={`relative h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
//                   pkg.popular
//                     ? "border-primary shadow-lg ring-2 ring-primary/20"
//                     : "border-border hover:border-primary/50"
//                 }`}
//               >
//                 {pkg.popular && (
//                   <div className="absolute -top-3 left-1/2 -translate-x-1/2">
//                     <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
//                       <Zap className="h-3 w-3" />
//                       Most Popular
//                     </span>
//                   </div>
//                 )}

//                 <CardHeader className="text-center pb-2">
//                   <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
//                     <Package className="h-8 w-8 text-primary" />
//                   </div>
//                   <CardTitle className="text-xl">{pkg.name}</CardTitle>
//                   <CardDescription>
//                     <span className="text-3xl font-bold text-foreground">
//                       {formatCurrency(pkg.price)}
//                     </span>
//                   </CardDescription>
//                 </CardHeader>

//                 <CardContent className="flex-1">
//                   <div className="text-center mb-6 p-3 rounded-lg bg-muted/50">
//                     <p className="text-2xl font-bold text-primary">{pkg.listingLimit}</p>
//                     <p className="text-sm text-muted-foreground">Car Listings</p>
//                   </div>

//                   <ul className="space-y-3">
//                     {pkg.features.map((feature, i) => (
//                       <li key={i} className="flex items-center gap-2 text-sm">
//                         <div className="p-1 rounded-full bg-emerald-500/10">
//                           <Check className="h-3 w-3 text-emerald-500" />
//                         </div>
//                         <span className="text-muted-foreground">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>

//                 <CardFooter>
//                   <Button
//                     className="w-full"
//                     variant={pkg.popular ? "default" : "outline"}
//                     onClick={() => handleBuyPackage(pkg)}
//                     disabled={buyingPackageId === pkg.id}
//                   >
//                     {buyingPackageId === pkg.id ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <ShoppingCart className="mr-2 h-4 w-4" />
//                         Buy Now
//                       </>
//                     )}
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {/* Footer Note */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="mt-12 text-center"
//         >
//           <p className="text-sm text-muted-foreground">
//             All packages include instant activation and lifetime validity.
//             <br />
//             Need a custom package?{" "}
//             <a href="#" className="text-primary hover:underline">
//               Contact us
//             </a>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ListingPackages;
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Loader2, Package, Car, ShoppingCart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Real API Services Import
import { 
  getListingPackages, 
  createListingPackageOrder, 
  getFranchiseListingStats 
} from "@/services/franchiseService";

// Types/Interfaces
interface ListingStats {
  totalLimit: number;
  usedListings: number;
  remainingListings: number;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Razorpay script loader utility
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ListingPackages = ({ userProfile }: any) => {
  const [packages, setPackages] = useState<any[]>([]);
  const [stats, setStats] = useState<ListingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pkgRes, statsRes] = await Promise.all([
        getListingPackages(),
        getFranchiseListingStats(),
      ]);

      if (pkgRes.success) setPackages(pkgRes.data);
      if (statsRes.success) setStats(statsRes.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (pkg: any) => {
    setBuyingId(pkg._id);

    try {
      // 1. Script load karo
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast({ 
          title: "Error", 
          description: "Razorpay SDK failed to load", 
          variant: "destructive" 
        });
        return;
      }

      // 2. Order Create Karo
      const res = await createListingPackageOrder(pkg._id);

      if (res.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: res.order.amount,
          currency: "INR",
          name: "Car Listing Package",
          description: `Purchase ${pkg.name}`,
          order_id: res.order.id,
          handler: async (response: RazorpayResponse) => {
            toast({ 
              title: "Payment Successful!", 
              description: `Your ${pkg.name} has been activated.` 
            });
            // Refresh taaki stats update ho jayein
            setTimeout(() => window.location.reload(), 2000);
          },
          prefill: {
            name: userProfile?.fullName || userProfile?.name,
            email: userProfile?.email,
          },
          theme: { 
            color: "#6366f1" 
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error: any) {
      console.error("Payment Error:", error);
      toast({
        title: "Order Failed",
        description: error.response?.data?.message || "Failed to create order",
        variant: "destructive"
      });
    } finally {
      setBuyingId(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Listing Packages
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose the perfect package to list your cars
          </p>
        </motion.div>

        {/* Listing Stats Summary */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
              <CardContent className="py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/20">
                      <Car className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Your Listing Summary</h3>
                      <p className="text-sm text-muted-foreground">Current credit utilization</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-8">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">{stats.totalLimit}</p>
                      <p className="text-sm text-muted-foreground">Total Limit</p>
                    </div>
                    <div className="h-12 w-px bg-border hidden md:block" />
                    <div className="text-center">
                      <p className="text-3xl font-bold text-orange-500">{stats.usedListings}</p>
                      <p className="text-sm text-muted-foreground">Used</p>
                    </div>
                    <div className="h-12 w-px bg-border hidden md:block" />
                    <div className="text-center">
                      <p className="text-3xl font-bold text-emerald-500">{stats.remainingListings}</p>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`relative h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  pkg.isPopular // Backend se agar isPopular flag aata hai
                    ? "border-primary shadow-lg ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-foreground">
                      {formatCurrency(pkg.price)}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="text-center mb-6 p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-primary">{pkg.carListingLimit}</p>
                    <p className="text-sm text-muted-foreground">Car Listings</p>
                  </div>

                  <ul className="space-y-3">
                    {/* Fixed features for all packages as seen in the prompt */}
                    <li className="flex items-center gap-2 text-sm">
                      <div className="p-1 rounded-full bg-emerald-500/10">
                        <Check className="h-3 w-3 text-emerald-500" />
                      </div>
                      <span className="text-muted-foreground">Instant Activation</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="p-1 rounded-full bg-emerald-500/10">
                        <Check className="h-3 w-3 text-emerald-500" />
                      </div>
                      <span className="text-muted-foreground">Life-time Validity</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="p-1 rounded-full bg-emerald-500/10">
                        <Check className="h-3 w-3 text-emerald-500" />
                      </div>
                      <span className="text-muted-foreground">Priority Support</span>
                    </li>
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={pkg.isPopular ? "default" : "outline"}
                    onClick={() => handlePurchase(pkg)}
                    disabled={buyingId === pkg._id}
                  >
                    {buyingId === pkg._id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Now
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            All packages include instant activation and lifetime validity.
            <br />
            Need a custom package?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ListingPackages;