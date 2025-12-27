import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Car, Users } from "lucide-react";

const statusColors: Record<string, string> = {
  live: "bg-success/20 text-success border-success/30",
  approved: "bg-success/20 text-success border-success/30",
  pending: "bg-warning/20 text-warning border-warning/30",
  sold: "bg-primary/20 text-primary border-primary/30",
  rejected: "bg-destructive/20 text-destructive border-destructive/30",
  hot: "bg-destructive/20 text-destructive border-destructive/30",
  warm: "bg-warning/20 text-warning border-warning/30",
  new: "bg-primary/20 text-primary border-primary/30",
  contacted: "bg-blue-500/20 text-blue-500 border-blue-500/30",
};

interface DashboardActivityProps {
  recentListings: any[];
  activeLeads: any[];
}

const DashboardActivity = ({ recentListings, activeLeads }: DashboardActivityProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in stagger-3">
      {/* Recent Listings */}
      <Card className="glass-card border border-border/40 overflow-hidden">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Car className="w-4 h-4 text-primary" />
            Recent Listings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[160px]">
            <div className="divide-y divide-border/30">
              {recentListings.length > 0 ? (
                recentListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                        <Car className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {listing.car}
                        </p>
                        <p className="text-xs text-muted-foreground">{listing.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm font-semibold text-foreground">
                        {listing.price}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-2 py-0.5 capitalize ${statusColors[listing.status] || statusColors.pending}`}
                      >
                        {listing.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-muted-foreground py-10">No recent listings</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Active Leads */}
      <Card className="glass-card border border-border/40 overflow-hidden">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-success" />
            Active Leads
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[160px]">
            <div className="divide-y divide-border/30">
              {activeLeads.length > 0 ? (
                activeLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {lead.buyer}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{lead.car}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        {lead.phone}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-2 py-0.5 capitalize ${statusColors[lead.status] || statusColors.new}`}
                      >
                        {lead.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-muted-foreground py-10">No active leads</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardActivity;