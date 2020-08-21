import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from './../model'
import { first } from 'rxjs/operators';

import { AlertService, RolService } from './../service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styles: [
  ]
})
export class RolComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  currentRol: Rol;
  estado: string;

  constructor(
    private rolService: RolService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.consultaRol();
  }

  consultaRol() {    
    this.rolService.rolcons()
    .pipe(first())
    .subscribe(
        data => {
            this.currentRol = data;
        },
        error => {
            this.alertService.error("No hay conexión con la Base de Datos");
            this.loading = false;
        });
    
  }

  altarol(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/altarol';
    this.router.navigate([this.returnUrl]);         
}

  routeTo(id:string): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/viewrol';
    this.router.navigate([this.returnUrl,id]);   
  }
}

