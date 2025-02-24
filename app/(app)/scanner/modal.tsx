import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native'
import {useRouter} from "expo-router";
import {useTicketStore} from "@/src/hooks/useTicketStore";
import Colors from '@/src/constants/Colors';
import Bagde from "@/src/components/my-components/Bagde";
import Button from "@/src/components/my-components/Button";
import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {validerTicket} from "@/src/services/TicketService";
import BackButton from "@/src/components/my-components/BackButton";



export default function Modal() {
    const router = useRouter()
    const ticket = useTicketStore((state)=>state.ticket)
    const [error, setError] = useState('')
    console.log(ticket?.voyage.trajet)

    const mutation = useMutation({
        mutationFn : validerTicket,
        onSuccess : data  => {
            if (data){
                if (!data.success  || data.error ) {
                    setError(data.message.error ?? "")
                } else {
                    if (data.ticket){
                        console.log(data.message.success)
                        router.back()
                    }
                }
            }
        },
        onError : error => {
            console.error(error)
        }
    })

    const onHandleValide = async () => {
        if (ticket?.id && ticket?.code_qr && ticket?.numero_ticket){
            mutation.mutate({
                ticket_id : ticket?.id,
                ticket_qr_code : ticket?.code_qr,
                numero_ticket : ticket?.numero_ticket ,
            })
        }
    }


    return (
        <View style={styles.body}>
            <BackButton />
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image
                        style={styles.avatar}
                        source={require('@/assets/images/user.png')}
                        /*source={ticket?.user.profile_photo_url ? { uri: ticket?.user.profile_photo_url} : require('@/assets/images/user.png') }*/
                    />
                    <Text style={styles.name}>{ticket?.user.name ?? "Name"}</Text>
                </View>

            </View>
            <View style={styles.line}></View>

            <View>
                <View>
                    <Text style={styles.compagnieSigle}>{ticket?.voyage.compagnie.sigle}</Text>
                    <Text style={styles.compagnieName}>{ticket?.voyage.compagnie.name}</Text>
                </View>
                <View style={styles.voyageView}>
                    <View style={styles.voyageVilleView}>
                        <Text style={styles.villeDepartName}>{ticket?.voyage.trajet.depart?.name}</Text>
                        <Text style={styles.GareDepartName}>{ticket?.voyage.gare_depart.name}</Text>
                    </View>
                    <View style={styles.flechIconView}>
                        <Text style={styles.flechIcon}>--{'>'}</Text>
                    </View>
                    <View style={styles.voyageVilleView}>
                        <Text style={styles.villeDepartName}>{ticket?.voyage.trajet.arriver?.name}</Text>
                        <Text style={styles.GareDepartName}>{ticket?.voyage.gare_arrive.name}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.voyageDateView}>
                <View style={styles.voyageDateSousView}>
                    <Text style={styles.voyageDate} >Date  : {ticket?.date}</Text>
                    <Text style={styles.voyageDate} >Heure :  {ticket?.voyage.heure}</Text>
                    <Text style={styles.voyageDate} >Classe :  {"Classe VIP"}</Text>
                    <Text style={styles.voyageDate} >Prix :  {(ticket?.payements?.length && ticket?.payements?.length>0 ) ? ticket?.payements[ticket?.payements?.length-1]?.montant.toString() + " XOF" : "Gratuit"}</Text>
                   <View style={styles.badgeView}>
                       <StatusTicket status={'Payer'} ></StatusTicket>
                   </View>
                </View>
            </View>

            <View style={styles.viewBtn} >
                <View>
                    <Button mode={'outlined'} onPress={() => router.back()}>Retour</Button>
                </View>
                <View>

                    <Button mode={'contained'} onPress={onHandleValide} >
                        {
                            mutation.isPending ?
                                <>
                                    <ActivityIndicator color={'white'} style={{paddingRight : 16, alignItems:"center"}} ></ActivityIndicator>
                                    <Text >Loading</Text>
                                </> :
                                <>
                                    <Text >Valider</Text>
                                </>
                        }

                    </Button>
                </View>
            </View>

        </View>
    )
}


type StatutProps = {
    status : string
}

function StatusTicket({status} : StatutProps){
    if (status=="Payer") {
        return <Bagde type={'green'} message={"Payer"}/>
    }
}



const styles = StyleSheet.create({
    body : {
        marginHorizontal : 16
    },
    header: {
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: Colors.light.primary,
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: Colors.light.primary,
        fontWeight: '600',
    },
    line : {
        borderWidth : 1,
        borderColor: Colors.light.gray,
        width: '100%',
        marginBottom : 14,
    },
    compagnieName :{
        textAlign: 'center',
    },
    compagnieSigle :{
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    voyageView : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical : 16,
        alignItems: 'center',
    },
    voyageVilleView : {
        width: '50%',
        alignItems : "center",
        justifyContent: 'center',
    },
    villeDepartName : {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    GareDepartName : {
        fontStyle: 'italic',
        textAlign: 'center',
    },
    flechIconView : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flechIcon : {
        fontSize: 20,
    },
    voyageDateView : {
        display: 'flex',
        flexDirection: 'row',
        textAlign : "center",
        justifyContent : 'center',

    },
    voyageDateSousView : {
        textAlign : "center",
        justifyContent : 'center',
    },
    voyageDate : {
        textAlign : "center",
    },
    badgeView : {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    viewBtn:{
        display: 'flex',
        flexDirection: 'row',
        gap : 8,
        justifyContent : "space-between",
        marginHorizontal: 20
    },
})

