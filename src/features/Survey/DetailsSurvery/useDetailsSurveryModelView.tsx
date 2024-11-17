import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions } from "react-native";

export function useDetailsSurveryModelView() {
    const { params } = useRoute();
    const { goBack, navigate } = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);
    const { width } = Dimensions.get("window");
    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(contentOffsetX / width);
        setActiveIndex(currentIndex);
    };
    function handleEdit() {
        navigate("RegisterSurvery", { data: params.data });
    }
    return {
        activeIndex,
        params,
        handleEdit,
        handleScroll,
        goBack,
    };
}
