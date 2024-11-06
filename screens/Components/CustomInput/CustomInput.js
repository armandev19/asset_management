import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function AppInput({
    label,
    outlined,
    placeholder,
    leftIcon,
    rightIcon,
    numLines,
    onChangeHandler,
    secure,
    validate
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>adasdasd</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    label: {
        fontWeight: 500
    },
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    outlined: {
        borderColor: 'darkgrey',
        borderRadius: 4,
        borderWidth: 1,
    },
    standard: {
        borderBottomColor: 'darkgrey',
        borderBottomWidth: 1,

    }
})