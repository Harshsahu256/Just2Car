// import { useEffect, useState } from "react";
// import { useNavigate, Outlet, useLocation } from "react-router-dom";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import AppSidebar from "@/components/common/Sidebar";
// import Navbar from "@/components/common/Navbar";

// interface DashboardLayoutProps {
//   role: "admin" | "franchise" | "dealer";
// }

// const DashboardLayout = ({ role }: DashboardLayoutProps) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const userRole = localStorage.getItem("userRole");
    
//     if (!userRole) {
//       navigate("/");
//     } else if (userRole !== role) {
//       navigate(`/${userRole}/dashboard`);
//     }
//   }, [navigate, role, location.pathname]);

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <SidebarProvider>
//       <div className="min-h-screen flex w-full relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none"></div>
//         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
        
//         <AppSidebar role={role} />
//         <div className="flex-1 flex flex-col relative z-10">
//           <Navbar role={role} />
//           <main className="flex-1 p-6 animate-fade-in">
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default DashboardLayout;


import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";

interface DashboardLayoutProps {
  role: "admin" | "franchise" | "dealer";
}

const DashboardLayout = ({ role }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userRole = localStorage.getItem("userRole");
    
    if (!userRole) {
      navigate("/");
    } else if (userRole !== role) {
      navigate(`/${userRole}/dashboard`);
    }
  }, [navigate, role, location.pathname]);

  if (!mounted) {
    return null;
  }

  return (
    <SidebarProvider>
      {/* CHANGE 1: min-h-screen ko h-screen kar diya taaki outer window scroll na ho */}
      <div className="h-screen flex w-full relative overflow-hidden">
        
        {/* Background elements same rahenge */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
        
        <AppSidebar role={role} />
        
        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col relative z-10 h-full">
          <Navbar role={role} />
          
          {/* CHANGE 2: overflow-y-auto add kiya taaki sirf content scroll ho, Navbar nahi */}
          <main className="flex-1 p-6 animate-fade-in overflow-y-auto overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;