import { lightTheme } from "@core/theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: lightTheme.size[8],
    },
});
