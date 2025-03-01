import {SafeAreaView, StatusBar, StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'
import {router, useLocalSearchParams} from "expo-router";
import PageHeader from '@/src/components/my-components/Header';
import {MaterialIcons} from "@expo/vector-icons";
import DropdownMenu from "@/src/components/my-components/DropdownMenu";
import useFetchQuery from "@/src/hooks/useFetchQuery";

export default function ShowVoyage() {

    const statusBarHeight = StatusBar.currentHeight
    const params = useLocalSearchParams()
    const id = params.id as string;
    const {data:voyage} = useFetchQuery("/compagnie/voyages/"+id+"?date="+get)
    console.log(voyage)

    return (
        <SafeAreaView style={[styles.container,{marginTop : statusBarHeight ?? 50}]}>
            <Header />
            <View>
               {/* <View style={styles.globaleView}>
                    <View style={styles.villesView}>
                        <Text style={styles.villeNameText}>{voyage.trajet.depart.name ?? ""} </Text>
                        <ArrowRight size={24} color={Colors.light.darkGray}/>
                        <Text style={styles.villeNameText}>{voyage.trajet.arriver.name ?? ""}</Text>
                    </View>
                    <View style={styles.DateView}>
                        <Text style={styles.DateText}>{getNextClosestDate(voyage.days).toDateString()}</Text>
                    </View>
                    <View style={styles.DateView}>
                        <Text style={styles.DateText}>{date(voyage.heure)?.toLocaleTimeString()}</Text>
                    </View>
                </View>*/}

                <View>
                    <Text>Voyage id : {id}</Text>
                </View>
            </View>

        </SafeAreaView>

    )
}


function Header() {
    const menuItems = [{
        title : "Profile",
        onPress: () => {console.log("menuItems clicked profile");}
    },{
        title : "Parametre",
        onPress: () => {console.log("menuItems clicked Parametre");}
    },

    ]
    return (
        <PageHeader
            /*leftNode={router.canGoBack() ? <MaterialIcons name="arrow-back" size={26}  color={"#e3e3e3"}/> : null}*/
            headerText="Liptra"
            rightContainerStyle={styles.rightContainer}
            handleOnPressLeftNode={router.back}
            leftNode={router.canGoBack() ? <MaterialIcons name="arrow-back" size={26} color={"#e3e3e3"}/> : null}
            rightNode={
                <View style={{display : "flex", flexDirection : 'row',alignItems : 'center',justifyContent : "center"}}>
                    <Image
                        style={styles.profilePhoto}
                        source={require("@/assets/images/user.png")}
                    />
                    <DropdownMenu options={menuItems} />
                </View>
            }
        />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    globaleView : {
        flex: 1,
        borderRadius : 14,
    },
    villesView: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        position : "relative",
        alignItems: 'center',
        gap : 16,
        flexWrap : 'wrap',

    },
    villeNameText : {
        fontSize : 16,
        fontWeight : 'bold',
    },
    DateView : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    DateText: {
        marginVertical: 2,
        fontSize : 16,
        fontWeight : '500',
    },
})