import {StatutTicketEnum} from "@/src/models/Enums";
import Bagde from "@/src/components/my-components/Bagde";
import React from "react";

type StatutProps = {
    status : StatutTicketEnum | undefined
}

export function TicketStatutBadge({status} : StatutProps){
    switch (status) {
        case StatutTicketEnum.Payer:
            return <Bagde type={'green'} message={StatutTicketEnum.Payer}/>

        case StatutTicketEnum.Suspendre  :
            return <Bagde type={'red'} message={StatutTicketEnum.Suspendre}/>
        case  StatutTicketEnum.Bloquer  :
            return <Bagde type={'red'} message={StatutTicketEnum.Bloquer }/>
        case  StatutTicketEnum.Annuler :
            return <Bagde type={'red'} message={StatutTicketEnum.Annuler}/>
        case  StatutTicketEnum.Refuser :
            return <Bagde type={'red'} message={StatutTicketEnum.Refuser}/>

        case StatutTicketEnum.Valider:
            return <Bagde type={'yellow'} message={StatutTicketEnum.Valider}/>

        case StatutTicketEnum.EnAttente:
            return <Bagde type={'purple'} message={StatutTicketEnum.EnAttente}/>
        case StatutTicketEnum.Pause:
            return <Bagde type={'purple'} message={StatutTicketEnum.Pause}/>
    }
}
