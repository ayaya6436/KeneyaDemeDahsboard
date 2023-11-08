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

  @ViewChild('uploadFileInputAudio') uploadFileInputAudio: any;
  @ViewChild('uploadFileInputImage') uploadFileInputImage: any;

  myImageName = 'Select File';
  myAudioName = 'Select File';

  image!: File;
  audio!: File;
  fileChangeEventImage(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.image = fileInput.target.files[0];
      this.myImageName = this.image.name;
      this.uploadFileInputImage.nativeElement.value = "";
    } else {
      this.myImageName = 'Sélectionnez une image';
    }
  }

  fileChangeEventAudio(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.audio = fileInput.target.files[0];
      this.myAudioName = this.audio.name;
      this.uploadFileInputAudio.nativeElement.value = "";
    } else {
      this.myAudioName = 'Sélectionnez un audio';
    }
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
      image: ['', Validators.required],
      audio: ['', Validators.required],
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
            this.coreService.openSnackBar('Prevention mise à jour !');
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
            this.coreService.openSnackBar('Prevention créée !');
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
