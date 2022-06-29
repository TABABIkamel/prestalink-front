import {Component, Input, OnInit} from '@angular/core';
import {Esn} from "../../Models/Esn";
import {AppelOffre} from "../../Models/AppelOffre";
import {AppelOffreService} from "../../services/appel-offre.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {MyValidators} from "../../validators/FormValidators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-drawer-create',
  templateUrl: './drawer-create.component.html'
})
export class DrawerCreateComponent implements OnInit{
  appelOffre:AppelOffre=new AppelOffre();
  @Input() nameOfParentComponent:string;
  visible = false;
  formGroup: FormGroup;
  dateDebutEtFin: Date[][] = new Array();
  titleDrawer:string;
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
constructor(private appelOffreService:AppelOffreService,private toastr: ToastrService,private route:Router,private formBuilder: FormBuilder) {
}

  loadForm() {
    const { required, maxLength, minLength } = MyValidators;
    this.formGroup = this.formBuilder.group({
      titreAo: ["", [required, maxLength(50), minLength(1)]],
      tgm: ["", [required,Validators.pattern('^[ 0-9 ]*$')]],
      modalite: ["", [required]],
      lieu: ["", [required,maxLength(30), minLength(2)]],
      dateTime: ["", [required]],
      description: ["", [required,maxLength(300), minLength(2)]],
    });
  }
  open(): void {
    this.titleDrawer="ajouter appel offre";
    this.visible = true;

  }

  close(): void {
    this.visible = false;
  }
  isNumericOnly(event: any): boolean {

    return event.key >= '0' && event.key <= '9';

  }
  submitAo() {
    //this.appelOffre.dateDebutAoDto=this.dateAo[0]
    //this.appelOffre.dateFinAoDto=this.dateAo[1]
    console.log(this.appelOffre)
    if(this.nameOfParentComponent=="mesAppelOffres"){
      this.appelOffre.dateDebutAoDto=this.dateDebutEtFin[0][0]
      this.appelOffre.dateFinAoDto=this.dateDebutEtFin[0][1]
      console.log(this.appelOffre)
      this.appelOffreService.editAo(this.appelOffre)
        .subscribe(res=>{
          this.toastr.success("","appel offre a été modifié")
          this.appelOffre=new AppelOffre();
          this.route.routeReuseStrategy.shouldReuseRoute = () => false;
          this.route.onSameUrlNavigation = 'reload';
          this.route.navigateByUrl('appeloffre')
        })

    }else{
      this.appelOffre.dateDebutAoDto=this.dateDebutEtFin[0][0]
      this.appelOffre.dateFinAoDto=this.dateDebutEtFin[0][1]
    this.appelOffreService.createAo(this.appelOffre).subscribe((res)=>{
      this.appelOffre=new AppelOffre()
      this.dateDebutEtFin=[]
      this.toastr.success("","appel offre a été crée")
      this.appelOffre=new AppelOffre();
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigateByUrl('appeloffre')
    },(error => {
      this.toastr.error("OUPS","error has occurred")
    }))
    }
    this.visible = false;
  }

  ngOnInit(): void {
  this.loadForm()
  }
}
