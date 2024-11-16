import { lightTheme } from "@core/theme/theme";
import { Card, ContainerDefault, Header, Input, Typography } from "@shared/components";
import { FlatList, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetCustom } from "../components/BottomSheetCustom/BottomSheetCustom";
import { useListClientModelView } from "./useListClientModelView";
import { ContainerLoading } from "@shared/components/ContainerLoading/ContainerLoading";
import { IClientDTO } from "../api/dto/client";
import { AntDesign } from "@expo/vector-icons";
import { verticalScale } from "@shared/help/metrics";

export function ListClient({ navigation }) {
    const {
        refBottomSheet,
        userSelect,
        listClient,
        queryAllResponse,
        isLoading,
        isSearch,
        control,
        setValue,
        setIsSearch,
        handlePresentModalPress,
    } = useListClientModelView();
    function renderItem(item: IClientDTO) {
        return (
            <Card
                onPress={() => {
                    handlePresentModalPress(item);
                }}
            >
                <View style={styles.row}>
                    <View
                        style={{
                            gap: lightTheme.size[8],
                        }}
                    >
                        <Typography label="Nome" sizeSelect="12" colorsSelect="black-200" familly="BOLD" />
                        <Typography label={item.nome} sizeSelect="14" familly="BOLD" />
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
        return <Typography label="Nenhuma vistoria encontrada." style={{ textAlign: "center" }} />;
    }
    function ItemSeparatorComponent() {
        return <View style={{ width: "100%", height: lightTheme.size[16] }} />;
    }

    if (isLoading) {
        <ContainerLoading headerLabel="Listagem Clientes" containerLabel="Carregando lista de clientes" />;
    }

    return (
        <ContainerDefault>
            <Header
                isMenu
                isIconRight={true}
                isFilter={false}
                isSearch={isSearch}
                fnSearch={() => setIsSearch((state) => !state)}
                fnLeft={() => {
                    navigation.toggleDrawer();
                }}
                labelHeader="Listagem Clientes"
                customActions={
                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row",
                            gap: lightTheme.size[8],
                            alignItems: "center",
                            paddingHorizontal: lightTheme.size[16],
                            justifyContent: "space-between",
                        }}
                    >
                        <View style={{ width: "90%" }}>
                            <Input
                                formProps={{
                                    name: "searchcClient",
                                    control,
                                }}
                                restInput={{
                                    placeholder: "Pesquise pelo nome, telefone e email",
                                }}
                            />
                        </View>

                        <TouchableOpacity
                            style={{
                                width: "10%",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                setValue("searchcClient", "");
                                setIsSearch((state) => !state);
                            }}
                        >
                            <AntDesign name="close" size={lightTheme.size[22]} color={lightTheme.colors["gray-300"]} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <View
                style={{
                    flex: 1,
                    top: verticalScale(30),
                }}
            >
                <FlatList
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: lightTheme.size[16],
                        paddingTop: lightTheme.size[16],
                        paddingBottom: 40,
                    }}
                    data={listClient}
                    renderItem={({ item }) => renderItem(item)}
                    ListEmptyComponent={ListEmptyComponent}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    refreshing={queryAllResponse.isFetching}
                    onRefresh={queryAllResponse.refetch}
                />
            </View>

            <BottomSheetCustom ref={refBottomSheet}>
                <BottomSheetView style={styles.containerBottomSheet}>
                    <View style={{ gap: lightTheme.size[8] }}>
                        <Typography label="Nome" />
                        <Typography label={userSelect.nome} familly="BOLD" />
                    </View>
                    <View style={{ gap: lightTheme.size[8] }}>
                        <Typography label="Email" />
                        <Typography
                            label={userSelect.email.length > 0 ? userSelect.email : "Não informado"}
                            familly="BOLD"
                        />
                    </View>
                    <View style={{ gap: lightTheme.size[8] }}>
                        <Typography label="Telefone" />
                        <Typography
                            label={userSelect.telefone.length > 0 ? userSelect.telefone : "Não informado"}
                            familly="BOLD"
                        />
                    </View>
                </BottomSheetView>
            </BottomSheetCustom>
        </ContainerDefault>
    );
}
