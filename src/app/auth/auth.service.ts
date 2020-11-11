import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import User from './user.model';

export interface AuthInterface{
    login : string;
    token : string;
    userId : string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);

    URL = "http://javatravelers-backend.azurewebsites.net";

    constructor(private http: HttpClient){

    }

    signup(data?){
        let params = {
            "cpf": "11111111111",
            "email": "ads123asdas@sadasd.com",
            "login": "sdadsadsdasdsaaasd",
            "nome": "dsadsadsaasd",
            "senha": "123456"
        };

        return this.http.post(this.URL + "/signup", data ?? params);
    }

    login(data?){
        let params= {
            "usuario" : "ads123asdas@sadasd.com", //usuario eh email
            "senha" : "123456"
        }

        return this.http.post<AuthInterface>(this.URL + "/login", data ?? params).pipe(tap(resData => {
            const user = new User(resData.login, resData.userId, resData.token);
            this.user.next(user);
            localStorage.setItem('userData', JSON.stringify(user));
        }

        ));
    }

    autoLogin(){
        const user: {login : string, userId: string, token : string} = JSON.parse(localStorage.getItem('userData'));

        if(!user){
            return;
        }

        const loadedUser = new User(user.login, user.userId, user.token);

        this.user.next(loadedUser);
    }

    logout(){
        this.user.next(null);
        localStorage.clear();
    }
}