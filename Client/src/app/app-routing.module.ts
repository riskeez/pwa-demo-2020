import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { ImagesComponent } from './images/images.component';
import { MainComponent } from './main/main.component';
import { StorageComponent } from './storage/storage.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'data', component: DataComponent},
  { path: 'storage', component: StorageComponent},
  { path: 'images', component: ImagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
