import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-buyer',
  templateUrl: './dashboard-buyer.component.html',
  styleUrls: ['./dashboard-buyer.component.scss']
})
export class DashboardBuyerComponent implements OnInit {
  userData;
  firstName;
  lastName;
  constructor() { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('user');
    this.firstName = this.userData['firstName'];
    this.lastName = this.userData.lastName;
  }

}
