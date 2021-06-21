import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from "src/environments/environment";


export interface AuthorizationResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<User>(null);
  private expirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthorizationResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.fireBaseKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthorizationResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fireBaseKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(
      resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }
    ))
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.expirationTimer){
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }

  autoLogin(){
    const user: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!user){
      return;
    }

    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate))

    if (loadedUser.token){
      this.user.next(loadedUser);
      const expirationTokenTime = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationTokenTime);
    }
  }

  autoLogOut(expirationTime) {
    this.expirationTimer = setTimeout(() => {this.logOut()}, expirationTime)
  }

  handleAuthentication(email: string, userId: string, token: string ,expiresIn: number){
    const expTime = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User(email, userId, token, expTime);
    this.user.next(user);
    this.autoLogOut(expiresIn*1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  handleError(error: HttpErrorResponse) {
    let errMsg = 'An Error Occurred';
    console.log(error?.error?.error?.message, 'error')

    if (!error?.error && !error?.error?.message) {
      console.log('if');
      return throwError(errMsg);
    }

    switch (error?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errMsg = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errMsg = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errMsg = 'Wrong Password';
        break;
    }
    return throwError(errMsg);
  }

}
