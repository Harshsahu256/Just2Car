import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Car,
  MapPin,
  Fuel,
  Calendar,
  Clock,
  Eye,
  XCircle,
  ImageIcon,
  AlertCircle,
  RefreshCw,
  Gauge,
} from "lucide-react";

// Helper Functions
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const ListingGrid = ({
  loading,
  error,
  listings,
  activeTab,
  onRetry,
  onView,
  onReject,
  statusConfig,
}: any) => {
  
  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="glass-card border border-border/50 overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <Card className="glass-card border border-destructive/30 p-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 rounded-full bg-destructive/10">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Something went wrong</h3>
            <p className="text-muted-foreground mt-1">{error}</p>
          </div>
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  // Empty State
  if (listings.length === 0) {
    return (
      <Card className="glass-card border border-border/50 p-12">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-6 rounded-full bg-muted/50">
            <Car className="w-12 h-12 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">No listings found</h3>
            <p className="text-muted-foreground mt-2">
              There are no {statusConfig[activeTab]?.label.toLowerCase()} listings at the moment.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((car: any, index: number) => (
        <Card
          key={car._id}
          className="glass-card border border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-scale-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-muted/30">
            {car.images && car.images.length > 0 ? (
              <img
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
              </div>
            )}
            <Badge
              className={`absolute top-3 right-3 ${statusConfig[car.status].color} border backdrop-blur-sm`}
            >
              {statusConfig[car.status].icon}
              <span className="ml-1">{statusConfig[car.status].label}</span>
            </Badge>
          </div>

          <CardContent className="p-4 space-y-4">
            {/* Title & Price */}
            <div>
              <h3 className="text-lg font-semibold text-foreground truncate">
                {car.make} {car.model} {car.variant}
              </h3>

              {car.rejectionReason && (
                <div className="text-xl font-bold text-red-600 mt-1">
                  <span>{car.rejectionReason}</span>
                </div>
              )}

              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold text-primary">
                  {formatPrice(car.expectedPrice)}
                </span>
                {car.negotiable && (
                  <Badge variant="secondary" className="text-xs">
                    Negotiable
                  </Badge>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{car.city}, {car.pincode}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  <span>{car.fuelType}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Gauge className="w-4 h-4" />
                  <span>{car.transmission}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {car.year} • {car.kmDriven?.toLocaleString()} km
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs capitalize">
                {car.sellerType}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">
                {car.listingType}
              </Badge>
            </div>

            {/* Date */}
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Listed on {formatDate(car.createdAt)}
            </div>

            {/* Actions */}
            {activeTab === "pending_verification" ? (
              <div className="flex gap-3 pt-2">
                <Button onClick={() => onView(car)} className="flex-1 gap-2" variant="outline">
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
                <Button onClick={() => onReject(car)} variant="destructive" className="gap-2">
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
              </div>
            ) : (
              <Button onClick={() => onView(car)} className="w-full gap-2" variant="outline">
                <Eye className="w-4 h-4" />
                View Details
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};