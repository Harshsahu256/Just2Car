import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";

const CarListings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Car Listings</h1>
        <p className="text-muted-foreground mt-1">Manage all car listings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            All Listings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Car listings interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarListings;
