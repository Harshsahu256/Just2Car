import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Car, 
  Package, 
  TrendingUp,
  Settings,
  FileText,
  Wallet,
  ClipboardList,
  UserCheck,
  MessagesSquare
} from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon: any;
}

interface SidebarProps {
  role: "admin" | "franchise" | "dealer";
}

const adminMenuItems: MenuItem[] = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "User Management", url: "/admin/users", icon: Users },
  { title: "Franchise Management", url: "/admin/franchises", icon: Building2 },
  { title: "Dealer Management", url: "/admin/dealers", icon: UserCheck },
  { title: "Car Listings", url: "/admin/listings", icon: Car },
  { title: "Lead Distribution", url: "/admin/leads", icon: MessagesSquare },
  { title: "Package Management", url: "/admin/packages", icon: Package },
  { title: "Reports & Analytics", url: "/admin/reports", icon: TrendingUp },
  { title: "Payment & Wallet", url: "/admin/payments", icon: Wallet },
  { title: "System Settings", url: "/admin/settings", icon: Settings },
  { title: "Role Management", url: "/admin/settings", icon: Settings },
];

const franchiseMenuItems: MenuItem[] = [
  { title: "Dashboard", url: "/franchise/dashboard", icon: LayoutDashboard },
  { title: "Listing Verification", url: "/franchise/listings", icon: Car },
  { title: "Inquiry & Leads", url: "/franchise/leads", icon: MessagesSquare },
  { title: "Deal Tracking", url: "/franchise/deals", icon: ClipboardList },
  { title: "My Listings", url: "/franchise/my-listings", icon: FileText },
  { title: "Reports", url: "/franchise/reports", icon: TrendingUp },
  { title: "Account", url: "/franchise/account", icon: Settings },
];

const dealerMenuItems: MenuItem[] = [
  { title: "Dashboard", url: "/dealer/dashboard", icon: LayoutDashboard },
  { title: "Lead Marketplace", url: "/dealer/marketplace", icon: MessagesSquare },
  { title: "Purchased Leads", url: "/dealer/purchased-leads", icon: ClipboardList },
  { title: "My Listings", url: "/dealer/my-listings", icon: Car },
  { title: "Wallet", url: "/dealer/wallet", icon: Wallet },
  { title: "History & Analytics", url: "/dealer/analytics", icon: TrendingUp },
  { title: "Profile", url: "/dealer/profile", icon: Settings },
];

const AppSidebar = ({ role }: SidebarProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const menuItems = 
    role === "admin" ? adminMenuItems :
    role === "franchise" ? franchiseMenuItems :
    dealerMenuItems;

  const roleLabel = 
    role === "admin" ? "Admin Panel" :
    role === "franchise" ? "Franchise Panel" :
    "Dealer Panel";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 glass-card backdrop-blur-xl">
      <SidebarContent className="animate-slide-down">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold mb-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {roleLabel}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title} style={{ animationDelay: `${index * 0.05}s` }} className="animate-slide-up">
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent transition-all duration-300 hover:glass-card hover:scale-105 hover:shadow-md"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
