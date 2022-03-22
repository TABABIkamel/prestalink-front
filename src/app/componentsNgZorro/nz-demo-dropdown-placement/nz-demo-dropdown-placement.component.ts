import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../../services/keycloak.service";

@Component({
  selector: 'app-nz-demo-dropdown-placement',
  templateUrl: './nz-demo-dropdown-placement.component.html'
})
export class NzDemoDropdownPlacementComponent implements OnInit{

  visible = false;
  constructor(public keycloak:KeycloakService) {
  }
  async ngOnInit(): Promise<void> {
    console.log(await this.keycloak.getNameAuthenticatedUser())

  }
  onLogin(){
    this.keycloak.kc.login()
  }

  OnLogout() {
    this.keycloak.kc.logout()
  }
}
