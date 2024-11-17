import { lightTheme } from "@core/theme/theme";
import { ContainerDefault, Header, Select, TextArea, Typography } from "@shared/components";
import { ActivityIndicator, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useRegisterSurveryModelView } from "./useRegisterSurveryModelView";
import { verticalScale } from "@shared/help/metrics";
import { ButtomCustom } from "@shared/components/Buttom/Buttom";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { styles } from "./style";

export function RegisterSurvery() {
    const {
        control,
        errors,
        params,
        listInternalArea,
        isSelectOpen,
        anomaly,
        scrollRef,
        listTypeAnomaly,
        listCategory,
        registerStore,
        isanomaly,
        listAnomaly,
        isLoadingSend,
        isloadingDelete,
        handleCamera,
        handleGoBack,
        removePhoto,
        onSelectToggle,
        handleSubmit,
        handleSave,
    } = useRegisterSurveryModelView();

    return (
        <ContainerDefault>
            <Header
                fnLeft={handleGoBack}
                labelHeader={params.data?.id ? "Editar vitoria" : "Registrar vitoria"}
                isMenu={false}
                isIconRight={false}
            />
            <View
                style={{
                    flex: 1,
                    top: verticalScale(30),
                }}
            >
                <ScrollView
                    ref={scrollRef}
                    scrollEnabled={!isSelectOpen}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: lightTheme.size[16],
                        paddingVertical: verticalScale(40),
                        gap: lightTheme.size[16],
                    }}
                >
                    <Select
                        label="Área da vistoria"
                        error={errors.inspectionArea?.message}
                        formProps={{
                            name: "inspectionArea",
                            control,
                            rules: {
                                required: "A seleção de um item é obrigatorio.",
                            },
                        }}
                        restInput={{
                            placeholder: "Selecione",
                        }}
                        onToggle={onSelectToggle}
                        dataItens={listInternalArea}
                    />
                    <Select
                        label="tem anomalia"
                        error={errors.isAnomaly?.message}
                        formProps={{
                            name: "isAnomaly",
                            control,
                            rules: {
                                required: "A seleção de um item é obrigatorio.",
                            },
                        }}
                        restInput={{
                            placeholder: "Selecione",
                        }}
                        onToggle={onSelectToggle}
                        dataItens={isanomaly}
                    />
                    <Select
                        label="Tipo anomalia"
                        error={errors.typeAnomaly?.message}
                        formProps={{
                            name: "typeAnomaly",
                            control,
                            rules: {
                                required: "A seleção de um item é obrigatorio.",
                            },
                        }}
                        restInput={{
                            placeholder: "Selecione",
                        }}
                        onToggle={onSelectToggle}
                        dataItens={listTypeAnomaly}
                    />
                    <Select
                        label="Anomalia"
                        error={errors.anomaly?.message}
                        formProps={{
                            name: "anomaly",
                            control,
                            rules: {
                                required: "A seleção de um item é obrigatorio.",
                            },
                        }}
                        restInput={{
                            placeholder: "Selecione",
                        }}
                        onToggle={onSelectToggle}
                        dataItens={listAnomaly}
                    />
                    <Select
                        label="Categoria"
                        error={errors.category?.message}
                        formProps={{
                            name: "category",
                            control,
                            rules: {
                                required: "A seleção de um item é obrigatorio.",
                            },
                        }}
                        restInput={{
                            placeholder: "Selecione",
                        }}
                        onToggle={onSelectToggle}
                        dataItens={listCategory}
                    />
                    <TextArea
                        error={errors.description?.message}
                        formProps={{
                            name: "description",
                            control,
                        }}
                        label="Descrição"
                        restInput={{
                            placeholder: "Descreva sua observação",
                        }}
                    />
                    <Typography label="Fotos da vistoria" familly="BOLD" sizeSelect="16" />
                    {/* Recuperar fotos  aqui*/}
                    <View style={styles.containerRow}>
                        {registerStore.register.photo.map((item) => (
                            <View style={{ position: "relative" }} key={item.url}>
                                {isloadingDelete ? (
                                    <View
                                        style={{
                                            position: "absolute",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            zIndex: 9,
                                        }}
                                    >
                                        <ActivityIndicator
                                            size={lightTheme.size[32]}
                                            color={lightTheme.colors["white-100"]}
                                            animating={isloadingDelete}
                                        />
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.btnClosed}
                                        onPress={() => {
                                            removePhoto(item);
                                        }}
                                    >
                                        <AntDesign name="closecircle" size={24} color={lightTheme.colors["red-500"]} />
                                    </TouchableOpacity>
                                )}

                                <Image style={styles.containerPhoto} source={{ uri: item.url }} />
                            </View>
                        ))}

                        <TouchableOpacity style={styles.containerPhoto} onPress={handleCamera}>
                            <FontAwesome5
                                name="plus"
                                color={lightTheme.colors["gray-300"]}
                                size={lightTheme.size[24]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            paddingTop: lightTheme.size[32],
                        }}
                    >
                        <ButtomCustom
                            onPress={handleSubmit(handleSave)}
                            colorBg={params.data?.id ? "yellow-500" : "green-300"}
                        >
                            {isLoadingSend ? (
                                <ActivityIndicator
                                    size={lightTheme.size[32]}
                                    color={lightTheme.colors["white-100"]}
                                    animating={isLoadingSend}
                                />
                            ) : (
                                <Typography
                                    label="Salvar"
                                    familly="BOLD"
                                    colorsSelect={params.data?.id ? "black-300" : "white-200"}
                                    sizeSelect="18"
                                />
                            )}
                        </ButtomCustom>
                    </View>
                </ScrollView>
            </View>
        </ContainerDefault>
    );
}
