import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { SafeAreaProvider } from "react-native-safe-area-context";
import NetInfoProvider from "./src/provider/NetInfoContext";
import { lightTheme } from "@core/theme/theme";
import { Conection } from "@shared/components";
import {
    useFonts,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_700Bold,
} from "@expo-google-fonts/roboto-mono";
import { StackClient, StackSurviry } from "@routes/index";
import { DrawerCustom } from "@routes/DrawerCustom/DrawerCustom";

export default function App() {
    let [fontsLoaded] = useFonts({
        RobotoMono_400Regular,
        RobotoMono_500Medium,
        RobotoMono_700Bold,
    });
    if (!fontsLoaded) {
        return <View />;
    }
    return (
        <>
            <StatusBar backgroundColor={lightTheme.colors["white-100"]} style="dark" />
            <GestureHandlerRootView style={styles.container}>
                <NavigationContainer>
                    <SafeAreaProvider>
                        <NetInfoProvider>
                            <Conection />
                            <BottomSheetModalProvider>
                                <DrawerCustom />
                            </BottomSheetModalProvider>
                        </NetInfoProvider>
                    </SafeAreaProvider>
                </NavigationContainer>
            </GestureHandlerRootView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightTheme.colors["white-300"],
    },
});
