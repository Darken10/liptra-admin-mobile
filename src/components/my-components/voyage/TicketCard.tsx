import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TicketUltraMini} from "@/src/models/Ticket";
import {StatutTicketEnum} from "@/src/models/Enums";
import {router} from "expo-router";
import {formateDate, formateHoure} from "@/src/functions/functions";


interface Props {
    ticket: TicketUltraMini;
}

const TicketCard: React.FC<Props> = ({ ticket }) => {

    const getStatusStyle = (statut: string) => {
        switch (statut) {
            case StatutTicketEnum.Payer:
                return { label: 'Payé', backgroundColor: '#4CAF50' };
            case StatutTicketEnum.Pause:
                return { label: 'En pause', backgroundColor: '#2196F3' }; // Bleu
            case StatutTicketEnum.Valider:
                return { label: 'Utilisé', backgroundColor: '#FFC107' };
            case StatutTicketEnum.Bloquer :
                return { label: 'Bloqué', backgroundColor: '#F44336' }; // Rouge
            default:
                return { label: 'Inconnu', backgroundColor: '#9E9E9E' }; // Gris
        }
    };

    const status = getStatusStyle(ticket.statut);

    const getToTicketDetail = ()=>{
        router.push(`/tickets/${ticket.id}`)
    }

    console.log("status", status);
    return (
        <View style={styles.card}>
            <Text style={styles.title}>🎟️ Ticket #{ticket.numero_ticket}</Text>

            <View style={styles.row}>
                <Text style={styles.label}>Client :</Text>
                <Text style={styles.value}>{ticket.client.name} ({ticket.client.phone})</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Trajet :</Text>
                <Text style={styles.value}>
                    {ticket.voyage.ville_depart} ➡️ {ticket.voyage.ville_arrive}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Date & Heure :</Text>
                <Text style={styles.value}>{formateDate(ticket.voyage.date)} à {formateHoure(ticket.voyage.heure)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Chaise :</Text>
                <Text style={styles.value}>{ticket.numero_chaise} • {ticket.type}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Prix :</Text>
                <Text style={styles.value}>{ticket.voyage.prix} FCFA</Text>
            </View>

            <View style={{flex: 1,flexDirection:'row', justifyContent:'space-between',gap:16}}>
                <View style={[styles.statusContainer, { backgroundColor: status.backgroundColor }]}>
                    <Text style={styles.statusText}>{status.label.toUpperCase()}</Text>
                </View>
                <TouchableOpacity onPress={getToTicketDetail}>
                    <View style={{marginHorizontal:20,paddingHorizontal:30,paddingVertical:10,backgroundColor:"#0345eb",borderRadius:16}}>
                        <Text style={styles.statusText}>Voir</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 100,
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
        color : '#000'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    label: {
        fontWeight: '600',
        color: '#555',
        width: 110,
    },
    value: {
        color: '#333',
        flex: 1,
        flexWrap: 'wrap',
    },
    statusContainer: {
        marginTop: 12,
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default TicketCard;

