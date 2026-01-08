
import { useEffect, useState } from "react";
import { getCompletedInspections } from "@/services/inspectionService.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Eye, FileText, Gauge, ShieldAlert, CarFront, MapPin, Calendar, Fuel, Settings2, Hash } from "lucide-react";

const CompletedInspections = () => {
  const [data, setData] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    getCompletedInspections().then(res => {
      if (res.success) setData(res.data);
    });
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Completed Inspections
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">Detailed history of vehicles you've inspected</p>
        </div>
        <Badge variant="secondary" className="w-fit px-4 py-1.5 text-sm font-bold shadow-sm border-primary/10">
          Total: {data.length}
        </Badge>
      </div>

      {/* --- DESKTOP TABLE VIEW (Visible only on Large Screens) --- */}
      <div className="hidden md:block glass-card rounded-xl overflow-hidden border border-border/50 shadow-xl">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Vehicle & Variant</TableHead>
              <TableHead>Specs & Reg.</TableHead>
              <TableHead>Inspection Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? data.map((item) => (
              <TableRow key={item._id} className="hover:bg-muted/30 transition-colors group">
                <TableCell>
                  <div className="relative h-14 w-20 rounded-lg overflow-hidden border border-border/50 shadow-sm">
                    <img 
                      src={item.images?.[0] || "/placeholder-car.png"} 
                      className="h-full w-full object-cover transition-transform group-hover:scale-110" 
                      alt="car" 
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground text-base">{item.make} {item.model}</span>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] h-4 px-1.5 bg-primary/5 text-primary border-primary/20">
                            {item.variant}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.year}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                    <div className="flex flex-col gap-1 text-xs">
                        <span className="flex items-center gap-1 font-medium"><Hash className="w-3 h-3 text-primary"/> {item.registrationNumber}</span>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="flex items-center gap-1"><Fuel className="w-3 h-3"/> {item.fuelType}</span>
                            <span>•</span>
                            <span>{item.transmission}</span>
                        </div>
                    </div>
                </TableCell>
                <TableCell className="text-sm">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {new Date(item.inspectionReport?.inspectionDate).toLocaleDateString('en-GB', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    {item.inspectionReport?.status?.toUpperCase() || 'SUBMITTED'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <ReportDetailDialog item={item} setSelectedReport={setSelectedReport} selectedReport={selectedReport} />
                </TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={6} className="h-32 text-center text-muted-foreground">No records found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- MOBILE CARD VIEW (Visible only on Phones) --- */}
      <div className="md:hidden space-y-4">
        {data.length > 0 ? data.map((item) => (
          <div key={item._id} className="glass-card rounded-xl border border-border/50 p-4 space-y-4 shadow-md bg-card">
            <div className="flex gap-4">
              <div className="h-20 w-24 flex-shrink-0 rounded-lg overflow-hidden border border-border/50">
                <img src={item.images?.[0] || "/placeholder-car.png"} className="h-full w-full object-cover" alt="car" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-1">
                  <h3 className="font-bold text-base truncate">{item.make} {item.model}</h3>
                  <Badge className="bg-green-500/10 text-green-500 text-[9px] px-1 py-0 h-4">SUBMITTED</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{item.variant} • {item.year}</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-primary">
                  <Hash className="w-3 h-3"/> {item.registrationNumber}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px] border-y border-border/50 py-3 bg-muted/20 px-2 rounded-lg">
              <div className="flex items-center gap-1.5 text-muted-foreground"><Fuel className="w-3 h-3"/> {item.fuelType}</div>
              <div className="flex items-center gap-1.5 text-muted-foreground"><Settings2 className="w-3 h-3"/> {item.transmission}</div>
              <div className="flex items-center gap-1.5 text-muted-foreground"><Calendar className="w-3 h-3"/> {new Date(item.inspectionReport?.inspectionDate).toLocaleDateString()}</div>
              <div className="flex items-center gap-1.5 text-muted-foreground"><Gauge className="w-3 h-3"/> {item.inspectionReport?.odometerReading} KM</div>
            </div>

            <ReportDetailDialog item={item} setSelectedReport={setSelectedReport} selectedReport={selectedReport} isFullWidth />
          </div>
        )) : (
          <div className="text-center p-10 text-muted-foreground border rounded-xl border-dashed">No records found.</div>
        )}
      </div>
    </div>
  );
};

// --- COMPONENT: REPORT DETAIL DIALOG ---
const ReportDetailDialog = ({ item, setSelectedReport, selectedReport, isFullWidth = false }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 border-primary/50 text-primary hover:bg-primary hover:text-white transition-all ${isFullWidth ? 'w-full h-10' : ''}`}
          onClick={() => setSelectedReport(item)}
        >
          <Eye className="w-4 h-4" /> View Details
        </Button>
      </DialogTrigger>
      
      <DialogContent className="w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto border-primary/20 bg-background p-4 md:p-6 rounded-2xl">
        <DialogHeader className="border-b border-primary/10 pb-4 mb-4">
          <DialogTitle className="text-lg md:text-2xl font-bold flex items-center gap-3 text-primary">
            <FileText className="w-5 h-5 md:w-6 md:h-6" /> Inspection Report Detail
          </DialogTitle>
        </DialogHeader>

        {selectedReport && (
          <div className="space-y-6">
            {/* Top Summary Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <div className="md:col-span-2">
                <p className="text-[10px] uppercase tracking-widest text-primary/70 font-bold mb-1">Vehicle Details</p>
                <p className="font-extrabold text-lg md:text-xl">{selectedReport.make} {selectedReport.model}</p>
                <Badge className="bg-primary/20 text-primary border-none mt-1">{selectedReport.variant}</Badge>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary/70 font-bold mb-1">Reg. No</p>
                <p className="font-bold text-sm md:text-base">{selectedReport.registrationNumber}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary/70 font-bold mb-1">Odometer</p>
                <p className="font-bold text-primary text-sm md:text-base">{selectedReport.inspectionReport?.odometerReading} KM</p>
              </div>
              <div className="hidden md:block">
                  <p className="text-[10px] uppercase tracking-widest text-primary/70 font-bold mb-1">City</p>
                  <p className="font-bold text-sm md:text-base">{selectedReport.city}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Condition Scores */}
              <Card className="bg-white/5 border-primary/10 shadow-sm">
                <CardHeader className="p-4 bg-primary/5">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <CarFront className="w-4 h-4 text-blue-500"/> Condition Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  {[
                    { label: "Exterior", val: selectedReport.inspectionReport?.exteriorScore, col: "bg-blue-500" },
                    { label: "Interior", val: selectedReport.inspectionReport?.interiorScore, col: "bg-purple-500" },
                    { label: "Engine & Mechanical", val: selectedReport.inspectionReport?.engineMechanicalScore, col: "bg-orange-500" },
                    { label: "Tyres & Brakes", val: selectedReport.inspectionReport?.tyresBrakesScore, col: "bg-green-500" },
                  ].map((s) => (
                    <div key={s.label} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>{s.label}</span>
                        <span>{s.val}/10</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${s.col} transition-all duration-500`} style={{ width: `${(s.val || 0)*10}%` }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Technical Specs */}
              <Card className="bg-white/5 border-primary/10 shadow-sm">
                <CardHeader className="p-4 bg-secondary/5">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-amber-500"/> Full Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4 text-sm">
                  <div className="flex justify-between border-b border-primary/5 pb-2">
                    <span className="text-muted-foreground flex items-center gap-1"><Fuel className="w-3 h-3"/> Fuel Type</span>
                    <span className="font-bold">{selectedReport.fuelType}</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/5 pb-2">
                    <span className="text-muted-foreground flex items-center gap-1"><Settings2 className="w-3 h-3"/> Transmission</span>
                    <span className="font-bold">{selectedReport.transmission}</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/5 pb-2">
                    <span className="text-muted-foreground">Tyre Condition</span>
                    <span className="font-bold">{selectedReport.inspectionReport?.tyreCondition || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/5 pb-2">
                    <span className="text-muted-foreground">Accident History</span>
                    <Badge variant={selectedReport.inspectionReport?.accidentHistory === 'No' ? 'outline' : 'destructive'} className="font-bold text-[10px] h-5">
                      {selectedReport.inspectionReport?.accidentHistory || "N/A"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* inspection's Remarks */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
              <h4 className="text-sm font-bold flex items-center gap-2 mb-2 text-amber-600">
                <ShieldAlert className="w-4 h-4"/> inspection's Remarks
              </h4>
              <p className="text-sm text-foreground/80 font-medium italic">
                "{selectedReport.inspectionReport?.minorIssues || "No specific issues reported."}"
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CompletedInspections;
