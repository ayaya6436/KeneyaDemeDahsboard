import { Component, ViewChild } from '@angular/core';
import { ZoneService } from 'src/app/services/zones/zone.service';
import { ZoneAddEditComponent } from './zone-add-edit/zone-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { MaladiesService } from 'src/app/services/maladies/maladies.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent {
  displayedColumns: string[] = ['id', 'maladie','nom','longitude', 'latitude','action'];
  dataSource!: MatTableDataSource<any>;
  maladieDetails: { [key: number]: any } = {};


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private zoneService: ZoneService,
    private maladieService : MaladiesService,
    private coreService : CoreService

  ){}

  ngOnInit(): void {
    this.getZoneList();
  }

  openAddEditZoneForm(){
    const dialogRef = this.dialog.open(ZoneAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getZoneList();
        }
      },
    });
  }

  getZoneList(){
    this.zoneService.getZoneList().subscribe({
      next:(res:any) => {
        this.dataSource = new MatTableDataSource(res);
         // Récupérer les détails de la maladie pour chaque prévention
         res.forEach((zone: any) => {
          if (zone.maladies) {
            this.maladieService.getMaladie(zone.maladies.id).subscribe((maladieDetails: any) => {
              this.maladieDetails[zone.id] = maladieDetails;
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

  deleteZone(id: number) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer cette Zone ?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // L'utilisateur a confirmé la suppression
        this.performDeleteZone(id);
      }
    });
  }

  performDeleteZone(id: number) {
    this.zoneService.deleteZone(id).subscribe({
      next: (res: any) => {
        this.coreService.openSnackBar('Zone supprimée avec succès !');
        this.getZoneList();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }


  openEditForm(data:any) {
    const dialogRef =this.dialog.open(ZoneAddEditComponent,{
        data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getZoneList();
        }
      },
    });

  }


}
