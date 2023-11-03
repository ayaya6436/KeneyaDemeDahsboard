import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  usersArray: Users[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  users: Users[] = [];
  user: Users = {
    nom: '', prenom: '', email: '', password: '',
    id: 0
  };
  deleteMessage = false;
  studentlist: any;
  isupdated = false;

  ngOnInit() {
    this.isupdated = false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [[6, 16, 20, -1], [6, 16, 20, 'All']],
      processing: true
    };

    this.userService.getUserList().subscribe(data => {
      this.users = data;
      this.dtTrigger.next(null);
    });
    
  }

  changeisUpdate() {
    this.isupdated = false;
  }
}
