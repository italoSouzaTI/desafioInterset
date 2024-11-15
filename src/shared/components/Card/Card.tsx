import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "./styles";
interface CardProps {
    children: ReactNode;
    onPress: () => void;
}
export function Card({ children, onPress }: CardProps) {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
            {children}
        </TouchableOpacity>
    );
}
