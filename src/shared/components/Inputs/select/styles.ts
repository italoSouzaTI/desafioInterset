import { lightTheme } from "@core/theme/theme";
import { horizontalScale } from "@shared/help/metrics";
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
        flexDirection: "row",
        width: "100%",
        height: lightTheme.size["60"],
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: lightTheme.colors["gray-400"],
        paddingHorizontal: lightTheme.size["16"],
        borderRadius: lightTheme.size["8"],
        alignItems: "center",
    },
    listSelect: {
        width: "100%",
        minHeight: lightTheme.size["60"],
        backgroundColor: "white",
        borderRadius: lightTheme.size["8"],
        position: "absolute",
        top: horizontalScale(98),
        zIndex: 99,
    },
    itemSelect: {
        padding: lightTheme.size["8"],
    },
    input: {
        width: "90%",
    },
    error: {
        color: lightTheme.colors["red-300"],
        fontSize: lightTheme.size["14"],
        fontWeight: "bold",
    },
});
