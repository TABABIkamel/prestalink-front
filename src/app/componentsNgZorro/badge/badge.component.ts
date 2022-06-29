import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent {
  @Input() notificationList:any
  @Output() reloadNotification=new EventEmitter<boolean>();
  show:boolean=false

  reloadNotifications() {
    this.reloadNotification.emit(true)
  }
}
