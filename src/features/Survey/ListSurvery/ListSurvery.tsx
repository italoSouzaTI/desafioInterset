import { ContainerDefault, FloatButtom, Header, Typography } from "@shared/components";
import { FlatList, View } from "react-native";
import { CardSurvey } from "../components/CardSurvey/CardSurvey";
import { lightTheme } from "@core/theme/theme";
import { useListSuveryModelView } from "./useListSuveryModelView";
import { verticalScale } from "@shared/help/metrics";
import { IlistSurveryDTO } from "../api/dto/listSurveryDTO";

export function ListSurvery({ navigation }) {
    const { listSurveryRequest, listSurvery } = useListSuveryModelView();
    function renderItem(item: IlistSurveryDTO) {
        return <CardSurvey item={item} />;
    }
    function ListEmptyComponent() {
        return <Typography label="Nenhuma vistoria encontrada." style={{ textAlign: "center" }} />;
    }
    function ItemSeparatorComponent() {
        return <View style={{ width: "100%", height: lightTheme.size[16] }} />;
    }
    return (
        <ContainerDefault>
            <Header
                isMenu
                isIconRight={true}
                fnLeft={() => {
                    navigation.toggleDrawer();
                }}
                labelHeader="Listagem vistorias"
            />
            <View
                style={{
                    flex: 1,
                    top: verticalScale(30),
                }}
            >
                <FlatList
                    contentContainerStyle={{
                        paddingHorizontal: lightTheme.size[16],
                        paddingTop: lightTheme.size[16],
                        paddingBottom: 70,
                    }}
                    refreshing={listSurveryRequest.isFetching}
                    onRefresh={listSurveryRequest.refetch}
                    data={listSurvery}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderItem(item)}
                    ListEmptyComponent={ListEmptyComponent}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                />
            </View>

            <FloatButtom
                onPress={() => {
                    navigation.navigate("RegisterSurvery", { data: {} });
                }}
            />
        </ContainerDefault>
    );
}
