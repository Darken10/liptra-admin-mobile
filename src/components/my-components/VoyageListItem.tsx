import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {IVoyage} from "@/src/models/ResponseInterfaces";
import {router} from "expo-router";
import {ArrowLeft, ArrowRight} from "lucide-react-native";
import Colors from '@/src/constants/Colors';
import {date, formateDate, formateHoure, getNextClosestDate} from "@/src/functions/functions";
import {VoyageListTypes} from "@/src/models/Voyages";

type VoyageListProps = {
    voyage : VoyageListTypes
}
export default function VoyageListItem({voyage}: VoyageListProps) {

    const handleClick = () => {
        return router.push("/(modals)/voyages/"+voyage.id)
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handleClick}>
           <View style={styles.globaleView}>
               <View style={styles.villesView}>
                   <Text style={styles.villeNameText}>{voyage.voyage.trajet.depart ?? ""} </Text>
                   <ArrowRight size={24} color={Colors.light.darkGray}/>
                   <Text style={styles.villeNameText}>{voyage.voyage.trajet.arriver ?? ""}</Text>
               </View>
               <View style={styles.DateView}>
                   <Text style={styles.DateText}>{formateDate(voyage.date)}</Text>
               </View>
               <View style={styles.DateView}>
                   <Text style={styles.DateText}>{formateHoure(voyage.heure)}</Text>
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
