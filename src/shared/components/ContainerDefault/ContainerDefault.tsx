import { View } from "react-native";
import { styles } from "./styles";
import { ReactNode } from "react";
interface ContainerDefaultProps {
    children: ReactNode;
}
export function ContainerDefault({ children }: ContainerDefaultProps) {
    return <View style={styles.container}>{children}</View>;
}
