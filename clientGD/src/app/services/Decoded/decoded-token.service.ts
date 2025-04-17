import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../models/jwtPayload.model';

@Injectable({
  providedIn: 'root'
})
export class DecodedTokenService {

  constructor() { }

  decodedToken() :JwtPayload {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode<JwtPayload>(token!);
    console.log(decoded);
    return decoded;
  }

}
