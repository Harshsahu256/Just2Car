import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  X,
  Eye,
  Pencil,
  Fuel,
  MapPin,
  Gauge,
  Settings2,
  Calendar,
  Users,
  MessageSquare,
} from "lucide-react";

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: any;
  onEdit: (car: any) => void;
}

const formatPrice = (price: number) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString()}`;
};

export const ViewDetailsModal = ({ isOpen, onClose, car, onEdit }: ViewDetailsModalProps) => {
  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 rounded-2xl overflow-hidden border-none flex flex-col max-h-[90vh] shadow-2xl bg-white">
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#1a1f2c]">
                {car.make} {car.model}
              </h2>
              <p className="text-gray-500 font-medium">
                {car.variant} • {car.year}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 text-gray-400"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <AspectRatio
            ratio={16 / 9}
            className="rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              src={car.images[0]}
              alt="car"
              className="object-cover w-full h-full"
            />
          </AspectRatio>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-[#0052cc]">
                {formatPrice(car.expectedPrice)}
              </span>
              {car.negotiable && (
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Negotiable
                </span>
              )}
            </div>
            <Badge className="bg-green-50 text-green-600 border-none rounded-full px-4 py-1 text-xs font-bold uppercase">
              Active
            </Badge>
          </div>

          {/* Icon Grid Style */}
          <div className="grid grid-cols-3 gap-y-10 gap-x-4">
            {[
              {
                label: "KM Driven",
                value: `${car.kmDriven.toLocaleString()} km`,
                icon: <Gauge className="w-4 h-4" />,
              },
              {
                label: "Fuel Type",
                value: car.fuelType,
                icon: <Fuel className="w-4 h-4" />,
              },
              {
                label: "Transmission",
                value: car.transmission,
                icon: <Settings2 className="w-4 h-4" />,
              },
              {
                label: "Owners",
                value: `${car.noOfOwners || 1}st Owner`,
                icon: <Users className="w-4 h-4" />,
              },
              {
                label: "Location",
                value: car.registrationCity || car.city,
                icon: <MapPin className="w-4 h-4" />,
              },
              {
                label: "Listed On",
                value: car.createdAt
                  ? new Date(car.createdAt).toLocaleDateString("en-GB")
                  : "23/12/2025",
                icon: <Calendar className="w-4 h-4" />,
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <p className="font-bold text-base text-[#1a1f2c]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#1a1f2c]">Description</h4>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {car.description ||
                "Well maintained vehicle in pristine condition."}
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400 pt-2 font-medium">
            <span className="flex items-center gap-1.5 text-gray-400">
              <Eye className="h-4 w-4" /> {car.views || 0} Views
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <MessageSquare className="h-4 w-4" /> {car.inquiries || 0}{" "}
              Inquiries
            </span>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="p-5 bg-gray-50/50 border-t flex justify-end gap-3 px-8 shrink-0">
          <Button
            variant="outline"
            className="rounded-lg h-10 px-6 font-bold border-gray-200 text-gray-600"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="bg-[#0052cc] hover:bg-[#0041a3] rounded-lg h-10 px-6 font-bold flex items-center gap-2 shadow-sm"
            onClick={() => {
              onClose();
              onEdit(car);
            }}
          >
            <Pencil className="w-4 h-4" /> Edit Listing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};