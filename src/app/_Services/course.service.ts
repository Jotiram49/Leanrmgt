import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  url1: string = "http://localhost:8989/admin/API";
  url2: string = "http://localhost:8989/user";
  // url1: string = "http://ec2-18-189-20-2.us-east-2.compute.amazonaws.com:8989/admin/API";
  //url2: string = "http://ec2-18-189-20-2.us-east-2.compute.amazonaws.com:8989/user";
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
  deleteAirline(id: any) {
    console.log(this.url1 + "/courseController/" + id)
    //return this.httpClient.delete(this.url+"/airline?id="+id);
    return this.httpClient.delete(this.url1 + "/courseController/" + id);
  }
  AddCourse(course: any) {
    return this.httpClient.post(this.url1 + "/courseController", course);
  }
  ShowCoursebyId(id: any) {
    return this.httpClient.get(this.url1 + "/courseController/" + id);
  }
}
