import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaladiesComponent } from './maladies/maladies.component';
import { EpidemiesComponent } from './epidemies/epidemies.component';
import { PreventionsComponent } from './preventions/preventions.component';
import { TraitementsComponent } from './traitements/traitements.component';
import { ZonesComponent } from './zones/zones.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { CasComponent } from './cas/cas.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'maladies', component: MaladiesComponent},
  {path: 'epidemies', component: EpidemiesComponent},
  {path: 'preventions', component: PreventionsComponent},
  {path: 'traitements', component: TraitementsComponent},
  {path: 'zones', component: ZonesComponent},
  {path: 'annonces', component: AnnoncesComponent },
  {path: 'cas', component: CasComponent },
  {path: 'users', component: UsersComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
