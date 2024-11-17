import { ICategoryDTO } from "@features/Survey/api/dto/categoryDTO";
import { IInternalInspectionAreaDTO } from "@features/Survey/api/dto/internalInspectionAreaDTO";
import { create } from "zustand";

type State = {
    category: ICategoryDTO[];
};
type Action = {
    handleCategory: (state: ICategoryDTO[]) => void;
};

export const useCategoryStore = create<State & Action>((set) => ({
    category: [],
    handleCategory: (value: ICategoryDTO[]) => set(() => ({ category: value })),
}));
