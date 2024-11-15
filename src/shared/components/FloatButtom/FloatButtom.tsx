import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { lightTheme } from "../../../core/theme/theme";
import { styles } from "./styles";

interface FloatButtomProps {
    onPress: () => void;
}
export function FloatButtom({ onPress }: FloatButtomProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <FontAwesome5 name="plus" color={lightTheme.colors["black-300"]} size={lightTheme.size[20]} />
        </TouchableOpacity>
    );
}
