export class Prestataire{
  public completed: boolean;
  public email: string;
  public iban: string;
  public id: number
  public lieu: string
  public nom: string
  public prenom: string
  public profession: string
  public imageLocation:string
  public rib: string
  public usernamePrestataire: string
  public education:Education[]=new Array();
  public experience:Experience[]=new Array();
}

export class Education{
  public id:number
  public nomEcole:string;
  public typeDiplome:string;
  public dateDebut:Date;
  public dateFin:Date;
}
export class Experience{
  public id:number
  public nomSociete:string;
  public titrePoste:string;
  public dateDebut:Date;
  public dateFin:Date;
  public descriptionPoste:string;
}
