import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AlertService, RolService } from './../service';
import { Rol } from '../model/rol';



@Component({
  selector: 'app-enablerol',
  templateUrl: './enablerol.component.html',
  styles: [
  ]
})
export class EnablerolComponent implements OnInit {
  regrol: Rol;
  returnUrl: string;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<EnablerolComponent>,@Inject (MAT_DIALOG_DATA) public data: any,
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  
  enablerol(updaterol): void {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/rol';
      this.regrol = updaterol;
      this.regrol.disable = false;
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
