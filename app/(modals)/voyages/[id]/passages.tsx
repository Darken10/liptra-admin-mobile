import {View, Text, ActivityIndicator, FlatList,StyleSheet,Image} from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router";
import {useQuery} from "@tanstack/react-query";
import {VoyageServices} from "@/src/services/VoyageServices";
import {TicketUltraMini} from "@/src/models/Ticket";
import TicketCard from "@/src/components/my-components/voyage/TicketCard";
import { Ionicons } from '@expo/vector-icons';
import Colors from "@/src/constants/Colors";
import {router} from "expo-router";
import {MaterialIcons} from "@expo/vector-icons";

import DropdownMenu from "@/src/components/my-components/DropdownMenu";

import PageHeader from "@/src/components/my-components/Header";

export default function Passages() {
    const params = useLocalSearchParams()
    const id = params.id as string;
    const {data,isLoading,error} = useQuery({
        queryKey : ['voyage_instance',id,'passagers'],
        queryFn : ()=>VoyageServices.getPassagesVoyage(id)
    })
    const tickets : TicketUltraMini[] = data?.data ?? []
    console.log("Passage : "+data?.data.length)

    if(isLoading){
        return (
            <ActivityIndicator style={{marginTop : 100}} size={"large"} />
        );
    }

    if(error){
        return <View style={{marginTop : 100}}>
            ERROR : {error.message}
        </View>;
    }

    return (
        <View style={styles.container}>

                <FlatList
                    data={tickets}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <TicketCard ticket={item} />}
                    ListEmptyComponent={() => (
                        <View >
                            <Ionicons name="ticket-outline" size={64} color="#ccc" />
                            <Text >Aucun ticket trouvé</Text>
                        </View>
                    )}
                />
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },/*
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
    emptyContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyBox: {
        alignItems: 'center',
    },
    emptyText: {
        marginTop: 12,
        fontSize: 16,
        color: '#888',
    },*/
});