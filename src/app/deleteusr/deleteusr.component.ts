import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AlertService, UsuarioService } from './../service';


@Component({
  selector: 'app-deleteusr',
  templateUrl: './deleteusr.component.html'
})
export class DeleteusrComponent implements OnInit {
  username:string = ''; 
  returnUrl: string;
  loading = false;
  

  constructor(
    public dialogRef: MatDialogRef<DeleteusrComponent>,@Inject (MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  deleteusr(username:string): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/usuarios';
    this.username = username;
    this.usuarioService.deleteusrid(username)
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
            this.onNoClick();
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });    
    }
 

  onNoClick(): void {
    this.dialogRef.close();
  }

}
