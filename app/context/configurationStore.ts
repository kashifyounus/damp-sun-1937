import { create } from "zustand";

interface ConfigState {
  WP_API_URL: string;
  SiteTitle: string;
  setConfig: (config: Partial<ConfigState>) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  WP_API_URL: "",
  SiteTitle: "Gamca Token Online",
  setConfig: (config) => set((state) => ({ ...state, ...config })),
}));

// create interference for wordpress headless cms
interface WPState {
  posts: any[];
  countries: any[];
  countryNames: string[];
  medicalCenters: any[];
  medicalCenterNames: string[];
  pages: any[];
  setPosts: (posts: any[]) => void;
  setCountries: (countries: any[]) => void;
  setMedicalCenters: (medicalCenters: any[]) => void;
  setCountryNames: (countryNames: string[]) => void;
  setMedicalCenterNames: (medicalCenterNames: string[]) => void;
  setPages: (pages: any[]) => void;
}
// create a store for wordpress headless cms
export const useWPStore = create<WPState>((set) => ({
  posts: [],
  countries: [],
  countryNames: [],
  medicalCenters: [],
  medicalCenterNames: [],
  pages: [],
  setPages: (pages) => set({ pages }),
  setPosts: (posts) => set({ posts }),
  setCountries: (countries) => set({ countries }),
  setMedicalCenters: (medicalCenters) => set({ medicalCenters }),
  setCountryNames: (countryNames) => set({ countryNames }),
  setMedicalCenterNames: (medicalCenterNames) => set({ medicalCenterNames }),
}));
