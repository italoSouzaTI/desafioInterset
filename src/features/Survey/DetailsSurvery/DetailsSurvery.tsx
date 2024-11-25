import { ContainerDefault, Header, Typography } from "@shared/components";
import { Dimensions, FlatList, Image, View } from "react-native";
import { styles } from "./styles";
import { useDetailsSurveryModelView } from "./useDetailsSurveryModelView";
import { ScrollView } from "react-native-gesture-handler";
import { lightTheme } from "@core/theme/theme";
import { formartDate } from "@shared/help/formatDate";
import { ButtomCustom } from "@shared/components/Buttom/Buttom";

export function DetailsSurvery() {
    const { activeIndex, params, handleScroll, goBack, handleEdit } = useDetailsSurveryModelView();
    function colorBagde(item: string) {
        if (item == "Alta") {
            return (
                <View style={[styles.bagde, { backgroundColor: lightTheme.colors["green-300"] }]}>
                    <Typography label="Alta" colorsSelect="white-200" sizeSelect="12" familly="BOLD" />
                </View>
            );
        } else if (item == "Não informado") {
            return (
                <View style={[styles.bagde, { backgroundColor: lightTheme.colors["gray-300"] }]}>
                    <Typography label="Não informado" colorsSelect="white-200" sizeSelect="12" familly="BOLD" />
                </View>
            );
        } else if (item == "Baixa") {
            return (
                <View style={[styles.bagde, { backgroundColor: lightTheme.colors["red-300"] }]}>
                    <Typography label="Baixa" colorsSelect="red-500" sizeSelect="12" familly="BOLD" />
                </View>
            );
        } else if (item == "Média") {
            return (
                <View style={[styles.bagde, { backgroundColor: lightTheme.colors["orange-500"] }]}>
                    <Typography label="Média" colorsSelect="white-200" sizeSelect="12" familly="BOLD" />
                </View>
            );
        }
    }
    function renderItem(item: any) {
        return (
            <Image
                source={{ uri: item.hasOwnProperty("url") ? item.url : item }}
                style={{
                    width: Dimensions.get("window").width, // A imagem ocupa toda a largura da tela
                    height: 300, // Define a altura da imagem
                    resizeMode: "contain",
                }}
            />
        );
    }
    function ListEmptyComponent() {
        return <Typography label="Nenhuma imagem registrada." colorsSelect="white-100" />;
    }
    return (
        <ContainerDefault>
            <Header
                fnLeft={() => {
                    goBack();
                }}
                isMenu={false}
                labelHeader="Detalhe vistoria"
                isIconRight={false}
            />
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <FlatList
                        data={params.data.fotos}
                        keyExtractor={(item) => item}
                        horizontal
                        pagingEnabled
                        onScroll={handleScroll}
                        contentContainerStyle={{
                            justifyContent: "center", // Centraliza verticalmente o conteúdo
                            alignItems: "center",
                        }}
                        renderItem={({ item }) => renderItem(item)}
                        ListEmptyComponent={ListEmptyComponent}
                    />
                    <View style={styles.pageIndicatorContainer}>
                        {params.data.fotos.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.pageIndicatorDot,
                                    index === activeIndex && styles.activePageIndicatorDot, // Alinha o estilo ativo
                                ]}
                            />
                        ))}
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        gap: lightTheme.size[16],
                        padding: lightTheme.size[16],
                    }}
                >
                    <View style={styles.containerCard}>
                        <View style={styles.row}>
                            <View style={styles.space}>
                                <Typography label="Categoria " sizeSelect="14" colorsSelect="black-200" />
                                <Typography
                                    label={colorBagde(params.data.categoria?.descricao ?? "Não informado")}
                                    familly="BOLD"
                                    sizeSelect="14"
                                />
                            </View>
                            <View style={styles.space}>
                                <Typography
                                    label="Criado em "
                                    sizeSelect="14"
                                    colorsSelect="black-200"
                                    style={{ textAlign: "right" }}
                                />
                                <Typography
                                    label={params.data.dataHora ? formartDate(params.data.dataHora) : "Não informado"}
                                    familly="BOLD"
                                    sizeSelect="14"
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.space}>
                                <Typography label="Anomalia " sizeSelect="14" colorsSelect="black-200" />
                                <Typography
                                    label={params.data.anomalia?.nome ?? "Não informado"}
                                    familly="BOLD"
                                    sizeSelect="14"
                                />
                            </View>
                            <View style={styles.space}>
                                <Typography
                                    label="Tipo "
                                    sizeSelect="14"
                                    colorsSelect="black-200"
                                    style={{ textAlign: "right" }}
                                />
                                <Typography
                                    label={params.data.tipo?.descricao ?? "Não informado"}
                                    familly="BOLD"
                                    sizeSelect="14"
                                />
                            </View>
                        </View>
                        <View style={styles.space}>
                            <Typography label="Observação " sizeSelect="14" colorsSelect="black-200" />
                            <Typography
                                label={params.data.observacao ?? "Não informado"}
                                familly="BOLD"
                                sizeSelect="14"
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.containerBtn}>
                    <ButtomCustom onPress={handleEdit} colorBg={"yellow-500"}>
                        <Typography label="Editar" familly="BOLD" colorsSelect={"black-300"} sizeSelect="18" />
                    </ButtomCustom>
                </View>
            </View>
        </ContainerDefault>
    );
}
