import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

const DealTracking = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Deal Tracking</h1>
        <p className="text-muted-foreground mt-1">Track ongoing deals and transactions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Active Deals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Deal tracking interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealTracking;

