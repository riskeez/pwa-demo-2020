import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificationModel } from '../shared/models/notification.model';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.css']
})
export class NavPanelComponent implements OnInit {

  @ViewChild('navBurger') navBurger!: ElementRef;
  @ViewChild('navMenu') navMenu!: ElementRef;

  notify: NotificationModel | null = null;

  constructor(private swPush: SwPush) { }

  ngOnInit(): void {
    this.swPush.messages.subscribe((message: any) => {
      this.notify = new NotificationModel(message.title, message.body);
    });

    this.swPush.notificationClicks.subscribe((event: any) => {
      alert('Oh, you\'ve clicked me! Good job!')
    });
  }

  toggleMenu() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  closeNotification() {
    this.notify = null;
  }
}
