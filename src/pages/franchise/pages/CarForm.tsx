import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Fuel,
  Gauge,
  IndianRupee,
  Settings2,
  X,
  Upload,
  Loader2,
  ImageIcon,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createFranchiseCar, editFranchiseCar } from "@/services/franchiseService";

interface CarFormProps {
  editData: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CarForm = ({ editData, onSuccess, onCancel }: CarFormProps) => {
  const [formData, setFormData] = useState({
    sellerType: "franchise", make: "", model: "", variant: "", color: "",
    year: "", noOfOwners: "1", kmDriven: "", fuelType: "", transmission: "",
    registrationCity: "", city: "", pincode: "", expectedPrice: "",
    negotiable: false, description: ""
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editData) {
      setFormData({
        sellerType: "franchise", make: editData.make, model: editData.model, variant: editData.variant || "",
        color: editData.color || "", year: editData.year.toString(), noOfOwners: editData.noOfOwners?.toString() || "1",
        kmDriven: editData.kmDriven.toString(), fuelType: editData.fuelType, transmission: editData.transmission,
        registrationCity: editData.registrationCity, city: editData.city || "", pincode: editData.pincode || "",
        expectedPrice: editData.expectedPrice.toString(), negotiable: editData.negotiable || false, description: editData.description || ""
      });
    }
  }, [editData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v.toString()));
    imageFiles.forEach(file => data.append("images", file));
    documentFiles.forEach(file => data.append("documents", file));

    try {
      if (editData) await editFranchiseCar(editData._id, data);
      else await createFranchiseCar(data);
      toast({ title: "Success!", description: "Car listing saved successfully." });
      onSuccess();
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Something went wrong", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 py-4">
      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2 text-[#1a1f2c]"><Settings2 className="h-5 w-5 text-[#0052cc]" /> Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1"><Label>Make</Label><Input name="make" value={formData.make} placeholder="Toyota" onChange={handleInputChange} required /></div>
          <div className="space-y-1"><Label>Model</Label><Input name="model" value={formData.model} placeholder="Fortuner" onChange={handleInputChange} required /></div>
          <div className="space-y-1"><Label>Variant</Label><Input name="variant" value={formData.variant} placeholder="Legender" onChange={handleInputChange} /></div>
          <div className="space-y-1"><Label>Color</Label><Input name="color" value={formData.color} placeholder="Pearl White" onChange={handleInputChange} /></div>
          <div className="space-y-1"><Label>Year</Label><Input name="year" type="number" value={formData.year} onChange={handleInputChange} required /></div>
          <div className="space-y-1">
            <Label>Fuel Type</Label>
            <Select value={formData.fuelType} onValueChange={(v) => setFormData(p=>({...p, fuelType: v}))}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Petrol">Petrol</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="CNG">CNG</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2 text-[#1a1f2c]"><Gauge className="h-5 w-5 text-[#0052cc]" /> Vehicle Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1"><Label>KM Driven</Label><Input name="kmDriven" type="number" value={formData.kmDriven} onChange={handleInputChange} required /></div>
          <div className="space-y-1"><Label>Owners</Label><Input name="noOfOwners" type="number" value={formData.noOfOwners} onChange={handleInputChange} /></div>
          <div className="space-y-1">
            <Label>Transmission</Label>
            <Select value={formData.transmission} onValueChange={(v) => setFormData(p=>({...p, transmission: v}))}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Automatic">Automatic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1"><Label>Registration City</Label><Input name="registrationCity" value={formData.registrationCity} onChange={handleInputChange} required /></div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2 text-[#1a1f2c]"><IndianRupee className="h-5 w-5 text-[#0052cc]" /> Pricing & Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1"><Label>Expected Price (₹)</Label><Input name="expectedPrice" type="number" value={formData.expectedPrice} onChange={handleInputChange} required /></div>
          <div className="flex items-center justify-between p-3 border rounded-lg h-10 mt-6">
            <Label className="text-sm font-normal">Negotiable?</Label>
            <Switch checked={formData.negotiable} onCheckedChange={(v) => setFormData(p=>({...p, negotiable: v}))} />
          </div>
        </div>
        <div className="space-y-1"><Label>Description</Label><Textarea name="description" value={formData.description} placeholder="Enter car description" onChange={handleInputChange} rows={3} /></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2"><ImageIcon className="h-4 w-4"/> Photos</Label>
          <div className="border-2 border-dashed rounded-xl p-6 text-center relative hover:bg-gray-50 transition-colors">
            <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setImageFiles(Array.from(e.target.files))} />
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="text-xs text-gray-400 mt-2 font-medium">Click to upload photos</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {imageFiles.map((f, i) => <Badge key={i} variant="secondary" className="text-[10px] gap-1">{f.name} <X className="h-3 w-3 cursor-pointer" onClick={() => setImageFiles(prev => prev.filter((_, idx) => idx !== i))} /></Badge>)}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2"><FileText className="h-4 w-4"/> Documents</Label>
          <div className="border-2 border-dashed rounded-xl p-6 text-center relative hover:bg-gray-50 transition-colors">
            <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setDocumentFiles(Array.from(e.target.files))} />
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="text-xs text-gray-400 mt-2 font-medium">Upload RC/Insurance</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {documentFiles.map((f, i) => <Badge key={i} variant="secondary" className="text-[10px] gap-1">{f.name} <X className="h-3 w-3 cursor-pointer" onClick={() => setDocumentFiles(prev => prev.filter((_, idx) => idx !== i))} /></Badge>)}
          </div>
        </div>
      </div>

      <DialogFooter className="gap-2 sm:gap-0 mt-8">
        <Button type="button" variant="ghost" className="rounded-lg" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting} className="bg-[#0052cc] hover:bg-[#0041a3] rounded-lg px-8">
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : (editData ? "Update Listing" : "Publish Listing")}
        </Button>
      </DialogFooter>
    </form>
  );
};