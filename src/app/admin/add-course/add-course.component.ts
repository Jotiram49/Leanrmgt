import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/_Services/course.service';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  errorMessage: string = ""
  result: any = {}
  Isresult = false
  courseName = "";
  launchUrl = "";
  visibile = false;
  courseDuration = 0;
  courseDescription = "";
  technology = "";
  total_airlines = 0
  isedit = false
  airId = ""

  constructor(private courseService: CourseService,private router: Router) { }
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
  deleteCourse(airId: string) {
    if (confirm("Are you sure to delete the course?")) {
      this.courseService.deleteCourse(airId)
        .subscribe(
          () => {
            alert("course deleted.")
            this.loadAllCourse()
           
          },
          (err) => console.log(err)
        );

    }

  }

  SaveCourse() {
    let course =
    {
      "courseName": this.courseName,
      "launchUrl": this.launchUrl,
      "courseDuration": this.courseDuration,
      "courseDescription": this.courseDescription,
      "technology": this.technology,

    }
    this.courseName = "";
    this.launchUrl = "";
    this.courseDuration = 0;
    this.courseDescription = "";
    this.technology = "";
    //console.log("-----------------------", course)
    this.courseService.AddCourse(course)
      .subscribe((res: any) => {
        console.log(res)
        //console.log("Successful")
        alert("Successfully added")
       this.loadAllCourse()
       
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })

  }
  toggleShow() {
    if (this.visibile == true) {
      this.visibile = false;
    }
    else {
      this.visibile = true;

      this.courseName = "";
      this.launchUrl = "";
      this.courseDuration = 0;
      this.courseDescription = "";
      this.technology = "";
      this.technology = "";

    }
  }

  editbutton(id: string) {
    this.courseService.ShowCoursebyId(id)
      .subscribe((res: any) => {
        this.airId = res.id;
        this.isedit = true;
        this.courseName = res.courseName;
        this.launchUrl = res.launchUrl;
        this.courseDuration = res.courseDuration;
        this.courseDescription = res.courseDescription;
        this.technology = res.technology;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  updateCourse() {
    let course =
    {
      "courseName": this.courseName,
      "launchUrl": this.launchUrl,
      "courseDuration": this.courseDuration,
      "courseDescription": this.courseDescription,
      "technology": this.technology,

    }
    this.courseService.EditCourse(this.airId, course)
      .subscribe(() => {
        this.isedit = false;
        alert("Course modified.")
        this.loadAllCourse()
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  CancelButton() {
    this.loadAllCourse()
    this.isedit = false;
  }

}
