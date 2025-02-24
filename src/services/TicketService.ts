import {BASE_URL} from "@/src/constants/Constants";
import {
    NumeroAndCodeType,
    TicketInformtionType,
    ValiderTicketCredentialType,
    ValiderTicketType
} from "@/src/models/types";


export const findTicketByNumeroAndCode = async (credentiale: NumeroAndCodeType | undefined) => {
    if (!credentiale) {
        return
    }
    console.log("Credentiale", credentiale)
    const response = await fetch(`${BASE_URL}/api/ticket/verification/with-number`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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
    const response = await fetch(`${BASE_URL}/api/ticket/verification/${codeData}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
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
    console.log("Credentiale", credentiale)
    const response = await fetch(`${BASE_URL}/api/ticket/valider`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentiale)
    })
    if (!response.ok) {
        throw new Error("Une erreur est survenue lors post de code et numero: "+response.status + ' '+ response.statusText);
    }
    return await response.json() as ValiderTicketType ;
}

