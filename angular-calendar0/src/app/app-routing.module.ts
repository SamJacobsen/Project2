import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterFormComponent } from './components/login-register-form/login-register-form.component';
import { EventspageComponent } from './pages/eventspage/eventspage.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginRegisterFormComponent},
  {path: 'calendar', component: EventspageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
