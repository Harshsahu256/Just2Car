import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitInspectionReport } from "@/services/inspectionService.js";

const SubmitReport = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("carId", carId!);
    formData.append("inspectionName", "Ramdas"); // Aap localStorage se le sakte hain

    try {
      const res = await submitInspectionReport(formData);
      if (res.success) {
        toast.success("Report submitted successfully!");
        navigate("/inspection/Completedinspections");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <Card className="glass-card">
        <CardHeader><CardTitle>Vehicle Inspection Report</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Exterior Score (1-10)</Label><Input name="exteriorScore" type="number" required /></div>
              <div><Label>Interior Score (1-10)</Label><Input name="interiorScore" type="number" required /></div>
              <div><Label>Engine Score (1-10)</Label><Input name="engineMechanicalScore" type="number" required /></div>
              <div><Label>Tyres Score (1-10)</Label><Input name="tyresBrakesScore" type="number" required /></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Odometer Reading</Label><Input name="odometerReading" type="number" required /></div>
              <div>
                <Label>Tyre Condition</Label>
                <select name="tyreCondition" className="w-full h-10 rounded-md border p-2 bg-background">
                  <option value="New">New</option>
                  <option value="Half-used">Half-used</option>
                  <option value="Need Replacement">Need Replacement</option>
                </select>
              </div>
            </div>

            <div>
               <Label>Accident History</Label>
               <select name="accidentHistory" className="w-full h-10 rounded-md border p-2 bg-background">
                  <option value="No">No Accident</option>
                  <option value="Yes">Has Accident History</option>
               </select>
            </div>

            <div><Label>Minor Issues / Remarks</Label><Input name="minorIssues" placeholder="e.g. Scratches on bumper" /></div>
            
            <div><Label>Inspection Photos</Label><Input name="photos" type="file" multiple accept="image/*"  capture="environment" required /></div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Inspection Report"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitReport;