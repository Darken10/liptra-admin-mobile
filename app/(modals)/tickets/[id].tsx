import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {router, useLocalSearchParams} from "expo-router";
import {useMutation, useQuery} from "@tanstack/react-query";
import {TicketDetail} from "@/src/models/Ticket";
import {CheckCircle2, Clock} from "lucide-react-native";
import {VoyageServices} from "@/src/services/VoyageServices";
import {validerTicket} from "@/src/services/TicketService";
import Toast from "react-native-toast-message";



export default function TicketDetails(){

    const params = useLocalSearchParams()
    const id = params.id as string;
    console.log("Tk :id : "+id)
    const [ticket, setTicket] = useState<TicketDetail>();

    const valideTicket = ()=>{
        if (ticket){
            validerTicket({
                ticket_id: ticket?.id,
                numero_ticket: ticket?.numero_ticket,
                ticket_code_qr: ticket?.code_qr
            }).then((tk)=>{
                Toast.show({
                    type: "success",
                    text1:"Ticket Valider",
                    text2:`Le ticket ${tk?.ticket?.numero_ticket} a ete valide avec succès`,
                })
                console.log(`Le ticket ${tk?.ticket?.numero_ticket} a ete valide avec succès`)
                router.replace("/voyages/"+tk?.ticket?.voyage?.id+"/passages")
            })
        } else {
            Toast.show({
                type: "error",
                text1: "Ticket non Trouve",
                text2: "Une erreur est survenue.",
            })
                console.error("une erreur est survenue : ")
        }
    }


    useEffect(() => {
        VoyageServices.getTicketById(id).then((response)=>{
            if(response.status === 200){
                console.log("Ticket details have been successfully",response.data)
                setTicket(response?.data)
            }
        })
    }, []);



    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Ticket #{ticket?.numero_ticket}</Text>
                <Text style={styles.subText}>Type: {ticket?.type}</Text>
                <Text style={styles.subText}>Chaise: {ticket?.numero_chaise}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Passager</Text>
                <Text>Nom: {ticket?.passager.nom}</Text>
                <Text>Téléphone: {ticket?.passager.telephone}</Text>
                {ticket?.passager.email && <Text>Email: {ticket?.passager.email}</Text>}
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Voyage</Text>
                <Text>Départ: {ticket?.voyage.depart.ville} ({ticket?.voyage.depart.gare})</Text>
                <Text>Heure départ: {ticket?.voyage.heure_depart}</Text>
                <Text>Arrivée: {ticket?.voyage.destination.ville} ({ticket?.voyage.destination.gare})</Text>
                <Text>Heure arrivée: {ticket?.voyage.heure_arrivee}</Text>
                <Text>Heure RDV: {ticket?.voyage.heure_rdv}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Validation</Text>
                <View style={[styles.row]}>
                    {ticket?.validation.valide ? (
                        <CheckCircle2 size={18} color="green" style={styles.icon} />
                    ) : (
                        <Clock size={18} color="orange" style={styles.icon} />
                    )}
                    <Text>
                        {ticket?.validation.valide ? `Validé par ${ticket?.validation.valide_par}` : 'Non validé'}
                    </Text>

                </View>
                {ticket?.validation.date_validation && (
                    <Text>Date: {ticket?.validation.date_validation}</Text>
                )}
                {!ticket?.validation.valide ? (
                        <TouchableOpacity onPress={valideTicket} style={{flex:1,flexDirection:"row",justifyContent:"flex-end"}}>
                            <Text style={styles.btnValide} >Valider</Text>
                        </TouchableOpacity>
                ):null}
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Détails</Text>
                {/*<Text>Code QR: {ticket?.code_qr}</Text>
                <Text>Code SMS: {ticket?.code_sms}</Text>*/}
                <Text>Prix: {ticket?.prix} F CFA</Text>
                <Text>Date d'achat: {ticket?.created_at}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subText: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    icon: {
        marginRight: 8,
    },
    btnValide:{
        paddingVertical: 10,
        paddingHorizontal: 16,
        margin: 8,
        backgroundColor: '#0820ec',
        borderRadius: 12,
        color: 'white',

    }
})
