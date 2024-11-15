import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Typography } from "../Typography/Typography";
import { lightTheme } from "@core/theme/theme";
import { ReactNode } from "react";
import { styles } from "./styles";
interface ButtomCustomProps extends TouchableOpacityProps {
    children: ReactNode;
    colorBg: keyof typeof lightTheme.colors;
}
export function ButtomCustom({ children, colorBg }: ButtomCustomProps) {
    return (
        <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: lightTheme.colors[colorBg] }]}>
            {children}
        </TouchableOpacity>
    );
}
