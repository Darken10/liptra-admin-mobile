import {View, Text, ActivityIndicator, FlatList,StyleSheet,Image} from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router";
import {useQuery} from "@tanstack/react-query";
import {VoyageServices} from "@/src/services/VoyageServices";
import {TicketUltraMini} from "@/src/models/Ticket";
import TicketCard from "@/src/components/my-components/voyage/TicketCard";
import { Ionicons } from '@expo/vector-icons';

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
    },
});