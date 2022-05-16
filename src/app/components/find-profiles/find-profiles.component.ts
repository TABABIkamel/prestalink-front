import { Component, OnInit } from '@angular/core';
import {TrouverProfileService} from "../../services/trouver-profile.service";
import {ProfileLinkedIn} from "../../Models/ProfileLinkedIn";
import {NzSelectSizeType} from "ng-zorro-antd/select";

@Component({
  selector: 'app-find-profiles',
  templateUrl: './find-profiles.component.html',
  styleUrls: ['./find-profiles.component.css']
})
export class FindProfilesComponent implements OnInit {

  constructor(private profilesService:TrouverProfileService) { }
  tagValue =new Array();
  listOfOption: Array<{ label: string; value: string }> = [];
  size: NzSelectSizeType = 'large';
  critere={}
  page=1
  profiles:ProfileLinkedIn[]
  profile:ProfileLinkedIn
  isModalVisible: boolean=false;
  ngOnInit(): void {
    this.tagValue=['java']
  }

  onScrollDown() {
    console.log('scroll')

    this.page=this.page+1
    this.profilesService.getProfilesLinkedIn(this.page,this.critere)
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

  searchProfile() {
    this.page=1
    console.log(this.tagValue)
    this.critere={'search':this.tagValue}
    console.log(this.critere)
    this.profilesService.getProfilesLinkedIn(1,this.critere)
      .subscribe(res=>{
        this.profiles=res
        this.profiles.forEach(profile=>{
          if(profile.imgProfile.includes('https'))
            profile.imageProfileValid=true
        })

        console.log(res)
      },error => console.log(error))
  }
}
