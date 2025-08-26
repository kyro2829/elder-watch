-- Create user profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name text NOT NULL,
  role text CHECK (role IN ('patient', 'caregiver')) NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Caregivers can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'caregiver'
  )
);

CREATE POLICY "Caregivers can create patient profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'caregiver'
  )
  AND NEW.role = 'patient'
);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create health_data table
CREATE TABLE public.health_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  heart_rate integer,
  steps integer,
  sleep_duration numeric(4,2),
  fall_detected boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS for health_data
ALTER TABLE public.health_data ENABLE ROW LEVEL SECURITY;

-- Create policies for health_data
CREATE POLICY "Users can view their own health data" 
ON public.health_data 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Caregivers can view all health data" 
ON public.health_data 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'caregiver'
  )
);

CREATE POLICY "System can insert health data" 
ON public.health_data 
FOR INSERT 
WITH CHECK (true);

-- Create caregiver_patients table to link caregivers with their patients
CREATE TABLE public.caregiver_patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  patient_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(caregiver_id, patient_id)
);

-- Enable RLS for caregiver_patients
ALTER TABLE public.caregiver_patients ENABLE ROW LEVEL SECURITY;

-- Create policies for caregiver_patients
CREATE POLICY "Caregivers can manage their patient relationships" 
ON public.caregiver_patients 
FOR ALL 
USING (auth.uid() = caregiver_id)
WITH CHECK (auth.uid() = caregiver_id);

-- Function to handle new user creation (profiles)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Only create profile for users with metadata role
  IF NEW.raw_user_meta_data->>'role' IS NOT NULL THEN
    INSERT INTO public.profiles (user_id, display_name, role, created_by)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
      NEW.raw_user_meta_data->>'role',
      CASE 
        WHEN NEW.raw_user_meta_data->>'created_by' IS NOT NULL 
        THEN (NEW.raw_user_meta_data->>'created_by')::uuid
        ELSE NEW.id
      END
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;   
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();