import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = 'http://localhost:8081/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private UserStorageService: UserStorageService
  ) { }


  register(singnupRequest:any):Observable<any>{
    return this.http.post(BASIC_URL+ "sign-up" ,singnupRequest);
  }

  login(username:string,password:string): any{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {username,password};

    return this.http.post(BASIC_URL+ 'authenticate', body, {headers, observe: 'response'}).pipe(
      map((res)=>{
        const token = res.headers.get('authorization')?.substring(7);
        const user = res.body;

        if(token && user){
          this.UserStorageService.saveToken(token);
          this.UserStorageService.saveUser(user);
        return true;
        }
        return false;
      })
    );


  }

}
