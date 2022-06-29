import {Component, HostListener, OnInit} from '@angular/core';
import {Prestataire} from "../../Models/Prestataire";
import {KeycloakService} from "../../services/keycloak.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CompleteProfileService} from "../../services/complete-profile.service";
import {Esn} from "../../Models/Esn";
import {ToastrService} from "ngx-toastr";
import {MyValidators} from "../../validators/FormValidators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.component.html',
  styleUrls: ['./modifier-profile.component.css']
})
export class ModifierProfileComponent implements OnInit {
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'this field is required'
    },
    default: {
      email: 'The input is not valid email'
    }
  };
  prestataire:Prestataire=new Prestataire();
  esn:Esn=new Esn();
  formGroup: FormGroup;
  formGroupEsn: FormGroup;

  constructor(
              public keycloak:KeycloakService,
              private completeProfileService:CompleteProfileService,
              private activatedRoute:ActivatedRoute,
              private route:Router,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  loadFormPrestataire() {
    const { required, maxLength, minLength } = MyValidators;
    this.formGroup = this.formBuilder.group({
      nom: ["", [required, maxLength(20), minLength(1)]],
      prenom: ["", [required,Validators.pattern,Validators.pattern('^[ 0-9 ]*$')]],
      email: ["", [required,Validators.email]],
      rib: ["", [required,Validators.pattern,Validators.pattern('^[ 0-9 ]*$'),maxLength(18), minLength(18)]],
      iban: ["", [required,Validators.pattern,Validators.pattern('^[ 0-9 ]*$'),maxLength(6), minLength(6)]],
      lieu: ["", [required,maxLength(20), minLength(2)]],
      profession: ["", [required,maxLength(20), minLength(2)]],
    });
  }
  loadFormEsn() {
    const { required, maxLength, minLength } = MyValidators;
    this.formGroupEsn = this.formBuilder.group({
      nomEsn: ["", [required, maxLength(20), minLength(1)]],
      email: ["", [required,Validators.email]],
      rib: ["", [required,Validators.pattern,Validators.pattern('^[ 0-9 ]*$'),maxLength(18), minLength(18)]],
      iban: ["", [required,Validators.pattern,Validators.pattern('^[ 0-9 ]*$'),maxLength(6), minLength(6)]],
      lieu: ["", [required,maxLength(20), minLength(2)]],
    });
  }
  isNumericOnly(event: any): boolean {
    return event.key >= '0' && event.key <= '9';

  }
  @HostListener('window:keydown',['$event'])
  onKeyPress($event: KeyboardEvent) {
    if(($event.ctrlKey || $event.metaKey) && $event.keyCode == 86) {
      console.log('CTRL +  V');
      return false;
    }
    return true

  }
  @HostListener('contextmenu', ['$event'])
  onRightClick(event:any): void{
    event.preventDefault();
  }
  ngOnInit(): void {
    this.loadFormPrestataire()
    this.loadFormEsn()
    this.activatedRoute.paramMap
      .subscribe(res=> {
        if(this.keycloak.isEsn){
          this.completeProfileService.getEsnByUsername(res.get('username'))
            .subscribe(res => {
              this.esn = res;
              console.log(res)
            })
        }else {
        this.completeProfileService.getPrestataireByUsername(res.get('username'))
          .subscribe(res => {
            this.prestataire = res;
            console.log(res)
          })
        }
      })
  }

  modifierEsnProfile():void {
    this.completeProfileService.modifierProfileEsn(this.esn)
      .subscribe(()=>{
        this.toastr.success("","votre compte a été modifié")
      },()=>{
        this.toastr.error("","une erreur s'est produite")
      })
  }

  modifierPrestataireProfile():void{
    this.completeProfileService.modifierProfilePrestataire(this.prestataire)
      .subscribe(()=>{
        this.toastr.success("","votre compte a été modifié")
      },()=>{
        this.toastr.error("","une erreur s'est produite")
      })
  }
}
