
import jwt_decode  from 'jwt-decode';

export default class User {
    _tokenExpirationDate : Date;
    constructor(public login: string, public userId: string, private _token : string){
        let decoded_token : any = jwt_decode(_token);
        this._tokenExpirationDate = new Date(decoded_token.exp * 1000);
        // console.log(this._tokenExpirationDate.toString());
    }

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}    