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




export interface TicketDetail {
  id: number;
  numero_ticket: string;
  code_qr: string;
  code_sms: string;
  statut: string;
  type: string;
  numero_chaise: string;
  date: string; // Format 'Y-m-d'

  passager: {
    type: 'client' | 'autre';
    nom: string;
    telephone: string;
    email?: string; // présent seulement si type === 'client'
  };

  voyage: {
    depart: {
      ville: string;
      gare: string;
    };
    destination: {
      ville: string;
      gare: string;
    };
    heure_depart: string; // Format 'H:i'
    heure_arrivee: string; // Format 'H:i'
    heure_rdv: string; // Format 'H:i'
  };

  validation: {
    valide: boolean;
    date_validation: string | null; // Format 'Y-m-d H:i:s'
    valide_par: string | null;
  };

  prix: number | string; // dépend de la méthode prix(), à ajuster
  created_at: string; // Format 'Y-m-d H:i:s'
}
