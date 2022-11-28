import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavPanelComponent } from './nav-panel/nav-panel.component';
import { MainComponent } from './main/main.component';
import { MenuTileComponent } from './main/menu-tile/menu-tile.component';
import { DataListComponent } from './data/data-list/data-list.component';
import { DataComponent } from './data/data.component';
import { StorageComponent } from './storage/storage.component';
import { ImagesComponent } from './images/images.component';
import { DataItemComponent } from './data/data-list/data-item/data-item.component';
import { StorageEstimationComponent } from './storage/storage-estimation/storage-estimation.component';


@NgModule({
  declarations: [
    AppComponent,
    NavPanelComponent,
    MainComponent,
    MenuTileComponent,
    DataListComponent,
    DataComponent,
    StorageComponent,
    ImagesComponent,
    DataItemComponent,
    StorageEstimationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('service-worker.js', { enabled: environment.production }),
    ChartsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
