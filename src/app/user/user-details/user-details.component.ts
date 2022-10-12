import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/_Services/course.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  title = 'Angular Search Using ng2-search-filter';
  searchText: any;
  errorMessage: string = ""
  result: any = {}
  Isresult = false
  visibile = false;
  technology = "";
  total_airlines = 0
  isedit = false
  airId = ""
  courseName = "";
  launchUrl = "";
  courseDuration = 0;
  courseDescription = "";
  constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    this.loadAllCourse()
  }
  loadAllCourse() {
    this.courseService.getCourse()
      .subscribe((res: any) => {
        this.result = res;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }



  



}

