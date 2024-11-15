import { StyleSheet } from "react-native";
import { lightTheme } from "../../../core/theme/theme";
import { verticalScale } from "../../help/metrics";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: verticalScale(50),
        borderRadius: lightTheme.size["8"],
        backgroundColor: lightTheme.colors["white-100"],
        padding: lightTheme.size["16"],
        gap: lightTheme.size["16"],
    },
});
