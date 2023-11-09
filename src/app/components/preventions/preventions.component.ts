import { PreventionService } from './../../services/preventions/prevention.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PreventionAddEditComponent } from './prevention-add-edit/prevention-add-edit.component';
import { CoreService } from 'src/app/core/core.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-preventions',
  templateUrl: './preventions.component.html',
  styleUrls: ['./preventions.component.css']
})
export class PreventionsComponent {

  displayedColumns: string[] = ['id', 'nom', 'description', 'audio','image','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private preventionService: PreventionService,
    private coreService : CoreService

  ){}

  ngOnInit(): void {
    this.getPreventionList();
  }

  openAddEditPreventionForm(){
    const dialogRef = this.dialog.open(PreventionAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPreventionList();
        }
      },
    });
  }

  getPreventionList(){
    this.preventionService.getPreventionList().subscribe({
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

  deletePrevention(id: number) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer cette prévention ?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // L'utilisateur a confirmé la suppression
        this.performDeletePrevention(id);
      }
    });
  }

  performDeletePrevention(id: number) {
    this.preventionService.deletePrevention(id).subscribe({
      next: (res: any) => {
        this.coreService.openSnackBar('Prévention supprimée avec succès !');
        this.getPreventionList();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }


  openEditForm(data:any) {
    const dialogRef =this.dialog.open(PreventionAddEditComponent,{
        data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPreventionList();
        }
      },
    });

  }
}
