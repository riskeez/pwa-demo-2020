import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const SERVER_URL = 'https://server/pwa_send';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private http: HttpClient) { }
  
  public sendSubscription(subscription: PushSubscription) {
    return this.http.post(SERVER_URL + '/subscribe', subscription);
  }
}
