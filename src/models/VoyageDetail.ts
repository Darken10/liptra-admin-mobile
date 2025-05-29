interface Depart {
  ville: string;
  gare: string;
}

interface Destination {
  ville: string;
  gare: string;
}

interface Trajet {
  depart: Depart;
  destination: Destination;
  duree: string;
}

interface Compagnie {
  id: number;
  name: string;
  logo?: any;
  contact?: any;
}

interface Conforts {
  id: number;
  name?: any;
  description: string;
}

interface Classe {
  id: number;
  libelle?: any;
  description?: any;
  conforts: Conforts[];
}

interface Voyage {
  id: number;
  trajet: Trajet;
  compagnie: Compagnie;
  classe: Classe;
}

interface Statistique {
  places_disponibles: number[];
  places_occupees: any[];
  total_tickets: number;
  montant_total: number;
}

export interface VoyageDetail {
  id: string;
  date: string;
  heure: string;
  nb_place: number;
  statut: string;
  prix: number;
  voyage: Voyage;
  tickets: any[];
  chauffeur?: any;
  vehicule?: any;
  statistiques: Statistique;
  created_at: string;
  updated_at: string;
}