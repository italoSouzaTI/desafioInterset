import { lightTheme } from "@core/theme/theme";
import { ContainerDefault, Header, Select, TextArea, Typography } from "@shared/components";
import { ScrollView, View } from "react-native";
import { useRegisterSurveryModelView } from "./useRegisterSurveryModelView";
import { verticalScale } from "@shared/help/metrics";
import { ButtomCustom } from "@shared/components/Buttom/Buttom";
import { useNavigation } from "@react-navigation/native";

export function RegisterSurvery() {
    const { goBack } = useNavigation();
    const { control, handleSubmit, errors, params } = useRegisterSurveryModelView();
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
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: lightTheme.size[16],
                    paddingVertical: verticalScale(40),
                    gap: lightTheme.size[16],
                }}
            >
                <Select
                    dataItens={[]}
                    label="Área da vistoria"
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
                />
                <Select
                    dataItens={[]}
                    label="Amomalia"
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
                />
                <Select
                    dataItens={[]}
                    label="Tipo anomalia"
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
                />
                <Select
                    dataItens={[]}
                    label="Cetegoria"
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
                />
                <TextArea
                    formProps={{
                        name: "description",
                        control,
                    }}
                    label="Descrição"
                    restInput={{
                        placeholder: "Descreva sua observação",
                    }}
                />
                <View
                    style={{
                        paddingTop: lightTheme.size[32],
                    }}
                >
                    <ButtomCustom onPress={() => {}} colorBg={params.data?.id ? "yellow-500" : "green-300"}>
                        <Typography
                            label="Salvar"
                            familly="BOLD"
                            colorsSelect={params.data?.id ? "black-300" : "white-200"}
                            sizeSelect="18"
                        />
                    </ButtomCustom>
                </View>
            </ScrollView>
        </ContainerDefault>
    );
}
