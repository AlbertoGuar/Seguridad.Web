import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './../model'
import { first } from 'rxjs/operators';

import { AlertService, UsuarioService } from './../service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})

export class UsuarioComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  currentUser: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { 

  }

  ngOnInit(): void {

    this.consultaUsuarios();
  }

  consultaUsuarios() {    
    this.usuarioService.usuario()
    .pipe(first())
    .subscribe(
        data => {
            this.currentUser = data;
//            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.alertService.error("No hay conexión con la Base de Datos");
            this.loading = false;
        });
    
  }

  altausr(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/altauser';
    this.router.navigate([this.returnUrl]);         
}

  routeTo(username:string): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/viewuser';
    this.router.navigate([this.returnUrl,username]);   
  }


}