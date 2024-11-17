import { useNavigation, useRoute } from "@react-navigation/native";
import { useInternalAreaStore } from "@store/useInternalAreaStore";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTypeAnomalyStore } from "@store/useTypeAnomalyStore";
import { useCategoryStore } from "@store/useCategoryStore";
import { useRegisterSurveryStore } from "@store/useRegisterSurveryStore";
import { Alert, BackHandler } from "react-native";
import { surveryPutDTO } from "../api/dto/surveryPutDTO";
import { useAnomalyStore } from "@store/useAnomalyStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendSurvery } from "../api/http/surverySend.http";
import { sendSurveryPhoto } from "../api/http/surveryPhotoSend.http";
import { surveryPhotoPutDTO } from "../api/dto/surveryPhotoPutDTO";
import { sendSurveryPut } from "../api/http/surveryPut.http";
import { sendSurveryDelete } from "../api/http/surveryDelete.http";
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
    anomaly: string;
}
export function useRegisterSurveryModelView() {
    const scrollRef = useRef();
    const { params } = useRoute();
    const { goBack, navigate } = useNavigation();
    const { internalArea } = useInternalAreaStore((state) => state);
    const { typeAnomaly } = useTypeAnomalyStore((state) => state);
    const { category } = useCategoryStore((state) => state);
    const { anomaly } = useAnomalyStore((state) => state);
    const [listInternalArea, setListInternalArea] = useState<transformInternalArea[]>([]);
    const [listTypeAnomaly, setListTypeAnomaly] = useState<{ label: string; value: string }[]>([]);
    const [listAnomaly, setListAnomaly] = useState<{ label: string; value: string }[]>([]);
    const [listCategory, setListCategory] = useState<{ label: string; value: string }[]>([]);
    const [isanomaly, setIsAnomaly] = useState<amonaly[]>([
        { label: "Sim", value: "Sim" },
        { label: "Não", value: "Não" },
    ]);
    const queryClient = useQueryClient();
    const registerStore = useRegisterSurveryStore((state) => state);
    console.log(params);
    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<Schema>({
        defaultValues: {
            category: "",
            description: "",
            inspectionArea: "",
            isAnomaly: "",
            typeAnomaly: "",
        },
    });
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const onSelectToggle = (isOpen: boolean) => {
        setIsSelectOpen(isOpen);
    };
    const mutationSurveryPhoto = useMutation({
        mutationFn: (data: surveryPhotoPutDTO) => {
            return sendSurveryPhoto(data);
        },
        onSuccess: (data) => {
            if (data) {
                Alert.alert("Sucesso", "Dados inseridos com sucesso.", [
                    {
                        text: "Ok",
                        onPress: async () => {
                            queryClient.invalidateQueries({ queryKey: ["KeyListSurvery"] });
                            goBack();
                        },
                    },
                ]);
            }
        },
    });
    const mutationSurvery = useMutation({
        mutationFn: (data: surveryPutDTO) => {
            return sendSurvery(data);
        },
        onSuccess: (data) => {
            if (data && registerStore.register.photo.length) {
                let formData = new FormData();
                formData.append("id", data.data.id);
                registerStore.register.photo.forEach((element, index) => {
                    if (!element.isSync) {
                        const uriParts = element.url.split("/");
                        const fileName = uriParts[uriParts.length - 1];
                        const fileType = fileName.split(".").pop();
                        formData.append("file", { uri: element.url, type: `image/${fileType}`, name: fileName });
                    }
                });
                mutationSurveryPhoto.mutate(formData);
            } else {
                Alert.alert("Sucesso", "Dados inseridos com sucesso.", [
                    {
                        text: "Ok",
                        onPress: async () => {
                            queryClient.invalidateQueries({ queryKey: ["KeyListSurvery"] });
                            goBack();
                        },
                    },
                ]);
            }
        },
        onError: (error) => {
            console.log("error", error);
        },
    });
    const mutationSurveryPut = useMutation({
        mutationFn: ({ id, data }: { id: number; data: surveryPutDTO }) => {
            console.log("Mutation function called with:", { id, data });
            return sendSurveryPut(id, data);
        },
        onSuccess: (data) => {
            if (data && registerStore.register.photo.length) {
                let formData = new FormData();
                formData.append("id", data.data.id);
                registerStore.register.photo.forEach((element, index) => {
                    if (!element.isSync) {
                        const uriParts = element.url.split("/");
                        const fileName = uriParts[uriParts.length - 1];
                        const fileType = fileName.split(".").pop();
                        formData.append("file", { uri: element.url, type: `image/${fileType}`, name: fileName });
                    }
                });
                mutationSurveryPhoto.mutate(formData);
            } else {
                Alert.alert("Sucesso", "Dados inseridos com sucesso.", [
                    {
                        text: "Ok",
                        onPress: async () => {
                            queryClient.invalidateQueries({ queryKey: ["KeyListSurvery"] });
                            goBack();
                        },
                    },
                ]);
            }
        },
        onError: (error) => {
            console.log("error", error);
        },
    });
    const mutationSurveryDelete = useMutation({
        mutationFn: (data: String) => {
            console.log("Mutation function called with:", { data });
            return sendSurveryDelete(data);
        },
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries({ queryKey: ["KeyListSurvery"] });
            }
        },
    });

    const onPressTouch = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    };

    function transformDataListAnomaly() {
        const cloneAnomaly = anomaly.slice();
        let aux = [];
        cloneAnomaly.map((item) => {
            aux.push({
                label: String(item.id),
                value: item.nome,
            });
        });
        setListAnomaly(aux);
    }
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

    function handleSave(data: any) {
        try {
            const paramForm = {
                areaVistoriaInterna_id: Number(data.inspectionArea.areaVistoriada_id),
                dataHora: new Date().toISOString(),
                contemAnomalia: data.isAnomaly ? true : false,
                anomalia_id: Number(data.anomaly.label),
                tipo: data.typeAnomaly.label,
                categoria: data.category.label,
                observacao: data.description,
            } as surveryPutDTO;
            console.log("params", params.data);
            if (params.hasOwnProperty("data")) {
                const id = params.data.id;
                console.log("update");
                mutationSurveryPut.mutate({ id, data: paramForm });
            } else {
                mutationSurvery.mutate(paramForm);
            }
        } catch (error) {}
    }
    function removePhoto(item: { url: string; isSync: boolean; id: undefined }) {
        try {
            console.log("removePhoto item", item);
            console.log("removePhoto params?.data.id", params?.data.id);
            let newArray;
            let newRegister = registerStore.register;
            if (params?.data.id) {
                console.log("aqui");
                mutationSurveryDelete.mutate(item.url);
                newArray = newRegister.photo.filter((photo) => photo.url != item.url);
            } else {
                newArray = newRegister.photo.filter((photo) => photo.url != item.url);
            }
            newRegister.photo = newArray;
            registerStore.handleRegisterSate(newRegister);
        } catch (error) {}
    }
    function handleGoBack() {
        try {
            registerStore.handleRegisterSate({
                surveryArea: {},
                anomaly: {},
                category: {},
                description: "",
                photo: [],
            });
            navigate("ListSurvery");
            return true;
        } catch (error) {}
    }
    function handleCamera() {
        const response = getValues();
        const newParam = {
            surveryArea: response.inspectionArea,
            anomaly: response.typeAnomaly,
            category: response.category,
            description: response.description,
            photo: registerStore.register.photo,
        };
        registerStore.handleRegisterSate(newParam);
        console.log("handleCamera-response", response);
        navigate("CameraCustom");
    }

    useEffect(() => {
        transformDataListInternalArea();
        transformDataTypeAnomaly();
        transformDataCategory();
        transformDataListAnomaly();
    }, []);
    useEffect(() => {
        onPressTouch();
    }, [errors]);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleGoBack);

        const backHandler = BackHandler.addEventListener("hardwareBackPress", handleGoBack);

        return () => backHandler.remove();
    }, []);

    function filledRegister() {
        /*
         Não tem informação do campo area que foi enviado e somente do espaço interno,
         com isso não e possivel recuperar o local exato pois uma area interna retorna mais de um local.
        */
        // const auxAreaSurvery = listInternalArea.filter(
        //     (item) => item.areaVistoriada_id == params.data.areaVistoriaInterna_id
        // );
        let auxPhoto = [];
        const auxIsAnomaly = isanomaly.filter((item) => {
            const res = params.data.contemAnomalia ? "Sim" : "Não";
            if (item.label == res) {
                return item;
            }
        });
        const auxTypeAnomaly = listTypeAnomaly.filter((item) => item.value == params.data.tipo.descricao);
        const auxListAnomaly = listAnomaly.filter((item) => item.label == params.data.anomalia.id);
        const auxCategory = listCategory.filter((item) => item.label == params.data.categoria.enum);
        if (params?.data.fotos.length) {
            params.data.fotos.forEach((element) => {
                auxPhoto.push({ url: element, isSync: true });
            });
        }
        setValue("isAnomaly", auxIsAnomaly[0]);
        setValue("typeAnomaly", auxTypeAnomaly[0]);
        setValue("anomaly", auxListAnomaly[0]);
        setValue("category", auxCategory[0]);
        setValue("description", params.data.observacao);
        registerStore.register.photo = auxPhoto;
    }
    console.log("params", params);
    useEffect(() => {
        if (params?.data && Object.keys(params.data).length > 0) {
            filledRegister();
        }
    }, [params, listInternalArea]);

    return {
        control,
        errors,
        params,
        listInternalArea,
        isSelectOpen,
        anomaly,
        isanomaly,
        listTypeAnomaly,
        listCategory,
        registerStore,
        listAnomaly,
        isloadingDelete: mutationSurveryDelete.isPending,
        isLoadingSend: mutationSurveryPhoto.isPending || mutationSurvery.isPending,
        scrollRef,
        handleGoBack,
        handleCamera,
        removePhoto,
        onSelectToggle,
        handleSubmit,
        handleSave,
    };
}
