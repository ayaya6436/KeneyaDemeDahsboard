
import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
     private userService: UserService,
     private dialogRef:MatDialogRef<UserAddEditComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private coreService: CoreService

     ) {
    this.userForm = fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.userForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.userForm.valid) {

        if(this.data){
          this.userService.updateUser(this.data.id,this.userForm.value).subscribe({
            next:(val:any) => {
              // alert('User Mise a jour!');
              this.coreService.openSnackBar('User Mise a jour!');
              this.dialogRef.close(true);
            },
            error:(err:any) =>{
              console.error(err);
            }
          })

        }else{
          this.userService.createUser(this.userForm.value).subscribe({
        next:(val:any) => {
          // alert('User Creer !');
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
