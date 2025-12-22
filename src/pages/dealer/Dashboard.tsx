import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, MessagesSquare, Car, TrendingUp, ShoppingCart, DollarSign } from "lucide-react";

const DealerDashboard = () => {
  const stats = [
    {
      title: "Wallet Balance",
      value: "₹25,000",
      icon: Wallet,
      color: "text-success",
    },
    {
      title: "Available Leads",
      value: "48",
      icon: MessagesSquare,
      color: "text-primary",
    },
    {
      title: "Purchased Leads",
      value: "23",
      icon: ShoppingCart,
      color: "text-warning",
    },
    {
      title: "My Active Listings",
      value: "12",
      icon: Car,
      color: "text-primary",
    },
    {
      title: "Deals Closed",
      value: "8",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Total Revenue",
      value: "₹4.2L",
      icon: DollarSign,
      color: "text-success",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dealer Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your leads, listings and business operations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Marketplace</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">Premium Lead - SUV Inquiry</p>
                    <p className="text-xs text-muted-foreground">Budget: ₹20-25L</p>
                  </div>
                  <span className="text-sm font-bold text-primary">₹500</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">Sedan Lead Purchase</p>
                    <p className="text-xs text-muted-foreground">Purchased 2 hours ago</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Active</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DealerDashboard;
