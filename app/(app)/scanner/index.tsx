import {Button, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Link} from "expo-router";

export default function ScannerIndex() {
    return (
        <View>
            <Text>Scanner Index</Text>
            <Link href={"/scanner/modal"} >Ticket Information</Link>
            <Link href={"/scanner/scanner"} >Open Valider QR Code</Link>
            <Link href={"/scanner/validerParCode"} >Open Valider par code</Link>

        </View>
    )
}
const styles = StyleSheet.create({})
