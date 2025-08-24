import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ElderlyButton } from "@/components/ElderlyButton";
import { Heart, Shield } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"caregiver" | "patient">("patient");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Elder Watch
          </h1>
          <p className="text-lg text-muted-foreground">
            Health Monitoring System
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold">
              Welcome Back
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">I am a:</Label>
                <div className="grid grid-cols-2 gap-3">
                  <ElderlyButton
                    type="button"
                    variant={role === "patient" ? "primary" : "secondary"}
                    size="default" 
                    onClick={() => setRole("patient")}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Patient
                  </ElderlyButton>
                  <ElderlyButton
                    type="button"
                    variant={role === "caregiver" ? "primary" : "secondary"}
                    size="default"
                    onClick={() => setRole("caregiver")}
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Caregiver
                  </ElderlyButton>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-lg"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-lg"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Login Button */}
              <ElderlyButton
                type="submit"
                variant="primary"
                size="large"
                className="w-full"
              >
                Go to Auth
              </ElderlyButton>
            </form>

            {/* Info Text */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {role === "patient" 
                  ? "Account created by your caregiver"
                  : "Contact support if you need help"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}