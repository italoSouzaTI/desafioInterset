import { lightTheme } from "@core/theme/theme";
import { moderateScale, verticalScale } from "@shared/help/metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    buttonStyle: {
        width: "100%",
        borderRadius: moderateScale(8),
        height: verticalScale(70),
        justifyContent: "center",
        alignItems: "center",
    },
});
