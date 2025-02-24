import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
    SafeAreaView,
    Image,
    ToastAndroid,
    Modal,
    Button
} from 'react-native';
import {BarcodeScanningResult, Camera, CameraView, useCameraPermissions} from 'expo-camera';
import {Stack} from "expo-router";
import useFetch from "../../hooks/useFetch";
import UrlApis from "../../constants/UrlApis";
import Toast from "../../components/Toats";
import {Overlay} from "../../components/Scanner/Overlay";
interface ApiResponse {
    is_exist: boolean;
    is_payement_valide: boolean;
    is_valide: boolean;
    payement_statut: string;
    ticket: TicketInterface;
}
type Props = {
    navigation : any
}
const ScannerScreen=({navigation}:Props) => {
    const [hasPermission, setHasPermission] = useCameraPermissions()
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [ticket, setTicket] = useState<TicketInterface | null>(null);
    const [response, setResponse] = useState<ApiResponse | null>(null);
    {/**Pour permetre de voir me modal avec les informatin du passager */}
    const [isModalVisible, setModalVisible] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);



// Utiliser useFetch avec l'URL basée sur les données scannées
    const { data, loading, error } = useFetch(scannedData ? `${UrlApis.baseUrl}/ticket/verification/${scannedData}` : "");
    const text = data
    const handleBarcodeScanned = (data:string) => {
        setScannedData(data); // Met à jour l'état avec le code QR scanné
        if (data?.length > 12) {
            navigation.navigate('InformationTicketScreen',{data:data});
        }
    };

    useEffect(() => {
        if (data) {
            console.log(data, loading, error);
            setResponse(data as ApiResponse);
            console.warn(response?.ticket)
            alert(response?.ticket.numero_ticket)
            console.log('valider')
            // Traiter les données récupérées ici si nécessaire
        }
    }, [data, loading, error]);

    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleDropdown = () => {
        setShowDropdown(prevState => !prevState);
    };

    const handleValiderTicket = () => {
        //TODO: Faire appel à l'API pour valider le ticket
        setShowDropdown(false);
        setModalVisible(!isModalVisible);
        ToastAndroid.showWithGravity(
            'Le Ticket a ete bien Valider',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
        setMessage('Le Ticket a ete bien Valider')
        setShowToast(true);

    }


    return(
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing={'back'}
                onBarcodeScanned={({data})=>handleBarcodeScanned(data)}
            />
            <Overlay />

            {/*<View >
                {isModalVisible &&
                    <Modal isVisible={isModalVisible}  style={styles.modalContainer}>
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                                    <Text style={styles.dropdownButtonText}>⋮</Text>
                                </TouchableOpacity>
                                {showDropdown && (
                                    <View style={styles.dropdownMenu}>
                                        <TouchableOpacity style={styles.dropdownItem}>
                                            <Text style={styles.dropdownText}>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.dropdownItem}>
                                            <Text style={styles.dropdownText}>Export Data</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.dropdownItem}>
                                            <Text style={[styles.dropdownText, styles.deleteText]}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>

                            <View style={styles.profileInfo}>
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }} // Remplacer par l'URL de l'image
                                    style={styles.profileImage}
                                />
                                <Text style={styles.profileName}>Bonnie Green</Text>
                                <Text style={styles.profileRole}>bobo  ouaga</Text>

                                <View style={styles.buttonsContainer}>

                                    <TouchableOpacity style={styles.messageButton} onPress={toggleModal}>
                                        <Text style={styles.messageButtonText}>Annuller</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.addFriendButton} onPress={handleValiderTicket}>
                                        <Text style={styles.addFriendButtonText}>Valider</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                }

            </View>
            {showToast && <Toast message={message} type="info" />}
*/}
        </SafeAreaView>
    )
};
/*

const styles = StyleSheet.create({
    modalContainer : {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'  // Transparent black background
    },
    container: {
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
*/

export default ScannerScreen


