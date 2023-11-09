import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MaladiesService } from 'src/app/services/maladies/maladies.service';
import { UserAddEditComponent } from '../../users/user-add-edit/user-add-edit.component';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-maladie-add-edit',
  templateUrl: './maladie-add-edit.component.html',
  styleUrls: ['./maladie-add-edit.component.css']
})
export class MaladieAddEditComponent {

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
  maladieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private maladieService: MaladiesService,
    private dialogRef: MatDialogRef<UserAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
    private userService: UserService
  ) {
    this.maladieForm = fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      audio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.maladieForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.maladieForm.valid) {
      if (this.data) {
        this.maladieService.updateMaladie(
          this.data.id,
          this.maladieForm.value,
          this.image,
          this.audio,
        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Maladie mise à jour !');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.maladieService.createMaladie(
          this.maladieForm.value,
          this.image,
          this.audio,
        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Maladie créée !');
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
