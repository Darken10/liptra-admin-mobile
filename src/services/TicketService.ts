import {BASE_URL, TOKEN_KEY} from "@/src/constants/Constants";
import {
    NumeroAndCodeType,
    TicketInformtionType,
    ValiderTicketCredentialType,
    ValiderTicketType
} from "@/src/models/types";
import api from "@/src/services/apiClient";
import {getItem} from "expo-secure-store";
import {TicketDetail} from "@/src/models/Ticket";


export const findTicketByNumeroAndCode = async (credentiale: NumeroAndCodeType | undefined) => {
    if (!credentiale) {
        return
    }

    const userToken = getItem(TOKEN_KEY);
    console.log("Credentiale", credentiale)
    const response = await fetch(`${BASE_URL}/api/ticket/verification/with-number`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization" : `Bearer ${userToken}`,
        },
        body: JSON.stringify(credentiale)
    })
    if (!response.ok) {
        throw new Error("Une erreur est survenue lors post de code et numero: "+response.status + ' '+ response.statusText);
    }
    return await response.json() as TicketInformtionType ;
}



export const findTicketByQRCode = async (codeData: string) => {

    console.log("QR-Code Data", codeData)

    const userToken = getItem(TOKEN_KEY);
    const response = await fetch(`${BASE_URL}/api/ticket/verification/${codeData}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization" : `Bearer ${userToken}`,
        },
    })
    if (!response.ok) {
        throw new Error("Une erreur est survenue lors post de code et numero: "+response.status + ' '+ response.statusText);
    }
    return await response.json() as TicketInformtionType ;
}



export const validerTicket = async (credentiale: ValiderTicketCredentialType | undefined) => {
    if (!credentiale) {
        return
    }
    const userToken = getItem(TOKEN_KEY);
    const response = await fetch(`${BASE_URL}/api/ticket/valider`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization" : `Bearer ${userToken}`,
        },
        body: JSON.stringify(credentiale)
    })
    if (!response.ok) {
        throw new Error("Une erreur est survenue lors post de code et numero: "+response.status + ' '+ response.statusText);
    }
    return await response.json() as ValiderTicketType ;


}

export const TicketService = {
    getTicketById (id:string){
        const req = api.get<TicketDetail>(`/tickets/${id}`)
        console.log("appel api ticket", req)
        return req
    },


}