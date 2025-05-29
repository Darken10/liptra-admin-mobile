import {ActivityIndicator, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import VoyageListItem from "@/src/components/my-components/VoyageListItem";
import {IVoyage} from "@/src/models/ResponseInterfaces";
import {Bus, RabbitIcon} from "lucide-react-native";
import Colors from "@/src/constants/Colors";
import PageHeader from "@/src/components/my-components/Header";
import {router} from "expo-router";
import DropdownMenu from "@/src/components/my-components/DropdownMenu";
import useFetchQuery from "@/src/hooks/useFetchQuery";
import {MaterialIcons} from "@expo/vector-icons";
import {useQuery} from "@tanstack/react-query";
import {VoyageServices} from "@/src/services/VoyageServices";
import {GetAvalableVoyage, VoyageListTypes} from "@/src/models/Voyages";

export default function Index() {

    const {data,isLoading,error} = useQuery({
        queryKey:['/voyages/today'],
        queryFn:VoyageServices.getAvailableVoyages
    })
    console.log("voyages 222: ", data?.data);
    const  voyages : VoyageListTypes[] =data?.data ?? []

    if (isLoading) {
        return <ActivityIndicator/>
    }

    if (error) {
        return <View>
            <View>
                <Text>Error  : {error.message}</Text>
            </View>
        </View>;
    }


    return (
        <SafeAreaView style={[styles.container,{backgroundColor : Colors.light.background}]}>
            <Header />
           <View style={styles.container}>
               {
                   voyages.length > 0
                       ? <FlatList data={voyages} keyExtractor={(item) => item.id.toString()}
                                   renderItem={({item}) => (
                                       <VoyageListItem voyage={item} />
                                   )}
                       />
                       : <Empty></Empty>
               }
           </View>
        </SafeAreaView>
    )
}


const Empty = () => {

    return (
        <View style={styles.emptyView}>
            <Bus size={150} color={Colors.light.gray} />
            <Text style={styles.emptyViewText}>PAS DE VOYAGE</Text>
        </View>
    )
}

function Header() {
    const menuItems = [{
        title : "Profile",
        onPress: () => {console.log("menuItems clicked profile");}
    },{
        title : "Parametre",
        onPress: () => {}
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
    emptyView : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display : 'flex',
        flexDirection: 'column',
    },
    emptyViewText: {
        fontSize: 34,
        fontWeight: 'bold',
        color: Colors.light.gray,
        marginTop : 16,
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