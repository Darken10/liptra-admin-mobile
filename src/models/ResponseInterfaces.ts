import {JoursSemainEnum, StatutTicketEnum} from "@/src/models/Enums";

export interface IRole {
    id: number;
    name: string;
}


export interface IClasse {
    id: number;
    name: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
}


export interface IVille {
    id: number;
    name: string;
    lat: number;
    lng: number;
    region: IRegion;
    created_at: Date;
    updated_at: Date;
}

export interface IRegion {
    id: number;
    name: string;
    pays: IPays;
    created_at: Date;
    updated_at: Date;
}

export interface IPays {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    name: string;
    sexe: string;
    email: string;
    numero: number;
    numero_identifiant: string;
    email_verified_at: string;
    two_factor_confirmed_at?: any;
    current_team_id: number;
    profile_photo_path?: any;
    role: IRole[];
    statut: string;
    created_at: string;
    updated_at: string;
    compagnie_id: number;
    profile_photo_url: string;
}

export interface IPayements {
    id: number;
    ticket_id: number;
    numero_payment: number;
    montant: number;
    trans_id: string;
    token: string;
    code_otp: number;
    statut: string;
    moyen_payment: string;
    created_at: string;
    updated_at: string;
}

export interface IGare {
    id: number;
    name: string;
    lng: number;
    lat: number;
    ville_id: number;
    statut_id: number;
    user_id: number;
    compagnie_id: number;
    created_at: string;
    updated_at: string;
}


export interface IStatut {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface ITrajet {
    id: number;
    user_id: number;
    depart_id: number;
    arriver_id: number;
    distance: number;
    temps?: any;
    etat?: any;
    created_at: string;
    updated_at: string;
    depart : IVille;
    arriver : IVille;
}

export interface ICompagnie {
    id: number;
    name: string;
    sigle: string;
    slogant: string;
    description: string;
    logo_uri: string;
    user_id?: any;
    statut_id: number;
    created_at: string;
    updated_at: string;
    statut: IStatut;
}

export interface IVoyage {
    id: number;
    heure: string;
    prix: number;
    prix_aller_retour: number;
    is_quotidient: number;
    temps: string;
    days: JoursSemainEnum[];
    trajet_id: number;
    user_id: number;
    compagnie_id: number;
    classe_id: number;
    created_at: string;
    updated_at: string;
    depart_id: number;
    arrive_id: number;
    statut_id: number;
    nb_pace: number;
    user: IUser;
    gare_depart: IGare;
    gare_arrive: IGare;
    statut: IStatut;
    trajet: ITrajet;
    compagnie: ICompagnie;
}

export interface ITicket {
    id: number;
    user_id: number;
    voyage_id: number;
    a_bagage: boolean;
    bagages_data?: any;
    date: string;
    type: string;
    statut: StatutTicketEnum;
    numero_ticket: string;
    numero_chaise: number;
    code_sms: string;
    code_qr: string;
    image_uri?: any;
    pdf_uri: string;
    code_qr_uri: string;
    created_at: string;
    updated_at: string;
    autre_personne_id?: any;
    is_my_ticket: number;
    transferer_at?: any;
    valider_by_id?: any;
    valider_at?: any;
    transferer_a_user_id?: any;
    user: IUser;
    payements: IPayements[];
    voyage: IVoyage;
}


export interface LoginResponse {
  error: boolean;
  success: boolean;
  token: string;
  user: IUser;
}

export interface IUserMini {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  sexe: string;
  email: string;
  numero: number;
  numero_identifiant: string;
  profile_photo_path?: any;
  profile_photo_url: string;
}

export interface ITicketPassager {
  id: number;
  a_bagage: boolean;
  date: string;
  type: string;
  statut: StatutTicketEnum;
  numero_ticket: string;
  numero_chaise: number;
  is_my_ticket: number;
  transferer_at?: any;
  valider_at?: any;
  transferer_a_user_id?: any;
  user: IUserMini;
  voyage_id: number;
  autre_personne_id?: any;
}


