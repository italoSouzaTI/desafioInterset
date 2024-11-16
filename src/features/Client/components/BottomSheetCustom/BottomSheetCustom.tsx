import { lightTheme } from "@core/theme/theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useDataModalStore } from "@store/useDataModalStore";
import { useCallback, forwardRef, useMemo, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface BottomSheetCustomProps {
    children: ReactNode;
}
const BottomSheetCustom = forwardRef<BottomSheetModal, BottomSheetCustomProps>((props, refBottomSheet) => {
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);
    const snapPoints = useMemo(() => ["35%"], []); // Exemplos de snap points
    return (
        <BottomSheetModal
            ref={refBottomSheet}
            enableDynamicSizing={false}
            snapPoints={snapPoints} // Adicionando snap points
            onChange={handleSheetChanges}
        >
            {props.children}
        </BottomSheetModal>
    );
});
export { BottomSheetCustom };
