import { lightTheme } from "@core/theme/theme";
import { verticalScale } from "@shared/help/metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: lightTheme.size[12],
    },
    buttomDrawer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: lightTheme.size[8],
        height: verticalScale(44),
        borderRadius: lightTheme.size[8],
        backgroundColor: lightTheme.colors["white-300"],
    },
    ContainerBtn: {
        gap: lightTheme.size[16],
        paddingHorizontal: lightTheme.size[16],
    },
    row: {
        flexDirection: "row",
    },
});
