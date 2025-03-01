import {StyleSheet, Text, View, ViewProps} from 'react-native'
import React from 'react'
import Colors from '@/src/constants/Colors'
import {MaterialIcons} from "@expo/vector-icons";

type Props = {
    message?: string,
}

export default function ErrorComponent({message}: Props) {
    return (
        <View style={styles.erroView}>
            <MaterialIcons name={"error"} size={34} color={Colors.light.error}/>
            <Text style={styles.errorText}>{message}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    erroView: {
        display: 'flex',
        flexDirection: 'row',
        gap : 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(205,56,56,0.30)",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderWidth: 1.5,
        borderColor: Colors.light.error,
        borderRadius : 8,
        marginHorizontal : 16
    },
    errorText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.error,
    }
})
