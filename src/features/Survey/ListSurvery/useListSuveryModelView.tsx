import { useQuery } from "@tanstack/react-query";
import { getAllSurvery } from "../api/http/listSurvery.http";
import { useEffect, useRef, useState } from "react";
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

export function useListSuveryModelView() {
    const { top } = useSafeInsets();
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
    const [isanomaly, setIsAnomaly] = useState<amonaly[]>([
        { label: "Sim", value: "Sim" },
        { label: "Não", value: "Não" },
    ]);
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
        queryFn: getAllSurvery,
    });
    const listInternalAreaRequest = useQuery({
        queryKey: ["KeylistInternalArea"],
        queryFn: getAllInternalInspectionArea,
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
    function transformDataListAnomaly() {
        const cloneAnomaly = anomaly.slice();
        let aux = [];
        cloneAnomaly.map((item) => {
            aux.push({
                label: String(item.id),
                value: item.nome,
            });
        });
        console.log("transformDataListAnomaly", aux);
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
    function handleSearch(data: Schema) {
        let newData = listSurvery.slice();
        console.log(data);
        if (!data.isFilterAnomaly && !data.filterAnomaly && !data.filterTypeAnomaly && !data.filterCategory) {
            setListSurvery(listSurveryRequest.data?.data);
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
    }

    async function requestCameraPermissionIfNeeded() {
        try {
            console.log("requestCameraPermissionIfNeeded - cameraStatus", cameraStatus);
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
        if (listSurveryRequest.data?.data != undefined) {
            setListSurvery(listSurveryRequest.data?.data);
        }
    }, [listSurveryRequest.data]);

    useEffect(() => {
        if (listInternalAreaRequest.data?.data != undefined) {
            handleInternalArea(listInternalAreaRequest.data?.data);
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
        setListSurvery,
        handleSubmit,
        handleSearch,
        reset,
        setOpenModalFilter,
        onSelectToggle,
    };
}
