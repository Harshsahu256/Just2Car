



// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Car, MapPin, Calendar, ClipboardList } from "lucide-react";
// import { getinspectionTasks } from "@/services/inspectionService.js";
// import { useNavigate } from "react-router-dom";

// const inspectionTasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     const res = await getinspectionTasks();
//     if (res.success) setTasks(res.data);
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Assigned Tasks</h2>
//       <div className="grid gap-4">
//         {tasks.length > 0 ? tasks.map((task: any) => (
//           <Card key={task._id} className="glass-card border-border/50">
//             <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-4">
//               <div className="flex gap-4">
//                 <img src={task.images?.[0]} className="h-20 w-28 object-cover rounded-lg" alt="car" />
//                 <div>
//                   <h3 className="font-bold text-lg">{task.make} {task.model}</h3>
//                   <p className="text-sm text-muted-foreground">{task.variant} ({task.year})</p>
//                   <div className="flex gap-3 mt-2 text-xs opacity-70">
//                     <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {task.city}</span>
//                     <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {new Date(task.scheduledDate).toLocaleDateString()}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col items-end justify-between">
//                 <Badge>Assigned</Badge>
//                 <Button size="sm" onClick={() => navigate(`/inspection/submit-report/${task._id}`)}>
//                   Start Inspection
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )) : (
//           <div className="text-center py-20 text-muted-foreground">No tasks assigned yet.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default inspectionTasks;
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { getinspectionTasks } from "@/services/inspectionService.js";
import { useNavigate } from "react-router-dom";

const InspectionTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await getinspectionTasks();
    if (res?.success) setTasks(res.data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Assigned Tasks</h2>

      <div className="grid gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Card key={task._id} className="glass-card border-border/50">
              <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-4">
                
                <div className="flex gap-4">
                  <img
                    src={task.images?.[0]}
                    className="h-20 w-28 object-cover rounded-lg"
                    alt="car"
                  />

                  <div>
                    <h3 className="font-bold text-lg">
                      {task.make} {task.model}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {task.variant} ({task.year})
                    </p>

                    <div className="flex gap-3 mt-2 text-xs opacity-70">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {task.city}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(task.scheduledDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <Badge>Assigned</Badge>

                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(`/inspection/submit-report/${task._id}`)
                    }
                  >
                    Start Inspection
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No tasks assigned yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectionTasks;
