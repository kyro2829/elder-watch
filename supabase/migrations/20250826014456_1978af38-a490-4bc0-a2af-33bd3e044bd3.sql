-- Core tables for caregiver-managed patient accounts

-- 1) Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  role text NOT NULL CHECK (role IN ('patient','caregiver')),
  phone text,
  emergency_contact text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Helper to check caregiver role without recursive RLS
CREATE OR REPLACE FUNCTION public.is_caregiver(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = _user_id AND p.role = 'caregiver'
  );
$$;

-- Policies
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "profiles_select_caregivers_all" ON public.profiles;
CREATE POLICY "profiles_select_caregivers_all" ON public.profiles
FOR SELECT TO authenticated
USING (public.is_caregiver(auth.uid()));

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

-- 2) Link caregivers to their patients
CREATE TABLE IF NOT EXISTS public.caregiver_patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  patient_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (caregiver_id, patient_id)
);

ALTER TABLE public.caregiver_patients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "caregiver_patients_manage_own" ON public.caregiver_patients;
CREATE POLICY "caregiver_patients_manage_own" ON public.caregiver_patients
FOR ALL TO authenticated
USING (auth.uid() = caregiver_id)
WITH CHECK (auth.uid() = caregiver_id);

-- Timestamp trigger for profiles
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();