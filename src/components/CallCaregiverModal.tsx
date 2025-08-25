import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, AlertTriangle } from "lucide-react";

interface CallCaregiverModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CallCaregiverModal({ open, onOpenChange }: CallCaregiverModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <AlertTriangle className="w-6 h-6 text-destructive" />
            Contact Caregiver
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-4">
              Your caregiver will be notified immediately
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full h-16 text-lg" 
              size="lg"
              onClick={() => {
                // In a real app, this would make a phone call
                window.open('tel:+1234567890');
                onOpenChange(false);
              }}
            >
              <Phone className="w-6 h-6 mr-3" />
              Call Emergency Contact
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-16 text-lg"
              size="lg"
              onClick={() => {
                // In a real app, this would send an SMS
                window.open('sms:+1234567890?body=I need assistance - sent from Elder Watch');
                onOpenChange(false);
              }}
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              Send Emergency Message
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Emergency Contact: Dr. Smith</p>
            <p>Phone: +1 (234) 567-8900</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}