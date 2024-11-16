import { lightTheme } from "@core/theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    containerBottomSheet: {
        flex: 1,
        width: "100%",
        height: "30%",
        padding: lightTheme.size[20],
        gap: lightTheme.size[20],
    },
});
