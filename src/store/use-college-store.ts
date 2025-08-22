import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { College } from '../types/college';
import { useState, useEffect } from 'react';

export interface CollegeState {
  selectedCollegeCodes: College[];
  toggleCollege: (code: College) => void;
  setSelectedCollegeCodes: (codes: College[]) => void;
  clear: () => void;
  // hydrate flag exposed via separate hook below
}

export const useCollegeStore = create<CollegeState>()(
  persist(
    (set, get) => ({
      selectedCollegeCodes: [],
      toggleCollege: (code: College) => {
        const current = get().selectedCollegeCodes;
        const exists = current.includes(code);
        const next = exists ? current.filter(c => c !== code) : [...current, code];
        set({ selectedCollegeCodes: next });
      },
      setSelectedCollegeCodes: (codes: College[]) => set({ selectedCollegeCodes: [...codes] }),
      clear: () => set({ selectedCollegeCodes: [] }),
    }),
    {
      name: 'college-store',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);

// hydration-aware selector hook
export const useCollegeHydration = () => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useCollegeStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    // 이미 hydrated된 상태라면 즉시 true로 설정
    if (useCollegeStore.persist.hasHydrated()) {
      setHasHydrated(true);
    }

    return unsubscribe;
  }, []);

  return { hasHydrated };
};


