import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard-buyer',
  templateUrl: './dashboard-buyer.component.html',
  styleUrls: ['./dashboard-buyer.component.scss']
})
export class DashboardBuyerComponent implements OnInit {
  userData;
  firstName;
  lastName;
  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('buyer'))
    this.firstName = this.userData.firstName;
    this.lastName = this.userData.lastName;
  }

  logout() {
    localStorage.removeItem('buyer');
    this.router.navigate(['']);
}

}
