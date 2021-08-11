import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  username:any;
  password:any;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  login(): any{
    if(this.username=='muskan.lamba@zeuslearning.com' && this.password=='muskan'){
      this.route.navigate(["listing-page"])
    }else{
      alert("Invalid Credentials");
    }
  }
}
