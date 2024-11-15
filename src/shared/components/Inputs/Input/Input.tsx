import { Text, TextInput, TextInputProps, View } from "react-native";
import { Controller, UseControllerProps } from "react-hook-form";
import { lightTheme } from "@core/theme/theme";
import { styles } from "./styles";

interface InputProps {
    error?: string;
    label: string;
    formProps: UseControllerProps;
    restInput: TextInputProps;
}
export function Input({ label, restInput, formProps, error = "" }: InputProps) {
    return (
        <Controller
            render={({ field }) => (
                <>
                    <View style={styles.container}>
                        <Text style={styles.title}>{label}</Text>
                        <View
                            style={[
                                styles.containerInput,
                                {
                                    borderColor:
                                        error.length > 0 ? lightTheme.colors["red-300"] : lightTheme.colors["gray-400"],
                                },
                            ]}
                        >
                            <TextInput
                                style={styles.input}
                                value={field.value}
                                onChangeText={(value) => field.onChange(value)}
                                {...restInput}
                            />
                        </View>
                    </View>
                    {error.length > 0 && <Text style={styles.error}>{error}</Text>}
                </>
            )}
            {...formProps}
        />
    );
}
