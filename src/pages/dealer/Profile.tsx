import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const DealerProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your profile settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Profile Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Profile settings interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealerProfile;
