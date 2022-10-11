import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/_Services/course.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  errorMessage: string = ""
  result: any = {}
  Isresult = false
  coursename = "";
  url = "";
  visibile = false;
  courseduration = 0;
  coursedescription = "";
  technology = "";
  total_airlines = 0
  isedit = false
  airId = ""
  constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    this.loadAllCourse()
  }
  loadAllCourse() {
    this.courseService.getCourse()
      .subscribe((res: any) => {
        this.total_airlines = res.length;
        if (this.total_airlines != 0) {
          this.Isresult = true
        }
        this.result = res;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }



  



}

