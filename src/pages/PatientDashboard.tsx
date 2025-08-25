import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HealthCard } from "@/components/HealthCard";
import { HealthChart } from "@/components/HealthChart";
import { CallCaregiverModal } from "@/components/CallCaregiverModal";
import { 
  Heart, 
  Moon, 
  Footprints, 
  AlertTriangle, 
  Calendar,
  TrendingUp,
  User,
  Activity
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { useHealthData } from "@/hooks/useHealthData";

// Mock data - will be replaced with Supabase data
const mockPatientData = {
  name: "Maria Santos",
  heartRate: 72,
  steps: 3420,
  sleep: 7.5,
  fallDetected: false,
  lastSync: "2 minutes ago"
};

const mockWeeklyData = [
  { day: "Mon", steps: 3200, sleep: 7.2, heartRate: 70 },
  { day: "Tue", steps: 2800, sleep: 6.8, heartRate: 73 },
  { day: "Wed", steps: 3600, sleep: 7.5, heartRate: 69 },
  { day: "Thu", steps: 3420, sleep: 7.8, heartRate: 72 },
  { day: "Fri", steps: 4100, sleep: 8.1, heartRate: 68 },
  { day: "Sat", steps: 2900, sleep: 7.0, heartRate: 74 },
  { day: "Sun", steps: 3420, sleep: 7.5, heartRate: 72 }
];

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { profile, loading: profileLoading } = useProfile();
  const { healthData, currentData, loading: healthLoading } = useHealthData();
  const [showCallModal, setShowCallModal] = useState(false);

  // Process health data for charts
  const processChartData = (dataType: 'heart_rate' | 'sleep_duration') => {
    const lastSevenDays = healthData.slice(0, 7).reverse();
    return lastSevenDays.map((item, index) => {
      const date = new Date(item.created_at);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return {
        day: dayNames[date.getDay()],
        value: item[dataType] || 0,
        date: item.created_at
      };
    });
  };

  const heartRateData = processChartData('heart_rate');
  const sleepData = processChartData('sleep_duration');

  if (profileLoading || healthLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome, {profile?.display_name || 'Patient'}
            </h1>
            <p className="text-xl text-muted-foreground">
              Your health monitoring dashboard
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Last sync</p>
            <p className="text-lg font-semibold text-foreground">
              {currentData ? new Date(currentData.created_at).toLocaleString() : 'No data'}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={async () => {
                await supabase.auth.signOut();
                toast({ title: "Signed out" });
                navigate("/auth", { replace: true });
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Current Health Status */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Activity className="w-7 h-7" />
            Today's Health Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HealthCard
              title="Heart Rate"
              value={currentData?.heart_rate || 0}
              unit="BPM"
              icon={<Heart className="w-8 h-8" />}
              status={currentData?.heart_rate && currentData.heart_rate > 90 ? "warning" : "normal"}
            />
            
            <HealthCard
              title="Steps Today"
              value={currentData?.steps?.toLocaleString() || "0"}
              unit="steps"
              icon={<Footprints className="w-8 h-8" />}
              status={currentData?.steps && currentData.steps < 2000 ? "warning" : "normal"}
            />
            
            <HealthCard
              title="Sleep Duration"
              value={currentData?.sleep_duration || 0}
              unit="hours"
              icon={<Moon className="w-8 h-8" />}
              status={currentData?.sleep_duration && currentData.sleep_duration < 6 ? "warning" : "normal"}
            />
            
            <HealthCard
              title="Fall Status"
              value={currentData?.fall_detected ? "Detected" : "No Falls"}
              icon={<AlertTriangle className="w-8 h-8" />}
              status={currentData?.fall_detected ? "danger" : "normal"}
            />
          </div>
        </div>

        {/* Weekly Overview - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HealthChart
            title="Heart Rate Trend"
            data={heartRateData}
            color="hsl(var(--destructive))"
            unit="BPM"
            icon={<Heart className="w-5 h-5" />}
          />
          
          <HealthChart
            title="Sleep Duration Trend"
            data={sleepData}
            color="hsl(var(--primary))"
            unit="hours"
            icon={<Moon className="w-5 h-5" />}
          />
        </div>

        {/* Health Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Health Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Steps Goal */}
              <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                <Footprints className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Daily Steps</h3>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {currentData?.steps?.toLocaleString() || '0'}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  Goal: 5,000 steps
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(((currentData?.steps || 0) / 5000) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-sm text-primary font-medium mt-2">
                  {Math.round(((currentData?.steps || 0) / 5000) * 100)}% Complete
                </div>
              </div>

              {/* Sleep Goal */}
              <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                <Moon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sleep Duration</h3>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {currentData?.sleep_duration || 0}h
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  Goal: 8 hours
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(((currentData?.sleep_duration || 0) / 8) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-sm text-primary font-medium mt-2">
                  {Math.round(((currentData?.sleep_duration || 0) / 8) * 100)}% Complete
                </div>
              </div>

              {/* Heart Rate Status */}
              <div className="text-center p-6 bg-success/5 rounded-lg border border-success/20">
                <Heart className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Heart Rate</h3>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {currentData?.heart_rate || 0}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  BPM (Normal Range)
                </div>
                <div className="inline-flex items-center px-3 py-1 bg-success/20 text-success rounded-full text-sm font-medium">
                  Healthy Range
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Emergency Contact
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              If you feel unwell or need assistance, contact your caregiver immediately
            </p>
            <Button 
              variant="elderly" 
              size="elderly-xl" 
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => setShowCallModal(true)}
            >
              Call Caregiver
            </Button>
            
            <CallCaregiverModal 
              open={showCallModal} 
              onOpenChange={setShowCallModal} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}