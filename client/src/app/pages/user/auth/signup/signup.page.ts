import {
  Component,
  OnInit,
  EventEmitter
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      fname: ['', Validators.compose([Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_ \.]*$')])],
      lname: [''],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('^[6789][0-9]*$'), Validators.minLength(10), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    });
    this.signUpForm.validator = this.matchingPasswords;
  }

  ngOnInit() { }

  private mapValidators(validators) {
    const formValidators = [];

    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validators[validation] === true) {
          formValidators.push(Validators[validation]);
        } else {
          formValidators.push(Validators[validation](validators[validation]));
        }
      }
    }

    return formValidators;
  }

  matchingPasswords(AC: AbstractControl) {
    if (AC.get('password') && AC.get('confirmPassword')) {
      let password = AC.get('password').value; // to get value in input tag
      let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
      if (password != confirmPassword) {
        AC.get('confirmPassword').setErrors({ matchingPasswords: true })
      } else {
        return null
      }
    }
  }

}
