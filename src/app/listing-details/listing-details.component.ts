import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as listings from '../../assets/listings.json';
import { dataService } from '../dataservice.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  template:`<app-applied-listing [timeSlot]="selectedSlot"></app-applied-listing>`,
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {
  myModel = 0;
  validationsForm: FormGroup;
  isSubmit: Boolean = false;
  radioArray: FormArray;
  myArray1: any;

  constructor(private route:Router,private route1: ActivatedRoute,private SVC:dataService,private fb: FormBuilder) { }
  
  selectedSlot: string = '';
  listing_id: any;
  count: any;
  ngOnInit(): void {
    this.listing_id = this.route1.snapshot.params['id'];
    this.count = Object.keys(this.walkinListings[this.listing_id].timeSlots).length;
    console.log(this.listing_id);
    this.validationsForm = this.fb.group({
      radioArray: this.fb.array([], [Validators.required]),
      checkArray1: this.fb.array([], [Validators.required])
    })
  }
  sender(id: any){
    this.isSubmit = true;
    if (this.validationsForm.invalid) {
      this.validationsForm.markAllAsTouched();
      //this.scrollToFirstInvalidControl();
      return;
    }else{
      this.SVC.name= this.selectedSlot;
    this.route.navigate(["applied-listing",id]);
    }  
    
  }
  walkinListings: any = (listings as any).default;

  radioChangeHandler(i: any,e:any){
    this.radioArray = this.validationsForm.get('radioArray') as FormArray;
    console.log(e.value);
    this.selectedSlot = i;
    if (e.value != null) {
      this.radioArray.push(new FormControl(e.value));
    } else {
      let i: number = 0;
      this.radioArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.value) {
          this.radioArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onRoleCheckboxChange(e: any) {
    //this.qualificationsForm.get('otherInformationValidations').setValue('checkArray1', this.formBuilder.array(this.storageOtherInformationData.checkArray1 || []));
    this.myArray1 = this.validationsForm.get('checkArray1') as FormArray;
    if (e.checked) {
      this.myArray1.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      this.myArray1.controls.forEach((item: AbstractControl) => {
        if (item.value == e.source.value) {
          this.myArray1.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
