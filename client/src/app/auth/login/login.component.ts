import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Login } from '../interfaces/login';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'pol-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  loginForm: FormGroup;
  error: boolean = false; 
  login: Login = {
    username: '',
    password: ''
  };
  formErrors = {
    username: '',
    password: ''
  }
  validationMessages: any = {
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 4 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.',
    },
    'password': {
      'required': 'Password is required.',
      'equal': 'The passwords do not match'
    }
  };
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        'username': [
          this.login.username,
          [
            Validators.required
          ]
        ],
        'password': [
          this.login.password,
          [
            Validators.required
          ]
        ]
      }
    );
    this.userService.checkUserSession();
    this.setupAutenticatedListener();
    if (!environment.production) {

      this.loginForm.setValue(<Login>{
        username: 'shweta@gmail.com',
        password: 'shweta'
      });

      // this.loginForm.setValue(<Login>{
      //   username: 'scott@votecrane.com',
      //   password: 'vote4me'
      // });
    }
    this.loginForm.valueChanges.subscribe((data) => {
      this.formErrors = this.onFormChanges({
        form: this.loginForm,
        formErrors: this.formErrors,
        validationMessages: this.validationMessages,
        formChanges: data
      });
    });
    this.resetFormErrors();
  }

  resetFormErrors() {
    this.formErrors = this.onFormChanges({
      form: this.loginForm,
      formErrors: this.formErrors,
      validationMessages: this.validationMessages,
    });
  }

  userLogin() {
    this.error = false; 
    this.loginForm.disable();
    this.loading = true;
    this.userService.userLogin({
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    });


  }

  setupAutenticatedListener() {
    let navigateUrl = this.route.snapshot.paramMap.get('redirectTo');
    this.userService.isAuthenticated().subscribe((isAuth) => {
      this.loading = false;
      if (isAuth) {
        if (navigateUrl && navigateUrl != "null") {
          this.router.navigateByUrl(navigateUrl);
          // this.router.navigate(['filer']);
        }
      }
    },
      (err) => {
        this.loading = false;
        this.loginForm.enable();
      }
    );

    this.userService.loginErrors().subscribe((error) => {
      if(error.value){
        this.error = true;
        this.loading = false;
        this.loginForm.enable();
      }
    })
  }

  onFormChanges(options: { form: FormGroup, formErrors: any, validationMessages: any, formChanges?: any }): any {
    const form = options.form || null;
    const formErrors = options.formErrors || {};
    const formChanges = options.formChanges || null;
    const validationMessages = options.validationMessages || {};
    if (!form) {
      return;
    }
    for (const field in formErrors) {
      formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = validationMessages[field];
        for (const key in control.errors) {
          formErrors[field] += messages[key] + ' ';
        }
      }
    }
    return formErrors;
  }

}
