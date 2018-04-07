import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseError } from 'firebase/app';
import * as firebase from 'firebase/app';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// import { AppUser } from '../models/app-user';

export enum AuthProviders {
  Github = 0,
  Google = 1,
  Facebook = 2,
  Twitter = 3,
  Password = 4,
  Anonymous = 5,
  Custom = 6,
  Phone = 7
}


@Injectable()

export class AuthService {
  // private _userObj$: FirebaseObjectObservable<User>;
  private _user$: Observable<firebase.User>;
  private _appUser: firebase.User;
  private _isAnonymousUser$: Observable<boolean>;
  private _isSocialUser$ = new BehaviorSubject(false);

  constructor(private _afAuth: AngularFireAuth) {

    this._user$ = _afAuth.authState;
    this._appUser = null;

    this._user$.subscribe(
      (user: firebase.User) => {
        if (user) {
          this._appUser = user;
          this._isSocialUser$.next(!user.isAnonymous);
        } else {
          this._appUser = null;
          this._isSocialUser$.next(false);
        }
      });
  }

  get authenticated(): boolean {
    return this._user$ !== null;
  }

  get isSocialUser$(): Observable<boolean> {
    return this._isSocialUser$.asObservable();
  }

  get currentUser$(): Observable<firebase.User> {
    return this._user$;
  }

  loginAnonymously() {
    console.log('#Event: signInAnonymous()#');
    this._afAuth.auth.signInAnonymously()
      .then(user => {
        console.log('loginAnonymously(): Sign in successfull...', user);
      })
      .catch(
        (e: firebase.FirebaseError) => {
          console.error('loginAnonymously(): Error...', e.code);
        });
  }

  // upgradeAnonymousUser(user: firebase.User, providerId: number): firebase.Promise<firebase.User> {
  //   console.log('#Event: upgradeAnonymousUser(firebase.User, providerId)#');
  //   let provider: firebase.auth.AuthProvider = null;
  //   switch (providerId) {
  //     case AuthProviders.Facebook:
  //       provider = new firebase.auth.FacebookAuthProvider();
  //       break;
  //     case AuthProviders.Google:
  //       provider = new firebase.auth.GoogleAuthProvider();
  //       break;
  //   }
  //   return user.linkWithPopup(provider)
  //     .then(
  //       (response: any) => {
  //         this._isSocialUser$.next(true);
  //         console.log('User data upgrade: ', response.user.providerData[0]);
  //         // this.saveUserRecord(response.user);
  //       }).catch(
  //         (e: any) => {
  //           if (e.code === 'auth/credential-already-in-use') {
  //             firebase.auth().signInWithCredential(e.credential).then(
  //               (res) => {
  //                 this._isSocialUser$.next(true);
  //                 this._appUser = user;
  //               });
  //           } else {
  //             console.log(e);
  //           }
  //         });
  // }


  // loginFacebook(): firebase<firebase.auth.UserCredential> {
  //   return this.signIn(AuthProviders.Facebook);
  // }

  // loginGoogle(): firebase.Promise<firebase.auth.UserCredential> {
  //   return this.signIn(AuthProviders.Google);
  // }


  // signIn(providerId: number): firebase.Promise<firebase.auth.UserCredential> {
  //   let provider: firebase.auth.AuthProvider = null;

  //   switch (providerId) {
  //     case AuthProviders.Facebook:
  //       provider = new firebase.auth.FacebookAuthProvider();
  //       break;
  //     case AuthProviders.Google:
  //       provider = new firebase.auth.GoogleAuthProvider();
  //       break;
  //   }
  //   return this._appUser.linkWithPopup(provider)
  //     .then((result: firebase.auth.UserCredential) => {
  //       // The signed-in user info.
  //       this._appUser = result.user;
  //     }).catch((error: FirebaseError) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.error('ERROR @ AuthService#signIn() :', error);

  //       // if (errorCode === 'authService/account-exists-with-different-credential') {
  //       //   alert('You have signed up with a different provider for that email.');
  //       //   // Handle linking here if your app allows it.
  //       // } else {

  //       // }
  //     });
  // }

  // saveUserData(user: firebase.User): void {
  //   console.log('postLoginUpdateUserData: Store user data into Firebase database- ', user);
  // }

  // redirectUserTo(path: string): void {
  //   console.log('postLoginNavigateTo: Navigate to the URL: ', path);
  // }


  // signOut() {
  //   console.log('#Event: signOut()#');
  //   const tmpUser = this._appUser;
  //   this._afAuth.auth.signOut()
  //     .then((res) => {
  //       console.log('signOut(', tmpUser.uid, '): Successfull...');
  //       if (tmpUser.isAnonymous) {
  //         // 1) Remove anonymous user record from database.
  //         // 2) Delete anonymous user.
  //       }
  //     })
  //     .catch((e) => console.log('signOut(): Error...', e));
  // }

}
