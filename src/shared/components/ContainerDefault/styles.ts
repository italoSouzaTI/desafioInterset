import { lightTheme } from "@core/theme/theme";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: Dimensions.get("screen").height,
        backgroundColor: lightTheme.colors["white-300"],
    },
});
