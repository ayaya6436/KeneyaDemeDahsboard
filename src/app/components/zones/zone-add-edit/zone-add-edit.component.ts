import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MaladiesService } from 'src/app/services/maladies/maladies.service';
import { ZoneService } from 'src/app/services/zones/zone.service';

@Component({
  selector: 'app-zone-add-edit',
  templateUrl: './zone-add-edit.component.html',
  styleUrls: ['./zone-add-edit.component.css']
})
export class ZoneAddEditComponent {

  maladieList :any[] =[]
     
  zoneForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private zoneService: ZoneService,
    private dialogRef: MatDialogRef<ZoneAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
    private maladieService: MaladiesService
  ) {
    this.zoneForm = fb.group({
      nom: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      maladies: [[]],
    });
// Charge la liste des maladies lors de l'initialisation du composant
    this.maladieService.getMaladieList().subscribe((maladies: any) => {
      this.maladieList = maladies;
    });
  }

  ngOnInit(): void {
    this.zoneForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.zoneForm.valid) {

      if (this.data) {
        this.zoneService.updateZone(
          this.data.id,
          this.zoneForm.value,

        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Zone mise à jour !');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.zoneService.createZone(
          this.zoneForm.value,

        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Zone créée !');
            this.dialogRef.close(true);
            console.log(val);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
}
