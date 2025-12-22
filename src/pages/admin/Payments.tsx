import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

const PaymentWallet = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment & Wallet</h1>
        <p className="text-muted-foreground mt-1">Manage payments and wallet system</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Payment Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Payment management interface coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentWallet;
