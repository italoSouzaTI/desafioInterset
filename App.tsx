import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { lightTheme } from "@core/theme/theme";
import { Conection } from "@shared/components";
import {
    useFonts,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_700Bold,
} from "@expo-google-fonts/roboto-mono";
import "./ReactotronConfig";
import { DrawerCustom } from "@routes/DrawerCustom/DrawerCustom";
import NetInfoProvider from "@core/provider/NetInfoContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SQLiteProvider } from "expo-sqlite";
import { initialDatabase } from "@core/model/initialDatabase";
const queryClient = new QueryClient();
export default function App() {
    let [fontsLoaded] = useFonts({
        RobotoMono_400Regular,
        RobotoMono_500Medium,
        RobotoMono_700Bold,
    });
    return (
        <>
            <StatusBar backgroundColor={lightTheme.colors["white-100"]} style="dark" />
            <GestureHandlerRootView style={styles.container}>
                <SQLiteProvider databaseName="desafio.db" onInit={initialDatabase}>
                    <NavigationContainer>
                        <SafeAreaProvider>
                            <NetInfoProvider>
                                <QueryClientProvider client={queryClient}>
                                    <BottomSheetModalProvider>
                                        {fontsLoaded ? (
                                            <>
                                                <Conection />
                                                <DrawerCustom />
                                            </>
                                        ) : (
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                        resizeMode: "contain",
                                                    }}
                                                    source={require("./assets/splash-icon.png")}
                                                />
                                            </View>
                                        )}
                                    </BottomSheetModalProvider>
                                </QueryClientProvider>
                            </NetInfoProvider>
                        </SafeAreaProvider>
                    </NavigationContainer>
                </SQLiteProvider>
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
