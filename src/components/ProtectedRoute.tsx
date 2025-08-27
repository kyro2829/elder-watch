import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'caregiver' | 'patient';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsAuthed(!!session);
      
      if (session) {
        // Get user profile to determine role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        setUserRole(profile?.role || null);
      } else {
        setUserRole(null);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setIsAuthed(!!session);
      
      if (session) {
        // Get user profile to determine role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        setUserRole(profile?.role || null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;
  
  if (!isAuthed) return <Navigate to="/auth" replace />;
  
  // If a specific role is required and user doesn't have it, redirect appropriately
  if (requiredRole && userRole !== requiredRole) {
    if (userRole === 'caregiver') {
      return <Navigate to="/caregiver" replace />;
    } else if (userRole === 'patient') {
      return <Navigate to="/patient" replace />;
    }
    // If no role found, redirect to auth
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
