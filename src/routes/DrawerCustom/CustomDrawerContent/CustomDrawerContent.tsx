import { lightTheme } from "@core/theme/theme";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Logo from "@assets/svg/logo";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Typography } from "@shared/components";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
export function CustomDrawerContent(props) {
    const { state, descriptors, navigation } = props;

    const nameMenuItem = {
        suveryAction: { label: "Vistoria" },
        clientAction: { label: "Cliente" },
    };
    function namePage(label: string) {
        const labelMenu = nameMenuItem[label];

        return labelMenu.label;
    }
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
                flex: 1,
                backgroundColor: lightTheme.colors["white-200"],
                padding: lightTheme.size[16],
            }}
        >
            <View style={styles.container}>
                <Logo />
                <Typography label="Interset Tecnologia" familly="BOLD" />
            </View>
            <View style={styles.ContainerBtn}>
                {state.routes.map((item) => (
                    <View styles={styles.row} key={item.name}>
                        <TouchableOpacity
                            style={styles.buttomDrawer}
                            onPress={() => {
                                navigation.navigate(item.name);
                            }}
                        >
                            <View style={[styles.row, { gap: lightTheme.size[8] }]}>
                                {item.name == "clientAction" ? (
                                    <FontAwesome
                                        name="user"
                                        size={lightTheme.size[22]}
                                        color={lightTheme.colors["black-300"]}
                                    />
                                ) : (
                                    <MaterialIcons
                                        name="format-list-bulleted-add"
                                        size={lightTheme.size[22]}
                                        color={lightTheme.colors["black-300"]}
                                    />
                                )}

                                <Typography label={namePage(item.name)} familly="BOLD" />
                            </View>
                            <MaterialIcons
                                name="arrow-forward-ios"
                                size={lightTheme.size[20]}
                                color={lightTheme.colors["gray-400"]}
                            />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </DrawerContentScrollView>
    );
}
