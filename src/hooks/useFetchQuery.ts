import {useQueries, useQuery} from "@tanstack/react-query";
import {BASE_URL, TOKEN_KEY} from "@/src/constants/Constants";
import {getItem} from "expo-secure-store";


export default function useFetchQuery(path: string, method: string = "GET", credential: any = null): any {
    const userToken = getItem(TOKEN_KEY);
    return useQuery({
        queryKey : [path],
        queryFn : async ()=>{
            console.log(`${BASE_URL}/api${path}`)
            return fetch(`${BASE_URL}/api${path}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization" : `Bearer ${userToken}`,
                }
            }).then((r)=>r.json())
                .catch((err:Error) => {
                    console.error(err);
                    return []
                })
        }
    })
}