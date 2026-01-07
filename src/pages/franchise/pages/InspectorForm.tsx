import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Lock, Loader2, Pencil, UserPlus, Plus } from "lucide-react";

export const InspectorForm = ({ 
  open, setOpen, isEditing, formData, setFormData, 
  imagePreview, fileInputRef, handleImageChange, handleSubmit, submitting 
}: any) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Inspector" : "Add New Inspector"}</DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-6 pt-2">
        <div className="flex justify-center">
          <div onClick={() => fileInputRef.current?.click()} className="relative cursor-pointer group">
            <div className="h-24 w-24 rounded-full bg-secondary border-2 border-dashed flex items-center justify-center overflow-hidden">
              {imagePreview ? <img src={imagePreview} className="h-full w-full object-cover" /> : <Camera className="h-8 w-8 text-muted-foreground" />}
            </div>
            <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-primary rounded-full flex items-center justify-center shadow-md">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-2">
            <Label>Full Name *</Label>
            <Input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Phone *</Label>
            <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Pincode *</Label>
            <Input value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>{isEditing ? "New Password (Optional)" : "Password *"}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="password" className="pl-10" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full h-11" disabled={submitting}>
          {submitting ? <Loader2 className="animate-spin mr-2" /> : (isEditing ? <Pencil className="mr-2" /> : <UserPlus className="mr-2" />)}
          {isEditing ? "Update Inspector" : "Add Inspector"}
        </Button>
      </form>
    </DialogContent>
  </Dialog>
);