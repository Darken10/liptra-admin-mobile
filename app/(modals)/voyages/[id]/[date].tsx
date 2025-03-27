import {FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {router, useLocalSearchParams} from "expo-router";
import useFetchQuery from "@/src/hooks/useFetchQuery";
import PageHeader from "@/src/components/my-components/Header";
import {MaterialIcons} from "@expo/vector-icons";
import DropdownMenu from "@/src/components/my-components/DropdownMenu";
import {ITicketPassager} from "@/src/models/ResponseInterfaces";
import PassagerItem from "@/src/components/my-components/PassagerItem";

export default function Date() {

    const statusBarHeight = StatusBar.currentHeight
    const params = useLocalSearchParams()
    const id = params.id as string;
    const date = params.date as string;
    console.log(date)
    const {data:tickets}  = useFetchQuery("/compagnie/voyages/"+id+"?date="+date) as {data : ITicketPassager[]}
    console.log('ticket : ',tickets)

    return (
        <SafeAreaView style={[styles.container,{marginTop : statusBarHeight ?? 50}]}>
            <Header />
            <View>
                <FlatList
                    data={tickets} keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (<PassagerItem passagerTicket={item}  />)}
                />
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
})