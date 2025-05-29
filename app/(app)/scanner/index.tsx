import {Button, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Link, router} from "expo-router";
import PageHeader from "@/src/components/my-components/Header";
import {MaterialIcons} from "@expo/vector-icons";

export default function ScannerIndex() {

    const statusBarHeight = StatusBar.currentHeight
    return (
        <SafeAreaView style={{flex : 1}}>
            <Header />
            <View style={styles.cardLinksView}>
                <View style={styles.cardLinkView}>
                    <TouchableOpacity onPress={()=>{router.push('/scanner/scanner')}} style={styles.cardLink}>
                        <>
                            <MaterialIcons name={"qr-code-scanner"} size={200}></MaterialIcons>
                            <Text style={styles.cardLinkText}>Open Valider QR Code</Text>
                        </>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardLinkView}>
                    <TouchableOpacity onPress={()=>{router.push('/scanner/validerParCode')}} style={styles.cardLink}>
                        <>
                            <MaterialIcons name="keyboard" size={200}></MaterialIcons>
                            <Text style={styles.cardLinkText}>Open Valider par code</Text>
                        </>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

function Header() {

    return (
        <PageHeader
            /*leftNode={router.canGoBack() ? <MaterialIcons name="arrow-back" size={26} color={"#e3e3e3"} /> : null}*/
            headerText="Liptra"
            rightContainerStyle={styles.rightContainer}
            handleOnPressLeftNode={router.back}
            rightNode={
                <Image
                    style={styles.profilePhoto}
                    source={require("@/assets/images/user.png")}
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    profilePhoto: {
        height: 36,
        width: 36,
        borderRadius: 36,
        backgroundColor: '#F3F4F6', // Equivalent à text-gray-100
    },
    rightContainer: {
        flex: 1,
        paddingRight: 16,
        alignItems: 'flex-end',
        paddingVertical: 8,
    },
    cardLinksView : {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    cardLinkView : {
        flex: 1/2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        gap : 16,
        padding :16,
        marginVertical : 16,
        borderRadius: 30,
        borderWidth: 1,
        backgroundColor: '#eaeaeb',

    },
    cardLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    cardLinkText: {
        fontSize: 18,
        fontWeight: 'bold',

    }

})
