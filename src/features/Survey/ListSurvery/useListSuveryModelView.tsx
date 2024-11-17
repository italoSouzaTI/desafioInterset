import { useQuery } from "@tanstack/react-query";
import { getAllSurvery } from "../api/http/listSurvery.http";
import { useEffect, useState } from "react";
import { IlistSurveryDTO } from "../api/dto/listSurveryDTO";
import { getAllInternalInspectionArea } from "../api/http/listInternalInspectionArea.http";
import { useInternalAreaStore } from "@store/useInternalAreaStore";
import { getTypeAnomaly } from "../api/http/typeAnomaly.http";
import { useTypeAnomalyStore } from "@store/useTypeAnomalyStore";
import { getAllCategory } from "../api/http/listCategory.http";
import { useCategoryStore } from "@store/useCategoryStore";
import { useCameraPermissions } from "expo-camera";

export function useListSuveryModelView() {
    const [listSurvery, setListSurvery] = useState<IlistSurveryDTO[]>([]);
    const { handleInternalArea } = useInternalAreaStore((state) => state);
    const { handleTypeAnomaly } = useTypeAnomalyStore((state) => state);
    const { handleCategory } = useCategoryStore((state) => state);
    const [cameraStatus, requestCameraPermission] = useCameraPermissions();

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

    return {
        listSurveryRequest,
        listSurvery,
    };
}
