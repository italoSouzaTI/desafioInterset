import { lightTheme } from "@core/theme/theme";
import { verticalScale } from "@shared/help/metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: verticalScale(54),
        backgroundColor: lightTheme.colors["white-100"],
        flexDirection: "row",
        padding: lightTheme.size[16],
        justifyContent: "space-between",
    },
    containerIconsRight: {
        alignItems: "flex-end",
        flexDirection: "row",
        gap: lightTheme.size[16],
    },
});
