import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Profile from "./components/common/Profile";


// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/Users";
import FranchiseManagement from "./pages/admin/Franchises";
import DealerManagement from "./pages/admin/Dealers";
import CarListings from "./pages/admin/Listings";
import LeadDistribution from "./pages/admin/Leads";
import PackageManagement from "./pages/admin/Packages";
import ReportsAnalytics from "./pages/admin/Reports";
import PaymentWallet from "./pages/admin/Payments";
import SystemSettings from "./pages/admin/Settings";

// Franchise Pages
import FranchiseDashboard from "./pages/franchise/Dashboard";
import ListingVerification from "./pages/franchise/Listings";
import InquiryLeads from "./pages/franchise/Leads";
import DealTracking from "./pages/franchise/Deals";
import FranchiseMyListings from "./pages/franchise/MyListings";
import FranchiseReports from "./pages/franchise/Reports";
import FranchiseAccount from "./pages/franchise/Account";

// Dealer Pages
import DealerDashboard from "./pages/dealer/Dashboard";
import LeadMarketplace from "./pages/dealer/Marketplace";
import PurchasedLeads from "./pages/dealer/PurchasedLeads";
import DealerListings from "./pages/dealer/MyListings";
import DealerWallet from "./pages/dealer/Wallet";
import DealerAnalytics from "./pages/dealer/Analytics";
import DealerProfile from "./pages/dealer/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<Profile />} />   {/* ✅ ADD THIS */}
            <Route path="users" element={<UserManagement />} />
            <Route path="franchises" element={<FranchiseManagement />} />
            <Route path="dealers" element={<DealerManagement />} />
            <Route path="listings" element={<CarListings />} />
            <Route path="leads" element={<LeadDistribution />} />
            <Route path="packages" element={<PackageManagement />} />
            <Route path="reports" element={<ReportsAnalytics />} />
            <Route path="payments" element={<PaymentWallet />} />
            <Route path="settings" element={<SystemSettings />} />
          </Route>

          {/* Franchise Routes */}
          <Route path="/franchise" element={<DashboardLayout role="franchise" />}>
            <Route path="dashboard" element={<FranchiseDashboard />} />
              <Route path="profile" element={<Profile />} />   {/* ✅ ADD THIS */}
            <Route path="listings" element={<ListingVerification />} />
            <Route path="leads" element={<InquiryLeads />} />
            <Route path="deals" element={<DealTracking />} />
            <Route path="my-listings" element={<FranchiseMyListings />} />
            <Route path="reports" element={<FranchiseReports />} />
            <Route path="account" element={<FranchiseAccount />} />
          </Route>

          {/* Dealer Routes */}
          {/* <Route path="/dealer" element={<DashboardLayout role="dealer" />}>
            <Route path="dashboard" element={<DealerDashboard />} />
              <Route path="profile" element={<Profile />} />   {/* ✅ ADD THIS */}
            {/* <Route path="marketplace" element={<LeadMarketplace />} />
            <Route path="purchased-leads" element={<PurchasedLeads />} />
            <Route path="my-listings" element={<DealerListings />} />
            <Route path="wallet" element={<DealerWallet />} />
            <Route path="analytics" element={<DealerAnalytics />} />
            <Route path="profile" element={<DealerProfile />} />
          </Route> */} 

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
