import {Component, DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Education, Experience, Prestataire} from "../../Models/Prestataire";
import {ToastrService} from "ngx-toastr";
import {Esn} from "../../Models/Esn";
import {CompleteProfileService} from "../../services/complete-profile.service";
import {Router} from "@angular/router";
import {KeycloakService} from "../../services/keycloak.service";
import {Observable} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {MyValidators} from "../../validators/FormValidators";
interface Option {
  label: string;
  value: string;
}
@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html'
})
export class CompleteProfileComponent implements OnInit{
  fileList1:NzUploadFile[] = [];
  educationData:Education=new Education()
  experienceData:Experience=new Experience()
  profileEsn: FormGroup;
  profilePrestataire: FormGroup;
  education: FormGroup;
  formsEducation:FormGroup[] = new Array()
  experience: FormGroup;
  formsExperience:FormGroup[] = new Array()
  selectedFiles?: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  formData: FormData = new FormData();
  checked = true;
  nomberSousSectionEducation: number[] = [0]
  nomberSousSectionExperience: number[] = new Array(1);
  tabEcole: string[] = new Array();

  show: boolean[] = new Array();
  tabTypeDiplome: Option[] = new Array();
  tabDateDebutAndFin: Date[][] = new Array();
  tabNomSociete: string[] = new Array();
  tabTitrePoste: string[] = new Array();
  tabDateDebutAndFinPoste: Date[][] = new Array();
  tabDescriptionPoste: string[] = new Array();
  compteur: number;
  options: any[] = [
    {label: 'baccalauréat', value: 'baccalauréat'},
    {label: 'Licence Bac+3', value: 'Licence'},
    {label: 'Master Bac+5', value: 'Master'},
    {label: 'ingénierie Bac+5', value: 'ingénierie'},
    {label: 'doctorat', value: 'doctorat'}
  ];
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
  typeDiplome: string
  prestataire = new Prestataire();
  esn = new Esn();
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, private completeProfileService: CompleteProfileService, private route: Router, private keycloakService: KeycloakService, private msg: NzMessageService) {
  }

loadFormPersonelDataForEsn(){
  const { required, maxLength, minLength } = MyValidators;
  this.profileEsn = this.formBuilder.group({
    nonEsn: ["", [required, maxLength(20), minLength(2)]],
    imageEsn: ["", [required]],
    email: ["", [Validators.email,required]],
    rib: ["", [required, maxLength(20), minLength(20)]],
    iban: ["", [required, maxLength(6), minLength(6)]],
    lieu: ["", [required, maxLength(20), minLength(2)]],
  })
}
  loadFormPersonelDataForPrestataire(){
    const { required, maxLength, minLength } = MyValidators;
    this.profilePrestataire = this.formBuilder.group({
      imagePrestataire: ["", [required]],
      nom:["", [required, maxLength(20), minLength(2)]],
      prenom: ["", [required, maxLength(20), minLength(2)]],
      email: ["", [Validators.email,required]],
      profession: ["", [required, maxLength(20), minLength(2)]],
      rib: ["", [required, maxLength(20), minLength(20)]],
      iban: ["", [required, maxLength(6), minLength(6)]],
      lieu: ["", [required, maxLength(20), minLength(2)]],
    })
  }

  loadForm(){
    const { required, maxLength, minLength } = MyValidators;
    this.education = this.formBuilder.group({
      nomEcole: ["", [required, maxLength(12), minLength(6)]],
      typeDiplome: ["", [required]],
      dureeEcucation: ["", [required]],
    })
    this.formsEducation.push(this.education)
    this.experience = this.formBuilder.group({
      nomSociete: ["", [required, maxLength(20), minLength(2)]],
      titrePoste: ["", [required]],
      dureeExperience: ["", [required]],
      descriptionExperience: ["", [required]],
    })
    this.formsExperience.push(this.experience)
  }



  compareFun = (o1: Option | string, o2: Option) => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };

  async submitProfilePrestataire() {
    delete this.profilePrestataire.value.imagePrestataire
    this.prestataire=this.profilePrestataire.value
    this.prestataire.education=new Array()
    this.prestataire.experience=new Array()
    this.formsEducation.forEach(form=>{
      this.educationData.nomEcole=form.value.nomEcole
      this.educationData.typeDiplome=form.value.typeDiplome.value
      this.educationData.dateDebut=form.value.dureeEcucation[0]
      this.educationData.dateFin=form.value.dureeEcucation[1]
      this.prestataire.education.push(this.educationData)
      this.educationData=new Education();
    })
    this.formsExperience.forEach(form=>{
      this.experienceData.nomSociete=form.value.nomSociete
      this.experienceData.titrePoste=form.value.titrePoste
      this.experienceData.dateDebut=form.value.dureeExperience[0]
      this.experienceData.dateFin=form.value.dureeExperience[1]
      this.experienceData.descriptionPoste=form.value.descriptionExperience
      this.prestataire.experience.push(this.experienceData)
      this.experienceData=new Experience();
    })
    this.prestataire.usernamePrestataire = this.keycloakService.getUsernameAuthenticatedUser();

    console.log(this.prestataire)

    this.prestataire.usernamePrestataire = this.keycloakService.getUsernameAuthenticatedUser();
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        console.log(file)
        await this.completeProfileService.completeProfilePrestataire(this.prestataire)
          .subscribe(res => this.completeProfileService.uploadPhotoToPrestataire(this.currentFile, this.prestataire.usernamePrestataire)
              .subscribe(
                res => {
                  this.route.navigateByUrl('appeloffre')
                  window.location.reload()
                }),
            error => this.toastr.error('OUPS', 'you have already completed your profile'))
      }
      console.log(this.prestataire)
    }
  }

  submitProfileEsn(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        console.log(file)
        this.completeProfileService.completeProfileEsn(this.esn)
          .subscribe
          ((res) => {
              console.log(res)
              console.log(res.usernameRepresentant)
              this.completeProfileService.uploadPhotoToEsn(this.currentFile, res.usernameRepresentant)
                .subscribe(res => {
                  // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                  // this.route.onSameUrlNavigation = 'reload';
                  window.location.reload()
                  this.route.navigateByUrl('appeloffre')

                })

            }
            , (err) => {
              console.log(err)
            })
      }
    }

    console.log(this.esn)

  }


  addSouSectionEducation() {
    this.nomberSousSectionEducation.push(1);
    const { required, maxLength, minLength } = MyValidators;
    this.formsEducation.push(
      this.formBuilder.group({
      nomEcole: ["", [required, maxLength(12), minLength(6)]],
      typeDiplome: ["", [required]],
      dureeEcucation: ["", [required]],
    }))
  }

  addSouSectionExperience() {
    this.nomberSousSectionExperience.push(1)
    const { required, maxLength, minLength } = MyValidators;
    this.formsExperience.push(
      this.formBuilder.group({
        nomSociete: ["", [required, maxLength(20), minLength(2)]],
        titrePoste: ["", [required]],
        dureeExperience: ["", [required]],
        descriptionExperience: ["", [required]],
      })
    )
  }


  ngOnInit(): void {
    this.loadFormPersonelDataForEsn()
    this.loadFormPersonelDataForPrestataire()
    this.loadForm()

  }


  submitFormESN() {
    delete this.profileEsn.value.imageEsn
    console.log(this.profileEsn.value)
    this.esn=this.profileEsn.value
    console.log(this.esn)
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        console.log(file)
        this.completeProfileService.completeProfileEsn(this.esn)
          .subscribe
          ((res) => {
              console.log(res)
              console.log(res.usernameRepresentant)
              this.completeProfileService.uploadPhotoToEsn(this.currentFile, res.usernameRepresentant)
                .subscribe(res => {
                  // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                  // this.route.onSameUrlNavigation = 'reload';
                  window.location.reload()
                  this.route.navigateByUrl('appeloffre')

                })

            }
            , (err) => {
              console.log(err)
            })
      }
    }

    console.log(this.esn)
  }


}
