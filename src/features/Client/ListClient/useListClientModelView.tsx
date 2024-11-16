import { useQuery } from "@tanstack/react-query";
import { getAllClient } from "../api/http/clientAll.http";
import { useCallback, useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { IClientDTO } from "../api/dto/client";
import { useDataModalStore } from "@store/useDataModalStore";
import { useForm } from "react-hook-form";
export function useListClientModelView() {
    const [listClient, setListClient] = useState<IClientDTO[]>([]);
    const refBottomSheet = useRef<BottomSheetModal>(null);
    const [isSearch, setIsSearch] = useState(false);
    const { handleSelectUser, userSelect } = useDataModalStore((state) => state);
    const { control, watch, setValue } = useForm();

    const searchValue = watch("searchcClient", "");

    const handlePresentModalPress = useCallback((data: IClientDTO) => {
        handleSelectUser(data);
        refBottomSheet.current?.present();
    }, []);
    const queryAllResponse = useQuery({
        queryKey: ["keyClientAll"],
        queryFn: getAllClient,
    });

    useEffect(() => {
        if (queryAllResponse.data?.data != undefined) {
            setListClient(queryAllResponse.data.data);
        }
    }, [queryAllResponse.data]);

    useEffect(() => {
        const lowercasedSearch = searchValue.toLowerCase(); // Tornar tudo minúsculo para pesquisa insensível a maiúsculas
        // Filtrando clientes com base no valor de busca
        if (lowercasedSearch.length == 0) {
            setListClient(queryAllResponse.data?.data);
            return;
        }
        const filtered = listClient.filter((client) => {
            return (
                client.nome.toLowerCase().includes(lowercasedSearch) ||
                client.email.toLowerCase().includes(lowercasedSearch) ||
                client.telefone.includes(lowercasedSearch) // Não usamos toLowerCase em telefone, pois é numérico
            );
        });

        setListClient(filtered);
    }, [searchValue]);

    return {
        refBottomSheet,
        userSelect,
        listClient,
        queryAllResponse,
        isLoading: queryAllResponse.isLoading,
        isSearch,
        control,
        setIsSearch,
        handlePresentModalPress,
        setValue,
    };
}
