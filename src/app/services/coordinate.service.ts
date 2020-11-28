import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoordinateService {


  constructor(private http: HttpClient) { }


  // tslint:disable-next-line:typedef
  fetchCoordinate(formData) {
    return this.http.post(`${environment.apiUrl}`, formData);
  }


}
