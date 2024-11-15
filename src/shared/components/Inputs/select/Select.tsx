import { ScrollView, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, UseControllerProps } from "react-hook-form";
import { styles } from "./styles";
import { lightTheme } from "@core/theme/theme";
interface InputProps {
    error?: string;
    label: string;
    dataItens: { label: string; value: string }[];
    formProps: UseControllerProps;
    restInput: TextInputProps;
}
export function Select({ label, dataItens, restInput, formProps, error = "" }: InputProps) {
    const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
    return (
        <Controller
            render={({ field }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>{label}</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            styles.containerInput,
                            {
                                borderColor:
                                    error.length > 0 ? lightTheme.colors["red-300"] : lightTheme.colors["gray-400"],
                            },
                        ]}
                        onPress={() => {
                            setIsOpenSelect((prevState) => !prevState);
                        }}
                    >
                        <TextInput style={styles.input} value={field.value} {...restInput} editable={false} />
                        <AntDesign name="caretdown" size={lightTheme.size[16]} color={lightTheme.colors["gray-400"]} />
                    </TouchableOpacity>
                    <>{error.length > 0 && <Text style={styles.error}>{error}</Text>}</>
                    {isOpenSelect && (
                        <View style={styles.listSelect}>
                            <ScrollView
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    padding: lightTheme.size["8"],
                                    gap: lightTheme.size["8"],
                                }}
                            >
                                {dataItens.map((item) => (
                                    <TouchableOpacity
                                        style={styles.itemSelect}
                                        key={item.label}
                                        onPress={() => {
                                            field.onChange(item.value);
                                            setIsOpenSelect((prevState) => !prevState);
                                        }}
                                    >
                                        <Text>{item.value}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>
            )}
            {...formProps}
        />
    );
}
