import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BusClass, Show } from "@/data/catalog";
import type { Pace } from "@/lib/plan";

export type Draft = {
  showId: string;
  cityId: string;
  party: number;
  busClass: BusClass;
  pace: Pace;
  nights: number | null;
  lodgingId: string;
  food: boolean;
  merch: number;
  transfers: boolean;
  roundTrip: boolean;
  fareOverride: number | null;
  ticketOverride: number | null;
  lodgingOverride: number | null;
  label: string;
};

export type SavedPlan = {
  id: string;
  savedAt: number;
  draft: Draft;
};

type HierroState = {
  draft: Draft;
  customShows: Show[];
  saved: SavedPlan[];
  setDraft: (patch: Partial<Draft>) => void;
  addShow: (show: Show) => void;
  removeShow: (id: string) => void;
  save: () => void;
  removeSaved: (id: string) => void;
  load: (draft: Draft) => void;
};

export const initialDraft: Draft = {
  showId: "malon",
  cityId: "amba",
  party: 2,
  busClass: "cama",
  pace: "ajustado",
  nights: null,
  lodgingId: "nc",
  food: true,
  merch: 0,
  transfers: true,
  roundTrip: true,
  fareOverride: null,
  ticketOverride: null,
  lodgingOverride: null,
  label: "",
};

function clampDraft(draft: Draft): Draft {
  return {
    ...draft,
    party: Math.min(8, Math.max(1, Math.round(draft.party) || 1)),
    nights: draft.nights === null ? null : Math.min(7, Math.max(0, Math.round(draft.nights))),
    merch: Math.max(0, Math.round(draft.merch) || 0),
  };
}

export const useHierro = create<HierroState>()(
  persist(
    (set, get) => ({
      draft: initialDraft,
      customShows: [],
      saved: [],
      setDraft: (patch) =>
        set((state) => {
          const next: Draft = { ...state.draft, ...patch };
          if (
            patch.cityId &&
            patch.cityId !== state.draft.cityId &&
            patch.fareOverride === undefined
          ) {
            next.fareOverride = null;
            if (patch.nights === undefined) next.nights = null;
          }
          if (
            patch.showId &&
            patch.showId !== state.draft.showId &&
            patch.ticketOverride === undefined
          ) {
            next.ticketOverride = null;
            if (patch.nights === undefined) next.nights = null;
          }
          if (patch.pace && patch.pace !== state.draft.pace && patch.nights === undefined) {
            next.nights = null;
          }
          if (
            patch.lodgingId &&
            patch.lodgingId !== state.draft.lodgingId &&
            patch.lodgingOverride === undefined
          ) {
            next.lodgingOverride = null;
          }
          return { draft: clampDraft(next) };
        }),
      addShow: (show) => set((state) => ({ customShows: [...state.customShows, show] })),
      removeShow: (id) =>
        set((state) => ({
          customShows: state.customShows.filter((s) => s.id !== id),
          draft: state.draft.showId === id ? { ...state.draft, showId: "malon" } : state.draft,
        })),
      save: () => {
        const draft = get().draft;
        const item: SavedPlan = {
          id: crypto.randomUUID(),
          savedAt: Date.now(),
          draft: { ...draft },
        };
        set((state) => ({ saved: [item, ...state.saved].slice(0, 8) }));
      },
      removeSaved: (id) => set((state) => ({ saved: state.saved.filter((s) => s.id !== id) })),
      load: (draft) => set({ draft: clampDraft(draft) }),
    }),
    {
      name: "hierro-v1",
      skipHydration: true,
      partialize: (state) => ({
        draft: state.draft,
        customShows: state.customShows,
        saved: state.saved,
      }),
    },
  ),
);
