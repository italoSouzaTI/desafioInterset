import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackClient } from "@routes/StackClient/StackClient";
import { StackSurviry } from "@routes/StackSurvery/StackSurviry";
import { CustomDrawerContent } from "./CustomDrawerContent/CustomDrawerContent";

type rootDrawer = {
    suveryAction: undefined;
    clientAction: undefined;
};
const Drawer = createDrawerNavigator<rootDrawer>();
export function DrawerCustom() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                swipeEnabled: false,
                headerShown: false,
                swipeEdgeWidth: 0, //caso queira ativar swipe para visualizar menu em todas telas. E so comentar essa linha
            }}
        >
            <Drawer.Screen name="suveryAction" component={StackSurviry} />
            <Drawer.Screen name="clientAction" component={StackClient} />
        </Drawer.Navigator>
    );
}
