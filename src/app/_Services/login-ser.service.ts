import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
}
)
export class LoginSerService {
  //url1:string= "http://localhost:8989/user/userController"
  //url2:string="http://localhost:8989/authenticate"
 url1: string = "http://Apigatway-env.eba-pmpja7ps.ap-northeast-1.elasticbeanstalk.com/user/userController"
 url2: string = "http://Apigatway-env.eba-pmpja7ps.ap-northeast-1.elasticbeanstalk.com/authenticate"
  
  
  constructor(private httpClient: HttpClient) {

  }

  /*AuthorizationTest(email:string,pwd:string)
   {
     console.log("Authorization........................")
     return this.httpClient.get(this.url+"/user?email="+email+"&password="+pwd)
   }*/
  Authorization(auth: any) {
    console.log("Authorization........................")
    return this.httpClient.post(this.url1 + "/login", auth)
  }
  /*JWTAuthorization(jwtObj:any)
  {
    console.log("JWT Authorization........................")
    return this.httpClient.post(this.url2,jwtObj)
  }*/
  authenticate(jwtObj: any) {
    return this.httpClient.post<any>(this.url2, jwtObj).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', jwtObj.username);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    );
  }

  /* getUsers(){
     console.log("getting all users")
     return this.httpClient.get(this.url+"/user")
   }*/

  getUsersDetails() {
    console.log("getting User details")
    //localStorage.getItem('User');
    return this.httpClient.get(this.url1 + "/" + localStorage.getItem('User'));
  }
  /*getCustomerTotal(){
    console.log("getting only Use")
    //localStorage.getItem('User');
    return this.httpClient.get(this.url+"/user?roleId=2");
  }*/
  registrationUser(user: any) {
    return this.httpClient.post(this.url1 + "/registration", user);
  }

  loggedInAdmin() {
    return !!localStorage.getItem('Role');

  }
  loggedInUser() {
    return !!localStorage.getItem('User');

  }

}
