import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { ReviewComponent } from './review/review.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { AppliedListingComponent } from './applied-listing/applied-listing.component';
import { dataService } from './dataservice.service';


@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, AppRoutingModule, BrowserAnimationsModule],
  declarations: [AppComponent, LoginComponent, PersonalInformationComponent, QualificationsComponent, ReviewComponent, ListingPageComponent, ListingDetailsComponent, AppliedListingComponent],
  bootstrap: [AppComponent],
  providers:[dataService]
})
export class AppModule { 
}