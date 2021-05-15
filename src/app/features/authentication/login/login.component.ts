import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/core/data-models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loggedIn: boolean;

  constructor(private router: Router, public userService: UserService, private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  getControlValidationClasses(control: AbstractControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.user.userName = this.f.userName.value;
    this.user.password = this.f.password.value;

    this.validateuser();
  }

  validateuser() {
    this.userService.validateUser(this.user)
      .subscribe(response => {
        if (response !== undefined) {
          this.loggedIn = true;
          this.userService.loggedIn$.next(true);
          this.router.navigateByUrl(this.returnUrl);
          localStorage.setItem('userName', this.user.userName);
        }
        else{
          this.loggedIn = false;
          this.userService.loggedIn$.next(false);
        }
      });
  }

}
