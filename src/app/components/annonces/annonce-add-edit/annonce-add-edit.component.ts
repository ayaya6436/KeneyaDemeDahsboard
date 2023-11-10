import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { AnnonceService } from 'src/app/services/annonces/annonce.service';
import { UserService } from 'src/app/services/users/user.service';
import { UserAddEditComponent } from '../../users/user-add-edit/user-add-edit.component';

@Component({
  selector: 'app-annonce-add-edit',
  templateUrl: './annonce-add-edit.component.html',
  styleUrls: ['./annonce-add-edit.component.css']
})
export class AnnonceAddEditComponent {

  image!: File;

  imageSelected(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image);
  }
  annonceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceService,
    private dialogRef: MatDialogRef<UserAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
    private userService: UserService
  ) {
    this.annonceForm = fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],


    });
  }

  ngOnInit(): void {
    this.annonceForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.annonceForm.valid) {
      if (this.data) {
        this.annonceService.updateAnnonce(
          this.data.id,
          this.annonceForm.value,
          this.image,

        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Annonce mise à jour !');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.annonceService.createAnnonce(
          this.annonceForm.value,
          this.image,

        ).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Annonce créée !');
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
