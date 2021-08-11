import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppliedListingComponent } from './applied-listing/applied-listing.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { LoginComponent } from './login/login.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'personal-information',component:PersonalInformationComponent},
  { path: 'qualifications',component:QualificationsComponent},
  { path: 'review', component: ReviewComponent },
  { path: 'listing-page', component: ListingPageComponent },
  { path: 'listing-details/:id', component: ListingDetailsComponent },
  { path: 'applied-listing/:id', component: AppliedListingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
