import { TAnomaly } from "@features/Survey/api/dto/anomaly";
import { create } from "zustand";

type State = {
    anomaly: TAnomaly[];
};
type Action = {
    handleAnomaly: (state: TAnomaly[]) => void;
};

export const useAnomalyStore = create<State & Action>((set) => ({
    anomaly: [],
    handleAnomaly: (value: TAnomaly[]) => set(() => ({ anomaly: value })),
}));
