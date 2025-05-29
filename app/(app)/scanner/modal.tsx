import {ActivityIndicator, Image, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native'
import {router, useRouter} from "expo-router";
import {useTicketStore} from "@/src/hooks/useTicketStore";
import Colors from '@/src/constants/Colors';
import Bagde from "@/src/components/my-components/Bagde";
import Button from "@/src/components/my-components/Button";
import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {validerTicket} from "@/src/services/TicketService";
import ErrorComponent from "@/src/components/my-components/ErrorComponent";
import PageHeader from "@/src/components/my-components/Header";
import {MaterialIcons} from "@expo/vector-icons";
import DropdownMenu from "@/src/components/my-components/DropdownMenu";
import {StatutTicketEnum} from "@/src/models/Enums";
import Toast from "react-native-toast-message";
import {TicketStatutBadge} from "@/src/components/my-components/TicketStatutBadge";


export default function Modal() {

    const statusBarHeight = StatusBar.currentHeight ?? 50
    const router = useRouter()
    const ticket = useTicketStore((state)=>state.ticket)
    const [error, setError] = useState('')


    const mutation = useMutation({
        mutationFn : validerTicket,
        onSuccess : data  => {
            if (data){
                if (!data.success  || data.error ) {
                    setError(data.message.error ?? "")
                } else {
                    if (data.ticket){
                        console.log("Ticket bien Valider")
                        console.log(data.message.success)
                        Toast.show({
                            type :"success",
                            text1 : "Ticket Valider",
                            text2 : "le Ticket de " + data.ticket.user.name+ " a ete bien Valider",
                        })
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
                ticket_code_qr : ticket?.code_qr,
                numero_ticket : ticket?.numero_ticket ,
            })
        }
    }


    return (
        <SafeAreaView style={{flex : 1,marginTop : statusBarHeight}}>
            <Header />
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
            <View style={styles.body}>
                {error && <ErrorComponent message={error}></ErrorComponent>}

                <View style={styles.line}></View>

                <View>
                    <View>
                        <Text style={styles.compagnieSigle}>{ticket?.voyage_instance.voyage.compagnie.sigle}</Text>
                        <Text style={styles.compagnieName}>{ticket?.voyage_instance.voyage.compagnie.name}</Text>
                    </View>
                    <View style={styles.voyageView}>
                        <View style={styles.voyageVilleView}>
                            <Text style={styles.villeDepartName}>{ticket?.voyage_instance.voyage.trajet.depart?.name}</Text>
                            <Text style={styles.GareDepartName}>{ticket?.voyage_instance.voyage.gare_depart.name}</Text>
                        </View>
                        <View style={styles.flechIconView}>
                            <Text style={styles.flechIcon}>--{'>'}</Text>
                        </View>
                        <View style={styles.voyageVilleView}>
                            <Text style={styles.villeDepartName}>{ticket?.voyage_instance.voyage.trajet.arriver?.name}</Text>
                            <Text style={styles.GareDepartName}>{ticket?.voyage_instance.voyage.gare_arrive.name}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.voyageDateView}>
                    <View style={styles.voyageDateSousView}>
                        <Text style={styles.voyageDate} >Date  : {ticket?.date}</Text>
                        <Text style={styles.voyageDate} >Heure :  {ticket?.voyage_instance.heure}</Text>
                        <Text style={styles.voyageDate} >Classe :  {"Classe VIP"}</Text>
                        <Text style={styles.voyageDate} >Prix :  {(ticket?.payements?.length && ticket?.payements?.length>0 ) ? ticket?.payements[ticket?.payements?.length-1]?.montant.toString() + " XOF" : "Gratuit"}</Text>
                       <View style={styles.badgeView}>
                           <TicketStatutBadge status={ticket?.statut} ></TicketStatutBadge>
                       </View>
                    </View>
                </View>

                <View style={styles.viewBtn} >
                    <View>
                        <Button mode={'outlined'} onPress={() => router.back()}>Retour</Button>
                    </View>
                    <View>
                        {
                            ticket?.statut === StatutTicketEnum.Payer
                                ? <Button mode={'contained'} onPress={onHandleValide} disabled={mutation.isPending} >
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
                                : null
                        }
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}


function Header() {
    const menuItems = [{
            title : "Profile",
            onPress: () => {console.log("menuItems clicked profile");}
        },{
            title : "Parametre",
            onPress: () => {}
        },

        ]
    return (
        <PageHeader
            leftNode={router.canGoBack() ? <MaterialIcons name="arrow-back" size={26} color={"#e3e3e3"}/> : null}
            headerText="Liptra"
            rightContainerStyle={styles.rightContainer}
            handleOnPressLeftNode={router.back}
            rightNode={
            <View style={{display : "flex", flexDirection : 'row',alignItems : 'center',justifyContent : "center"}}>
                <Image
                    style={styles.profilePhoto}
                    source={require("@/assets/images/user.png")}
                />
                <DropdownMenu options={menuItems} />
            </View>
            }
        />
    )
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
    profilePhoto: {
        height: 36,
        width: 36,
        borderRadius: 36,
        backgroundColor: '#F3F4F6', // Equivalent à text-gray-100
    },
    rightContainer: {
        flex: 1,
        paddingRight: 16,
        alignItems: 'flex-end',
        paddingVertical: 8,
    },
})

