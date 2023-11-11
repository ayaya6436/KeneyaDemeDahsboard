import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { EpidemieService } from 'src/app/services/epidemies/epidemie.service';
import { MaladiesService } from 'src/app/services/maladies/maladies.service';
import { ZoneService } from 'src/app/services/zones/zone.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  private map: any;
  private zoneMarkers: any[] = [];
 numberOfMaladies: any;
 numberOfZones:any;
 numberOfEpidemie:any;

  constructor(private zoneService: ZoneService,
    private maladieService : MaladiesService,
    private epidemieService : EpidemieService

    ) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadZoneMarkers();
    this.loadNumberOfMaladies();
    this.loadNumberOfZones();
    this.loadNumberOfEpidemies()

  }

  private initMap(): void {
    // Définir les coordonnées initiales et le niveau de zoom initial
    const coordInitiales: L.LatLngExpression = [12.67171,-7.89541];
    const niveauZoomInitial: number = 5;

    // Créer la carte
    this.map = L.map('map').setView(coordInitiales, niveauZoomInitial);

    // Ajouter une couche de tuiles depuis OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadZoneMarkers(): void {
    this.zoneService.getZoneList().subscribe({
      next: (zones: any[]) => {
        zones.forEach((zone) => {
          // Utiliser une image personnalisée comme marqueur
          const customIcon = L.icon({
            iconUrl: 'assets/images/zoneDanger.png', // Chemin vers votre image
            iconSize: [32, 32], // Taille de l'image (largeur, hauteur)
            iconAnchor: [16, 32], // Point d'ancrage de l'image par rapport au marqueur (centre en bas)
            popupAnchor: [0, -32] // Point d'ancrage du popup par rapport au marqueur (en haut du marqueur)
          });

          const marker = L.marker([zone.latitude, zone.longitude], { icon: customIcon })
            .bindPopup(`<strong>${zone.nom}</strong>`)
            .addTo(this.map);

          this.zoneMarkers.push(marker);
        });
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  loadNumberOfMaladies(): void {
    this.maladieService.getNumberOfMaladies().subscribe({
      next: (numberOfMaladies: number) => {
        this.numberOfMaladies = numberOfMaladies;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }


  loadNumberOfZones():void{
    this.zoneService.getNumberOfZones().subscribe({
      next:(numberOfZones:any)=>{
        this.numberOfZones= numberOfZones
      },
      error:(err:any)=>{
        console.error(err);
      }
        })
  }

  loadNumberOfEpidemies():void{
    this.epidemieService.getNumberOfEpidemie().subscribe({
      next:(numberOfEpidemie:any)=>{
        this.numberOfEpidemie = numberOfEpidemie
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

}
