import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessagesSquare } from "lucide-react";

const LeadMarketplace = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lead Marketplace</h1>
        <p className="text-muted-foreground mt-1">Browse and purchase leads</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessagesSquare className="h-5 w-5" />
            Available Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Lead marketplace interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadMarketplace;
