import { TraitementService } from './../../services/traitements/traitement.service';
import { Component, ViewChild } from '@angular/core';
import { TraitementAddEditComponent } from './traitement-add-edit/traitement-add-edit.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from 'src/app/core/core.service';
import { MaladiesService } from 'src/app/services/maladies/maladies.service';


@Component({
  selector: 'app-traitements',
  templateUrl: './traitements.component.html',
  styleUrls: ['./traitements.component.css']
})
export class TraitementsComponent {
  displayedColumns: string[] = ['id', 'maladie','nom','description', 'audio','image','action'];
  dataSource!: MatTableDataSource<any>;
  maladieDetails: { [key: number]: any } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private traitementService: TraitementService,
    private maladieService : MaladiesService,
    private coreService : CoreService

  ){}

  ngOnInit(): void {
    this.getTraitementList();
  }

  openAddEditTraitementForm(){
    const dialogRef = this.dialog.open(TraitementAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTraitementList();
        }
      },
    });
  }

  getTraitementList(){
    this.traitementService.getTraitementList().subscribe({
      next:(res:any) => {
        this.dataSource = new MatTableDataSource(res);
         // Récupérer les détails de la maladie pour chaque prévention
         res.forEach((traitement: any) => {
          if (traitement.maladies) {
            this.maladieService.getMaladie(traitement.maladies.id).subscribe((maladieDetails: any) => {
              this.maladieDetails[traitement.id] = maladieDetails;
            });
          }
        });
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

  deleteTraitement(id: number) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer cette Traitement ?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // L'utilisateur a confirmé la suppression
        this.performDeleteTraitement(id);
      }
    });
  }

  performDeleteTraitement(id: number) {
    this.traitementService.deleteTraitement(id).subscribe({
      next: (res: any) => {
        this.coreService.openSnackBar('Traitement supprimée avec succès !');
        this.getTraitementList();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }


  openEditForm(data:any) {
    const dialogRef =this.dialog.open(TraitementAddEditComponent,{
        data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTraitementList();
        }
      },
    });

  }
}
