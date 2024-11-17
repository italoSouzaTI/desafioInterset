import { IInternalInspectionAreaDTO } from "@features/Survey/api/dto/internalInspectionAreaDTO";
import { TTypeAnomaly } from "@features/Survey/api/dto/typeAnomaly";
import { create } from "zustand";

type State = {
    typeAnomaly: TTypeAnomaly[];
};
type Action = {
    handleTypeAnomaly: (state: TTypeAnomaly[]) => void;
};

export const useTypeAnomalyStore = create<State & Action>((set) => ({
    typeAnomaly: [],
    handleTypeAnomaly: (value: TTypeAnomaly[]) => set(() => ({ typeAnomaly: value })),
}));
