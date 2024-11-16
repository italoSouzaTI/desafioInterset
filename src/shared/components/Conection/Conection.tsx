import { useContext } from "react";
import { Text, View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeInsets } from "../../../hooks/useSafeInsets";
import { lightTheme } from "../../../core/theme/theme";
import { styles } from "./styles";
import { NetInfoContext } from "@core/provider/NetInfoContext";
export function Conection() {
    const { top } = useSafeInsets();
    const { isConnect } = useContext(NetInfoContext);
    return (
        <>
            {!isConnect && (
                <View
                    style={[
                        styles.container,
                        {
                            paddingTop: top,
                            backgroundColor: lightTheme.colors["red-300"],
                            flexDirection: "row",
                            gap: lightTheme.size[8],
                        },
                    ]}
                >
                    {!isConnect && (
                        <MaterialCommunityIcons
                            name="wifi-remove"
                            size={lightTheme.size["18"]}
                            color={lightTheme.colors["red-500"]}
                        />
                    )}

                    <Text
                        style={{
                            color: lightTheme.colors["red-500"],
                            fontWeight: "bold",
                            fontSize: lightTheme.size[18],
                        }}
                    >
                        Sem Conexão
                    </Text>
                </View>
            )}
        </>
    );
}
