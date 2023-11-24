import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { CoreService } from 'src/app/core/core.service';
import { MatDialog } from '@angular/material/dialog';

interface SideNavToggle{
screenWidth: number;
collapsed: boolean;
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isLogin: boolean = false;
  currentUser: any;

  constructor(private router: Router,
    private userService: UserService,
    private coreService: CoreService,
    private dialog: MatDialog,) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isLogin = this.router.url === '/login';
      }
    });
  }
  ngOnInit(): void {
    //pour prendre la largeur
    this.screenWidth = window.innerWidth;
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth=0;
  navData = navbarData;

  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});

    }
  }

// fonction pour deplier sidenav
  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});
  }

  // fonction pour plier le sidenav
  closeSidenav():void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});

  }


  logout(): void {
    this.userService.logout();
      this.router.navigate(['/login']);

  }



  deconexion(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Confirmation',
        message: 'Voulez-vous vraiment vous déconnecter ?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performConfirmDeconexion();
      }
    });
  }


  performConfirmDeconexion() {
    this.userService.logout()
        this.coreService.openSnackBar('Utisateur deconnecte avec succès !');
      this.router.navigate(['/login']);


  }

}
