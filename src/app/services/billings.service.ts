import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Billing, UpdateBilling, NewBilling } from '../models/billing';
import { Product } from '../models/product';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class BillingsService {

  constructor(private _httpClient: HttpClient) { }

  getBillings(): Observable<Billing[]>{
    return this._httpClient.get<Billing[]>(`${environment.apiUrl}Billings`)
    .pipe( map( (resp: Billing[]) => resp));
  }

  getProducts(): Observable<Product[]>{
    return this._httpClient.get<Product[]>(`${environment.apiUrl}Products`)
    .pipe( map( (resp: Product[]) => resp));
  }

  getCustomers(): Observable<Customer[]>{
    return this._httpClient.get<Customer[]>(`${environment.apiUrl}Customers`)
    .pipe( map( (resp: Customer[]) => resp));
  }

  createBilling(newBilling: NewBilling): Observable<any>{
    return this._httpClient.post<any>(`${environment.apiUrl}Billings/`, newBilling)
    .pipe( map( (resp: any) => resp));
  }

  updateBilling(updateBilling: UpdateBilling): Observable<any>{
    return this._httpClient.put<any>(`${environment.apiUrl}Billings/${updateBilling.id}/${updateBilling.idNewCustomer}`, updateBilling)
    .pipe( map( (resp: any) => resp));
  }

  deleteBilling(idBilling: number): Observable<any>{
    return this._httpClient.delete<any>(`${environment.apiUrl}Billings/${idBilling}`)
    .pipe( map( (resp: any) => resp));
  }
  
}
