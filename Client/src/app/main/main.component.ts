import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from '../services/push-notification.service';
import { MenuItem } from './menu-item.model';

const VAPID_PUBLIC = 'BITtkxfs_ppDfwfz3e5edOMYEvJHa9rcmtx7Pv3lKe2uN8zW6KxBdvy0N00wmLJJUyXM35PpcW1V1k_w-4fVLhc';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  menuList: MenuItem[] = [
    new MenuItem('Data List', '/data', 'fa fa-list'),
    new MenuItem('Storage', '/storage', 'fa fa-hdd-o')
  ];

  pushItem: MenuItem = { title: 'Push Notification', url: '#', icon: 'fa fa-bell' };

  constructor(private swPush: SwPush, private pushService: PushNotificationService) {
  }

  ngOnInit(): void {
  }

  disablePushButton = false;
  toggleNotifications(): void {
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC
      })
        .then(subscription => {
          console.log(subscription);
          this.pushService.sendSubscription(subscription).subscribe();
          this.disablePushButton = true;

          alert('Subscribed!');
        })
        .catch(console.error);
    }
  }
}
