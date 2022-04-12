import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "./services/keycloak.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  constructor(
    public keykcloak:KeycloakService,
    private spinner: NgxSpinnerService) {
  }

  onLogin(){

      this.keykcloak.kc.login()


  }

  ngOnInit(): void {
    this.spinner.show().then().catch();
    setTimeout(()=>{
      this.spinner.hide().then().catch()
    },2000)
  }

}
