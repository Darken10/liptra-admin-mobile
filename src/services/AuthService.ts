import {LoginCredentialType, ValiderTicketCredentialType, ValiderTicketType} from "@/src/models/types";
import {BASE_URL} from "@/src/constants/Constants";
import {LoginResponse} from "@/src/models/ResponseInterfaces";

export const LoginService = async (credentiale: LoginCredentialType | undefined) => {
    if (!credentiale) {
        return
    }
    console.log("Credentiale", credentiale)
    console.log("Credentiale : ", credentiale)
    const response = await fetch(`${BASE_URL}/api/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentiale)
    })
    if (!response.ok) {
        throw new Error("Une erreur est survenue lors post de code et numero: "+response.status + ' '+ response.statusText);
    }
    return await response.json() as LoginResponse;
}

