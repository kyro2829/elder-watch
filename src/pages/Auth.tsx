import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Heart, Shield, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<"patient" | "caregiver">("patient");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login & Register | Elder Watch";

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // Redirect to appropriate dashboard based on role
        navigate(role === "patient" ? "/patient" : "/caregiver", { replace: true });
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Redirect to appropriate dashboard based on role
        navigate(role === "patient" ? "/patient" : "/caregiver", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, role]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!", description: "Signed in successfully." });
      navigate(role === "patient" ? "/patient" : "/caregiver", { replace: true });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl }
    });
    setLoading(false);
    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Check your email",
        description: "We sent you a confirmation link. After confirming, come back and sign in.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Elder Watch</h1>
          <p className="text-lg text-muted-foreground">Login or Create an Account</p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold">
              {mode === "signin" ? "Welcome Back" : "Create your account"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={mode === "signin" ? handleSignIn : handleSignUp} className="space-y-6">
              {/* Role Selection (for redirect only for now) */}
              <div className="space-y-3">
                <Label className="text-base font-medium">I am a:</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant={role === "patient" ? "elderly" : "outline"} onClick={() => setRole("patient")}> 
                    <Heart className="w-5 h-5 mr-2" /> Patient
                  </Button>
                  <Button type="button" variant={role === "caregiver" ? "elderly" : "outline"} onClick={() => setRole("caregiver")}> 
                    <Shield className="w-5 h-5 mr-2" /> Caregiver
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 text-lg" placeholder="Enter your email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 text-lg" placeholder="Enter your password" required />
              </div>

              <Button type="submit" variant="elderly" size="elderly" className="w-full" disabled={loading}>
                {mode === "signin" ? <><LogIn className="w-5 h-5 mr-2" /> Sign In</> : <><UserPlus className="w-5 h-5 mr-2" /> Create Account</>}
              </Button>
            </form>

            <div className="text-center pt-2">
              {mode === "signin" ? (
                <button className="text-primary underline" onClick={() => setMode("signup")}>No account? Register</button>
              ) : (
                <button className="text-primary underline" onClick={() => setMode("signin")}>Already have an account? Sign in</button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
