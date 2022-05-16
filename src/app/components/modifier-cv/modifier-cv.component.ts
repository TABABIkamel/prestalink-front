import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Education, Experience, Prestataire} from "../../Models/Prestataire";
import {CompleteProfileService} from "../../services/complete-profile.service";
import {ToastrService} from "ngx-toastr";
import {KeycloakService} from "../../services/keycloak.service";
class Option {
  label: string;
  value: string;
}
@Component({
  selector: 'app-modifier-cv',
  templateUrl: './modifier-cv.component.html',
  styleUrls: ['./modifier-cv.component.css']
})
export class ModifierCvComponent implements OnInit {
  nomberSousSectionEducation: number[] = new Array(0);
  nomberSousSectionExperience: number[] = new Array(0);
  comp: number = 1
  prestataire = new Prestataire();
  tabEducationId: number[] = new Array();
  tabExperienceId: number[] = new Array();
  tabEcole: string[] = new Array();
  tabTypeDiplome: Option[] = new Array();
  tabDateDebutAndFin: Date[][] = new Array();
  tabNomSociete: string[] = new Array();
  tabTitrePoste: string[] = new Array();
  tabDateDebutAndFinPoste: Date[][] = new Array();
  tabDescriptionPoste: string[] = new Array();
  options: any[] = [
    {label: 'baccalauréat', value: 'baccalauréat'},
    {label: 'Licence Bac+3', value: 'Licence'},
    {label: 'Master Bac+5', value: 'Master'},
    {label: 'ingénierie Bac+5', value: 'ingénierie'},
    {label: 'doctorat', value: 'doctorat'}
  ];
  dateFormat = 'yyyy/MM/dd';
  constructor(private toastr: ToastrService,private completeProfile:CompleteProfileService,private keycloak:KeycloakService) { }
  option:Option=new Option()
  ngOnInit(): void {
    this.completeProfile.getPrestataireWithHisCvByUsername(this.keycloak.getUsernameAuthenticatedUser())
      .subscribe(res=>
      {
        console.log(res)
        this.prestataire=res
        res.education.forEach(education=>{
          this.nomberSousSectionEducation.push(1)
          this.tabEducationId.push(education.id)
          this.tabEcole.push(education.nomEcole)
          this.option.value=education.typeDiplome
          this.option.label="education.typeDiplome"
          this.tabTypeDiplome.push(this.option)
          this.tabDateDebutAndFin.push([education.dateDebut,education.dateFin]);

        });
        res.experience.forEach(experience=>{
          this.nomberSousSectionExperience.push(1)
          this.tabExperienceId.push(experience.id)
          this.tabNomSociete.push(experience.nomSociete)
          this.tabTitrePoste.push(experience.titrePoste)
          this.tabDateDebutAndFinPoste.push([experience.dateDebut,experience.dateFin]);
          this.tabDescriptionPoste.push(experience.descriptionPoste)
        })
      })
  }
  addSouSectionEducation() {
    this.nomberSousSectionEducation.push(1);
    //this.comp = this.comp + 1;
  }

  addSouSectionExperience() {
    this.nomberSousSectionExperience.push(1)
  }
  education = new FormGroup({
    nomEcole: new FormControl('', Validators.required),
    typeDiplome: new FormControl('', Validators.required),
    dureeEcucation: new FormControl('', Validators.required),
  })

  get nomEcole() {
    return this.education.get('nomEcole')
  }

  get typediplome() {
    return this.education.get('typeDiplome')
  }

  get dureeEcucation() {
    return this.education.get('dureeEcucation')
  }

  experience = new FormGroup({
    nomSociete: new FormControl('', Validators.required),
    titrePoste: new FormControl('', Validators.required),
    dureePoste: new FormControl('', Validators.required),
  })

  remplirEducationTable() {
    for (let i = 0; i < this.nomberSousSectionEducation.length; i++) {
      this.prestataire.education[i] = new Education()
      this.prestataire.education[i].id = this.tabEducationId[i]
      this.prestataire.education[i].nomEcole = this.tabEcole[i]
      this.prestataire.education[i].typeDiplome = this.tabTypeDiplome[i].value
      this.prestataire.education[i].dateDebut = this.tabDateDebutAndFin[i][0]
      this.prestataire.education[i].dateFin = this.tabDateDebutAndFin[i][1]
    }
  }

  remplirExperienceTable() {
    for (let i = 0; i < this.nomberSousSectionExperience.length; i++) {
      this.prestataire.experience[i] = new Experience()
      this.prestataire.experience[i].id = this.tabExperienceId[i]
      this.prestataire.experience[i].nomSociete = this.tabNomSociete[i]
      this.prestataire.experience[i].titrePoste = this.tabTitrePoste[i]
      this.prestataire.experience[i].dateDebut = this.tabDateDebutAndFinPoste[i][0]
      this.prestataire.experience[i].dateFin = this.tabDateDebutAndFinPoste[i][1]
      this.prestataire.experience[i].descriptionPoste = this.tabDescriptionPoste[i]
    }
  }

  compareFun = (o1: Option | string, o2: Option) => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };

  removeSouSectionEducation() {
    this.nomberSousSectionEducation.pop();
    console.log(this.nomberSousSectionEducation.length)
    this.prestataire.education.pop()
  }

  removeSouSectionExperience() {
    this.nomberSousSectionExperience.pop();
    console.log(this.nomberSousSectionExperience.length)
    this.prestataire.experience.pop()
  }

  modfierCv() {
    this.remplirEducationTable()
    this.remplirExperienceTable()
    console.log(this.prestataire)
    this.completeProfile.modifierCvPrestataire(this.prestataire)
      .subscribe(res=>{
        this.toastr.success("","cv a été modifié")
      },error => {
        console.log(error)
        this.toastr.error("","une erreur s'est produite")
      })
  }
}
