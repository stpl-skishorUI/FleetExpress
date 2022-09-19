import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommanService } from 'src/app/services/comman.service';
import { SharedService } from 'src/app/services/shared.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!:UntypedFormGroup | any;
  isSubmitted:boolean=false;
  loginData:any;
  constructor(private fb: FormBuilder,
    private sharedService:SharedService,
    public valService:ValidationService,
    private comman:CommanService,
    private router:Router,
    private route:ActivatedRoute,
    private spinner:NgxSpinnerService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.defaultLoginForm();
    this.reCaptcha();
  }
  defaultLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.compose([Validators.required])]],
      captcha: ['', Validators.required]
    })
  }
  reCaptcha(){
    this.loginForm.controls['captcha'].reset();
    this.sharedService.createCaptchaCarrerPage();
  }
  onLoginSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.toastrService.error("Invalid Login")
      return;
    }
   /*  else if (this.loginForm.value.recaptchaReactive !=  this.sharedService.checkvalidateCaptcha()){
      alert("Invalid Captcha. Please try Again");

    } */

    // else {
      this.spinner.show();
      this.loginData = this.loginForm.value;
      this.comman.setHttp('get', 'login/login-web?'+'UserName=' + this.loginData.username.trim() + '&Password=' + this.loginData.password.trim(), false, false, false, 'vehicletrackingBaseUrlApi');
      this.comman.getHttp().subscribe((res: any) => {
        if (res.statusCode === "200") {
          this.spinner.hide();
          sessionStorage.setItem('loginDetails', JSON.stringify(res));
          this.router.navigate(['../dashboard'], { relativeTo: this.route })
          this.toastrService.success(res.statusMessage)
        }
        else {
          this.spinner.hide();
          this.toastrService.error(res.statusMessage)
        }
      })
    // }
}
get f(){
  return this.loginForm.controls;
}

}
