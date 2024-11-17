import { ScrollView, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, UseControllerProps } from "react-hook-form";
import { styles } from "./styles";
import { lightTheme } from "@core/theme/theme";
import { Typography } from "@shared/components/Typography/Typography";
interface InputProps {
    error?: string;
    label: string;
    dataItens: { label: string; value: string; description?: string }[];
    formProps: UseControllerProps;
    restInput: TextInputProps;
    onToggle: Function;
}
export function Select({ label, dataItens, restInput, formProps, error = "", onToggle }: InputProps) {
    const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
    const handleToggle = () => {
        const newState = !isOpenSelect;
        setIsOpenSelect(newState);
        onToggle(newState); // Notifica o componente pai sobre a mudança de estado
    };
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
                            handleToggle();
                        }}
                    >
                        <TextInput style={styles.input} value={field.value?.value} {...restInput} editable={false} />
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
                                {dataItens.map((item, index) => (
                                    <TouchableOpacity
                                        style={styles.itemSelect}
                                        key={item.label + index}
                                        onPress={() => {
                                            field.onChange(item);
                                            handleToggle();
                                        }}
                                    >
                                        <Typography label={item.value} familly="MEDIUM" />
                                        {item.description && (
                                            <Typography
                                                sizeSelect="12"
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                                label={item.description}
                                            />
                                        )}
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
