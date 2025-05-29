import api from "@/src/services/apiClient";
import { VoyageListTypes} from "@/src/models/Voyages";
import {VoyageDetail} from "@/src/models/VoyageDetail";

export const VoyageServices = {
    getAvailableVoyages (){
        const req = api.get<VoyageListTypes[]>("/voyages/today");
        return req
    },
    getVoyageById (id:string){
        const req = api.get<VoyageDetail>("/compagnie/voyages/instance/"+id);
        return req
    }
}