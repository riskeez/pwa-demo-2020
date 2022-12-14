import { Component } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DataLoaderPWA';

  constructor(private swUpdate: SwUpdate) {
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("New version available. Update?")) {
          window.location.reload();
        }
      });
    }
  }
}
