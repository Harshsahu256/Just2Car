import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

const PurchasedLeads = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Purchased Leads</h1>
        <p className="text-muted-foreground mt-1">View your purchased leads</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Your Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Purchased leads interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchasedLeads;
