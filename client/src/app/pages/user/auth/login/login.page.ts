import { Component, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginPage implements OnInit {
  isPasswordFiled = true;
  userIdSigninForm: FormGroup;
  isLoginSuccessful = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) {
    this.userIdSigninForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {}

  signIn() {
  }

  goToPage(pageName) {
    this.router.navigateByUrl(pageName);
  }

  goBack() {
    this.location.back();
  }

  changeTextPassword() {
    this.isPasswordFiled = !this.isPasswordFiled;
  }

}
