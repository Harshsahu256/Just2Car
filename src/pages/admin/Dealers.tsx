import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck } from "lucide-react";

const DealerManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dealer Management</h1>
        <p className="text-muted-foreground mt-1">Manage dealer network</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            All Dealers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Dealer management interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerManagement;
