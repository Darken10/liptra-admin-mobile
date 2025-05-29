import {StatutTicketEnum, TypeTicket} from "@/src/models/Enums";

export interface Client {
  id: number;
  name: string;
  phone: number;
}

export interface VoyageUltraMini {
  date: string;
  heure: string;
  prix: number;
  ville_depart: string;
  ville_arrive: string;
  compagnie: string;
}

export interface TicketUltraMini {
  id: number;
  numero_ticket: string;
  numero_chaise: number;
  statut: StatutTicketEnum;
  type: TypeTicket;
  client: Client;
  voyage: VoyageUltraMini;
  validated_at?: Date;
  created_at: string;
}