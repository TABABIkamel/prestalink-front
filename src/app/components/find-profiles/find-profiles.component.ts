import { Component, OnInit } from '@angular/core';
import {TrouverProfileService} from "../../services/trouver-profile.service";
import {ProfileLinkedIn} from "../../Models/ProfileLinkedIn";
import {NzSelectSizeType} from "ng-zorro-antd/select";
import {MyValidators} from "../../validators/FormValidators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Experience} from "../../Models/Prestataire";

@Component({
  selector: 'app-find-profiles',
  templateUrl: './find-profiles.component.html',
  styleUrls: ['./find-profiles.component.css']
})
export class FindProfilesComponent implements OnInit {
  nomberSousSectionExperience: number[] = new Array(1);
  experience: FormGroup;
  formsExperience:FormGroup[] = new Array()
  experienceData:Experience=new Experience()
  experiences:string[]=new Array();
  experiencesString:string=''
  constructor(private formBuilder: FormBuilder,private profilesService:TrouverProfileService) { }
  isVisible = false;
  tagValue =new Array();
  listOfOption: Array<{ label: string; value: string }> = [];
  size: NzSelectSizeType = 'large';
  critere={}
  page=1
  profiles:ProfileLinkedIn[]
  profile:ProfileLinkedIn
  isModalVisible: boolean=false;
  profilesNumber: number=1;
  ngOnInit(): void {
    this.loadForm()
    this.tagValue=['java']
  }

  onScrollDown() {
    console.log('scroll')

    this.page=this.page+1
    this.profilesService.getProfilesLinkedIn(this.page,this.profilesNumber,this.critere)
      .subscribe(res=>{
        this.profiles=this.profiles.concat(res)
        this.profiles.forEach(profile=>{
          if(profile.imgProfile.includes('https'))
            profile.imageProfileValid=true
        })

        console.log(res)
      },error => console.log(error))
  }

  handleOk() {
    this.isModalVisible=false
  }

  handleCancel() {
    this.isModalVisible=false
  }

  showMadalProfile(profile: ProfileLinkedIn) {
    this.profile=profile
    this.isModalVisible=true
  }



  showModal(): void {
    this.isVisible = true;
  }

  handleOkSearchModal(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.formsExperience.forEach(form=>{
      this.experiences.push(form.value.nomSociete)
      this.experiences.push(form.value.titrePoste)
      this.experiences.push(form.value.dureeExperience)
      this.experiences.push(form.value.locationExperience)

    })
    console.log(JSON.stringify(this.experiences))
    this.experiencesString=JSON.stringify(this.experiences)
    const dataCleaned=this.cleanData(this.experiencesString)
    console.log(dataCleaned)
    this.experiences=[]
    this.page=1
    this.critere={'search':dataCleaned}
    console.log(this.critere)
    this.profilesService.getProfilesLinkedIn(1,this.profilesNumber,this.critere)
      .subscribe(res=>{
        this.profiles=res
        this.profiles.forEach(profile=>{
          if(profile.imgProfile.includes('https'))
            profile.imageProfileValid=true
        })

        console.log(res)
      },error => console.log(error))
  }
  cleanData(data:string){
    while (data.includes('['))
      data=data.replace('[', '');
    while (data.includes(']'))
      data=data.replace(']', '');
    while (data.includes(','))
      data=data.replace(',', ' ');
    while (data.includes('"'))
      data=data.replace('"', '');

    return data
  }
  handleCancelSearchModal(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  addSouSectionExperience() {
    this.nomberSousSectionExperience.push(1)
    const { required, maxLength, minLength } = MyValidators;
    this.formsExperience.push(
      this.formBuilder.group({
        titrePoste: ["", [required]],
        nomSociete: ["", [required, maxLength(20), minLength(2)]],
        dureeExperience: ["", [required]],
        locationExperience: ["", [required]],
      })
    )
  }

  loadForm(){
    const { required, maxLength, minLength } = MyValidators;
    this.experience = this.formBuilder.group({
      nomSociete: ["", [required, maxLength(20), minLength(2)]],
      titrePoste: ["", [required]],
      dureeExperience: ["", [required]],
      locationExperience: ["", [required]],
    })
    this.formsExperience.push(this.experience)
  }

  removeSouSectionExperience() {
    this.nomberSousSectionExperience.pop()
    this.formsExperience.pop()
  }
}
