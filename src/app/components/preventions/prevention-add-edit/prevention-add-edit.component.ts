import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MaladiesService } from 'src/app/services/maladies/maladies.service';
import { PreventionService } from 'src/app/services/preventions/prevention.service';

@Component({
  selector: 'app-prevention-add-edit',
  templateUrl: './prevention-add-edit.component.html',
  styleUrls: ['./prevention-add-edit.component.css']
})
export class PreventionAddEditComponent {

  image!: File;
  audio!: File;

  audioSelected(event: any): void {
    this.audio = event.target.files[0];
    console.log(this.audio);
  }

  imageSelected(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image);
  }


maladieList :any[] =[]

  preventionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private preventionService: PreventionService,
    private dialogRef: MatDialogRef<PreventionAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
    private maladieService: MaladiesService
  ) {
    this.preventionForm = fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      maladies: ['', Validators.required],
    });
// Charge la liste des maladies lors de l'initialisation du composant
    this.maladieService.getMaladieList().subscribe((maladies: any) => {
      this.maladieList = maladies;
    });
  }

  ngOnInit(): void {
    this.preventionForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.preventionForm.valid) {
      if (this.data) {
        this.preventionService.updatePrevention(
          this.data.id,
          this.preventionForm.value,
          this.image,
          this.audio,
        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Methode de prevention mise à jour avec success !');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.preventionService.createPrevention(
          this.preventionForm.value,
          this.image,
          this.audio,
        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Methode de prevention créée avec success !');
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
