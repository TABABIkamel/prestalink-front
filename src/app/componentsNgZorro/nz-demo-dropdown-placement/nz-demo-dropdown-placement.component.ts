import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../../services/keycloak.service";

@Component({
  selector: 'app-nz-demo-dropdown-placement',
  templateUrl: './nz-demo-dropdown-placement.component.html'
})
export class NzDemoDropdownPlacementComponent implements OnInit{

  visible = false;
  // notificationList = [
  //   {
  //     title: 'You received a new message',
  //     time: '8 min',
  //     icon: 'mail',
  //     color: 'ant-avatar-' + 'blue'
  //   },
  //   {
  //     title: 'New user registered',
  //     time: '7 hours',
  //     icon: 'user-add',
  //     color: 'ant-avatar-' + 'cyan'
  //   },
  //   {
  //     title: 'System Alert',
  //     time: '8 hours',
  //     icon: 'warning',
  //     color: 'ant-avatar-' + 'red'
  //   },
  //   {
  //     title: 'You have a new update',
  //     time: '2 days',
  //     icon: 'sync',
  //     color: 'ant-avatar-' + 'gold'
  //   }
  // ];
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
