import {View, Text} from 'react-native'
import React from 'react'
import {ITicket} from "@/src/models/ResponseInterfaces";

type HistoriqueListItemProps = {
    tiket : ITicket
}

export default function HistoriqueListItem({}:HistoriqueListItemProps) {
    return (
        <View>
            <Text>HistoriqueListItem</Text>
        </View>
    )
}
