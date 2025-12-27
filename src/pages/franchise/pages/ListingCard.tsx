import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Eye,
  Pencil,
  Trash2,
  Fuel,
  MapPin,
  Gauge,
  IndianRupee,
} from "lucide-react";

interface ListingCardProps {
  car: any;
  onView: (car: any) => void;
  onEdit: (car: any) => void;
  onDelete: (id: string) => void;
}

const formatPrice = (price: number) => {
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString()}`;
};

export const ListingCard = ({ car, onView, onEdit, onDelete }: ListingCardProps) => {
  return (
    <Card className="border-none rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-2xl">
      <AspectRatio ratio={16 / 10}>
        <img
          src={car.images[0] || "https://placehold.co/600x400?text=No+Image"}
          alt={car.model}
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      <CardHeader className="p-5 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-[#1a1f2c]">
              {car.make} {car.model}
            </CardTitle>
            <p className="text-sm text-gray-500 font-medium">
              {car.variant} • {car.year}
            </p>
          </div>
          <Badge className="bg-green-50 text-green-600 border-none rounded-full px-3 py-0.5 text-[10px] font-bold uppercase">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
          <div className="flex items-center gap-2 text-[#0052cc] font-bold text-lg leading-none">
            <IndianRupee className="w-4 h-4" />{" "}
            {formatPrice(car.expectedPrice).replace("₹", "")}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
            <Gauge className="w-4 h-4 text-gray-300" />{" "}
            {car.kmDriven.toLocaleString()} km
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
            <Fuel className="w-4 h-4 text-gray-300" /> {car.fuelType}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
            <MapPin className="w-4 h-4 text-gray-300" />{" "}
            {car.registrationCity || car.city}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex justify-between items-center border-t border-gray-50 mt-2">
        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
          <Eye className="h-4 w-4" /> {car.views || 0}
        </div>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-gray-400 hover:text-[#0052cc]"
            onClick={() => onView(car)}
          >
            <Eye className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-gray-400 hover:text-[#0052cc]"
            onClick={() => onEdit(car)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={() => onDelete(car._id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};