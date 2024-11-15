import { lightTheme } from "@core/theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bagde: {
        padding: lightTheme.size[8],

        borderRadius: lightTheme.size[32],
        justifyContent: "center",
        alignItems: "center",
    },
});
