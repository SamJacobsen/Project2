import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Login } from '../../models/Login';
import { Account } from '../../models/Account';
import { User } from '../../models/User';


@Component({
  selector: 'app-login-register-form',
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.css']
})
export class LoginRegisterFormComponent implements OnInit {
  
  
  email = new FormControl('', [Validators.required, Validators.email]);
  user_password = new FormControl('', [Validators.required]);
  first_name = new FormControl('');
  last_name = new FormControl('');
  user_name = new FormControl('');
  user_type = new FormControl('');

  accounts: Account[] = [
    {value: 'REGULAR', viewValue: 'Individual'},
    {value: 'MANAGER', viewValue: 'Coordinator'}
  ];
  

  @Input() userid!: number | string;

  user: User = {
    first_name: '',
    last_name: '',
    user_password: '',
    email: '',
    user_name: '',
    user_type: ''
  };
  userList: any[] = [];

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }

  register(): void{
    const newUser: User = {
      email: this.email.value,
      user_password: this.user_password.value,
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      user_name: this.user_name.value,
      user_type: this.user_type.value
    }
    console.log(newUser);
    this.userService.createUser(newUser).subscribe((response: any) => console.log(response));
  }

  login(): void{
    const newLogin: Login = {
      user_name: this.user_name.value,
      password: this.user_password.value
    }
    console.log(newLogin);
    this.userService.login(newLogin);
  }

  // getAllUsers(): void{
  //   this.userService.getAllUsers().subscribe((response) => {
  //     console.log(response);
  //     response.forEach((user) => this.userList.push(JSON.stringify(user)));
  //   });
  // }

  // getUserByID(): void {
  //   this.userid = Number((<HTMLInputElement>document.querySelector("#userID")).value);
  //   this.userService.getUserByID(this.userid).subscribe((response) => console.log(response));
  // }

}
