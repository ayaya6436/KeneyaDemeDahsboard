import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MaladiesService } from 'src/app/services/maladies/maladies.service';
import { TraitementService } from 'src/app/services/traitements/traitement.service';

@Component({
  selector: 'app-traitement-add-edit',
  templateUrl: './traitement-add-edit.component.html',
  styleUrls: ['./traitement-add-edit.component.css']
})
export class TraitementAddEditComponent {

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

  traitementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private traitementService: TraitementService,
    private dialogRef: MatDialogRef<TraitementAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
    private maladieService: MaladiesService
  ) {
    this.traitementForm = fb.group({
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
    this.traitementForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.traitementForm.valid) {
     
      if (this.data) {
        this.traitementService.updateTraitement(
          this.data.id,
          this.traitementForm.value,
          this.image,
          this.audio,
        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Traitement mise à jour !');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.traitementService.createTraitement(
          this.traitementForm.value,
          this.image,
          this.audio,
        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Traitement créée !');
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
