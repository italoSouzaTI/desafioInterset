import { StyleSheet } from "react-native";
import { verticalScale } from "../../help/metrics";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: verticalScale(60),
        justifyContent: "center",
        alignItems: "center",
    },
});
