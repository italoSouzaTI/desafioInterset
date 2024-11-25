import { Card, Typography } from "@shared/components";
import { View } from "react-native";
import { styles } from "./styles";
import { lightTheme } from "@core/theme/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { IlistSurveryDTO } from "@features/Survey/api/dto/listSurveryDTO";
import { formartDate } from "@shared/help/formatDate";
import { useNavigation } from "@react-navigation/native";
interface ICardSurveyPros {
    item: IlistSurveryDTO;
}
function colorBagde(item: string) {
    if (item == "Alta") {
        return (
            <View style={[styles.bagde, { backgroundColor: lightTheme.colors["green-300"] }]}>
                <Typography label="Alta" colorsSelect="white-200" sizeSelect="12" familly="BOLD" />
            </View>
        );
    } else if (item == "Não informado") {
        return (
            <View style={[styles.bagde, { backgroundColor: lightTheme.colors["gray-300"] }]}>
                <Typography label="Não informado" colorsSelect="white-200" sizeSelect="12" familly="BOLD" />
            </View>
        );
    } else if (item == "Baixa") {
        return (
            <View style={[styles.bagde, { backgroundColor: lightTheme.colors["red-300"] }]}>
                <Typography label="Baixa" colorsSelect="red-500" sizeSelect="12" familly="BOLD" />
            </View>
        );
    } else if (item == "Média") {
        return (
            <View style={[styles.bagde, { backgroundColor: lightTheme.colors["orange-500"] }]}>
                <Typography label="Média" colorsSelect="white-200" sizeSelect="12" familly="BOLD" />
            </View>
        );
    }
}
export function CardSurvey({ item }: ICardSurveyPros) {
    const { navigate } = useNavigation();
    return (
        <Card
            onPress={() => {
                navigate("DetailsSurvery", { data: item });
            }}
        >
            <View style={styles.row}>
                <View
                    style={{
                        gap: lightTheme.size[8],
                    }}
                >
                    <Typography label="Tipo" sizeSelect="12" colorsSelect="black-200" familly="BOLD" />
                    <Typography
                        label={
                            item.tipo?.hasOwnProperty("descricao")
                                ? item.tipo?.descricao
                                : item.tipo?.hasOwnProperty("value")
                                ? item.tipo?.value
                                : "Não informado"
                        }
                        sizeSelect="12"
                        familly="BOLD"
                    />
                </View>
                <View
                    style={{
                        gap: lightTheme.size[8],
                    }}
                >
                    <Typography
                        label="Categoria"
                        sizeSelect="12"
                        familly="BOLD"
                        colorsSelect="black-200"
                        style={{ textAlign: "right" }}
                    />
                    {colorBagde(
                        item.categoria?.hasOwnProperty("descricao")
                            ? item.categoria?.descricao
                            : item.categoria?.hasOwnProperty("value")
                            ? item.categoria?.value
                            : "Não informado"
                    )}
                </View>
            </View>
            <View style={[styles.row, { alignItems: "center" }]}>
                <View
                    style={{
                        gap: lightTheme.size[8],
                    }}
                >
                    <Typography label="Anomalia" sizeSelect="12" colorsSelect="black-200" familly="BOLD" />
                    <Typography
                        label={
                            item.anomalia?.hasOwnProperty("nome")
                                ? item.anomalia?.nome
                                : item.anomalia?.hasOwnProperty("value")
                                ? item.anomalia?.value
                                : "Não informado"
                        }
                        sizeSelect="12"
                        familly="BOLD"
                    />
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={lightTheme.size[22]}
                    color={lightTheme.colors["gray-400"]}
                />
            </View>
            <View style={styles.row}>
                <View
                    style={{
                        gap: lightTheme.size[8],
                        width: "45%",
                    }}
                >
                    <Typography label="Observação" sizeSelect="12" colorsSelect="black-200" familly="BOLD" />
                    <Typography
                        numberOfLines={1}
                        label={item.observacao ?? "Não informado"}
                        sizeSelect="12"
                        familly="BOLD"
                    />
                </View>
                <View
                    style={{
                        gap: lightTheme.size[8],
                    }}
                >
                    <Typography
                        label="Criado em "
                        sizeSelect="12"
                        colorsSelect="black-200"
                        familly="BOLD"
                        style={{ textAlign: "right" }}
                    />
                    <Typography
                        label={item.dataHora ? formartDate(item.dataHora) : "Não informado"}
                        sizeSelect="12"
                        familly="BOLD"
                    />
                </View>
            </View>
        </Card>
    );
}
