import { IInternalInspectionAreaDTO } from "@features/Survey/api/dto/internalInspectionAreaDTO";
import { create } from "zustand";

type State = {
    internalArea: IInternalInspectionAreaDTO[];
};
type Action = {
    handleInternalArea: (state: IInternalInspectionAreaDTO[]) => void;
};

export const useInternalAreaStore = create<State & Action>((set) => ({
    internalArea: [],
    handleInternalArea: (value: IInternalInspectionAreaDTO[]) => set(() => ({ internalArea: value })),
}));
