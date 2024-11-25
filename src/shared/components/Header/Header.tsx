import { View } from "react-native";
import { styles } from "./styles";
import { useSafeInsets } from "@hooks/useSafeInsets";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { lightTheme } from "@core/theme/theme";
import { Typography } from "../Typography/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { useNetInfoStore } from "@store/useNetInfoStore";
type CustomAction = {
    component: React.ReactNode;
};
interface HeaderProps {
    isMenu?: boolean;
    isIconRight: boolean;
    isFilter?: boolean;
    isSearch?: boolean;
    viewIconSearch?: boolean;
    fnSearch?: () => void;
    fnFilter?: () => void;
    fnLeft: () => void;
    labelHeader: string;
    customActions?: CustomAction;
}
export function Header({
    isMenu = true,
    isIconRight = true,
    isSearch = false,
    viewIconSearch = true,
    fnSearch,
    fnFilter,
    fnLeft,
    labelHeader,
    isFilter = true,
    customActions,
}: HeaderProps) {
    const { top } = useSafeInsets();
    const { isConnect } = useNetInfoStore((state) => state);
    return (
        <View style={[styles.container, { top: !isConnect ? 0 : top }]}>
            {isSearch ? (
                <>{customActions}</>
            ) : (
                <>
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
                                {viewIconSearch && (
                                    <TouchableOpacity
                                        style={{
                                            padding: lightTheme.size[4],
                                        }}
                                        onPress={fnSearch}
                                    >
                                        <Octicons
                                            name="search"
                                            size={lightTheme.size[20]}
                                            color={lightTheme.colors["gray-400"]}
                                        />
                                    </TouchableOpacity>
                                )}

                                {isFilter && (
                                    <TouchableOpacity
                                        style={{
                                            padding: lightTheme.size[4],
                                        }}
                                        onPress={fnFilter}
                                    >
                                        <Octicons
                                            name="filter"
                                            size={lightTheme.size[20]}
                                            color={lightTheme.colors["gray-400"]}
                                        />
                                    </TouchableOpacity>
                                )}
                            </>
                        )}
                    </View>
                </>
            )}
        </View>
    );
}
