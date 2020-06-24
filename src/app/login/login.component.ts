import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted:boolean = false;
  clicked:boolean = false;
  username;
  password;
  role;
  userData;
  userInfo;
  constructor(private fb: FormBuilder, private accountsService: AccountsService, private toastr: ToastrService,private router: Router,private route: ActivatedRoute, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    if(this.accountsService.loggedIn()){
      this.userInfo = JSON.parse(localStorage.getItem('user'));
       if(this.userInfo.role == 'Seller') {
        this.router.navigate(['dashboard-seller', this.userInfo.role]);
       } else {
        this.router.navigate(['dashboard-buyer', this.userInfo.role]);
       }
    }
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.clicked = true;
    if (this.loginForm.invalid) {
        this.clicked = false;
        return;
    }
    this.username = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.role = this.loginForm.value.role;
    this.accountsService.login().subscribe(result => {
        this.userData = result;
        const user = this.userData.find(x => x.email === this.username && x.password === this.password && x.role === this.role);
        if (!user) {
            return this.toastr.error('Incorrect credentials');
        }
        if (this.role == 'Seller') {
            localStorage.setItem('seller', JSON.stringify(user));
            this.router.navigate(['dashboard-seller', user.role]);
        } else {
           localStorage.setItem('buyer', JSON.stringify(user));
            this.router.navigate(['dashboard-buyer', user.role]);
        }
    })
}

}
