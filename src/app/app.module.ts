import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';



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
    AnnoncesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
