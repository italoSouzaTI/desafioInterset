import { create } from "zustand";
interface RegisterSurvery {
    surveryArea: object;
    anomaly: object;
    typeAnomaly: object;
    category: object;
    description: string;
    photo: object[];
}
type State = {
    register: RegisterSurvery;
};
type Action = {
    handleRegisterSate: (state: RegisterSurvery) => void;
};

export const useRegisterSurveryStore = create<State & Action>((set) => ({
    register: {
        surveryArea: {},
        anomaly: {},
        typeAnomaly: {},
        category: {},
        description: "",
        photo: [],
    },
    handleRegisterSate: (value: RegisterSurvery) => set(() => ({ register: value })),
}));
