import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AddCourseComponent } from './admin/add-course/add-course.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { UserGuard } from './user.guard';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'log-in', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'Add-Coures',
        component: AddCourseComponent,
        canActivate: [AuthGuard]
      }
     
      
    ]
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'User-details',
        component: UserDetailsComponent,
        canActivate: [UserGuard]
      }
      
    ]
  },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent, RegistrationComponent]