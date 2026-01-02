import { useState, useEffect } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import { MapPin, Clock, CheckCircle, XCircle, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

// 👇 Ye services aapne pehle banayi thi
import { submitTerritoryRequest, getTerritoryHistory } from "@/services/franchiseService";

const TerritoryManager = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [pincodesInput, setPincodesInput] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getTerritoryHistory();
      // Ensure data is array before setting
      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load territory history", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!pincodesInput || !reason) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      // Convert "452001, 452002" -> ["452001", "452002"]
      const pincodeArray = pincodesInput.split(",").map(p => p.trim()).filter(p => p !== "");
      
      if (pincodeArray.length === 0) {
        toast.error("Please enter at least one valid pincode");
        return;
      }

      await submitTerritoryRequest({
        requestedPincodes: pincodeArray,
        reason: reason
      });

      toast.success("Request sent to Admin successfully!");
      setIsModalOpen(false);
      setPincodesInput("");
      setReason("");
      fetchHistory(); // Refresh list
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
        case 'approved': return <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1"/> Approved</Badge>;
        case 'rejected': return <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1"/> Rejected</Badge>;
        default: return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100"><Clock className="w-3 h-3 mr-1"/> Pending</Badge>;
    }
  };

  return (
    <Card className="shadow-sm border border-indigo-100 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4 bg-indigo-50/30">
        <div>
            <CardTitle className="text-lg flex items-center gap-2 text-indigo-950">
                <MapPin className="h-5 w-5 text-indigo-500"/> Territory Management
            </CardTitle>
            <CardDescription>Request expansion or changes to your operational area.</CardDescription>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4" /> Request Update
        </Button>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* History List */}
        <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Request History</h4>
            
            {loading ? (
                <div className="flex justify-center py-4"><Loader2 className="animate-spin text-indigo-500"/></div>
            ) : requests.length > 0 ? (
                <div className="space-y-3">
                    {requests.map((req) => (
                        <div key={req._id} className="flex flex-col sm:flex-row sm:items-start justify-between p-4 bg-white rounded-lg border border-slate-200 shadow-sm gap-4 hover:border-indigo-200 transition-colors">
                            <div className="space-y-2 flex-1">
                                <div className="flex flex-wrap gap-2">
                                    {req.requestedPincodes.map((pin: string, idx: number) => (
                                        <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-700 font-mono border-slate-200">
                                            {pin}
                                        </Badge>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-600">
                                    <span className="font-medium text-slate-900">Reason:</span> {req.reason}
                                </p>
                                {req.adminRemark && (
                                    <div className="text-xs bg-red-50 text-red-600 p-2 rounded border border-red-100 mt-1">
                                        <strong>Admin Note:</strong> {req.adminRemark}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                {getStatusBadge(req.status)}
                                <span className="text-xs text-slate-400">
                                    {new Date(req.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    <MapPin className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No territory requests made yet.</p>
                    <p className="text-xs text-slate-400 mt-1">Click "Request Update" to add new pincodes.</p>
                </div>
            )}
        </div>
      </CardContent>

      {/* --- REQUEST MODAL --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Request Territory Update</DialogTitle>
                <DialogDescription>
                    Submit new pincodes you want to add to your franchise.
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-3">
                <div className="space-y-2">
                    <Label className="text-slate-700">New Pincodes (Comma separated)</Label>
                    <Input 
                        placeholder="e.g. 452010, 452012, 452015" 
                        value={pincodesInput}
                        onChange={(e) => setPincodesInput(e.target.value)}
                        className="border-slate-300 focus:ring-indigo-500"
                    />
                    <p className="text-xs text-muted-foreground">Enter only the new codes you want to add.</p>
                </div>

                <div className="space-y-2">
                    <Label className="text-slate-700">Reason for Expansion</Label>
                    <Textarea 
                        placeholder="Why do you need these areas? (e.g. High demand, new office location...)" 
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="min-h-[100px] border-slate-300 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={submitting} className="bg-indigo-600 hover:bg-indigo-700">
                    {submitting ? (
                        <>Sending... <Loader2 className="ml-2 h-4 w-4 animate-spin"/></>
                    ) : (
                        "Submit Request"
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TerritoryManager;