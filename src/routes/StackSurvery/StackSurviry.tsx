import { ListSurvery, RegisterSurvery } from "@features/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type RootStackSurviry = {
    ListSurvery: undefined;
    RegisterSurvery: undefined;
};
const SurviryStack = createNativeStackNavigator<RootStackSurviry>();
export function StackSurviry() {
    return (
        <SurviryStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="ListSurvery"
        >
            <SurviryStack.Screen name="ListSurvery" component={ListSurvery} />
            <SurviryStack.Screen name="RegisterSurvery" component={RegisterSurvery} />
        </SurviryStack.Navigator>
    );
}
