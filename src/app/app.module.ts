import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaladiesComponent } from './maladies/maladies.component';
import { EpidemiesComponent } from './epidemies/epidemies.component';
import { PreventionsComponent } from './preventions/preventions.component';
import { TraitementsComponent } from './traitements/traitements.component';
import { UsersComponent } from './users/users.component';
import { CasComponent } from './cas/cas.component';
import { ZonesComponent } from './zones/zones.component';
import { AnnoncesComponent } from './annonces/annonces.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
