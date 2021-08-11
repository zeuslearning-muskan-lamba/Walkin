import { Component, Input, OnInit } from '@angular/core';
import { dataService } from '../dataservice.service';
import * as listing from '../../assets/listings.json';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-applied-listing',
  templateUrl: './applied-listing.component.html',
  styleUrls: ['./applied-listing.component.css'],
  template: '<div>{{timeSlot}}</div>',
})
export class AppliedListingComponent implements OnInit {
  ts= this.dataservice.name;
  timeSlot: number = +this.ts;
  constructor(private dataservice:dataService,private route1: ActivatedRoute) { }
  listing_id: any;
  walkinListings: any=(listing as any).default;
  ngOnInit(): void {
    this.listing_id = this.route1.snapshot.params['id'];
  }

}
