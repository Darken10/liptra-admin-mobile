interface Trajet {
  depart: string;
  arriver: string;
}

interface Compagnie {
  id: number;
  name: string;
}

interface Voyage {
  id: number;
  trajet: Trajet;
  compagnie: Compagnie;
}

export interface VoyageListTypes {
  id: string;
  date: string;
  heure: string;
  nb_place: number;
  statut: string;
  voyage: Voyage;
  chauffeur?: any;
  car?: any;
  places_disponibles: number;
  created_at: string;
}