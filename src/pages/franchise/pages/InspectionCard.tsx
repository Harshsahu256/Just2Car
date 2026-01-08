import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Mail, Phone, MapPin, Calendar, MoreVertical, Pencil, Trash2 } from "lucide-react";

interface inspectionCardProps {
  inspection: any;
  onEdit: (inspection: any) => void;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
}

export const InspectionCard = ({ inspection, onEdit, onDelete, formatDate }: inspectionCardProps) => (
  <Card className="group relative p-5 border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(inspection)}>
            <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(inspection._id)} className="text-destructive focus:text-destructive">
            <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div className="flex items-start gap-4 mb-4">
      <div className="relative">
        <img src={inspection.profileImage} alt={inspection.fullName} className="h-14 w-14 rounded-full object-cover ring-2 ring-background shadow-sm" />
        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-green-500 rounded-full border-2 border-card" />
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <h3 className="font-semibold text-foreground truncate">{inspection.fullName}</h3>
        <span className="inline-flex items-center px-2 py-0.5 mt-1 text-xs font-medium bg-primary/10 text-primary rounded-md">inspection</span>
      </div>
    </div>

    <div className="space-y-2.5">
      <div className="flex items-center gap-3 text-sm">
        <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span className="text-muted-foreground truncate">{inspection.email}</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span className="text-muted-foreground">{inspection.phone}</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span className="text-muted-foreground">{inspection.pincode}</span>
      </div>
    </div>

    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">Added {formatDate(inspection.createdAt)}</span>
    </div>
  </Card>
);