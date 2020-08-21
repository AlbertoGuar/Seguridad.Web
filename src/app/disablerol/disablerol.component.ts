import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AlertService, RolService } from './../service';
import { Rol } from '../model/rol';

@Component({
  selector: 'app-disablerol',
  templateUrl: './disablerol.component.html',
  styles: [
  ]
})
export class DisablerolComponent implements OnInit {
  regrol: Rol;
  returnUrl: string;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DisablerolComponent>,@Inject (MAT_DIALOG_DATA) public data: any,
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }
  
  disablerol(updaterol): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/rol';
    this.regrol = updaterol;
    this.regrol.disable = true;
    updaterol = this.regrol
    this.rolService.updaterol(updaterol)
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
