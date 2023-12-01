import { CoreService } from './../../core/core.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaladiesService } from 'src/app/services/maladies/maladies.service';
import { MaladieAddEditComponent } from './maladie-add-edit/maladie-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { DescriptionComponent } from '../description/description.component';

@Component({
  selector: 'app-maladies',
  templateUrl: './maladies.component.html',
  styleUrls: ['./maladies.component.css']
})
export class MaladiesComponent implements OnInit{

  displayedColumns: string[] = ['id', 'nom', 'description', 'audio','image','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private maladieService: MaladiesService,
    private coreService : CoreService

  ){}

  ngOnInit(): void {
    this.getMaladieList();
  }

  openAddEditMaladieForm(){
    const dialogRef = this.dialog.open(MaladieAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMaladieList();
        }
      },
    });
  }

  getMaladieList(){
    this.maladieService.getMaladieList().subscribe({
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
        message: 'Voulez-vous vraiment supprimer cette maladie ?',
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
    this.maladieService.deleteMaladie(id).subscribe({
      next: (res: any) => {
        this.coreService.openSnackBar('Maladie supprimée avec succès !');
        this.getMaladieList();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  openEditForm(data:any) {
    const dialogRef =this.dialog.open(MaladieAddEditComponent,{
        data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMaladieList();
        }
      },
    });

  }
  showFullDescription(id: number) {
    // Basculer l'état de la description complète pour l'élément spécifique
    this.dataSource.data = this.dataSource.data.map((row: any) => {
      if (row.id === id) {
        row.showFullDescription = !row.showFullDescription;
      }
      return row;
    });
  }


  afficherPopup(description: string) {
    this.dialog.open(DescriptionComponent, {
      data: {
        description: description,
      },
    });
  }
}
