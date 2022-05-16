import {Component, OnInit, ViewChild} from '@angular/core';
import {AppelOffreService} from "../../services/appel-offre.service";
import {KeycloakService} from "../../services/keycloak.service";
import {TableBasicComponent} from "../../componentsNgZorro/table-basic/table-basic.component";
import {formatDate} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {HttpRequestService} from "../../services/http-request.service";
import {map} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-candidature-reviewed',
  templateUrl: './candidature-reviewed.component.html',
  styleUrls: ['./candidature-reviewed.component.css']
})
export class CandidatureReviewedComponent implements OnInit {
  @ViewChild(TableBasicComponent) dataTable: any;
  private showSpinnerSubscription: Subscription;
  //public showSpinner$: Observable<Boolean>;
  public pendingHttpRequests:number=0;
  isVisible: boolean;
  contentModal: any;
  show: boolean = false;
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
  today: Date = new Date("2002, 02, 02")
  inGestionCandidatComponent = false;

  constructor(private appelOffreService: AppelOffreService,
              private keycloakService: KeycloakService,
              httpRequestTrackingService: HttpRequestService,
              private spinner: NgxSpinnerService) {
    // this.showSpinner$ = httpRequestTrackingService.pendingHttpRequests$
    //   .pipe(map((pendingHttpRequests: number) => {
    //     return pendingHttpRequests > 0;
    //   }));
    this.showSpinnerSubscription = httpRequestTrackingService.pendingHttpRequests$.subscribe((value)=>{
          this.pendingHttpRequests=value;
          if(this.pendingHttpRequests>0)
            this.spinner.show()
          else
            this.spinner.hide()
    })


  }

  ngOnInit(): void {
    this.appelOffreService.getCandidatReviewed(this.keycloakService.getUsernameAuthenticatedUser()).subscribe((res) => {
      console.log(res)
      this.dataTable.listOfData = res;
    })
  }

  getIsVisibleValue(value: any) {
    this.isVisible = value[0];
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  getIdCandidat(id: number) {
    console.log(id)
    this.dataTable.listOfData.forEach((element: any) => {
      if (element.id == id) {
        this.contentModal = element;
      }
    })
    console.log('heree')
    console.log(this.contentModal)
  }

  reloadComponent(check: boolean) {
    if (check) {
      this.ngOnInit()
    }
  }
}
