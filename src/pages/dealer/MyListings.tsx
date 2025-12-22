import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";

const DealerListings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Listings</h1>
        <p className="text-muted-foreground mt-1">Manage your car listings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Your Listings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Listings interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerListings;
