import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Heart, Clock, User } from "lucide-react";

interface Alert {
  id: string;
  patientName: string;
  type: string;
  description: string;
  time: string;
  severity: 'warning' | 'danger';
}

interface AlertDetailsModalProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AlertDetailsModal({ alert, open, onOpenChange }: AlertDetailsModalProps) {
  if (!alert) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'danger':
        return 'destructive';
      case 'warning':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <AlertTriangle className="w-6 h-6 text-warning" />
            Alert Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Patient</p>
                <p className="text-lg font-semibold">{alert.patientName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Alert Type</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">{alert.type}</p>
                  <Badge variant={getSeverityColor(alert.severity) === 'warning' ? 'destructive' : getSeverityColor(alert.severity) as "destructive" | "secondary"}>
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="text-lg font-semibold">{alert.time}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
            <p className="text-foreground">{alert.description}</p>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              Contact Patient
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Mark as Reviewed
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}