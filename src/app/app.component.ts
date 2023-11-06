import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KeneyaDemeDahsboard';
  isBlank : boolean = false;
  isLogin : boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isBlank = this.router.url === '/';
        this.isLogin = this.router.url === '/login';
      }
    });
  }
  isSideNavCollapsed = false;
  screenWidth =0;
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}


