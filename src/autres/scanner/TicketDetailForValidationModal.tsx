import {ActivityIndicator, Button, Modal, StyleSheet, Text, View} from "react-native";
import Toast from "react-native-toast-message";
import {ITicket} from "../../models/Interfaces";

type Props = {
    visible: boolean,
    ticket: ITicket,
    onClose: () => void,
}

export default function TicketDetailForValidationModal({visible,ticket,onClose}:Props){
    const validationTicket = ()=>{
        // TODO: appel api pour valider le ticket

        Toast.show({
            type: 'success',
            text1 : "succès",
            text2 : "Ticket Valider avec succes! "
        })

        onClose()
    }
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Detail du Ticket</Text>
                    {ticket ? (
                        <>
                            <Text >Numero : {ticket.numero_ticket}</Text>
                            <Text >Nom Complete: { ticket.user.name}</Text>
                            <Text >{ticket.voyage.trajet.depart?.name} - {ticket.voyage.trajet.arriver?.name}</Text>
                            <Button title={"Valider"} onPress={validationTicket}></Button>
                        </>
                    ):(
                        <ActivityIndicator></ActivityIndicator>
                    )}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor :"white",
        padding: 16,
        borderRadius: 8,
    },
    title : {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    }
})