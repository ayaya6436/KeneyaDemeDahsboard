import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { EpidemieService } from 'src/app/services/epidemies/epidemie.service';
import { MaladiesService } from 'src/app/services/maladies/maladies.service';

@Component({
  selector: 'app-epidemie-add-edit',
  templateUrl: './epidemie-add-edit.component.html',
  styleUrls: ['./epidemie-add-edit.component.css']
})
export class EpidemieAddEditComponent {

  audio!: File;

  audioSelected(event: any): void {
    this.audio = event.target.files[0];
    console.log(this.audio);
  }

  status: string[] = [
    'En cours',
    'Fini',
  ];


  gravite: string[] = [
    'Faible',
    'Forte',
  ];

maladieList :any[] =[]

  epidemieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private epidemieService: EpidemieService,
    private dialogRef: MatDialogRef<EpidemieAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
    private maladieService: MaladiesService
  ) {
    this.epidemieForm = fb.group({
      nom: ['', Validators.required],
      maladies: ['', Validators.required],
      gravite: ['', Validators.required],
      status: ['', Validators.required],
      victimes: ['', Validators.required],
    });
// Charge la liste des maladies lors de l'initialisation du composant
    this.maladieService.getMaladieList().subscribe((maladies: any) => {
      this.maladieList = maladies;
    });
  }

  ngOnInit(): void {
    this.epidemieForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.epidemieForm.valid) {

      if (this.data) {
        this.epidemieService.updateEpidemie(
          this.data.id,
          this.epidemieForm.value,
          this.audio,
        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Epidemie mise à jour !');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.epidemieService.createEpidemie(
          this.epidemieForm.value,
          this.audio,
        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Epidemie créée !');
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
