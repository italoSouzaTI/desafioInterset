import { ListSurvery, RegisterSurvery } from "@features/index";
import { IlistSurveryDTO } from "@features/Survey/api/dto/listSurveryDTO";
import { DetailsSurvery } from "@features/Survey/DetailsSurvery/DetailsSurvery";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CameraCustom } from "@shared/components";

type RootStackSurviry = {
    ListSurvery: undefined;
    RegisterSurvery: { data: IlistSurveryDTO };
    DetailsSurvery: { data: IlistSurveryDTO };
    CameraCustom: undefined;
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
            <SurviryStack.Screen name="DetailsSurvery" component={DetailsSurvery} />
            <SurviryStack.Screen name="CameraCustom" component={CameraCustom} />
        </SurviryStack.Navigator>
    );
}
