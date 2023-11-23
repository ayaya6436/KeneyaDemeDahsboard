import { Component, ViewChild } from '@angular/core';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { CasService } from 'src/app/services/cas/cas.service';
import { CoreService } from 'src/app/core/core.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AnnonceAddEditComponent } from '../annonces/annonce-add-edit/annonce-add-edit.component';

@Component({
  selector: 'app-cas',
  templateUrl: './cas.component.html',
  styleUrls: ['./cas.component.css']
})
export class CasComponent {

  displayedColumns: string[] = ['id', 'date','image','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private casService: CasService,
    private coreService : CoreService

  ){}

  ngOnInit(): void {
    this.getCasList();
  }


  getCasList(){
    this.casService.getCasList().subscribe({
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


  deleteMaladie(id: number) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer cette Cas ?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // L'utilisateur a confirmé la suppression
        this.performMaladiePrevention(id);
      }
    });
  }

  performMaladiePrevention(id: number) {
    this.casService.deleteCas(id).subscribe({
      next: (res: any) => {
        this.coreService.openSnackBar('Cas supprimée avec succès !');
        this.getCasList();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

}
