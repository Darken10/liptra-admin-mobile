import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import {router, useLocalSearchParams} from "expo-router";
import PageHeader from '@/src/components/my-components/Header';
import {MaterialIcons} from "@expo/vector-icons";
import DropdownMenu from "@/src/components/my-components/DropdownMenu";
import useFetchQuery from "@/src/hooks/useFetchQuery";
import {useQuery} from "@tanstack/react-query";
import {VoyageServices} from "@/src/services/VoyageServices";
import {VoyageDetail} from "@/src/models/VoyageDetail";


export default function ShowVoyage() {

    const params = useLocalSearchParams()
    const id = params.id as string;

    const {data,isLoading,error} = useQuery({
        queryKey : ['voyage_instance',id],
        queryFn : ()=>VoyageServices.getVoyageById(id)
    })

    const voyage:VoyageDetail = data?.data
    console.log(voyage)

    const gotoListPassage = ()=>{
        return router.push("/voyages/"+voyage.id+"/passages")
    }

    if(isLoading){
        return <ActivityIndicator/>
    }

    if(error){
        return <View>
            <Text>Erreur : {error.message}</Text>
        </View>
    }

    return (
        <View style={[styles.container,]}>
            <Header />


            <View style={{
                paddingHorizontal: 16,
                paddingTop: 16,
                backgroundColor: '#f8fafc',
            }}>

                <ScrollView>
                    <Text style={styles.title}>Détails du Voyage</Text>

                    <View style={styles.section}>
                        <Text style={styles.heading}>Infos générales</Text>
                        <Text>Date: {voyage.date}</Text>
                        <Text>Heure: {voyage.heure}</Text>
                        <Text>Places: {voyage.nb_place}</Text>
                        <Text>Statut: {voyage.statut}</Text>
                        <Text>Prix: {voyage.prix} FCFA</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.heading}>Trajet</Text>
                        <Text>Départ: {voyage.voyage.trajet.depart.ville} - {voyage.voyage.trajet.depart.gare}</Text>
                        <Text>Arrivée: {voyage.voyage.trajet.destination.ville} - {voyage.voyage.trajet.destination.gare}</Text>
                        <Text>Durée estimée: {new Date(voyage.voyage.trajet.duree).toLocaleTimeString()}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.heading}>Liste des passages</Text>
                        <Text>Nombre: {voyage.voyage.compagnie.name}</Text>
                        <TouchableOpacity onPress={gotoListPassage}>
                            <Text>Liste des tickets </Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.section}>
                        <Text style={styles.heading}>Compagnie</Text>
                        <Text>Nom: {voyage.voyage.compagnie.name}</Text>
                        <Text>Contact: {voyage.voyage.compagnie.contact || 'Non renseigné'}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.heading}>Conforts</Text>
                        {
                            voyage.voyage.classe.conforts.length > 0 ?
                                voyage.voyage.classe.conforts.map((item)=>(
                                    <View style={styles.confortItem} key={item.id}>
                                        <Text style={styles.confortTitle}>• {item.name || 'Confort'}</Text>
                                        <Text style={styles.confortDesc}>{item.description}</Text>
                                    </View>
                                )) :
                                (
                                    <View style={styles.confortItem}>
                                        Non Définie
                                    </View>
                                )
                        }
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.heading}>Statistiques</Text>
                        <Text>Places disponibles: {voyage.statistiques.places_disponibles.length}</Text>
                        <Text>Places occupées: {voyage.statistiques.places_occupees.length}</Text>
                        <Text>Total tickets: {voyage.statistiques.total_tickets}</Text>
                        <Text>Montant total: {voyage.statistiques.montant_total} FCFA</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.heading}>Horodatage</Text>
                        <Text>Créé le: {new Date(voyage.created_at).toLocaleString()}</Text>
                        <Text>Mis à jour le: {new Date(voyage.updated_at).toLocaleString()}</Text>
                    </View>
                </ScrollView>
            </View>

        </View>

    )
}


function Header() {
    const menuItems = [{
        title : "Profile",
        onPress: () => {console.log("menuItems clicked profile");}
    },{
        title : "Parametre",
        onPress: () => {console.log("menuItems clicked Parametre");}
    },

    ]
    return (
        <PageHeader
            /*leftNode={router.canGoBack() ? <MaterialIcons name="arrow-back" size={26}  color={"#e3e3e3"}/> : null}*/
            headerText="Liptra"
            rightContainerStyle={styles.rightContainer}
            handleOnPressLeftNode={router.back}
            leftNode={router.canGoBack() ? <MaterialIcons name="arrow-back" size={26} color={"#e3e3e3"}/> : null}
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
    container: {
        flex: 1,
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

    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#1f2937',
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#111827',
    },
    confortItem: {
        marginBottom: 12,
    },
    confortTitle: {
        fontWeight: '600',
        marginBottom: 4,
    },
    confortDesc: {
        fontSize: 14,
        color: '#374151',
    },
})