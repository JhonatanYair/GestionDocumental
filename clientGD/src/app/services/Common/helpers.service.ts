import { Injectable } from '@angular/core';
import { HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

}
