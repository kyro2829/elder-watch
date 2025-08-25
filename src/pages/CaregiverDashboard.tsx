import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HealthCard } from "@/components/HealthCard";
import { HealthChart } from "@/components/HealthChart";
import { AlertDetailsModal } from "@/components/AlertDetailsModal";
import { AddPatientModal } from "@/components/AddPatientModal";
import { 
  Heart, 
  Activity, 
  Moon, 
  Footprints, 
  AlertTriangle, 
  Users, 
  Plus,
  Bell,
  User
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { useHealthData } from "@/hooks/useHealthData";

// Mock data - will be replaced with Supabase data
const mockPatients = [
  {
    id: "1",
    name: "Maria Santos",
    lastUpdate: "2 minutes ago",
    status: "normal" as const,
    heartRate: 72,
    steps: 3420,
    sleep: 7.5,
    fallDetected: false
  },
  {
    id: "2", 
    name: "Juan Dela Cruz",
    lastUpdate: "15 minutes ago",
    status: "warning" as const,
    heartRate: 95,
    steps: 1200,
    sleep: 4.2,
    fallDetected: false
  }
];

const mockAlerts = [
  {
    id: "1",
    patientName: "Juan Dela Cruz",
    type: "High Heart Rate",
    description: "Heart rate elevated to 95 BPM",
    time: "10 minutes ago",
    severity: "warning" as const
  },
  {
    id: "2",
    patientName: "Maria Santos", 
    type: "Low Sleep",
    description: "Only 4.2 hours of sleep detected",
    time: "2 hours ago",
    severity: "warning" as const
  }
];

export default function CaregiverDashboard() {
  const [patients, setPatients] = useState(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
  const [selectedAlert, setSelectedAlert] = useState<typeof mockAlerts[0] | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { healthData } = useHealthData(selectedPatient.id);

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

  const handleViewAlert = (alert: typeof mockAlerts[0]) => {
    setSelectedAlert(alert);
    setShowAlertModal(true);
  };

  const handleAddPatient = (newPatient: any) => {
    setPatients([...patients, newPatient]);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Caregiver Dashboard
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground">
              Monitor your patients' health status
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <Button 
              variant="elderly" 
              size="sm" 
              className="sm:size-elderly"
              onClick={() => setShowAddPatientModal(true)}
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Add Patient</span>
              <span className="sm:hidden">Add</span>
            </Button>
            <Button variant="outline" size="sm" className="sm:size-elderly">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Alerts ({mockAlerts.length})</span>
              <span className="sm:hidden">Alerts ({mockAlerts.length})</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="sm:size-elderly"
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

        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="w-6 h-6" />
              Your Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPatient.id === patient.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-secondary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{patient.name}</h3>
                        <p className="text-muted-foreground">
                          Last update: {patient.lastUpdate}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      patient.status === "normal" 
                        ? "bg-success/20 text-success" 
                        : "bg-warning/20 text-warning"
                    }`}>
                      {patient.status === "normal" ? "Normal" : "Needs Attention"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Patient Health Data */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {selectedPatient.name}'s Health Data
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <HealthCard
              title="Heart Rate"
              value={selectedPatient.heartRate}
              unit="BPM"
              icon={<Heart className="w-8 h-8" />}
              status={selectedPatient.heartRate > 90 ? "warning" : "normal"}
            />
            
            <HealthCard
              title="Steps Today"
              value={selectedPatient.steps.toLocaleString()}
              unit="steps"
              icon={<Footprints className="w-8 h-8" />}
              status={selectedPatient.steps < 2000 ? "warning" : "normal"}
            />
            
            <HealthCard
              title="Sleep Duration"
              value={selectedPatient.sleep}
              unit="hours"
              icon={<Moon className="w-8 h-8" />}
              status={selectedPatient.sleep < 6 ? "warning" : "normal"}
            />
            
            <HealthCard
              title="Fall Detection"
              value={selectedPatient.fallDetected ? "Detected" : "None"}
              icon={<AlertTriangle className="w-8 h-8" />}
              status={selectedPatient.fallDetected ? "danger" : "normal"}
            />
          </div>

          {/* Patient Health Charts */}
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
        </div>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 bg-warning/5 border border-warning/20 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {alert.patientName} - {alert.type}
                      </h4>
                      <p className="text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{alert.time}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => handleViewAlert(alert)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <AlertDetailsModal
          alert={selectedAlert}
          open={showAlertModal}
          onOpenChange={setShowAlertModal}
        />

        <AddPatientModal
          open={showAddPatientModal}
          onOpenChange={setShowAddPatientModal}
          onAddPatient={handleAddPatient}
        />
      </div>
    </div>
  );
}