import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isExpanded :boolean= true;
  isShowing: boolean = false;
  showSubmenu: boolean = false;
  constructor() { }
  
  


  ngOnInit() {
  }

}
