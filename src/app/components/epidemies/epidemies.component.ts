import { Component, ViewChild} from '@angular/core';
import { EpidemieAddEditComponent } from './epidemie-add-edit/epidemie-add-edit.component';
import { EpidemieService } from 'src/app/services/epidemies/epidemie.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { MaladiesService } from 'src/app/services/maladies/maladies.service';

@Component({
  selector: 'app-epidemies',
  templateUrl: './epidemies.component.html',
  styleUrls: ['./epidemies.component.css']
})
export class EpidemiesComponent {
  displayedColumns: string[] = ['id', 'maladie','nom','gravite','status', 'victimes', 'audio','action'];
  dataSource!: MatTableDataSource<any>;
  maladieDetails: { [key: number]: any } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private epidemieService: EpidemieService,
    private maladieService : MaladiesService,
    private coreService : CoreService

  ){}

  ngOnInit(): void {
    this.getTraitementList();
  }

  openAddEditEpidemieForm(){
    const dialogRef = this.dialog.open(EpidemieAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTraitementList();
        }
      },
    });
  }

  getTraitementList(){
    this.epidemieService.getEpidemieList().subscribe({
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
        message: 'Voulez-vous vraiment supprimer cette Epidemie ?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // L'utilisateur a confirmé la suppression
        this.performDeleteEpidemie(id);
      }
    });
  }

  performDeleteEpidemie(id: number) {
    this.epidemieService.deleteEpidemie(id).subscribe({
      next: (res: any) => {
        this.coreService.openSnackBar('Epidemie supprimée avec succès !');
        this.getTraitementList();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }


  openEditForm(data:any) {
    const dialogRef =this.dialog.open(EpidemieAddEditComponent,{
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
