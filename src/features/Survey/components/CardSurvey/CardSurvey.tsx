import { Card, Typography } from "@shared/components";
import { View } from "react-native";
import { styles } from "./styles";
import { lightTheme } from "@core/theme/theme";
import { MaterialIcons } from "@expo/vector-icons";
export function CardSurvey() {
    return (
        <Card onPress={() => {}}>
            <View style={styles.row}>
                <View
                    style={{
                        gap: lightTheme.size[8],
                    }}
                >
                    <Typography label="Tipo" sizeSelect="12" colorsSelect="black-200" familly="BOLD" />
                    <Typography label="Endógena" sizeSelect="12" familly="BOLD" />
                </View>
                <View
                    style={{
                        gap: lightTheme.size[8],
                    }}
                >
                    <Typography label="Categoria" sizeSelect="12" familly="BOLD" colorsSelect="black-200" />
                    <View style={[styles.bagde, { backgroundColor: lightTheme.colors["green-300"] }]}>
                        <Typography label="Alta" colorsSelect="white-200" sizeSelect="12" familly="BOLD" />
                    </View>
                </View>
            </View>
            <View style={[styles.row, { alignItems: "center" }]}>
                <View
                    style={{
                        gap: lightTheme.size[8],
                    }}
                >
                    <Typography label="Anomalia" sizeSelect="12" colorsSelect="black-200" familly="BOLD" />
                    <Typography label="Manchamento de umidade" sizeSelect="12" familly="BOLD" />
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
                        label="Manchamento de umidade no forro do wc"
                        sizeSelect="12"
                        familly="BOLD"
                    />
                </View>
                <View
                    style={{
                        gap: lightTheme.size[8],
                    }}
                >
                    <Typography label="Criado em " sizeSelect="12" colorsSelect="black-200" familly="BOLD" />
                    <Typography label="27/09/202417:26:15:46" sizeSelect="12" familly="BOLD" />
                </View>
            </View>
        </Card>
    );
}
