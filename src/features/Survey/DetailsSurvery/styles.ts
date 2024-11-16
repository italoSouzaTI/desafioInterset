import { lightTheme } from "@core/theme/theme";
import { verticalScale } from "@shared/help/metrics";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: verticalScale(30),
    },
    containerImg: {
        width: Dimensions.get("screen").width,
        height: 290,
        backgroundColor: lightTheme.colors["black-300"],
        justifyContent: "center",
        alignItems: "center",
    },
    bagde: {
        padding: lightTheme.size[8],
        borderRadius: lightTheme.size[32],
        justifyContent: "center",
        alignItems: "center",
    },
    space: {
        gap: lightTheme.size[8],
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    containerBtn: {
        flex: 1,
        padding: lightTheme.size[16],
    },
    pageIndicatorContainer: {
        position: "absolute",
        bottom: lightTheme.size[20],
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    pageIndicatorDot: {
        width: 10,
        height: 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    activePageIndicatorDot: {
        backgroundColor: lightTheme.colors["white-100"],
    },
});
