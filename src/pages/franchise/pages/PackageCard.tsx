import { motion } from "framer-motion";
import { Check, Zap, Loader2, Package, ShoppingCart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const PackageCard = ({ pkg, index, buyingId, onPurchase, formatCurrency }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card className={`relative h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      pkg.isPopular ? "border-primary shadow-lg ring-2 ring-primary/20" : "border-border hover:border-primary/50"
    }`}>
      {pkg.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Zap className="h-3 w-3" /> Most Popular
          </span>
        </div>
      )}

      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
          <Package className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl">{pkg.name}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold text-foreground">{formatCurrency(pkg.price)}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="text-center mb-6 p-3 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold text-primary">{pkg.carListingLimit}</p>
          <p className="text-sm text-muted-foreground">Car Listings</p>
        </div>

        <ul className="space-y-3">
          {["Instant Activation", "Life-time Validity", "Priority Support"].map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <div className="p-1 rounded-full bg-emerald-500/10">
                <Check className="h-3 w-3 text-emerald-500" />
              </div>
              <span className="text-muted-foreground">{feat}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant={pkg.isPopular ? "default" : "outline"}
          onClick={() => onPurchase(pkg)}
          disabled={buyingId === pkg._id}
        >
          {buyingId === pkg._id ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
          ) : (
            <><ShoppingCart className="mr-2 h-4 w-4" /> Buy Now</>
          )}
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);