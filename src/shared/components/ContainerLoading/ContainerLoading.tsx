import { ActivityIndicator, View } from "react-native";
import { ContainerDefault } from "../ContainerDefault/ContainerDefault";
import { Header } from "../Header/Header";
import { Typography } from "../Typography/Typography";
import { styles } from "./styles";
import { lightTheme } from "@core/theme/theme";

interface ContainerLoadingProps {
    headerLabel: string;
    containerLabel: string;
}
export function ContainerLoading({ headerLabel, containerLabel }: ContainerLoadingProps) {
    return (
        <ContainerDefault>
            <Header isMenu isIconRight={false} fnLeft={() => {}} labelHeader={headerLabel} />
            <View style={styles.container}>
                <ActivityIndicator size={"large"} color={lightTheme.colors["blue-300"]} animating={true} />
                <Typography label={containerLabel} />
            </View>
        </ContainerDefault>
    );
}
