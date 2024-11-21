import { ContainerDefault, FloatButtom, Header, Select, Typography } from "@shared/components";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { CardSurvey } from "../components/CardSurvey/CardSurvey";
import { lightTheme } from "@core/theme/theme";
import { useListSuveryModelView } from "./useListSuveryModelView";
import { verticalScale } from "@shared/help/metrics";
import { IlistSurveryDTO } from "../api/dto/listSurveryDTO";
import { styles } from "./styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ButtomCustom } from "@shared/components/Buttom/Buttom";

export function ListSurvery({ navigation }) {
    const {
        listSurveryRequest,
        listSurvery,
        isSelectOpen,
        control,
        listFilterTypeAnomaly,
        listFilterAnomaly,
        listFilterCategory,
        isanomaly,
        openModalFilter,
        top,
        isConnect,
        setListSurvery,
        handleSubmit,
        handleSearch,
        reset,
        setOpenModalFilter,
        onSelectToggle,
    } = useListSuveryModelView();
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
                fnFilter={() => {
                    reset();
                    setOpenModalFilter((state) => !state);
                }}
                viewIconSearch={false}
                labelHeader="Listagem vistorias"
            />
            <View
                style={{
                    flex: 1,
                    top: verticalScale(isConnect ? 30 : 0),
                }}
            >
                <FlatList
                    contentContainerStyle={{
                        paddingHorizontal: lightTheme.size[16],
                        paddingTop: lightTheme.size[16],
                        paddingBottom: 70,
                    }}
                    scrollEnabled={!isSelectOpen}
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
            {openModalFilter && (
                <View style={styles.backgroundModal}>
                    <View style={styles.ContainerView}>
                        <View
                            style={{
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setOpenModalFilter((state) => !state);
                                }}
                                style={{
                                    top: top,
                                }}
                            >
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                top: top,
                                gap: lightTheme.size[16],
                            }}
                        >
                            <Typography label="Pesquisa" sizeSelect="20" familly="BOLD" />
                            <View>
                                <Select
                                    dataItens={isanomaly}
                                    label="Tem anomalia"
                                    restInput={{
                                        placeholder: "Selecione",
                                    }}
                                    formProps={{
                                        name: "isFilterAnomaly",
                                        control,
                                    }}
                                    onToggle={onSelectToggle}
                                />
                            </View>
                            <View>
                                <Select
                                    dataItens={listFilterAnomaly}
                                    label="Anomalia"
                                    restInput={{
                                        placeholder: "Selecione",
                                    }}
                                    formProps={{
                                        name: "filterAnomaly",
                                        control,
                                    }}
                                    onToggle={onSelectToggle}
                                />
                            </View>
                            <View>
                                <Select
                                    dataItens={listFilterTypeAnomaly}
                                    label="Tipo da anomalia"
                                    restInput={{
                                        placeholder: "Selecione",
                                    }}
                                    formProps={{
                                        name: "filterTypeAnomaly",
                                        control,
                                    }}
                                    onToggle={onSelectToggle}
                                />
                            </View>
                            <View>
                                <Select
                                    dataItens={listFilterCategory}
                                    label="Categoria"
                                    restInput={{
                                        placeholder: "Selecione",
                                    }}
                                    formProps={{
                                        name: "filterCategory",
                                        control,
                                    }}
                                    onToggle={onSelectToggle}
                                />
                            </View>
                            <ButtomCustom colorBg="blue-300" onPress={handleSubmit(handleSearch)}>
                                <Typography label="Pesquisar" colorsSelect="white-100" familly="BOLD" />
                            </ButtomCustom>
                            <ButtomCustom
                                colorBg="gray-400"
                                onPress={() => {
                                    setListSurvery(listSurveryRequest.data);
                                    reset();
                                }}
                            >
                                <Typography label="Limpar" colorsSelect="white-100" familly="BOLD" />
                            </ButtomCustom>
                        </View>
                    </View>
                </View>
            )}
        </ContainerDefault>
    );
}
