import { useQuery } from "@tanstack/react-query";
import { getAllSurvery } from "../api/http/listSurvery.http";
import { useContext, useEffect, useRef, useState } from "react";
import { IlistSurveryDTO } from "../api/dto/listSurveryDTO";
import { getAllInternalInspectionArea } from "../api/http/listInternalInspectionArea.http";
import { useInternalAreaStore } from "@store/useInternalAreaStore";
import { useTypeAnomalyStore } from "@store/useTypeAnomalyStore";
import { getAllCategory } from "../api/http/listCategory.http";
import { useCategoryStore } from "@store/useCategoryStore";
import { useCameraPermissions } from "expo-camera";
import { getTypeAnomaly } from "../api/http/typeAnomaly.http";
import { getAnomaly } from "../api/http/anomaly.http";
import { useAnomalyStore } from "@store/useAnomalyStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useForm } from "react-hook-form";
import { amonaly } from "../RegisterSurvery/useRegisterSurveryModelView";
import { useSafeInsets } from "@hooks/useSafeInsets";
import { useSurveryDatabase } from "@core/model/useSurveryDatabase";
import { useIsFocused } from "@react-navigation/native";
import { useNetInfoStore } from "@store/useNetInfoStore";
import { useInternalInspectionAreaDatabase } from "@core/model/useInternalInspectionAreaDatabase";
import { IInternalInspectionAreaDTO } from "../api/dto/internalInspectionAreaDTO";

export function useListSuveryModelView() {
    const { top } = useSafeInsets();
    const isFocused = useIsFocused();
    const { getAll, create } = useSurveryDatabase();
    const { getAllInternalInspection, createInternalInspection } = useInternalInspectionAreaDatabase();
    const { isConnect } = useNetInfoStore((state) => state);
    const [listSurvery, setListSurvery] = useState<IlistSurveryDTO[]>([]);
    const [openModalFilter, setOpenModalFilter] = useState<boolean>(false);
    const { handleInternalArea } = useInternalAreaStore((state) => state);
    const { typeAnomaly, handleTypeAnomaly } = useTypeAnomalyStore((state) => state);
    const { category, handleCategory } = useCategoryStore((state) => state);
    const { anomaly, handleAnomaly } = useAnomalyStore((state) => state);
    const [cameraStatus, requestCameraPermission] = useCameraPermissions();
    const [listFilterTypeAnomaly, setListFilterTypeAnomaly] = useState<{ label: string; value: string }[]>([]);
    const [listFilterAnomaly, setListFilterAnomaly] = useState<{ label: string; value: string }[]>([]);
    const [listFilterCategory, setListFilterCategory] = useState<{ label: string; value: string }[]>([]);
    const isanomaly = [
        { label: "Sim", value: "Sim" },
        { label: "Não", value: "Não" },
    ] as amonaly[];
    interface Schema {
        isFilterAnomaly: string;
        filterTypeAnomaly: String;
        filterCategory: string;
        filterAnomaly: string;
    }
    const { control, reset, handleSubmit } = useForm<Schema>();
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const listSurveryRequest = useQuery({
        queryKey: ["KeyListSurvery"],
        queryFn: async () => {
            try {
                const dbResult = await getAll();
                console.log("isConnect", isConnect);
                if (isConnect) {
                    const response = await getAllSurvery();
                    console.log("cheguei aqui");
                    if (dbResult.length > 0) {
                        console.log("algo aqui");
                        return await transformaList(dbResult);
                    } else if (response.data != undefined) {
                        console.log("criando");
                        response.data.forEach((element) => {
                            create({
                                id: element.id,
                                areaVistoriaInterna_id: element.areaVistoriaInterna_id,
                                dataHora: element.dataHora,
                                contemAnomalia: element.contemAnomalia,
                                anomalia: element.anomalia != null ? JSON.stringify(element.anomalia) : "{}",
                                tipo: element.tipo != null ? JSON.stringify(element.tipo) : "{}",
                                categoria: element.categoria != null ? JSON.stringify(element.categoria) : "{}",
                                observacao: element.observacao != null ? JSON.stringify(element.observacao) : "{}",
                                fotos: element.fotos != null ? JSON.stringify(element.fotos) : "[]",
                                isSync: true,
                            });
                        });
                    }
                    const dbResultFinally = await getAll();
                    let newData = dbResultFinally.slice();
                    return await transformaList(newData);
                } else {
                    return await transformaList(dbResult);
                }
            } catch (error) {
                console.log(error);
            }
        },
    });
    const listInternalAreaRequest = useQuery({
        queryKey: ["KeylistInternalArea"],
        queryFn: async () => {
            const responseDBArea = await getAllInternalInspection();
            const responseInternalInspectionArea = await getAllInternalInspectionArea();
            if (isConnect) {
                if (responseDBArea.length > 0) {
                    return await transformaArea(responseDBArea);
                } else if (responseInternalInspectionArea.data != undefined) {
                    responseInternalInspectionArea.data.forEach(async (element) => {
                        await createInternalInspection({
                            id: element.id,
                            areaVistoriada_id: element.areaVistoriada_id,
                            ambiente: element.ambiente != null ? JSON.stringify(element.ambiente) : "{}",
                            descricao: element.descricao,
                            tamanhoProjeto: element.tamanhoProjeto,
                            tamanhoReal: element.tamanhoReal,
                            inicioVistoria: element.inicioVistoria,
                            fimVistoria: element.fimVistoria,
                        });
                    });
                    const newInternalInspectionArea = await getAllInternalInspectionArea();
                    return await transformaArea(newInternalInspectionArea);
                }
            } else {
                return await transformaArea(responseDBArea);
            }
        },
    });
    const listTypeAnomaly = useQuery({
        queryKey: ["keyTypeAnomaly"],
        queryFn: getTypeAnomaly,
    });
    const listCategory = useQuery({
        queryKey: ["keyCategory"],
        queryFn: getAllCategory,
    });
    const listAnomaly = useQuery({
        queryKey: ["keyAnomaly"],
        queryFn: getAnomaly,
    });
    async function transformaArea(params: IInternalInspectionAreaDTO[]) {
        try {
            params.forEach(async (data) => {
                if (data.ambiente != null && typeof data.ambiente === "string") {
                    data.ambiente = JSON.parse(data.ambiente);
                }
            });
            console.log("params", params);
            return params;
        } catch (error) {}
    }
    async function transformaList(params: IlistSurveryDTO[]) {
        try {
            params.forEach(async (data) => {
                if (data.anomalia != null && typeof data.anomalia === "string") {
                    data.anomalia = JSON.parse(data.anomalia);
                }
                if (data.tipo != null && typeof data.tipo === "string") {
                    data.tipo = JSON.parse(data.tipo);
                }
                if (data.categoria != null && typeof data.categoria === "string") {
                    data.categoria = JSON.parse(data.categoria);
                }
                if (data.fotos != null && typeof data.fotos === "string") {
                    data.fotos = JSON.parse(data.fotos);
                }
            });
            return params;
        } catch (error) {}
    }
    function transformDataListAnomaly() {
        const cloneAnomaly = anomaly.slice();
        let aux = [];
        cloneAnomaly.map((item) => {
            aux.push({
                label: String(item.id),
                value: item.nome,
            });
        });
        setListFilterAnomaly(aux);
    }

    function transformDataCategory() {
        const cloneCategory = category.slice();
        let aux = [] as { label: string; value: string }[];
        cloneCategory.map((item) => {
            aux.push({
                label: item.enum,
                value: item.descricao,
            });
        });
        setListFilterCategory(aux);
    }
    function transformDataTypeAnomaly() {
        const cloneTypeAnomaly = typeAnomaly.slice();
        let aux = [] as { label: string; value: string }[];
        cloneTypeAnomaly.map((item) => {
            aux.push({
                label: item.enum,
                value: item.descricao,
            });
        });
        setListFilterTypeAnomaly(aux);
    }
    async function handleSearch(data: Schema) {
        try {
            const getDB = await getAll();
            let newData = (await transformaList(getDB)) as IlistSurveryDTO[];
            if (!data.isFilterAnomaly && !data.filterAnomaly && !data.filterTypeAnomaly && !data.filterCategory) {
                setListSurvery(newData);
                reset();
                setOpenModalFilter((state) => !state);
                return;
            }
            if (data.isFilterAnomaly) {
                const newDataIsAnmaly = newData.filter((item) => {
                    const status = data.isFilterAnomaly.label == "Sim" ? true : false;
                    if (item.contemAnomalia != null) {
                        if (item.contemAnomalia == status) {
                            return item;
                        }
                    }
                });
                if (newDataIsAnmaly) {
                    newData = newDataIsAnmaly;
                } else {
                    reset();
                    setOpenModalFilter((state) => !state);
                    return;
                }
            }
            if (data.filterAnomaly) {
                const newDataAnmaly = newData.filter((item) => {
                    if (item.anomalia != null) {
                        if (item.anomalia.id == data.filterAnomaly.label) {
                            return item;
                        }
                    }
                });
                if (newDataAnmaly) {
                    newData = newDataAnmaly;
                } else {
                    reset();
                    setOpenModalFilter((state) => !state);
                    return;
                }
            }
            if (data.filterTypeAnomaly) {
                const newDatafilterTypeAnomaly = newData.filter((item) => {
                    if (item.tipo != null) {
                        if (item.tipo.enum == data.filterTypeAnomaly.label) {
                            return item;
                        }
                    }
                });
                if (newDatafilterTypeAnomaly) {
                    newData = newDatafilterTypeAnomaly;
                } else {
                    setListSurvery([]);
                    reset();
                    setOpenModalFilter((state) => !state);
                    return;
                }
            }
            if (data.filterCategory) {
                const newDataCategory = newData.filter((item) => {
                    if (item.categoria != null) {
                        if (item.categoria.enum == data.filterCategory.label) {
                            return item;
                        }
                    }
                });
                if (newDataCategory) {
                    newData = newDataCategory;
                } else {
                    setListSurvery([]);
                    reset();
                    setOpenModalFilter((state) => !state);
                    return;
                }
            }
            setListSurvery((state) => (state = newData));
            reset();
            setOpenModalFilter((state) => !state);
        } catch (error) {}
    }

    async function requestCameraPermissionIfNeeded() {
        try {
            if (cameraStatus?.granted !== true) {
                await requestCameraPermission();
            }
        } catch (error) {
            console.error("Error requesting camera permission:", error);
        }
    }
    const onSelectToggle = (isOpen: boolean) => {
        setIsSelectOpen(isOpen);
    };
    useEffect(() => {
        requestCameraPermissionIfNeeded();
    }, []);

    useEffect(() => {
        if (listSurveryRequest.data != undefined) {
            setListSurvery(listSurveryRequest.data);
        }
    }, [isFocused, listSurveryRequest.data]);

    useEffect(() => {
        if (listInternalAreaRequest.data != undefined) {
            console.log("listInternalAreaRequest", listInternalAreaRequest);
            handleInternalArea(listInternalAreaRequest.data);
        }
    }, [listInternalAreaRequest.data]);

    useEffect(() => {
        if (listTypeAnomaly.data?.data != undefined) {
            handleTypeAnomaly(listTypeAnomaly.data?.data);
        }
    }, [listTypeAnomaly.data]);
    useEffect(() => {
        if (listCategory.data?.data != undefined) {
            handleCategory(listCategory.data?.data);
        }
    }, [listCategory.data]);
    useEffect(() => {
        transformDataListAnomaly();
        transformDataCategory();
        transformDataTypeAnomaly();
    }, [typeAnomaly, category, anomaly]);
    useEffect(() => {
        if (listAnomaly.data?.data != undefined) {
            handleAnomaly(listAnomaly.data?.data);
        }
    }, [listAnomaly.data]);

    return {
        listSurveryRequest,
        listSurvery,
        control,
        isSelectOpen,
        listFilterTypeAnomaly,
        listFilterAnomaly,
        listFilterCategory,
        isanomaly,
        openModalFilter,
        top,
        isConnect,
        setListSurvery,
        handleSubmit,
        handleSearch,
        reset,
        setOpenModalFilter,
        onSelectToggle,
    };
}
