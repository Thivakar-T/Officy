import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';

// import { User } from '../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    // user: User;
    private _baseUrl = environment.API_URL;
    private _login =  this._baseUrl + '/auth/login';
    private changePass = this._baseUrl+ '/auth/change/password';
    private empRegister =  this._baseUrl + '/api/employee/create';
    private _baseUrl2=this._baseUrl + '/api/employee/employeeStatusActiveAndInactive';
    private _updateRegistration=this._baseUrl + '/api/employee/update';
    private deletRegistration=this._baseUrl + '/api/employee/delete';
    private getidapiurl=this._baseUrl + '/api/employee/get';
    

    private reg =  this._baseUrl + '/api/signin';

    private _changePassword =  this._baseUrl + '/auth/change/password';

    private _forgotPassword =  this._baseUrl + 'auth/send/password';


    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }
    

    /**
     * Returns the current user
     */
    public currentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

      //get token from interceptor
      public getToken() {
        return localStorage.getItem('token');
    }
    public getName() {
        return JSON.parse(localStorage.getItem('name'));
    }
    public getEmpID() {
        return localStorage.getItem('employeeId');
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    // login(email: string, password: string) {
    //     return getFirebaseBackend().loginUser(email, password).then((response: any) => {
    //         const user = response;
    //         return user;
    //     });
    // }

    login(data) {
        return this.http.post<any>(this._login, data);
    }

    changePassword(data) {
        return this.http.put<any>(this._changePassword, data);
    }

    forgotPassword(data) {
        return this.http.put<any>(this._forgotPassword, data);
    }
    empReg(data) {
        return this.http.post<any>(this.empRegister,data);
      }
      get() {
        return this.http.get<any>(this._baseUrl2);
      }
      updateRegistration(data) {
        return this.http.put<any>(this._updateRegistration, data);
      }
      public getidData(id) {
        return this.http.get<any>(this.getidapiurl + '/' + id);
      }
      deleteData(id :any ) {
        return this.http.put<any>(this.deletRegistration+ '/' + id , id );
        }
        registerEmp(data) {
            return this.http.post<any>(this.reg,data);
    }
    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    // register(email: string, password: string) {
    //     return getFirebaseBackend().registerUser(email, password).then((response: any) => {
    //         const user = response;
    //         return user;
    //     });
    // }

    
    

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('aId');
        localStorage.removeItem('allowedPortArr');
        this.router.navigate(['/account/login']);
    }

    loggedIn() {
        return !!localStorage.getItem('token');
    }
}

