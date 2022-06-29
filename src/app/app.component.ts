import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "./services/keycloak.service";
import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NotificationService} from "./services/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  public notifications: string[] = [];
  notificationContent: string;
  private client: StompJs.Client;
  notificationList: any;

  constructor(
    public keykcloak: KeycloakService,
    private notificationService:NotificationService,
    private notification: NzNotificationService) {
  }

  onLogin() {
    this.keykcloak.kc.login()
  }
  async on(){
    await this.onLogin()
  }

  async ngOnInit(): Promise<void> {
    this.getUserNotifications(this.keykcloak.getUsernameAuthenticatedUser())
    this.connectClicked()
    setTimeout(() => {
      this.startClicked()
    }, 5000)
  }


  connectClicked() {
    if (!this.client || this.client.connected) {
      this.client = new StompJs.Client({
        webSocketFactory: () => new SockJS('http://localhost:8089/notifications'),
        debug: (msg: string) => console.log(msg)
      });

      this.client.onConnect = () => {

        this.client.subscribe('/user/notification/item' + this.keykcloak.getUsernameAuthenticatedUser(), (response) => {
          const text: string = response.body;
          this.notification.create("info", "Notification", text)
          this.notifications.push(text);
        });

        console.info('connected!');
      };

      this.client.onStompError = (frame) => {
        console.error(frame.headers['message']);
        console.error('Details:', frame.body);
      };

      this.client.activate();
    }
  }

  disconnectClicked() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
      console.info("disconnected :-/");
    }
  }

  startClicked() {
    if (this.client && this.client.connected) {
      this.client.publish({destination: '/swns/start'});
    }
  }

  stopClicked() {
    if (this.client && this.client.connected) {
      this.client.publish({destination: '/swns/stop'});
    }
  }
getUserNotifications(username:string){
  this.notificationService.getAllNotificationByUsername(username)
    .subscribe(res=>{

      for(let i=0;i<res.length;i++){

        if(res[i].contentDto.toString().includes('null')){
              res.splice(i,1)
        }
      }
      this.notificationList=res})
}
  reloadNotification(reload:boolean) {
    if(reload){
      this.getUserNotifications(this.keykcloak.getUsernameAuthenticatedUser())
    }
  }
}
