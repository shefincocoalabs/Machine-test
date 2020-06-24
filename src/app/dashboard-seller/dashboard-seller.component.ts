import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard-seller',
  templateUrl: './dashboard-seller.component.html',
  styleUrls: ['./dashboard-seller.component.scss']
})
export class DashboardSellerComponent implements OnInit {
  role;
  constructor(private router: Router,private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.role = this.route.snapshot.paramMap.get('role');
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['']);
}

}
