import api from "@/src/services/apiClient";
import { VoyageListTypes} from "@/src/models/Voyages";
import {VoyageDetail} from "@/src/models/VoyageDetail";
import {TicketUltraMini} from "@/src/models/Ticket";

export const VoyageServices = {
    getAvailableVoyages (){
        const req = api.get<VoyageListTypes[]>("/voyages/today");
        return req
    },
    getVoyageById (id:string){
        const req = api.get<VoyageDetail>("/compagnie/voyages/instance/"+id);
        return req
    },

    getPassagesVoyage (id:string){
        const req = api.get<TicketUltraMini[]>("/voyages/"+id+"/tickets")
        return req
    }
}