// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Building2, Users, ShieldCheck } from "lucide-react";
// import { toast } from "sonner";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (role: "admin" | "franchise" | "dealer") => {
//     if (!email || !password) {
//       toast.error("Please enter email and password");
//       return;
//     }

//     // Mock authentication - replace with actual API call
//     localStorage.setItem("userRole", role);
//     localStorage.setItem("userEmail", email);
//     toast.success(`Logged in as ${role}`);
    
//     // Navigate to respective dashboard
//     navigate(`/${role}/dashboard`);
//   };

//   const LoginForm = ({ role }: { role: "admin" | "franchise" | "dealer" }) => (
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor={`${role}-email`} className="text-foreground/80">Email</Label>
//         <Input
//           id={`${role}-email`}
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="glass border-border/50 focus:border-primary transition-all duration-300"
//         />
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor={`${role}-password`} className="text-foreground/80">Password</Label>
//         <Input
//           id={`${role}-password`}
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="glass border-border/50 focus:border-primary transition-all duration-300"
//         />
//       </div>
//       <Button 
//         className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" 
//         onClick={() => handleLogin(role)}
//       >
//         Sign In
//       </Button>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4 animate-fade-in relative overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>
//       <Card className="w-full max-w-md glass-card border-border/50 animate-scale-in relative z-10">
//         <CardHeader className="text-center space-y-2">
//           <div className="flex justify-center mb-4">
//             <div className="h-16 w-16 rounded-full glass flex items-center justify-center animate-glow">
//               <ShieldCheck className="h-8 w-8 text-primary" />
//             </div>
//           </div>
//           <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Admin Panel</CardTitle>
//           <CardDescription>
//             Sign in to access your dashboard
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="admin" className="w-full">
//             <TabsList className="grid w-full grid-cols-3 glass p-1">
//               <TabsTrigger value="admin" className="text-xs transition-all duration-300 data-[state=active]:glass-card data-[state=active]:shadow-lg">
//                 <ShieldCheck className="h-3 w-3 mr-1" />
//                 Admin
//               </TabsTrigger>
//               <TabsTrigger value="franchise" className="text-xs transition-all duration-300 data-[state=active]:glass-card data-[state=active]:shadow-lg">
//                 <Building2 className="h-3 w-3 mr-1" />
//                 Franchise
//               </TabsTrigger>
//               <TabsTrigger value="dealer" className="text-xs transition-all duration-300 data-[state=active]:glass-card data-[state=active]:shadow-lg">
//                 <Users className="h-3 w-3 mr-1" />
//                 Dealer
//               </TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="admin" className="mt-6">
//               <LoginForm role="admin" />
//             </TabsContent>
            
//             <TabsContent value="franchise" className="mt-6">
//               <LoginForm role="franchise" />
//             </TabsContent>
            
//             <TabsContent value="dealer" className="mt-6">
//               <LoginForm role="dealer" />
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Building2, Users, ShieldCheck } from "lucide-react";
// import { toast } from "sonner";

// // SIRF YE LINE ADD KI HAI (Import Service)
// import { adminLogin } from "@/services/adminService"; 

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Function ko 'async' banaya hai API call ke liye
//   const handleLogin = async (role: "admin" | "franchise" | "dealer") => {
//     if (!email || !password) {
//       toast.error("Please enter email and password");
//       return;
//     }

//     try {
//       // 1. ADMIN LOGIC (API Integration)
//       if (role === "admin") {
//         try {
//           // API Call
//           const response = await adminLogin(email, password);
          
//           // API Success
//           console.log("Admin Login Success:", response);
          
//           // Token aur data save karein (Response structure ke hisab se adjust karein)
//           if(response.token) {
//              localStorage.setItem("token", response.token); 
//           }
//           localStorage.setItem("userRole", role);
//           localStorage.setItem("userEmail", email);
          
//           toast.success("Admin Login Successful");
//           navigate("/admin/dashboard");
        
//         } catch (error: any) {
//           // API Error handling
//           console.error("Login Failed:", error);
//           const errorMessage = error.message || "Invalid Admin Credentials";
//           toast.error(errorMessage);
//           return; // Error aane par yahi ruk jaye
//         }
//       } 
      
//       // 2. FRANCHISE & DEALER LOGIC (Old Mock Code - No Changes)
//       else {
//         // Mock authentication for others as requested
//         localStorage.setItem("userRole", role);
//         localStorage.setItem("userEmail", email);
//         toast.success(`Logged in as ${role}`);
//         navigate(`/${role}/dashboard`);
//       }

//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   const LoginForm = ({ role }: { role: "admin" | "franchise" | "dealer" }) => (
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor={`${role}-email`} className="text-foreground/80">Email</Label>
//         <Input
//           id={`${role}-email`}
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="glass border-border/50 focus:border-primary transition-all duration-300"
//         />
//       </div>
//       <div className="space-y-2">
//         <Label htmlFor={`${role}-password`} className="text-foreground/80">Password</Label>
//         <Input
//           id={`${role}-password`}
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="glass border-border/50 focus:border-primary transition-all duration-300"
//         />
//       </div>
//       <Button 
//         className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" 
//         onClick={() => handleLogin(role)}
//       >
//         Sign In
//       </Button>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4 animate-fade-in relative overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>
//       <Card className="w-full max-w-md glass-card border-border/50 animate-scale-in relative z-10">
//         <CardHeader className="text-center space-y-2">
//           <div className="flex justify-center mb-4">
//             <div className="h-16 w-16 rounded-full glass flex items-center justify-center animate-glow">
//               <ShieldCheck className="h-8 w-8 text-primary" />
//             </div>
//           </div>
//           <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Admin Panel</CardTitle>
//           <CardDescription>
//             Sign in to access your dashboard
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="admin" className="w-full">
//             <TabsList className="grid w-full grid-cols-3 glass p-1">
//               <TabsTrigger value="admin" className="text-xs transition-all duration-300 data-[state=active]:glass-card data-[state=active]:shadow-lg">
//                 <ShieldCheck className="h-3 w-3 mr-1" />
//                 Admin
//               </TabsTrigger>
//               <TabsTrigger value="franchise" className="text-xs transition-all duration-300 data-[state=active]:glass-card data-[state=active]:shadow-lg">
//                 <Building2 className="h-3 w-3 mr-1" />
//                 Franchise
//               </TabsTrigger>
//               <TabsTrigger value="dealer" className="text-xs transition-all duration-300 data-[state=active]:glass-card data-[state=active]:shadow-lg">
//                 <Users className="h-3 w-3 mr-1" />
//                 Dealer
//               </TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="admin" className="mt-6">
//               <LoginForm role="admin" />
//             </TabsContent>
            
//             <TabsContent value="franchise" className="mt-6">
//               <LoginForm role="franchise" />
//             </TabsContent>
            
//             <TabsContent value="dealer" className="mt-6">
//               <LoginForm role="dealer" />
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Building2, Users, ShieldCheck } from "lucide-react";
// import { toast } from "sonner";
// import { adminLogin } from "@/services/adminService"; // Ensure path is correct

// // ✅ FIX: LoginForm ko 'Login' component ke bahar define kiya hai
// // Taaki har keystroke par ye re-render hokar focus loose na kare.
// const LoginForm = ({ 
//   role, 
//   email, 
//   setEmail, 
//   password, 
//   setPassword, 
//   handleLogin 
// }: {
//   role: "admin" | "franchise" | "dealer";
//   email: string;
//   setEmail: (val: string) => void;
//   password: string;
//   setPassword: (val: string) => void;
//   handleLogin: (role: "admin" | "franchise" | "dealer") => void;
// }) => (
//   <div className="space-y-4">
//     <div className="space-y-2">
//       <Label htmlFor={`${role}-email`} className="text-foreground/80">Email</Label>
//       <Input
//         id={`${role}-email`}
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="glass border-border/50 focus:border-primary transition-all duration-300"
//       />
//     </div>
//     <div className="space-y-2">
//       <Label htmlFor={`${role}-password`} className="text-foreground/80">Password</Label>
//       <Input
//         id={`${role}-password`}
//         type="password"
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="glass border-border/50 focus:border-primary transition-all duration-300"
//       />
//     </div>
//     <Button 
//       className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" 
//       onClick={() => handleLogin(role)}
//     >
//       Sign In
//     </Button>
//   </div>
// );

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (role: "admin" | "franchise" | "dealer") => {
//     if (!email || !password) {
//       toast.error("Please enter email and password");
//       return;
//     }

//     try {
//       // 1. ADMIN LOGIC (API Integration)
//       if (role === "admin") {
//         try {
//           const response = await adminLogin(email, password);
          
//           console.log("Admin Login Success:", response);
          
//           if(response.token) {
//              localStorage.setItem("token", response.token); 
//           }
//           localStorage.setItem("userRole", role);
//           localStorage.setItem("userEmail", email);
          
//           toast.success("Admin Login Successful");
//           navigate("/admin/dashboard");
        
//         } catch (error: any) {
//           console.error("Login Failed:", error);
//           const errorMessage = error.message || "Invalid Admin Credentials";
//           toast.error(errorMessage);
//           return;
//         }
//       } 
      
//       // 2. FRANCHISE & DEALER LOGIC (Mock Code as requested)
//       else {
//         localStorage.setItem("userRole", role);
//         localStorage.setItem("userEmail", email);
//         toast.success(`Logged in as ${role}`);
//         navigate(`/${role}/dashboard`);
//       }

//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4 animate-fade-in relative overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>
//       <Card className="w-full max-w-md glass-card border-border/50 animate-scale-in relative z-10">
//         <CardHeader className="text-center space-y-2">
//           <div className="flex justify-center mb-4">
//             <div className="h-16 w-16 rounded-full glass flex items-center justify-center animate-glow">
//               <ShieldCheck className="h-8 w-8 text-primary" />
//             </div>
//           </div>
//           <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Admin Panel</CardTitle>
//           <CardDescription>
//             Sign in to access your dashboard
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs 
//             defaultValue="admin" 
//             className="w-full"
//             // Optional: Tab change hone par fields clear karna
//             onValueChange={() => { setEmail(""); setPassword(""); }} 
//           >
//             <TabsList className="grid w-full grid-cols-3 glass p-1">
//               <TabsTrigger value="admin" className="text-xs transition-all duration-300 data-[state=active]:glass-card data-[state=active]:shadow-lg">
//                 <ShieldCheck className="h-3 w-3 mr-1" />
//                 Admin
//               </TabsTrigger>
//               <TabsTrigger value="franchise" className="text-xs transition-all duration-300 data-[state=active]:glass-card data-[state=active]:shadow-lg">
//                 <Building2 className="h-3 w-3 mr-1" />
//                 Franchise
//               </TabsTrigger>
//               <TabsTrigger value="dealer" className="text-xs transition-all duration-300 data-[state=active]:glass-card data-[state=active]:shadow-lg">
//                 <Users className="h-3 w-3 mr-1" />
//                 Dealer
//               </TabsTrigger>
//             </TabsList>
            
//             {/* ✅ State ko props ke through pass kiya ja raha hai */}
//             <TabsContent value="admin" className="mt-6">
//               <LoginForm 
//                 role="admin" 
//                 email={email} 
//                 setEmail={setEmail} 
//                 password={password} 
//                 setPassword={setPassword} 
//                 handleLogin={handleLogin} 
//               />
//             </TabsContent>
            
//             <TabsContent value="franchise" className="mt-6">
//               <LoginForm 
//                 role="franchise" 
//                 email={email} 
//                 setEmail={setEmail} 
//                 password={password} 
//                 setPassword={setPassword} 
//                 handleLogin={handleLogin} 
//               />
//             </TabsContent>
            
//             <TabsContent value="dealer" className="mt-6">
//               <LoginForm 
//                 role="dealer" 
//                 email={email} 
//                 setEmail={setEmail} 
//                 password={password} 
//                 setPassword={setPassword} 
//                 handleLogin={handleLogin} 
//               />
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Building2, Users, ShieldCheck } from "lucide-react";
// import { toast } from "sonner";

// // Login Form Component (Defined outside to prevent re-render focus loss)
// const LoginForm = ({ 
//   role, 
//   email, 
//   setEmail, 
//   password, 
//   setPassword, 
//   handleLogin,
//   isLoading 
// }: {
//   role: "admin" | "franchise" | "dealer";
//   email: string;
//   setEmail: (val: string) => void;
//   password: string;
//   setPassword: (val: string) => void;
//   handleLogin: (role: "admin" | "franchise" | "dealer") => void;
//   isLoading: boolean;
// }) => (
//   <div className="space-y-4">
//     <div className="space-y-2">
//       <Label htmlFor={`${role}-email`} className="text-foreground/80">Email</Label>
//       <Input
//         id={`${role}-email`}
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="glass border-border/50 focus:border-primary transition-all duration-300"
//         disabled={isLoading}
//       />
//     </div>
//     <div className="space-y-2">
//       <Label htmlFor={`${role}-password`} className="text-foreground/80">Password</Label>
//       <Input
//         id={`${role}-password`}
//         type="password"
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="glass border-border/50 focus:border-primary transition-all duration-300"
//         disabled={isLoading}
//       />
//     </div>
//     <Button 
//       className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" 
//       onClick={() => handleLogin(role)}
//       disabled={isLoading}
//     >
//       {isLoading ? "Signing In..." : "Sign In"}
//     </Button>
//   </div>
// );

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Common Login Handler
//   const handleLogin = async (role: "admin" | "franchise" | "dealer") => {
//     if (!email || !password) {
//       toast.error("Please enter email and password");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // BASE_URL yaha define karein ya environmental variables se lein
//       const BASE_URL = "YOUR_API_BASE_URL_HERE"; 
      
//       const response = await fetch(`${BASE_URL}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//           role, // Backend ko role bhej rahe hain taaki wo verify kar sake
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Success Logic
//         if (data.token) {
//           localStorage.setItem("token", data.token);
//         }
//         localStorage.setItem("userRole", role);
//         localStorage.setItem("userEmail", email);
        
//         toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} Login Successful`);
        
//         // Navigation based on role
//         if (role === "admin") {
//           navigate("/admin/dashboard");
//         } else {
//           navigate(`/${role}/dashboard`);
//         }
//       } else {
//         // API Error Handling
//         toast.error(data.message || "Invalid Credentials");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       toast.error("Something went wrong. Please check your connection.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4 animate-fade-in relative overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>
      
//       <Card className="w-full max-w-md glass-card border-border/50 animate-scale-in relative z-10">
//         <CardHeader className="text-center space-y-2">
//           <div className="flex justify-center mb-4">
//             <div className="h-16 w-16 rounded-full glass flex items-center justify-center animate-glow">
//               <ShieldCheck className="h-8 w-8 text-primary" />
//             </div>
//           </div>
//           <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//             Control Panel
//           </CardTitle>
//           <CardDescription>
//             Sign in to access your dashboard
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs 
//             defaultValue="admin" 
//             className="w-full"
//             onValueChange={() => { setEmail(""); setPassword(""); }} 
//           >
//             <TabsList className="grid w-full grid-cols-3 glass p-1">
//               <TabsTrigger value="admin" className="text-xs transition-all duration-300 data-[state=active]:glass-card">
//                 <ShieldCheck className="h-3 w-3 mr-1" /> Admin
//               </TabsTrigger>
//               <TabsTrigger value="franchise" className="text-xs transition-all duration-300 data-[state=active]:glass-card">
//                 <Building2 className="h-3 w-3 mr-1" /> Franchise
//               </TabsTrigger>
//               <TabsTrigger value="dealer" className="text-xs transition-all duration-300 data-[state=active]:glass-card">
//                 <Users className="h-3 w-3 mr-1" /> Dealer
//               </TabsTrigger>
//             </TabsList>
            
//             {(["admin", "franchise", "dealer"] as const).map((tabRole) => (
//               <TabsContent key={tabRole} value={tabRole} className="mt-6">
//                 <LoginForm 
//                   role={tabRole}
//                   email={email} 
//                   setEmail={setEmail} 
//                   password={password} 
//                   setPassword={setPassword} 
//                   handleLogin={handleLogin}
//                   isLoading={isLoading}
//                 />
//               </TabsContent>
//             ))}
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, LogIn } from "lucide-react";
import { toast } from "sonner";
import { loginApi } from "@/services/apiService"; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsLoading(true);
    try {
      // 1. API call karte waqt ab role bhejne ki jarurat nahi, sirf email/pass bhejein
      const response = await loginApi(email, password);
      
      console.log("Login Response:", response);

      if (response.success && response.user) {
        const userRole = response.user.role; // 👈 Yahan se role pakdenge (e.g., "franchise", "isSubAdmin", "dealer")
        
        // 2. Token aur Basic details save karein
        if(response.token) {
           localStorage.setItem("token", response.token); 
        }
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userEmail", response.user.email);
        localStorage.setItem("userId", response.user.id);
        
        // Agar extra IDs hain (Jese Franchise ID) toh wo bhi save kar lein
        if(response.meta?.franchiseId) {
            localStorage.setItem("franchiseId", response.meta.franchiseId);
        }
        if(response.meta?.dealerId) {
            localStorage.setItem("dealerId", response.meta.dealerId);
        }

        toast.success(`Welcome back, ${response.user.fullName || "User"}!`);

        // 3. 🚀 Dynamic Routing Logic (Role ke hisab se redirect)
        // Aapke JSON response me role "isSubAdmin" aa raha hai, usse Admin dashboard bhejna hoga
        
        if (userRole === "admin" || userRole === "isSubAdmin") {
          navigate("/admin/dashboard");
        } 
        else if (userRole === "franchise") {
          navigate("/franchise/dashboard");
        } 
        else if (userRole === "dealer") {
          navigate("/dealer/dashboard");
        } 
         else if (userRole === "inspection") {
  navigate("/inspection/dashboard");
}
        else {
          // Agar koi naya role ho toh default home ya error
          console.warn("Unknown role:", userRole);
          toast.error("Unauthorized role access");
        }
      } else {
        throw new Error(response.message || "Login failed");
      }

    } catch (error: any) {
      console.error("Login Failed:", error);
      const errorMessage = error.message || error.response?.data?.message || "Invalid Credentials";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter key press par login trigger karne ke liye
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4 animate-fade-in relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="w-full max-w-md glass-card border-border/50 animate-scale-in relative z-10 shadow-2xl">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full glass flex items-center justify-center animate-glow shadow-inner">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Single Form - No Tabs */}
          <div className="space-y-4" onKeyDown={handleKeyDown}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/80 font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-11 glass border-border/50 focus:border-primary transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground/80 font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-11 glass border-border/50 focus:border-primary transition-all duration-300"
              />
            </div>
            
            <Button 
              className="w-full h-11 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] mt-4" 
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">Processing...</span>
              ) : (
                <span className="flex items-center gap-2"><LogIn className="w-4 h-4" /> Sign In</span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;