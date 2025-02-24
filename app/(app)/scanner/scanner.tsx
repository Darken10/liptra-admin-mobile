import {SafeAreaView, StyleSheet, Text} from 'react-native'
import React, {useState} from 'react'
import {CameraView, useCameraPermissions} from "expo-camera";
import {Overlay} from '@/src/components/my-components/Scanner/Overlay'
import {useMutation} from "@tanstack/react-query";
import {findTicketByNumeroAndCode, findTicketByQRCode} from "@/src/services/TicketService";
import {useRouter} from "expo-router";
import {useTicketStore} from "@/src/hooks/useTicketStore";
import {Toast} from "expo-router/build/views/Toast";



export default function Scanner() {
    const [hasPermission, setHasPermission] = useCameraPermissions()
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [error, setError] = useState('')
    const router = useRouter()
    const  setTicketStore = useTicketStore((state)=>state.setTicket)


    const mutation = useMutation({
        mutationFn : findTicketByQRCode,
        onSuccess : data  => {
            if (data){
                if (!data.is_valide  || !data.is_exist ) {
                    setError(data?.message?.error)
                } else {
                    if (data.ticket){
                        setTicketStore(data.ticket)
                        console.log("La donne qui a ete recupere" ,data)
                        router.push('/scanner/modal')
                    }
                }
            }
            setError("Une erreur est survenue !")
        },
        onError : error => {
            console.error(error)
        }
    })


    const handleBarcodeScanned = (data:string) => {
        setScannedData(data); // Met à jour l'état avec le code QR scanné
        if (data?.length > 12) {
            console.log("Scanned data:", scannedData);
            if (scannedData && scannedData?.length >= 12) {
                mutation.mutate(scannedData);
            }
        }
    };


    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }

    return(
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing={'back'}
                onBarcodeScanned={({data})=>handleBarcodeScanned(data)}
            />
            <Overlay />

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({})
