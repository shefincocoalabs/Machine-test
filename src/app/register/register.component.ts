import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  submitted:boolean = false;
  clicked:boolean = false;
  passwordMatch: boolean = false;
  constructor(private fb: FormBuilder, private accountsService: AccountsService, private toastr: ToastrService, private router: Router,private route: ActivatedRoute, private spinner: NgxSpinnerService) { }
  users = JSON.parse(localStorage.getItem('users')) || [];
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.signupForm = this.fb.group({
      role: ['', Validators.required], 
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    })
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() { 
   this.submitted = true;
    this.clicked = true;
    if (this.signupForm.invalid) {
      this.clicked = false;
      return;
    }
      let password = this.signupForm.value.password;
      let confirmPassword = this.signupForm.value.confirmPassword;
      if (password != confirmPassword) {
        return this.toastr.error('Both password and confirm password should be same');
      }
      this.accountsService.register(this.signupForm.value).subscribe(result => {
         this.toastr.success('Registered successfully');
         this.router.navigate(['']);
      },
      error => {
        this.toastr.error(error.error.message, error.error.code);
      });
  
  }

  

}
