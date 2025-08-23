import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HealthCard } from "@/components/HealthCard";
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
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome, {mockPatientData.name}
            </h1>
            <p className="text-xl text-muted-foreground">
              Your health monitoring dashboard
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Last sync</p>
            <p className="text-lg font-semibold text-foreground">
              {mockPatientData.lastSync}
            </p>
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
              value={mockPatientData.heartRate}
              unit="BPM"
              icon={<Heart className="w-8 h-8" />}
              status="normal"
            />
            
            <HealthCard
              title="Steps Today"
              value={mockPatientData.steps.toLocaleString()}
              unit="steps"
              icon={<Footprints className="w-8 h-8" />}
              status="normal"
            />
            
            <HealthCard
              title="Sleep Duration"
              value={mockPatientData.sleep}
              unit="hours"
              icon={<Moon className="w-8 h-8" />}
              status="normal"
            />
            
            <HealthCard
              title="Fall Status"
              value="No Falls"
              icon={<AlertTriangle className="w-8 h-8" />}
              status="normal"
            />
          </div>
        </div>

        {/* Weekly Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              This Week's Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {/* Steps Chart Placeholder */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Footprints className="w-5 h-5" />
                  Daily Steps
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {mockWeeklyData.map((day, index) => (
                    <div key={index} className="text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {day.day}
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        {day.steps.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">steps</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sleep Chart Placeholder */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Moon className="w-5 h-5" />
                  Sleep Hours
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {mockWeeklyData.map((day, index) => (
                    <div key={index} className="text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {day.day}
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        {day.sleep}
                      </div>
                      <div className="text-xs text-muted-foreground">hours</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  {mockPatientData.steps.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  Goal: 5,000 steps
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((mockPatientData.steps / 5000) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-sm text-primary font-medium mt-2">
                  {Math.round((mockPatientData.steps / 5000) * 100)}% Complete
                </div>
              </div>

              {/* Sleep Goal */}
              <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                <Moon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sleep Duration</h3>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {mockPatientData.sleep}h
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  Goal: 8 hours
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((mockPatientData.sleep / 8) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-sm text-primary font-medium mt-2">
                  {Math.round((mockPatientData.sleep / 8) * 100)}% Complete
                </div>
              </div>

              {/* Heart Rate Status */}
              <div className="text-center p-6 bg-success/5 rounded-lg border border-success/20">
                <Heart className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Heart Rate</h3>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {mockPatientData.heartRate}
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
            <Button variant="elderly" size="elderly-xl" className="bg-destructive hover:bg-destructive/90">
              Call Caregiver
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}