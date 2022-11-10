import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
 // url1: string = "http://localhost:8989/admin/API";
  //url2: string = "http://localhost:8989/user";
   url1: string = "http://Apigatway-env.eba-pmpja7ps.ap-northeast-1.elasticbeanstalk.com/admin/API";
  url2: string = "http://Apigatway-env.eba-pmpja7ps.ap-northeast-1.elasticbeanstalk.com/user";
  
  constructor(private httpClient: HttpClient) {

  }
  getCourse() {
    console.log("getting all Course")
    return this.httpClient.get(this.url1 + "/courseController")
  }
  EditCourse(airid: any, course: any) {
    console.log("Sucessful editing Course...")
    return this.httpClient.put(this.url1 + "/courseController/" + airid, course);
  }
  deleteCourse(id: any) {
    console.log(this.url1 + "/courseController/" + id)
    return this.httpClient.delete(this.url1 + "/courseController/" + id);
  }
  AddCourse(course: any) {
    console.log("Sucessful  Course...",course)
    return this.httpClient.post(this.url1 + "/courseController", course);
  }
  ShowCoursebyId(id: any) {
    return this.httpClient.get(this.url1 + "/courseController/" + id);
  }
  SearchCourseByParams(s: string) {
    return this.httpClient.get(this.url1 + "/courseController/search?text=" + s);
  }
}
