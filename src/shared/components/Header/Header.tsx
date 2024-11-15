import { View } from "react-native";
import { styles } from "./styles";
import { useSafeInsets } from "@hooks/useSafeInsets";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { lightTheme } from "@core/theme/theme";
import { Typography } from "../Typography/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { NetInfoContext } from "@provider/NetInfoContext";
interface HeaderProps {
    isMenu?: boolean;
    isIconRight: boolean;
    fnSearch?: () => void;
    fnFilter?: () => void;
    fnLeft: () => void;
    labelHeader: string;
}
export function Header({ isMenu = true, isIconRight = true, fnSearch, fnFilter, fnLeft, labelHeader }: HeaderProps) {
    const { top } = useSafeInsets();
    const { isConnect } = useContext(NetInfoContext);
    return (
        <View style={[styles.container, { top: !isConnect ? 0 : top }]}>
            <TouchableOpacity
                style={{
                    padding: lightTheme.size[4],
                }}
                onPress={fnLeft}
            >
                {isMenu ? (
                    <Ionicons name="menu" size={lightTheme.size[20]} color={lightTheme.colors["gray-400"]} />
                ) : (
                    <MaterialIcons
                        name="arrow-back-ios-new"
                        size={lightTheme.size[20]}
                        color={lightTheme.colors["gray-400"]}
                    />
                )}
            </TouchableOpacity>

            <Typography label={labelHeader} familly="BOLD" sizeSelect="18" />
            <View style={styles.containerIconsRight}>
                {isIconRight && (
                    <>
                        <TouchableOpacity
                            style={{
                                padding: lightTheme.size[4],
                            }}
                            onPress={fnSearch}
                        >
                            <Octicons name="search" size={lightTheme.size[20]} color={lightTheme.colors["gray-400"]} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: lightTheme.size[4],
                            }}
                            onPress={fnFilter}
                        >
                            <Octicons name="filter" size={lightTheme.size[20]} color={lightTheme.colors["gray-400"]} />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}
