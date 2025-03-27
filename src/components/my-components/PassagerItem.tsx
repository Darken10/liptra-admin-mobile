import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {ITicketPassager} from "@/src/models/ResponseInterfaces";
import Badge from "@/src/components/my-components/Bagde";
import {TicketStatutBadge} from "@/src/components/my-components/TicketStatutBadge";

type Props = {
    passagerTicket:ITicketPassager
}
export default function PassagerItem({passagerTicket}: Props) {
    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.profilePhoto}
                    source={require("@/assets/images/user.png")}
                />
            </View>
            <View>
                <View>
                    <Text style={styles.nameText}>{passagerTicket.user.name}</Text>
                </View>
                <View>
                    <Text style={styles.emailText}>{passagerTicket.user.email}</Text>
                </View>
                <View>
                    <TicketStatutBadge  status={passagerTicket.statut}></TicketStatutBadge>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        gap : 16,
        padding : 16,
        borderRadius : 8,
        backgroundColor: 'white',
        alignItems: 'center',
        margin: 12,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 2,
            width: -2,
        },
        elevation: 4,
    },
    profilePhoto: {
        height: 64,
        width: 64,
        borderRadius: 99999,
        backgroundColor: '#F3F4F6', // Equivalent à text-gray-100
    },
    nameText : {
        fontSize: 16,
        fontWeight: 'bold',
    },
    emailText : {
        fontSize: 12,
        fontStyle: 'italic',
    }
})
