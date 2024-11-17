import { useRoute } from "@react-navigation/native";
import { useInternalAreaStore } from "@store/useInternalAreaStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TTypeAnomaly } from "../api/dto/typeAnomaly";
import { useTypeAnomalyStore } from "@store/useTypeAnomalyStore";
import { useCategoryStore } from "@store/useCategoryStore";
type transformInternalArea = {
    areaVistoriada_id: string;
    label: string;
    value: string;
    description: string;
};
type amonaly = { label: string; value: string };
interface Schema {
    inspectionArea: string;
    isAnomaly: string;
    typeAnomaly: String;
    category: string;
    description: string;
}
export function useRegisterSurveryModelView() {
    const { params } = useRoute();
    const { internalArea } = useInternalAreaStore((state) => state);
    const { typeAnomaly } = useTypeAnomalyStore((state) => state);
    const { category } = useCategoryStore((state) => state);
    const [listInternalArea, setListInternalArea] = useState<transformInternalArea[]>([]);
    const [listTypeAnomaly, setListTypeAnomaly] = useState<{ label: string; value: string }[]>([]);
    const [listCategory, setListCategory] = useState<{ label: string; value: string }[]>([]);
    const [anomaly, setSnomaly] = useState<amonaly[]>([
        { label: "Sim", value: "Sim" },
        { label: "Não", value: "Não" },
    ]);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Schema>({
        defaultValues: {
            category: params?.data?.category || "",
            description: params?.data?.description || "",
            inspectionArea: params?.data?.inspectionArea || "",
            isAnomaly: params?.data?.isAnomaly || "",
            typeAnomaly: params?.data?.typeAnomaly || "",
        },
    });
    function transformDataListInternalArea() {
        const cloneInternalArea = internalArea.slice();
        let aux = [] as transformInternalArea[];
        cloneInternalArea.map((item) => {
            aux.push({
                areaVistoriada_id: String(item.areaVistoriada_id),
                label: String(item.ambiente.id),
                value: item.ambiente.nome,
                description: item.descricao,
            });
        });
        setListInternalArea(aux);
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
        setListCategory(aux);
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
        setListTypeAnomaly(aux);
    }
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const onSelectToggle = (isOpen: boolean) => {
        setIsSelectOpen(isOpen);
    };
    function handleSave(data: any) {
        console.log("aqui veiiii", data);
    }

    useEffect(() => {
        transformDataListInternalArea();
        transformDataTypeAnomaly();
        transformDataCategory();
    }, []);

    return {
        control,
        errors,
        params,
        listInternalArea,
        isSelectOpen,
        anomaly,
        listTypeAnomaly,
        listCategory,
        onSelectToggle,
        handleSubmit,
        handleSave,
    };
}
