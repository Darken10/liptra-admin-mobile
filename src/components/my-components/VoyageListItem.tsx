import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {IVoyage} from "@/src/models/ResponseInterfaces";
import {router} from "expo-router";
import {ArrowLeft, ArrowRight} from "lucide-react-native";
import Colors from '@/src/constants/Colors';
import {date, getNextClosestDate} from "@/src/functions/functions";

type VoyageListProps = {
    voyage : IVoyage
}
export default function VoyageListItem({voyage}: VoyageListProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={()=>router.push("/(modals)/voyages/"+voyage.id)}>
           <View style={styles.globaleView}>
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
           </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding : 16,
        borderRadius : 8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 2,
            width: -2,
        },
        elevation: 4,
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
