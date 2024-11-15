import { lightTheme } from "@core/theme/theme";
import { moderateScale, verticalScale } from "@shared/help/metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: verticalScale(50),
        height: verticalScale(50),
        borderRadius: moderateScale(50),
        backgroundColor: lightTheme.colors["yellow-500"],
        position: "absolute",
        bottom: lightTheme.size["12"],
        right: lightTheme.size["12"],
        justifyContent: "center",
        alignItems: "center",
    },
});
