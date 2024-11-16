import { IClientDTO } from "@features/Client/api/dto/client";
import { create } from "zustand";

type State = {
    userSelect: IClientDTO;
};
type Action = {
    handleSelectUser: (state: IClientDTO) => void;
};

export const useDataModalStore = create<State & Action>((set) => ({
    userSelect: {
        email: "",
        id: 0,
        nome: "",
        telefone: "",
    },
    handleSelectUser: (value: IClientDTO) => set(() => ({ userSelect: value })),
}));
