import { lightTheme } from "@core/theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerBtn: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 10,
        alignItems: "center",
        padding: lightTheme.size[16],
    },
});
