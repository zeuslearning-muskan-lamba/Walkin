import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as listings from  '../../assets/listings.json'
@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {

  constructor(private route:Router) { }
  walkinListings: any = (listings as any).default;

  ngOnInit(): void {
  }
  goToListingDetails(id: any) : void{
    this.route.navigate(["listing-details",id]);
  }
}
