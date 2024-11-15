import { ListClient } from "@features/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type RootStackClient = {
    ListClient: undefined;
};
const clientStack = createNativeStackNavigator<RootStackClient>();
export function StackClient() {
    return (
        <clientStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="ListClient"
        >
            <clientStack.Screen name="ListClient" component={ListClient} />
        </clientStack.Navigator>
    );
}
