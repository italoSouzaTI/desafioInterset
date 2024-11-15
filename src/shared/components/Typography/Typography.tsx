import { lightTheme } from "@core/theme/theme";
import { Text, TextProps } from "react-native";

interface TypographyProps extends TextProps {
    colorsSelect?: keyof typeof lightTheme.colors;
    sizeSelect?: keyof typeof lightTheme.size;
    familly?: keyof typeof lightTheme.FONT_FAMILLY;
    label: string;
}
export function Typography({
    colorsSelect = "black-300",
    sizeSelect = "16",
    familly = "REGULAR",
    label,
    ...propsText
}: TypographyProps) {
    return (
        <Text
            style={{
                color: lightTheme.colors[colorsSelect],
                fontSize: lightTheme.size[sizeSelect],
                fontFamily: lightTheme.FONT_FAMILLY[familly],
            }}
            {...propsText}
        >
            {label}
        </Text>
    );
}
