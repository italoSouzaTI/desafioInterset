import { lightTheme } from "@core/theme/theme";
import { moderateScale, verticalScale } from "@shared/help/metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerRow: {
        flexWrap: "wrap",
        flexDirection: "row",
    },
    containerPhoto: {
        width: verticalScale(110),
        height: verticalScale(120),
        borderRadius: moderateScale(8),
        borderWidth: moderateScale(2),
        borderStyle: "dashed",
        borderColor: lightTheme.colors["gray-300"],
        justifyContent: "center",
        alignItems: "center",
    },
});
