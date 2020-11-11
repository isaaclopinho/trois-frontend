import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router : Router){

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
            const loadedUser = new User(resData.login, resData.userId, resData.token);

                this.user.next(loadedUser);
                const expirationDuration = new Date(loadedUser._tokenExpirationDate).getTime() - new Date().getTime();
                console.log("expira em: " + expirationDuration);
                this.autoLogout(expirationDuration);
                localStorage.setItem('userData', JSON.stringify(loadedUser));
            }

        ));
    }

    autoLogin(){
        const user: {login : string, userId: string, token : string} = JSON.parse(localStorage.getItem('userData'));

        if(!user){
            return;
        }
        
        const loadedUser = new User(user.login, user.userId, user.token);

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(loadedUser._tokenExpirationDate).getTime() - new Date().getTime();
            console.log("expira em: " + expirationDuration);
            this.autoLogout(expirationDuration);
        }


    }

    logout(){
        this.user.next(null);
        this.router.navigate(['auth']);
        localStorage.clear();
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration : number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
}