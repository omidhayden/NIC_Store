import { LoginComponent } from './../auth/login/login.component';
import { LoginData } from './../_models/LoginData';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginData: any;
  username:string;
  password: string;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  loginModal():void
  {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '310px',
     
      // data: {username: this.username, password: this.password}
     
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log("the dialog was closed!")
      
    });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }
  logOut(){
    localStorage.removeItem('token');
    console.log('logged out');
  }


}
