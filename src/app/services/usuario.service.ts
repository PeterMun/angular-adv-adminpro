import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment.prod';



import { RegisterForm } from '../interfaces/register-form.interface';
import { loginForm } from '../interfaces/login-form.interface';



const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor( private http: HttpClient,
                private router: Router,
                private ngZone: NgZone

     ) {
       this.googleInit();
     }


     googleInit(){
      return new Promise ( resolve => {

        gapi.load('auth2', () => {
          // Retrieve the singleton for the GoogleAuth library and set up the client.
          this.auth2 = gapi.auth2.init({
            client_id: '429049478564-lefpv6sqjrrul038rishul6r57d6ib23.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
          });
          resolve();

        });

      } )


     }

     logout(){
       localStorage.removeItem('token');

       this.auth2.signOut().then( () => {

        this.ngZone.run( () => {
          this.router.navigateByUrl('/login');
        } )



      });


     }



    validarToken(): Observable<boolean> {

      const token = localStorage.getItem('token') || '';

      return this.http.get( `${ base_url }/login/renew` ,{

        headers: {
          'x-token': token
        }
      }).pipe(
        tap( ( resp: any ) => {
          localStorage.setItem('token', resp.token);
        } ),
        map( resp => true ),
        catchError( error => of( false ) )
      )

    }



  crearUsuario ( formData: RegisterForm ){

    return this.http.post(`${ base_url }/usuarios`, formData)
                    .pipe(
                      tap ( ( resp: any ) => {
                        localStorage.setItem('token', resp.token)
                      } )
                    )
  }



  login ( formData: loginForm ){

    return this.http.post(`${ base_url }/login`, formData)
                    .pipe(
                      tap ( ( resp: any ) => {
                        localStorage.setItem('token', resp.token)
                      } )
                    )

  }



  loginGoogle ( token ){

    return this.http.post(`${ base_url }/login/google`, { token })
                    .pipe(
                      tap ( ( resp: any ) => {
                        localStorage.setItem('token', resp.token)
                      } )
                    )

  }




}
