import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HealthData {
  id: string;
  user_id: string;
  heart_rate: number | null;
  steps: number | null;
  sleep_duration: number | null;
  fall_detected: boolean;
  created_at: string;
}

// Mock data for demonstration
const mockHealthData: HealthData[] = [
  {
    id: '1',
    user_id: '1',
    heart_rate: 72,
    steps: 3420,
    sleep_duration: 7.5,
    fall_detected: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: '1',
    heart_rate: 75,
    steps: 2800,
    sleep_duration: 6.8,
    fall_detected: false,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    user_id: '1',
    heart_rate: 69,
    steps: 3600,
    sleep_duration: 7.5,
    fall_detected: false,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    user_id: '1',
    heart_rate: 73,
    steps: 3420,
    sleep_duration: 7.8,
    fall_detected: false,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    user_id: '1',
    heart_rate: 68,
    steps: 4100,
    sleep_duration: 8.1,
    fall_detected: false,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    user_id: '1',
    heart_rate: 74,
    steps: 2900,
    sleep_duration: 7.0,
    fall_detected: false,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    user_id: '1',
    heart_rate: 71,
    steps: 3200,
    sleep_duration: 7.2,
    fall_detected: false,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export function useHealthData(userId?: string) {
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [currentData, setCurrentData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHealthData() {
      try {
        // For now, use mock data until the database tables are ready
        setHealthData(mockHealthData);
        setCurrentData(mockHealthData[0]);
      } catch (error) {
        console.error('Error in fetchHealthData:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHealthData();
  }, [userId]);

  return { healthData, currentData, loading };
}