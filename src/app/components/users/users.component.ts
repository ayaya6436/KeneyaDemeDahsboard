import { UserService } from 'src/app/services/users/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from 'src/app/core/core.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private coreService : CoreService


  ){}


  ngOnInit(): void {
    this.getUserList();
  }



  openAddEditUserForm() {
    const dialogRef = this.dialog.open(UserAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }

  getUserList(){
    this.userService.getUserList().subscribe({
      next:(res:any) => {
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
      },
      error:(err:any) =>{
        console.error(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer cet utulisateur ?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // L'utilisateur a confirmé la suppression
        this.performUserPrevention(id);
      }
    });
  }

  performUserPrevention(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (res: any) => {
        this.coreService.openSnackBar('Utilisateur supprimée avec succès !');
        this.getUserList();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  openEditForm(data:any) {
    const dialogRef =this.dialog.open(UserAddEditComponent,{
        data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });

  }

  }

