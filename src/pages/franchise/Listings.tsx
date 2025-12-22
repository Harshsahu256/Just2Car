import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";

const ListingVerification = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Listing Verification</h1>
        <p className="text-muted-foreground mt-1">Verify and approve car listings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Pending Verifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Listing verification interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingVerification;
