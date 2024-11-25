import { useNavigation } from "@react-navigation/native";
import { useNetInfoStore } from "@store/useNetInfoStore";
import { useRegisterSurveryStore } from "@store/useRegisterSurveryStore";
import { CameraView } from "expo-camera";
import { useContext, useRef, useState } from "react";
import { Platform } from "react-native";
import { CropView } from "react-native-image-crop-tools";

export function useCameraCustomModelView() {
    const { register, handleRegisterSate } = useRegisterSurveryStore((state) => state);
    const { goBack } = useNavigation();
    const { isConnect } = useNetInfoStore((state) => state);
    const cameraRef = useRef<CameraView>(null);
    const cropViewRef = useRef<CropView>(null);
    const [isTorch, setIstorch] = useState(false);
    const [isImg, setIsImg] = useState("");
    async function handleCapture() {
        try {
            if (cameraRef.current) {
                const photoData = await cameraRef.current?.takePictureAsync();
                setIsImg((state) => (state = photoData?.uri));
            }
        } catch (error) {}
    }
    const currentPhoto = () => {
        cropViewRef.current?.saveImage(true, 100);
    };
    const handleOnImageCrop = async (res: any) => {
        try {
            const newUri = Platform.OS == "android" ? `file://${res.uri}` : res.uri;
            let newRegister = register;
            newRegister.photo.push({ url: newUri, isSync: isConnect ? true : false });
            handleRegisterSate(newRegister);
            goBack();
        } catch (error) {}
    };
    return {
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
    };
}
