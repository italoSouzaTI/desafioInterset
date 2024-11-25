import { IInternalInspectionAreaDTO } from "@features/Survey/api/dto/internalInspectionAreaDTO";
import { create } from "zustand";

type State = {
    isConnect: boolean;
};
type Action = {
    handleConnection: (state: boolean) => void;
};

export const useNetInfoStore = create<State & Action>((set) => ({
    isConnect: false,
    handleConnection: (value: boolean) => set(() => ({ isConnect: value })),
}));
