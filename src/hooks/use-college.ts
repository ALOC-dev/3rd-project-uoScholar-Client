import { useCallback, useState, useEffect } from "react";
import { College } from "../types/college";
import { useCollegeStore } from "../store/use-college-store";

export interface UseCollegeOptions {
  initialSelected?: College[];
}

export interface UseCollegeResult {
  selectedColleges: Set<College>;
  toggleCollege: (college: College) => void;
}

export function useCollege(options?: UseCollegeOptions): UseCollegeResult {
  const { initialSelected = [] } = options || {};

  const { selectedCollegeCodes, toggleCollege: toggleInStore, setSelectedCollegeCodes } = useCollegeStore();

  // On first mount, if store empty and initialSelected provided, seed the store
  useEffect(() => {
    if (selectedCollegeCodes.length === 0 && initialSelected.length > 0) {
      setSelectedCollegeCodes(initialSelected);
    }
  }, [selectedCollegeCodes.length, initialSelected.length]);

  const [selectedColleges, setSelectedColleges] = useState<Set<College>>(
    () => new Set(selectedCollegeCodes)
  );

  // keep local Set in sync with store changes
  useEffect(() => {
    setSelectedColleges(new Set(selectedCollegeCodes));
  }, [selectedCollegeCodes]);

  const toggleCollege = useCallback((college: College) => {
    toggleInStore(college);
  }, [toggleInStore]);

  return { selectedColleges, toggleCollege };
}

export default useCollege;
