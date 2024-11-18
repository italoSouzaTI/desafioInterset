import { lightTheme } from "@core/theme/theme";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerFilter: {
        gap: lightTheme.size[8],
        padding: lightTheme.size[16],
    },
    backgroundModal: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("screen").height,
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "absolute",
        zIndex: 3,
    },
    ContainerView: {
        width: "80%",
        height: Dimensions.get("screen").height,
        backgroundColor: lightTheme.colors["white-300"],
        position: "absolute",
        padding: lightTheme.size[16],
        right: 0,
    },
});
