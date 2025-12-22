import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Car, TrendingUp, DollarSign, Package } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,284",
      icon: Users,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Active Franchises",
      value: "48",
      icon: Building2,
      trend: "+3.2%",
      trendUp: true,
    },
    {
      title: "Active Dealers",
      value: "156",
      icon: Users,
      trend: "+8.1%",
      trendUp: true,
    },
    {
      title: "Car Listings",
      value: "2,847",
      icon: Car,
      trend: "+15.3%",
      trendUp: true,
    },
    {
      title: "Total Revenue",
      value: "₹45.2L",
      icon: DollarSign,
      trend: "+22.5%",
      trendUp: true,
    },
    {
      title: "Active Packages",
      value: "12",
      icon: Package,
      trend: "0%",
      trendUp: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Complete platform overview and management
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trendUp ? 'text-success' : 'text-muted-foreground'} mt-1`}>
                {stat.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New franchise application</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="text-sm font-medium">Franchise Approvals</p>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </div>
                <span className="text-lg font-bold text-warning">12</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="text-sm font-medium">Dealer Verifications</p>
                  <p className="text-xs text-muted-foreground">Pending review</p>
                </div>
                <span className="text-lg font-bold text-warning">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Listing Approvals</p>
                  <p className="text-xs text-muted-foreground">Awaiting action</p>
                </div>
                <span className="text-lg font-bold text-warning">24</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
