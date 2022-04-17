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
  // notificationList = [
  //   {
  //     title: 'You received a new message You received a new message ',
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
  //   },
  //   {
  //     title: 'You have a new update',
  //     time: '2 days',
  //     icon: 'sync',
  //     color: 'ant-avatar-' + 'gold'
  //   },
  //   {
  //     title: 'You have a new update',
  //     time: '2 days',
  //     icon: 'sync',
  //     color: 'ant-avatar-' + 'gold'
  //   },
  //   {
  //     title: 'You have a new update',
  //     time: '2 days',
  //     icon: 'sync',
  //     color: 'ant-avatar-' + 'gold'
  //   },
  //   {
  //     title: 'You have a new update',
  //     time: '2 days',
  //     icon: 'sync',
  //     color: 'ant-avatar-' + 'gold'
  //   },
  //   {
  //     title: 'You have a new update',
  //     time: '2 days',
  //     icon: 'sync',
  //     color: 'ant-avatar-' + 'gold'
  //   },
  //   {
  //     title: 'You have a new update',
  //     time: '2 days',
  //     icon: 'sync',
  //     color: 'ant-avatar-' + 'gold'
  //   }
  // ];
  // constructor(private notification: NzNotificationService) {
  // }
  //
  // createBasicNotification(template: TemplateRef<any>) {
  //   this.notification.template(template);
  // }

  reloadNotifications() {
    this.reloadNotification.emit(true)
  }
}
