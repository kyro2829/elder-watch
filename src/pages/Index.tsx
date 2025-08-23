import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Activity, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="mx-auto w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-8">
              <Heart className="w-12 h-12 text-primary-foreground" />
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Elder Watch
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive Health Monitoring System for the Elderly
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Keep your loved ones safe with real-time health tracking, 
                fall detection, and instant caregiver alerts.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link to="/login">
                <Button variant="elderly" size="elderly-xl" className="min-w-[200px]">
                  <Heart className="w-6 h-6 mr-3" />
                  I'm a Patient
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="elderly-secondary" size="elderly-xl" className="min-w-[200px]">
                  <Shield className="w-6 h-6 mr-3" />
                  I'm a Caregiver
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How Elder Watch Helps
            </h2>
            <p className="text-xl text-muted-foreground">
              Advanced health monitoring made simple and accessible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Heart Rate Monitoring */}
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Heart Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Continuous heart rate monitoring with automatic alerts for irregular patterns
                </p>
              </CardContent>
            </Card>

            {/* Activity Tracking */}
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Activity Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track daily steps, movement patterns, and physical activity levels
                </p>
              </CardContent>
            </Card>

            {/* Sleep Monitoring */}
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Sleep Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor sleep duration and quality for better health insights
                </p>
              </CardContent>
            </Card>

            {/* Fall Detection */}
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-destructive" />
                </div>
                <CardTitle className="text-xl">Fall Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Instant notifications to caregivers when falls are detected
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Roles Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Two User Types, One Goal
            </h2>
            <p className="text-xl text-muted-foreground">
              Designed for both patients and their caregivers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Patient Features */}
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">For Patients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <p className="text-lg text-muted-foreground mb-6">
                    Simple, easy-to-use interface designed for seniors
                  </p>
                  
                  <ul className="text-left space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      View your own health data clearly
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Large, readable text and buttons
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Emergency contact with caregivers
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Weekly health summaries
                    </li>
                  </ul>

                  <Link to="/login" className="block pt-4">
                    <Button variant="elderly" size="elderly" className="w-full">
                      Patient Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Caregiver Features */}
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">For Caregivers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <p className="text-lg text-muted-foreground mb-6">
                    Comprehensive monitoring and management tools
                  </p>
                  
                  <ul className="text-left space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Monitor multiple patients
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Receive instant health alerts
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Create and manage patient accounts
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Generate daily health reports
                    </li>
                  </ul>

                  <Link to="/login" className="block pt-4">
                    <Button variant="elderly" size="elderly" className="w-full">
                      Caregiver Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8" />
            <span className="text-2xl font-bold">Elder Watch</span>
          </div>
          <p className="text-lg opacity-90">
            Keeping families connected through health monitoring
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
