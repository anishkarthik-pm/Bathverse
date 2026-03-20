import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lead, Job, SKU } from "@/types";

interface QuoteEstimate {
  size?: "small" | "medium" | "large";
  scope: string[];
  style?: string;
  budget: number;
  estimateMin?: number;
  estimateMax?: number;
}

interface AppStore {
  // Auth
  user: { id: string; name: string; phone: string; role: "customer" | "ops_admin" | "ops_viewer" } | null;
  token: string | null;
  setUser: (user: AppStore["user"], token: string) => void;
  logout: () => void;

  // Quote flow
  quoteEstimate: QuoteEstimate;
  setQuoteEstimate: (data: Partial<QuoteEstimate>) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (skuId: string) => void;

  // Ops filters
  opsLeadFilters: { status?: string; source?: string; assigned?: string };
  setOpsLeadFilters: (filters: AppStore["opsLeadFilters"]) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),

      quoteEstimate: { scope: [], budget: 200000 },
      setQuoteEstimate: (data) =>
        set((state) => ({ quoteEstimate: { ...state.quoteEstimate, ...data } })),

      wishlist: [],
      toggleWishlist: (skuId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(skuId)
            ? state.wishlist.filter((id) => id !== skuId)
            : [...state.wishlist, skuId],
        })),

      opsLeadFilters: {},
      setOpsLeadFilters: (filters) => set({ opsLeadFilters: filters }),
    }),
    { name: "bathiq-store" }
  )
);
