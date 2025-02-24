import {Image, SafeAreaView, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator} from "react-native";
import Toast from "../../components/Toats";
import Images from "../../constants/Image";
import {useState} from "react";

type Props = {
    route : any,
    navigation : any,
}
const InformationTicketScreen = ({route,navigation}:Props) => {

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState({message:"",type:'info'});



/*
    const { data, loading, error } = useFetch(scannedData ? `${UrlApis.baseUrl}/ticket/verification/${scannedData}` : "");
*/


    const handleValiderTicket = () => {
        setMessage({message:"Le Ticket est bien validé",type:'success'});
        setShowToast(true);
        console.log("valider ticket");
    }
    const handleAnnulerTicket = () => {
        navigation.goBack()
    }

    return(
        <SafeAreaView style={[StyleSheet.absoluteFillObject,styles.body]}>
            <View >
                <View style={styles.container}>
                    <View style={styles.profileInfo}>
                        <Image
                            source={Images.user}
                            style={styles.profileImage}
                        />
                        <Text style={styles.profileName}>Bonnie Green</Text>
                        <Text style={styles.profileRole}>bobo - ouaga</Text>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.messageButton} onPress={handleAnnulerTicket}>
                                <Text style={styles.messageButtonText} >Annuller</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addFriendButton} onPress={handleValiderTicket}>
                                <Text style={styles.addFriendButtonText}>Valider</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            { showToast && <Toast message={message.message} type={message.type} />}
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    body: {
        marginTop : 50
    },
    modalContainer : {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'  // Transparent black background
    },
    container: {
        paddingTop: 20,
        width: '100%',
        maxWidth: 320,
        margin : 'auto',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    dropdownButton: {
        padding: 5,
        borderRadius: 5,
    },
    dropdownButtonText: {
        fontSize: 18,
        color: '#4b5563', // Gray color
    },
    dropdownMenu: {
        position: 'absolute',
        top: 40,
        right: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: 150,
        zIndex: 10,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dropdownText: {
        fontSize: 14,
        color: '#4b5563',
    },
    deleteText: {
        color: '#dc2626', // Red color for delete
    },
    profileInfo: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    profileImage: {
        width: 96,
        height: 96,
        borderRadius: 48,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    profileName: {
        fontSize: 20,
        fontWeight: '500',
        color: '#1f2937', // Dark text color
    },
    profileRole: {
        fontSize: 14,
        color: '#6b7280', // Lighter gray
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 16,
    },
    addFriendButton: {
        backgroundColor: '#2563eb', // Blue background
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 10,
    },
    addFriendButtonText: {
        color: 'white',
        fontSize: 14,
    },
    messageButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    messageButtonText: {
        color: '#1f2937', // Dark text color
        fontSize: 14,
    }, // Styles du toast personnalisé
    customToastContainer: {
        flexDirection: 'row',
        backgroundColor: '#4caf50', // Couleur verte
        padding: 12,
        borderRadius: 8,
        width: '90%',
        maxWidth: 300,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#388e3c',
    },
    toastIconContainer: {
        marginRight: 12,
    },
    toastIcon: {
        width: 30,
        height: 30,
    },
    toastTextContainer: {
        flex: 1,
    },
    toastText1: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    toastText2: {
        fontSize: 12,
        color: 'white',
    },
});

export default InformationTicketScreen



