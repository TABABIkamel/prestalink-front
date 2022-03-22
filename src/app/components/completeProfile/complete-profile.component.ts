import {Component, DoCheck} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Education, Experience, Prestataire} from "../../Models/Prestataire";
import {ToastrService} from "ngx-toastr";
import {Esn} from "../../Models/Esn";
import {CompleteProfileService} from "../../services/complete-profile.service";
import {Router} from "@angular/router";
import {KeycloakService} from "../../services/keycloak.service";
interface Option {
  label: string;
  value: string;
}
@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html'
})
export class CompleteProfileComponent{
   buttonSectionEducation: boolean=false;
  constructor(private toastr: ToastrService,private completeProfileService: CompleteProfileService,private route:Router,private keycloakService:KeycloakService) {
  }
  checked=true;
  nomberSousSectionEducation:number[]=[0]
  nomberSousSectionExperience:number[]=new Array(1);
  options: any[] = [
    { label: 'baccalauréat', value:  'baccalauréat' },
    { label: 'Licence Bac+3', value: 'Licence' },
    { label: 'Master Bac+5', value:  'Master' },
    { label: 'ingénierie Bac+5', value: 'ingénierie' },
    { label: 'doctorat', value: 'doctorat' }
  ];
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
  typeDiplome:string
  prestataire=new Prestataire();
  esn=new Esn();
  profile=new FormGroup({
    nomEsn:new FormControl('',Validators.required),
    nom:new FormControl('',Validators.required),
    prenom:new FormControl('',Validators.required),
    email:new FormControl('',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9][a-zA-Z0-9]+$')])),
    profession:new FormControl('',Validators.required),
    rib:new FormControl('',[Validators.required,Validators.pattern('^[0-9]{20}')]),
    iban:new FormControl('',[Validators.required,Validators.pattern('^[A-Z][A-Z][0-9]{22}')]),
    lieu:new FormControl('',Validators.required),})
  get nomEsn(){return this.profile.get('nomEsn')}
  get nom(){return this.profile.get('nom')}
  get prenom(){return this.profile.get('prenom')}
  get email(){return this.profile.get('email')}
  get profession(){return this.profile.get('profession')}
  get rib(){return this.profile.get('rib')}
  get iban(){return this.profile.get('iban')}
  get lieu(){return this.profile.get('lieu')}
  tabEcole: string[]=new Array();
  show:boolean[]=new Array();
  tabTypeDiplome: Option[]=new Array();
  tabDateDebutAndFin:Date[][]=new Array();
  tabNomSociete: string[]=new Array();
  tabTitrePoste: string[]=new Array();
  tabDateDebutAndFinPoste:Date[][]=new Array();
  tabDescriptionPoste: string[]=new Array();
  compteur:number;
  showError:boolean=false
  education=new FormGroup({
    nomEcole:new FormControl('',Validators.required),
    typeDiplome:new FormControl('',Validators.required),
    dureeEcucation:new FormControl('',Validators.required),
   })
  get nomEcole(){return this.education.get('nomEcole')}
  get typediplome(){return this.education.get('typeDiplome')}
  get dureeEcucation(){return this.education.get('dureeEcucation')}
  experience=new FormGroup({
    nomSociete:new FormControl('',Validators.required),
    titrePoste:new FormControl('',Validators.required),
    dureePoste:new FormControl('',Validators.required),
  })
  compareFun = (o1: Option | string, o2: Option) => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };

  remplirEducationTable(){
    for(let i=0;i<this.nomberSousSectionEducation.length;i++){
      this.prestataire.education[i]=new Education()
      this.prestataire.education[i].nomEcole=this.tabEcole[i]
      this.prestataire.education[i].typeDiplome=this.tabTypeDiplome[i].value
      this.prestataire.education[i].dateDebut=this.tabDateDebutAndFin[i][0]
      this.prestataire.education[i].dateFin=this.tabDateDebutAndFin[i][1]
    }
  }
  remplirExperienceTable(){
    for(let i=0;i<this.nomberSousSectionExperience.length;i++){
      this.prestataire.experience[i]=new Experience()
      this.prestataire.experience[i].nomSociete=this.tabNomSociete[i]
      this.prestataire.experience[i].titrePoste=this.tabTitrePoste[i]
      this.prestataire.experience[i].dateDebut=this.tabDateDebutAndFinPoste[i][0]
      this.prestataire.experience[i].dateFin=this.tabDateDebutAndFinPoste[i][1]
      this.prestataire.experience[i].descriptionPoste=this.tabDescriptionPoste[i]
    }
  }

  async submitProfilePrestataire() {
    await this.remplirEducationTable()
    await this.remplirExperienceTable()
    this.prestataire.usernamePrestataire=this.keycloakService.getNameAuthenticatedUser();

    await this.completeProfileService.completeProfilePrestataire(this.prestataire)
     .subscribe(res=>this.route.navigateByUrl('appeloffre'),error => this.toastr.error('OUPS','you have already completed your profile'))
        console.log(this.prestataire)
  }

  submitProfileEsn():void{
    this.completeProfileService.completeProfileEsn(this.esn)
      .subscribe
        ((res)=>{
          console.log(res)
          this.route.navigateByUrl('appeloffre')
          }
        ,(err)=>{console.log(err)})
  }
    comp:number=1
  addSouSectionEducation() {
    this.nomberSousSectionEducation.push(this.comp);
    this.comp=this.comp+1;
  }

  addSouSectionExperience() {
    this.nomberSousSectionExperience.push(1)
  }
bool:number;

  String(i: string) {
    console.log(i)
  }

  showPlusSection() {
    this.buttonSectionEducation=true;
  }
}
