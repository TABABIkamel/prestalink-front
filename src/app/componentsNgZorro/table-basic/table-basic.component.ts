import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {Approval} from "../../Models/Approval";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Contrat} from "../../Models/Contrat";
import {NgxSpinnerService} from "ngx-spinner";
import {NzModalService} from "ng-zorro-antd/modal";
import {KeycloakService} from "../../services/keycloak.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyValidators} from "../../validators/FormValidators";

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html'
})
export class TableBasicComponent {
  @Output() isVisibleData = new EventEmitter<[boolean,string,string]>();
  @Output() modalData = new EventEmitter<any>();
  @Output() reloadData = new EventEmitter<boolean>();
  @Input() isGestionCandidatComponent: boolean;
  formGroup: FormGroup;
  contract: Contrat = new Contrat();
  listOfData: any[] = [];
  isFormContractVisible = false
  idCandidature:string=''
  approval: Approval = new Approval();
  //isHasContratAlertVisible: boolean=false;
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    },
    default: {
      email: 'The input is not valid email'
    }
  };
  private refAo: string='';
  constructor(
    private formBuilder: FormBuilder,
    private appelOffreService: AppelOffreService,
    private modal: NzModalService,
    private toastr: ToastrService,
    private route: Router,
    private keycloak:KeycloakService,
    private spinner: NgxSpinnerService,
    private message: NzMessageService) {
  }

  loadForm() {
    const { required, maxLength, minLength } = MyValidators;
    this.formGroup = this.formBuilder.group({
      nomSocieteClient: ["", [required, maxLength(12), minLength(6)]],
      capitaleSocieteClient: ["", [required]],
      // adresseMail: [this.client.adresseMail, Validators.compose([Validators.required, Validators.email])],
      lieuSiegeClient: ["", [required]],
      numeroRegitreCommerceClient: ["", [required]],
      nomRepresentantSocieteClient: ["", [required,maxLength(30), minLength(2)]],
      nomPrestataire: ["", [required,maxLength(30), minLength(2)]],
      prenomPrestataire: ["", [required,maxLength(30), minLength(2)]],
      lieuPrestataire: ["", [required]],
      cin: ["", [required]],
      preambule: ["", [required]],
      prixTotaleMission: ["", [required]],
      penalisationParJour: ["",  [required]]
    });
  }


  showModal(id: any,name:string,email:string) {
    this.isVisibleData.emit([true,name,email])
    this.modalData.emit(id);
  }

  refuserCandidat(id: string) {
    this.modal.confirm({
      nzTitle: 'Are you sure to refuse this candidate?',
      //nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.approval.id = id
        this.approval.status = false
        this.appelOffreService.candidatureReview(this.approval).subscribe(() => {
          this.route.navigateByUrl('gestionCandidat')
          this.toastr.info('success', 'candidat a été refusé')
        })
      },
      nzCancelText: 'No',
    });

  }

  accpeterCandidat(id: string) {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to accept this candidate?</i>',
      //nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.approval.id = id
        this.approval.status = true
        this.appelOffreService.candidatureReview(this.approval).subscribe(() => {
          this.route.navigateByUrl('gestionCandidat')
          this.toastr.success('Done', 'candidat a été accepté')
        })
      }
    });

  }

  handleCancel() {
    //this.isHasContratAlertVisible=false
    this.isFormContractVisible = false
  }
  // handleOkModalAlert(){
  //   this.isHasContratAlertVisible=false;
  // }
  handleOk() {
    this.submitForm()
    // console.log(this.contract)
    // this.contract.idCandidature=this.idCandidature;
    // this.appelOffreService.generateContract(this.contract).subscribe(res => {
    //   this.spinner.show().then();
    //   setTimeout(()=>{
    //     this.spinner.hide().then()
    //     this.reloadData.emit(true)
    //     this.toastr.success("Done",`contrat a été généré`)
    //   },3000)
    //   console.log(res)
    // }, err => {
    //   console.warn(err)
    // })
    // this.isFormContractVisible = false
  }

  showContratModal(data:any) {
    this.loadForm();
    // this.contract.nomSocieteClient=this.keycloak.getNameAuthenticatedUser()
    // this.contract.nomRepresentantSocieteClient=this.keycloak.getUsernameAuthenticatedUser()
    // this.contract.nomPrestataire=data.name
    // this.contract.lieuPrestataire=data.lieu
    this.refAo=data.refAo
    this.idCandidature=data.id
    console.log(data.id)
    console.log(data.hasContract)
    if(data.hasContract)
    {
      this.message.info('vous avez déja generé un contrat pour ce candidat')
      // this.isHasContratAlertVisible=true
      this.isFormContractVisible = false;
    }
    else
    {
      this.isFormContractVisible = true;
    }
  }
  submitForm(): void {
    if (this.formGroup.valid) {
      console.log('submit', this.formGroup.value);
      this.contract=this.formGroup.value
      this.contract.idCandidature=this.idCandidature;
      this.contract.refAo=this.refAo;
      console.log(this.contract)
      this.appelOffreService.generateContract(this.contract).subscribe(res => {
      this.reloadData.emit(true)
      this.toastr.success("Done",`contrat a été généré`)
      console.log(res)
      }, err => {
        console.warn(err)
      })
      this.isFormContractVisible = false
    } else {
      Object.values(this.formGroup.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}



