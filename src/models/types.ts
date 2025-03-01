import {ITicket} from "@/src/models/ResponseInterfaces";

export type NumeroAndCodeType ={
    numero: string,
    code_sms: string,
}

export type Message = {
  error?: string;
  success?: string;
}

export type TicketInformtionType = {
  is_exist: boolean;
  is_valide: boolean;
  message: Message;
  ticket?: ITicket;
}

export type ValiderTicketCredentialType = {
  ticket_id: number,
  numero_ticket: string,
  ticket_code_qr: string,
}

export type ValiderTicketType = {
  success : boolean,
  error : boolean,
  message: Message;
  ticket?: ITicket;
}

export type LoginCredentialType = {
  email: string,
  password: string,
}



