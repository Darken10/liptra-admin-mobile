export enum StatutTicketEnum {
    Payer = 'Payer',
    EnAttente = 'En attente',
    Annuler = 'Annuler',
    Refuser = 'Refuser',
    Valider = 'Valider',
    Pause = 'Pause',
    Bloquer = 'Bloquer',
    Suspendre = 'Suspendre',
}

export enum StatutGareEnum {

}

export enum StatutCompagnieEnum {

}

export enum StatutUserEnum {
    Active = 'Active',
    EnAttente = 'En attente',
    Bloquer = 'Bloquer',
    Suspendre = 'Suspendre',
}

export enum StatutPaymentEnum {
    EnAttente = 'En attente',
    Annuler = 'Annuler',
    Complete = 'complete',
}

export enum JoursSemainEnum {
    Lundi = 'Lundi',
    Mardi = 'Mardi',
    Mercredi = 'Mercredi',
    Jeudi = 'Jeudi',
    Vendredi = 'Vendredi',
    Samedi = 'Samedi',
    Dimanche = 'Dimanche',
    ToutLesJours = 'Tout LesJours',
}

export enum LienRelationAutrePersonneTicketEnum {
    Enfant = 'Enfant',
    Frere = 'Frere/Soeur',
    Cousin = 'Cousin(e)',
    Ami = 'Ami(e)',
    Parent = 'parents (Pere/Mere)',
    GrandParent = 'Grand Parent (Grand Pere/Grand Mere)',
    copin = 'Copin/Copine',
    Autre = 'Autre',
}

export enum MoyenPaymentEnum {
    OrangeMoney = 'Orange Money',
    MoovMoney = 'Moov Money',
    LigdiCash = 'LigdiCash',
    CartVisa = 'Cart Visa',
}

export enum SexeUserEnum
{
    Homme = 'Homme',
    Femme = 'Femme',
    Autre = 'Autre',
}

export enum StatutCareEnum
{
    EnPanne = 'En Panne',
    Occuper = 'Occuper',
    Disponible = 'Disponible',
}


export enum TypeNotification {
    CreationPost = 'Createion Post',
    PayerTicket = 'Payer Ticket',
    UpdateTicket = 'Update Ticket',
    TransactionTicket = 'Transaction Ticket',
    RecevoirTicket = 'Recevoir Ticket',
}


export enum TypeTicket {
    AllerRetour = 'aller-retour',
    AllerSimple = 'aller-simple',
    RetourSimple = 'retour-simple',
}

export enum UserRole {
    Root = 'Super User' ,
    Admin = 'Admin' ,
    User = 'User' ,
    CompagnieBosse = 'Companie Bosse',
}