import { Component } from '@angular/core';
import {KeycloakService} from "./services/keycloak.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  constructor( public keykcloak:KeycloakService) {
  }
  onLogin(){
    this.keykcloak.kc.login()
  }

}
