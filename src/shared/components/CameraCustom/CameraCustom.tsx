import { CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { CropView } from "react-native-image-crop-tools";
import { styles } from "./styles";
import { Dimensions, Platform, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { lightTheme } from "@core/theme/theme";
import { verticalScale } from "@shared/help/metrics";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../Header/Header";
import { Typography } from "../Typography/Typography";
import { useCameraCustomModelView } from "./useCameraCustomModelView";

export function CameraCustom() {
    const {
        cameraRef,
        cropViewRef,
        isTorch,
        isImg,
        goBack,
        setIstorch,
        setIsImg,
        handleCapture,
        currentPhoto,
        handleOnImageCrop,
    } = useCameraCustomModelView();
    return (
        <>
            <Header isMenu={false} isIconRight={false} fnLeft={() => goBack()} labelHeader="" />
            {isImg.length ? (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: lightTheme.colors["black-300"],
                    }}
                >
                    <CropView
                        sourceUrl={isImg}
                        style={{
                            flex: 1,
                            width: Dimensions.get("screen").width,
                            height: Dimensions.get("window").height,
                        }}
                        ref={cropViewRef}
                        onImageCrop={(e) => handleOnImageCrop(e)} // Atualiza a função de callback
                        iosDimensionSwapEnabled={false}
                    />
                    <View
                        style={[
                            styles.containerBtn,
                            {
                                bottom: 20,
                                padding: lightTheme.size[16],
                            },
                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setIsImg((state) => (state = ""));
                            }}
                        >
                            <MaterialIcons
                                name="delete"
                                color={lightTheme.colors["white-100"]}
                                size={verticalScale(32)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                cropViewRef.current?.rotateImage();
                            }}
                        >
                            <FontAwesome
                                name="rotate-left"
                                color={lightTheme.colors["white-100"]}
                                size={verticalScale(32)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={currentPhoto}>
                            <Typography colorsSelect="white-100" label="Confirmar" familly="BOLD" />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <>
                    <CameraView
                        ref={cameraRef}
                        style={{
                            flex: 1,
                            top: verticalScale(30),
                        }}
                        focusable
                        enableTorch={isTorch}
                    ></CameraView>
                    <View style={styles.containerBtn}>
                        <View
                            style={{
                                padding: 24,
                            }}
                        />
                        <TouchableOpacity onPress={handleCapture}>
                            <MaterialCommunityIcons
                                name="checkbox-blank-circle"
                                color={lightTheme.colors["white-100"]}
                                size={verticalScale(56)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setIstorch((prevState) => !prevState);
                            }}
                        >
                            <Ionicons
                                name="flash-sharp"
                                color={isTorch ? lightTheme.colors["white-100"] : lightTheme.colors["yellow-500"]}
                                size={verticalScale(32)}
                            />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </>
    );
}
