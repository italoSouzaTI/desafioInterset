import { lightTheme } from "@core/theme/theme";
import { verticalScale } from "@shared/help/metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        gap: lightTheme.size["8"],
    },
    title: {
        fontWeight: "600",
        fontSize: lightTheme.size["16"],
    },
    containerInput: {
        width: "100%",
        height: verticalScale(160),
        backgroundColor: "white",
        borderWidth: 1,
        padding: lightTheme.size["16"],
        borderRadius: lightTheme.size["8"],
    },
    input: {
        width: "100%",
        textAlignVertical: "top",
    },
    error: {
        color: lightTheme.colors["red-300"],
        fontSize: lightTheme.size["14"],
        fontWeight: "bold",
    },
});
