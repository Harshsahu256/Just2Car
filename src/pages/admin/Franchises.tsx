import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const FranchiseManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Franchise Management</h1>
        <p className="text-muted-foreground mt-1">Manage franchise partners</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            All Franchises
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Franchise management interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FranchiseManagement;
