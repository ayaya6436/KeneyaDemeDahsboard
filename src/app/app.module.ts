import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';



import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';

import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaladiesComponent } from './components/maladies/maladies.component';
import { EpidemiesComponent } from './components/epidemies/epidemies.component';
import { PreventionsComponent } from './components/preventions/preventions.component';
import { TraitementsComponent } from './components/traitements/traitements.component';
import { UsersComponent } from './components/users/users.component';
import { CasComponent } from './components/cas/cas.component';
import { ZonesComponent } from './components/zones/zones.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAddEditComponent } from './components/users/user-add-edit/user-add-edit.component';
import { LoginComponent } from './components/login/login.component';
import { MaladieAddEditComponent } from './components/maladies/maladie-add-edit/maladie-add-edit.component';
import { PreventionAddEditComponent } from './components/preventions/prevention-add-edit/prevention-add-edit.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    MaladiesComponent,
    EpidemiesComponent,
    PreventionsComponent,
    TraitementsComponent,
    UsersComponent,
    CasComponent,
    ZonesComponent,
    AnnoncesComponent,
    UserAddEditComponent,
    LoginComponent,
    MaladieAddEditComponent,
    PreventionAddEditComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
