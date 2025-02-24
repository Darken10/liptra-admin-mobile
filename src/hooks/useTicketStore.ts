import {ITicket} from "@/src/models/ResponseInterfaces";
import {create} from "zustand";

type State = {
    ticket : ITicket | undefined;
    setTicket : (ticket : ITicket) => void;
}

export const useTicketStore = create<State>((set)=>({
        ticket : undefined,
        setTicket : (ticket : ITicket) => {
            set({ticket : ticket});
        }
    }))
