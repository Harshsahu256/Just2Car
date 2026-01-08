// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { Bell, LogOut, User, ShieldCheck, Building2, Users } from "lucide-react";
// import { toast } from "sonner";

// interface NavbarProps {
//   role: "admin" | "franchise" | "dealer";
// }

// const Navbar = ({ role }: NavbarProps) => {
//   const navigate = useNavigate();
//   const email = localStorage.getItem("userEmail") || "user@example.com";

// const handleProfile = () => {
//   navigate(`/${role}/profile`);
// };




//   const handleLogout = () => {
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userEmail");
//     toast.success("Logged out successfully");
//     navigate("/");
//   };

//   const getRoleIcon = () => {
//     switch (role) {
//       case "admin":
//         return <ShieldCheck className="h-4 w-4" />;
//       case "franchise":
//         return <Building2 className="h-4 w-4" />;
//       case "dealer":
//         return <Users className="h-4 w-4" />;
//     }
//   };

//   const getRoleLabel = () => {
//     return role.charAt(0).toUpperCase() + role.slice(1);
//   };

//   return (
//     <header className="h-16 border-b border-border/50 glass-card backdrop-blur-xl flex items-center justify-between px-4 sticky top-0 z-50 animate-slide-down">
//       <div className="flex items-center gap-4">
//         <SidebarTrigger className="transition-all duration-300 hover:scale-110 hover:rotate-180" />
//         <div className="flex items-center gap-2">
//           <div className="glass p-2 rounded-lg">
//             {getRoleIcon()}
//           </div>
//           <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{getRoleLabel()} Dashboard</h1>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <Button variant="ghost" size="icon" className="relative transition-all duration-300 hover:glass-card hover:scale-110">
//           <Bell className="h-5 w-5" />
//           <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse" />
//         </Button>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="relative h-10 w-10 rounded-full transition-all duration-300 hover:glass-card hover:scale-110">
//               <Avatar>
//                 <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
//                   {email[0].toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-56 glass-card border-border/50 backdrop-blur-xl" align="end">
//             <DropdownMenuLabel>
//               <div className="flex flex-col space-y-1">
//                 <p className="text-sm font-medium leading-none">{getRoleLabel()}</p>
//                 <p className="text-xs leading-none text-muted-foreground">{email}</p>
//               </div>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             {/* <DropdownMenuItem className="transition-all duration-300 hover:bg-primary/10 cursor-pointer">
//               <User className="mr-2 h-4 w-4" />
//               <span>Profile</span>
//             </DropdownMenuItem> */}
//             <DropdownMenuItem
//   onClick={handleProfile}
//   className="transition-all duration-300 hover:bg-primary/10 cursor-pointer"
// >
//   <User className="mr-2 h-4 w-4" />
//   <span>Profile</span>
// </DropdownMenuItem>




//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={handleLogout} className="text-destructive transition-all duration-300 hover:bg-destructive/10 cursor-pointer">
//               <LogOut className="mr-2 h-4 w-4" />
//               <span>Log out</span>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, LogOut, User, ShieldCheck, Building2, Users, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface NavbarProps {
  role: "admin" | "franchise" | "dealer" |"inspection";
}

const Navbar = ({ role }: NavbarProps) => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "user@example.com";

const handleProfile = () => {
  navigate(`/${role}/profile`);
};




  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getRoleIcon = () => {
    switch (role) {
      case "admin":
        return <ShieldCheck className="h-4 w-4" />;
      case "franchise":
        return <Building2 className="h-4 w-4" />;
      case "dealer":
        return <Users className="h-4 w-4" />;
      case "inspection":  
         return <UserCheck className="h-4 w-4" />;
    }
  };

  const getRoleLabel = () => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <header className="h-16 border-b border-border/50 glass-card backdrop-blur-xl flex items-center justify-between px-4 sticky top-0 z-50 animate-slide-down">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="transition-all duration-300 hover:scale-110 hover:rotate-180" />
        <div className="flex items-center gap-2">
          <div className="glass p-2 rounded-lg">
            {getRoleIcon()}
          </div>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{getRoleLabel()} Dashboard</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative transition-all duration-300 hover:glass-card hover:scale-110">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full transition-all duration-300 hover:glass-card hover:scale-110">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                  {email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass-card border-border/50 backdrop-blur-xl" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{getRoleLabel()}</p>
                <p className="text-xs leading-none text-muted-foreground">{email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="transition-all duration-300 hover:bg-primary/10 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem
  onClick={handleProfile}
  className="transition-all duration-300 hover:bg-primary/10 cursor-pointer"
>
  <User className="mr-2 h-4 w-4" />
  <span>Profile</span>
</DropdownMenuItem>




            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive transition-all duration-300 hover:bg-destructive/10 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
