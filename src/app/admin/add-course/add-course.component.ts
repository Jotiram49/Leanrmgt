import { Component, OnInit } from '@angular/core';
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
  deleteCourse(airId: string) {
    if (confirm("Are you sure to delete the course?")) {
      this.courseService.deleteAirline(airId)
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
      "coursename": this.coursename,
      "url": this.url,
      "courseduration": this.courseduration,
      "coursedescription": this.coursedescription,
      "technology": this.technology,

    }
    this.coursename = "";
    this.url = "";
    this.courseduration = 0;
    this.coursedescription = "";
    this.technology = "";
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
      this.coursename = "";
      this.url = "";
      this.courseduration = 0;
      this.coursedescription = "";
      this.technology = "";

    }
  }

  editbutton(id: string) {
    this.courseService.ShowCoursebyId(id)
      .subscribe((res: any) => {
        this.airId = res.id;
        this.isedit = true;
        this.coursename = res.coursename;
        this.url = res.url;
        this.courseduration = res.courseduration;
        this.coursedescription = res.coursedescription;
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
      "coursename": this.coursename,
      "url": this.url,
      "courseduration": this.courseduration,
      "coursedescription": this.coursedescription,
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
