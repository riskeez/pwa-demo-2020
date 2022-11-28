import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  list: Product[] = [];
  isLoading = true;

  constructor(private dataService: DataLoaderService) {
    this.subscription = this.dataService.getProducts().subscribe(
      products => { 
        //console.log(products);
        this.list = products; 
        this.isLoading = false;
      },
      error => console.log(error));
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
