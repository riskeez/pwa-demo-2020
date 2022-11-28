import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../shared/models/product.model';

const baseUrl = 'https://www.foodrepo.org/api/v3';
const apiKey = 'API_KEY';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  constructor(private http: HttpClient) { }

  get(route: string, data?: any) {
    const url = baseUrl + route;

    let headers = new HttpHeaders({ Authorization: `Bearer ${apiKey}` });

    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.get<any>(url, {
      responseType: 'json',
      headers: headers,
      params: params
    });
  }

  getProducts(): Observable<Product[]> {
    return this.get('/products?page[size]=200').pipe(
      map((response: any) => response.data as Product[]),
      map(products => products.map(p => new Product(p)))
    );
  }
}

