import { Component, ViewChild } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonces/annonce.service';
import { AnnonceAddEditComponent } from './annonce-add-edit/annonce-add-edit.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent {

  displayedColumns: string[] = ['id', 'titre', 'description','image','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private annonceService: AnnonceService,
    private coreService : CoreService

  ){}

  ngOnInit(): void {
    this.getAnnonceList();
  }

  openAddEditAnnonceForm(){
    const dialogRef = this.dialog.open(AnnonceAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAnnonceList();
        }
      },
    });
  }

  getAnnonceList(){
    this.annonceService.getAnnonceList().subscribe({
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
        message: 'Voulez-vous vraiment supprimer cette Annonce ?',
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
    this.annonceService.deleteAnnonce(id).subscribe({
      next: (res: any) => {
        this.coreService.openSnackBar('Annonce supprimée avec succès !');
        this.getAnnonceList();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  openEditForm(data:any) {
    const dialogRef =this.dialog.open(AnnonceAddEditComponent,{
        data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAnnonceList();
        }
      },
    });

  }
}
