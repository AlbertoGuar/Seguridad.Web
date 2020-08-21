import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Login, Loginreceive} from './../model'

import { AlertService, LoginService } from './../service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  descr= "Acceso autorizado";
  loginrec: Loginreceive
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error='';
//  currentUser: Login;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService

    ) { 
    // redirect to home if already logged in
    if (this.loginService.currentUserValue) { 
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        usuario: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
/*     
    console.log(this.returnUrl)

    if(this.f.usuario.value=="Alberto"  && this.f.password.value=="Password"){
      this.router.navigate(['/home']);
        
   
      
    }
    else{
      this.alertService.error("Verifique sus datos");
      this.loading = false;
    }
*/
    console.log(this.f.usuario.value)
    this.loginService.login(this.f.usuario.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.loginrec = data;
              console.log("roleId")
              console.log(this.loginrec.roleId);
              console.log(this.loginrec);
              if(this.loginrec.authenticated && this.loginrec.description == this.descr){
                this.router.navigate([this.returnUrl]);
              }else{
                this.alertService.error(this.loginrec.description);
                this.loading = false;
              }
            },
            error => {
                this.alertService.error(error.error.message);
                this.loading = false;
            });
}
}