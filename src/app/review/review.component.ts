import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataService } from '../dataservice.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  storageData: any = '';
  storageEducationData: any = '';
  storageProfessionalData: any = '';
  storageOtherInformationData: any = '';
  //checkedBoxArray = this.dataservice.checkboxArray.value;
  constructor(private dataservice: dataService,private route: Router) { }

  ngOnInit(): void {
    this.storageData = JSON.parse(localStorage.getItem('formData'))
    this.storageEducationData = JSON.parse(localStorage.getItem('educationData'))
    this.storageProfessionalData = JSON.parse(localStorage.getItem('professionalData'))
    this.storageOtherInformationData = JSON.parse(localStorage.getItem('otherInformationData'))
  }
  goToQualifications(){
    this.route.navigate(['qualifications'])
  }
}
