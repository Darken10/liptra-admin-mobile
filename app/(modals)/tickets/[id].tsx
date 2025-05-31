import {ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router";
import {useQuery} from "@tanstack/react-query";
import {TicketServices} from "@/src/services/TicketService";
import {TicketDetail} from "@/src/models/Ticket";
import {CheckCircle2, Clock} from "lucide-react-native";

export const TicketDetails = () => {

    const params = useLocalSearchParams()
    const id = params.id as string;

    const {data,isLoading,error} = useQuery({
        queryKey : ['ticket',id],
        queryFn : ()=>TicketServices.getTicketId(id)
    })

    const ticket:TicketDetail = data?.data as TicketDetail
    console.log(ticket)


    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Ticket #{ticket.numero_ticket}</Text>
                <Text style={styles.subText}>Type: {ticket.type}</Text>
                <Text style={styles.subText}>Chaise: {ticket.numero_chaise}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Passager</Text>
                <Text>Nom: {ticket.passager.nom}</Text>
                <Text>Téléphone: {ticket.passager.telephone}</Text>
                {ticket.passager.email && <Text>Email: {ticket.passager.email}</Text>}
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Voyage</Text>
                <Text>Départ: {ticket.voyage.depart.ville} ({ticket.voyage.depart.gare})</Text>
                <Text>Heure départ: {ticket.voyage.heure_depart}</Text>
                <Text>Arrivée: {ticket.voyage.destination.ville} ({ticket.voyage.destination.gare})</Text>
                <Text>Heure arrivée: {ticket.voyage.heure_arrivee}</Text>
                <Text>Heure RDV: {ticket.voyage.heure_rdv}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Validation</Text>
                <View style={styles.row}>
                    {ticket.validation.valide ? (
                        <CheckCircle2 size={18} color="green" style={styles.icon} />
                    ) : (
                        <Clock size={18} color="orange" style={styles.icon} />
                    )}
                    <Text>
                        {ticket.validation.valide ? `Validé par ${ticket.validation.valide_par}` : 'Non validé'}
                    </Text>
                </View>
                {ticket.validation.date_validation && (
                    <Text>Date: {ticket.validation.date_validation}</Text>
                )}
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Détails</Text>
                <Text>Code QR: {ticket.code_qr}</Text>
                <Text>Code SMS: {ticket.code_sms}</Text>
                <Text>Prix: {ticket.prix} F CFA</Text>
                <Text>Date d'achat: {ticket.created_at}</Text>
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
})
