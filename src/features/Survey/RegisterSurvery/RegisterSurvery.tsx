import { lightTheme } from "@core/theme/theme";
import { ContainerDefault, Header, Select, TextArea, Typography } from "@shared/components";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useRegisterSurveryModelView } from "./useRegisterSurveryModelView";
import { verticalScale } from "@shared/help/metrics";
import { ButtomCustom } from "@shared/components/Buttom/Buttom";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./style";

export function RegisterSurvery() {
    const { goBack, navigate } = useNavigation();
    const {
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
    } = useRegisterSurveryModelView();

    return (
        <ContainerDefault>
            <Header
                fnLeft={() => {
                    goBack();
                }}
                labelHeader={params.data?.id ? "Editar vitoria" : "Registrar vitoria"}
                isMenu={false}
                isIconRight={false}
            />
            <View
                style={{
                    flex: 1,
                    top: verticalScale(30),
                }}
            >
                <ScrollView
                    scrollEnabled={!isSelectOpen}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: lightTheme.size[16],
                        paddingVertical: verticalScale(40),
                        gap: lightTheme.size[16],
                    }}
                >
                    <Select
                        label="Área da vistoria"
                        error={errors.inspectionArea?.message}
                        formProps={{
                            name: "inspectionArea",
                            control,
                            rules: {
                                required: "A seleção de um item é obrigatorio.",
                            },
                        }}
                        restInput={{
                            placeholder: "Selecione",
                        }}
                        onToggle={onSelectToggle}
                        dataItens={listInternalArea}
                    />
                    <Select
                        label="Anomalia"
                        error={errors.isAnomaly?.message}
                        formProps={{
                            name: "isAnomaly",
                            control,
                            rules: {
                                required: "A seleção de um item é obrigatorio.",
                            },
                        }}
                        restInput={{
                            placeholder: "Selecione",
                        }}
                        onToggle={onSelectToggle}
                        dataItens={anomaly}
                    />
                    <Select
                        label="Tipo anomalia"
                        error={errors.typeAnomaly?.message}
                        formProps={{
                            name: "typeAnomaly",
                            control,
                            rules: {
                                required: "A seleção de um item é obrigatorio.",
                            },
                        }}
                        restInput={{
                            placeholder: "Selecione",
                        }}
                        onToggle={onSelectToggle}
                        dataItens={listTypeAnomaly}
                    />
                    <Select
                        label="Categoria"
                        error={errors.category?.message}
                        formProps={{
                            name: "category",
                            control,
                            rules: {
                                required: "A seleção de um item é obrigatorio.",
                            },
                        }}
                        restInput={{
                            placeholder: "Selecione",
                        }}
                        onToggle={onSelectToggle}
                        dataItens={listCategory}
                    />
                    <TextArea
                        error={errors.description?.message}
                        formProps={{
                            name: "description",
                            control,
                        }}
                        label="Descrição"
                        restInput={{
                            placeholder: "Descreva sua observação",
                        }}
                    />
                    <Typography label="Fotos da vistoria" familly="BOLD" sizeSelect="16" />
                    {/* Recuperar fotos  aqui*/}
                    <View style={styles.containerRow}>
                        <TouchableOpacity style={styles.containerPhoto} onPress={() => navigate("CameraCustom")}>
                            <FontAwesome5
                                name="plus"
                                color={lightTheme.colors["gray-300"]}
                                size={lightTheme.size[24]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            paddingTop: lightTheme.size[32],
                        }}
                    >
                        <ButtomCustom
                            onPress={handleSubmit(handleSave)}
                            colorBg={params.data?.id ? "yellow-500" : "green-300"}
                        >
                            <Typography
                                label="Salvar"
                                familly="BOLD"
                                colorsSelect={params.data?.id ? "black-300" : "white-200"}
                                sizeSelect="18"
                            />
                        </ButtomCustom>
                    </View>
                </ScrollView>
            </View>
        </ContainerDefault>
    );
}
