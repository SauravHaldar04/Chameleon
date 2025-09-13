import { useEffect, useRef } from 'react';

interface UseAutosaveOptions {
  data: any;
  onSave: (data: any) => void | Promise<void>;
  delay?: number; // Delay in milliseconds before saving
  enabled?: boolean;
}

export const useAutosave = ({ 
  data, 
  onSave, 
  delay = 2000, 
  enabled = true 
}: UseAutosaveOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedData = useRef(data);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Check if data has actually changed
    const hasChanged = JSON.stringify(data) !== JSON.stringify(lastSavedData.current);
    
    if (!hasChanged) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for autosave
    timeoutRef.current = setTimeout(async () => {
      if (!isMountedRef.current) return;
      
      try {
        await onSave(data);
        lastSavedData.current = data;
        console.log('Autosave completed at:', new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Autosave failed:', error);
      }
    }, delay);

    // Cleanup timeout on unmount or dependency change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, onSave, delay, enabled]);

  // Manual save function
  const saveNow = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    try {
      await onSave(data);
      lastSavedData.current = data;
      console.log('Manual save completed at:', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Manual save failed:', error);
    }
  };

  return { saveNow };
};
