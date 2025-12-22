import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const FranchiseReports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-1">View your performance reports</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Reports interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FranchiseReports;
