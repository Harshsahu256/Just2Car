import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Car } from "lucide-react";

export const ListingSummary = ({ stats }: { stats: any }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="mb-10"
  >
    <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
      <CardContent className="py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/20">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Your Listing Summary</h3>
              <p className="text-sm text-muted-foreground">Current credit utilization</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.totalLimit}</p>
              <p className="text-sm text-muted-foreground">Total Limit</p>
            </div>
            <div className="h-12 w-px bg-border hidden md:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-500">{stats.usedListings}</p>
              <p className="text-sm text-muted-foreground">Used</p>
            </div>
            <div className="h-12 w-px bg-border hidden md:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-500">{stats.remainingListings}</p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);