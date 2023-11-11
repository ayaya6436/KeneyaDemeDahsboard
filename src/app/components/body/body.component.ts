import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  currentUser: any;


  public constructor( private userService:UserService){

  }
  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }


  @Input() collapsed = false;
  @Input() screenWidth =0;

  getBodyClass():string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth>0) {
      styleClass = 'body-md-screen';

    }
    return styleClass;

  }
}
