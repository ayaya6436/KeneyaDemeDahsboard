import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MaladiesService } from 'src/app/services/maladies/maladies.service';
import { UserAddEditComponent } from '../../users/user-add-edit/user-add-edit.component';

@Component({
  selector: 'app-maladie-add-edit',
  templateUrl: './maladie-add-edit.component.html',
  styleUrls: ['./maladie-add-edit.component.css']
})
export class MaladieAddEditComponent {
  maladieForm: FormGroup;

  constructor(private fb: FormBuilder,
     private maladieService: MaladiesService,
     private dialogRef:MatDialogRef<UserAddEditComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private coreService: CoreService

     ) {
    this.maladieForm = fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      image: '',
      audio: ''
    });
  }
  ngOnInit(): void {
    this.maladieForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.maladieForm.valid) {

        if(this.data){
          this.maladieService.updateMaladie(this.data.id,this.maladieForm.value).subscribe({
            next:(val:any) => {
              // alert('Maladie Mise a jour!');
              this.coreService.openSnackBar('Maladie Mise a jour!');
              this.dialogRef.close(true);
            },
            error:(err:any) =>{
              console.error(err);
            }
          })

        }else{
          this.maladieService.createMaladie(this.maladieForm.value).subscribe({
        next:(val:any) => {
          // alert('Maladie Creer !');
          this.coreService.openSnackBar('User Creer!');
          this.dialogRef.close(true);
        },
        error:(err:any) =>{
          console.error(err);
        }
      })
      }

    }
  }


}
