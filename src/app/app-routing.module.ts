import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaladiesComponent } from './components/maladies/maladies.component';
import { EpidemiesComponent } from './components/epidemies/epidemies.component';
import { PreventionsComponent } from './components/preventions/preventions.component';
import { TraitementsComponent } from './components/traitements/traitements.component';
import { ZonesComponent } from './components/zones/zones.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { CasComponent } from './components/cas/cas.component';
import { UsersComponent } from './components/users/users.component';

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
