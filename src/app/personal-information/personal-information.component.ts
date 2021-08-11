import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from '../cache.service';
import { dataService } from '../dataservice.service';
@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  userValidations: FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder,private SVC: dataService,private cacheService: CacheService) { }
  checkArray: FormArray;
  myArray: any;
  portfolioURL: string=null;
  referral: string=null;
  storageData: any = '';
  isSubmit: Boolean=false;
  isChecked: Boolean=false
  
  Data: Array<any> = [
    { name: 'Instructional Designer', value: 'ID',checked: true},
    { name: 'Software Engineer', value: 'SE',checked: false},
    { name: 'Software Quality Engineer', value: 'SQE',checked: false}
  ];

 
  
  
  ngOnInit(): void {
    
    this.storageData = JSON.parse(localStorage.getItem('formData'))
    
    if(this.storageData == null){
      this.storageData = ''
    }
    if(this.storageData.checkArray == null){
      this.myArray=''
    }else{
      this.myArray = this.storageData.checkArray
    }
    console.log(this.storageData.firstName)
    this.userValidations = this.formBuilder.group({
      firstName: [this.storageData.firstName, [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z]+')]],
      lastName: [this.storageData.lastName, [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z]+')]],
      email: [this.storageData.email, [Validators.required, Validators.email]],
      mobileNumber: [this.storageData.mobileNumber, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      portfolio: [this.storageData.portfolio],
      checkArray: this.formBuilder.array(this.storageData.checkArray || [], [Validators.required]),
      jobUpdates:[this.storageData.jobUpdates],
      refer:[this.storageData.refer]
      
        })
      this.checkArray = this.userValidations.get('checkArray') as FormArray;
  }

  public ngOnDestroy(): void{
    this.cacheService.setFormData(this.userValidations.value);
    console.log(this.cacheService.getFormData().value);
  }
  
  
  
  onCheckboxChange(e: any) {
    
    console.log(this.checkArray);
    if (e.checked) {
      this.checkArray.push(new FormControl(e.source.value));
      console.log(this.checkArray);
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.source.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    
  }
  urlChanged(e:any){
    console.log(e.target.value);
    this.portfolioURL = e.target.value;
  }
  referralChanged(e:any){
    this.referral = e.target.value;
  }
  goToQualifications() : void{
    
    this.isSubmit=true;
    localStorage.setItem("formData",JSON.stringify(this.userValidations.value))
    this.storageData = localStorage.getItem("formData");
    console.log(this.userValidations.value);
    if (this.userValidations.invalid) {
      console.log("Hii");
      this.userValidations.get('firstName').markAsTouched();
      this.userValidations.get('lastName').markAsTouched();
      this.userValidations.get('email').markAsTouched();
      this.userValidations.get('mobileNumber').markAsTouched();
      return;
    }else{
      console.log("Hiii");
      this.SVC.firstName= this.userValidations.get('firstName').value;
      this.SVC.lastName= this.userValidations.get('lastName').value;
      this.SVC.email= this.userValidations.get('email').value;
      this.SVC.mobileNumber= this.userValidations.get('mobileNumber').value;
      this.SVC.portfolioURL= this.portfolioURL;
      console.log(this.SVC.portfolioURL);
      this.SVC.referral= this.referral;
      this.SVC.checkboxArray= this.checkArray;
      this.router.navigate(["qualifications"])
    }
    
  }
  
}
