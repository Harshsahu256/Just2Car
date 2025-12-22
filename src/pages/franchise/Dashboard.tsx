import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, MessagesSquare, TrendingUp, CheckCircle, XCircle, Clock } from "lucide-react";

const FranchiseDashboard = () => {
  const stats = [
    {
      title: "Pending Listings",
      value: "23",
      icon: Clock,
      color: "text-warning",
    },
    {
      title: "Active Leads",
      value: "45",
      icon: MessagesSquare,
      color: "text-primary",
    },
    {
      title: "Deals in Progress",
      value: "12",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Approved Listings",
      value: "156",
      icon: CheckCircle,
      color: "text-success",
    },
    {
      title: "Rejected Listings",
      value: "8",
      icon: XCircle,
      color: "text-destructive",
    },
    {
      title: "My Listings",
      value: "34",
      icon: Car,
      color: "text-primary",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Franchise Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your district operations and listings
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
            <CardTitle>Recent Listings for Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">Toyota Fortuner 2023</p>
                    <p className="text-xs text-muted-foreground">Submitted 2 hours ago</p>
                  </div>
                  <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded">Pending</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">Honda City Inquiry</p>
                    <p className="text-xs text-muted-foreground">Contact: +91 98765xxxxx</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">New</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FranchiseDashboard;
