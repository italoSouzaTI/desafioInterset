import { lightTheme } from "@core/theme/theme";
import { Card, ContainerDefault, FloatButtom, Header, Typography } from "@shared/components";
import { FlatList, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

export function ListClient() {
    function renderItem() {
        return (
            <Card onPress={() => {}}>
                <View style={styles.row}>
                    <View
                        style={{
                            gap: lightTheme.size[8],
                        }}
                    >
                        <Typography label="Nome" sizeSelect="12" colorsSelect="black-200" familly="BOLD" />
                        <Typography label="Thalita" sizeSelect="12" familly="BOLD" />
                    </View>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={lightTheme.size[20]}
                        color={lightTheme.colors["gray-400"]}
                    />
                </View>
            </Card>
        );
    }
    function ListEmptyComponent() {
        return <Typography label="Nenhuma vistoria encontrada." />;
    }
    function ItemSeparatorComponent() {
        return <View style={{ width: "100%", height: lightTheme.size[16] }} />;
    }

    return (
        <ContainerDefault>
            <Header isMenu isIconRight={true} fnLeft={() => {}} labelHeader="Listagem vistorias" />
            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: lightTheme.size[16],
                    paddingVertical: 40,
                }}
                data={[1, 2]}
                renderItem={renderItem}
                ListEmptyComponent={ListEmptyComponent}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />
            <FloatButtom onPress={() => {}} />
        </ContainerDefault>
    );
}
