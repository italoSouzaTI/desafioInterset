import { ContainerDefault, FloatButtom, Header, Typography } from "@shared/components";
import { FlatList, View } from "react-native";
import { CardSurvey } from "../components/CardSurvey/CardSurvey";
import { lightTheme } from "@core/theme/theme";

export function ListSurvery() {
    function renderItem() {
        return <CardSurvey />;
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
