import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { CacheService } from '../cache.service';

interface Year {
  value: string;
}
interface Qualification {
  value: string;
}
interface Stream {
  value: string;
}
interface College {
  value: string;
}
interface Period {
  value: string;
}
@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})
export class QualificationsComponent implements OnInit,OnDestroy {
  @ViewChildren(MatExpansionPanel) panels:QueryList<MatExpansionPanel>
  qualificationsForm: FormGroup;
  panelOpenState = true;
  storageData: any = '';
  Gender: 'F';
  storageEducationData: any = '';
  storageProfessionalData: any = '';
  storageOtherInformationData: any = '';
  collegeValue: any;
  radioArray: FormArray;
  myArray1: any;
  myArray2: any;
  checkArray1: any;
  checkArray2: any;
  noticeArray: FormArray;
  testArray: FormArray;
  isSubmit: Boolean = false;
  isValid: Boolean = true;
  isChecked: string = "false";
  experienceRadioButton: string;
  noticeRadioButton: string;
  appearedTestRadioButton: string;
  isCollegeFieldRequired: string = "false";
  isExpertiseFieldRequired: string = "false";
  isFamiliarFieldRequired: string = "false";
  isNoticeFieldRequired: string = "false";
  isRoleFieldRequired: string = "false";
  Data: Array<any> = [
    { name: 'Fresher', value: 'F'},
    { name: 'Experienced', value: 'E'}
  ];
  technologies: Array<any> = [
    {name: 'JavaScript', value: 'JavaScript'},
    {name: 'Angular JS', value: 'Angular JS'},
    {name: 'React', value: 'React'},
    {name: 'Node JS', value: 'Node JS'},
    {name: 'Others', value: 'Others'}
  ]
  booleanData: Array<any> = [
    {name: 'yes', value:'Yes'},
    {name: 'no', value: 'No'}
  ]
  constructor(private route:Router,private formBuilder:FormBuilder,private el: ElementRef,private cacheService:CacheService) { }
  ngOnInit(): void {
    
    this.storageEducationData = JSON.parse(localStorage.getItem('educationData'))
    this.storageProfessionalData = JSON.parse(localStorage.getItem('professionalData'))
    this.storageOtherInformationData = JSON.parse(localStorage.getItem('otherInformationData'))
    
    if(this.storageEducationData == null){
      this.storageEducationData = ''
    }
    if(this.storageProfessionalData == null){
      this.storageProfessionalData = ''
    }
    if(this.storageOtherInformationData == null){
      this.storageOtherInformationData = ''
    }
    if(this.storageOtherInformationData.checkArray1 == null){
      this.checkArray1=''
    }else{
      this.checkArray1 = this.storageOtherInformationData.checkArray1
    }
    if(this.storageOtherInformationData.checkArray2 == null){
      this.checkArray2=''
    }else{
      this.checkArray2 = this.storageOtherInformationData.checkArray2
    }
    if(this.storageOtherInformationData.radioArray == null){
      this.experienceRadioButton=''
    }else{
      this.experienceRadioButton=this.storageOtherInformationData.radioArray[0]
    }
    if(this.storageOtherInformationData.noticeArray == null){
      this.noticeRadioButton=''
    }else{
      this.noticeRadioButton=this.storageOtherInformationData.noticeArray[0]
    }
    if(this.storageOtherInformationData.testArray == null){
      this.appearedTestRadioButton=''
    }else{
      this.appearedTestRadioButton=this.storageOtherInformationData.testArray[0]
    }
    
    this.qualificationsForm = this.formBuilder.group({
      educationValidations: this.formBuilder.group({
        aggPercentage: [this.storageEducationData.aggPercentage,[Validators.required]],
        yearOfPassing: [this.storageEducationData.yearOfPassing,[Validators.required]],
        Qualification: [this.storageEducationData.Qualification,[Validators.required]],
        Stream: [this.storageEducationData.Stream,[Validators.required]],
        College: [this.storageEducationData.College,[Validators.required]],
        collegeLocated: [this.storageEducationData.collegeLocated,[Validators.required]],
        otherCollege:[this.storageEducationData.otherCollege]
      }),
      professionalValidations: this.formBuilder.group({
        radioArray: this.formBuilder.array(this.storageProfessionalData.radioArray || [], [Validators.required])
      }),
      otherInformationValidations: this.formBuilder.group({
        yearsOfExperience: [this.storageOtherInformationData.yearsOfExperience,[Validators.required]],
        currentCTC: [this.storageOtherInformationData.currentCTC,[Validators.required]],
        expectedCTC: [this.storageOtherInformationData.expectedCTC,[Validators.required]],
        checkArray1: this.formBuilder.array(this.storageOtherInformationData.checkArray1 || [], [Validators.required]),
        checkArray2: this.formBuilder.array(this.storageOtherInformationData.checkArray2 || [], [Validators.required]),
        otherExpertiseTechnology:[this.storageOtherInformationData.otherExpertiseTechnology],
        otherFamiliarTechnology:[this.storageOtherInformationData.otherFamiliarTechnology],
        noticeArray: this.formBuilder.array(this.storageOtherInformationData.noticeArray || [], [Validators.required]),
        testArray: this.formBuilder.array(this.storageOtherInformationData.testArray || [], [Validators.required]),
        date: [this.storageOtherInformationData.date],
        period: [this.storageOtherInformationData.period],
        role: [this.storageOtherInformationData.role]
      })
      
    })

    this.radioArray = this.qualificationsForm.get('professionalValidations').get('radioArray') as FormArray;
    this.myArray1 = this.qualificationsForm.get('otherInformationValidations').get('checkArray1') as FormArray;
    this.myArray2 = this.qualificationsForm.get('otherInformationValidations').get('checkArray2') as FormArray;
    this.noticeArray = this.qualificationsForm.get('otherInformationValidations').get('noticeArray') as FormArray;
    this.testArray = this.qualificationsForm.get('otherInformationValidations').get('testArray') as FormArray;
  }
  public ngOnDestroy(): void{
    this.cacheService.setFormData(this.qualificationsForm.value);
    console.log(this.cacheService.getFormData().value);
  }
  years: Year[] = [
    {value: '2017'},
    {value: '2018'},
    {value: '2019'}
  ];
  qualifications: Qualification[] = [
    {value: 'Bachelor in Technology(B.Tech)'},
    {value: 'Bachelor in Technology(B.Tech)'},
    {value: 'Bachelor in Technology(B.Tech)'}
  ];
  streams: Stream[] = [
    {value: 'Information Technology'},
    {value: 'Information Technology'},
    {value: 'Information Technology'}
  ];
  colleges: College[] = [
    {value: 'Pune Institute of Technology(PIT)'},
    {value: 'Pune Institute of Technology(PIT)'},
    {value: 'Others'}
  ];
  periods: Period[] = [
    {value: '1 month'},
    {value: '2 months'},
    {value: '3 months'}
  ];
  

  onRadioButtonChange(e:any){
    console.log(e.source._checked)
    if(this.radioArray.length > 0){
      this.radioArray.removeAt(0);
    }
    if (e.source.value != null) {
      this.radioArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      this.radioArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.source.value) {
          this.radioArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onNoticeRadioButtonChange(e:any){
    
    if(this.noticeArray.length > 0){
      this.noticeArray.removeAt(0);
    }
    if (e.source.value != null) {
      this.noticeArray.push(new FormControl(e.source.value));
      if(e.source.value=="Yes"){
        this.isNoticeFieldRequired = "true"
      }else{
        this.isNoticeFieldRequired = "false";
      }
    } else {
      let i: number = 0;
      this.noticeArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.source.value) {
          this.noticeArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onAppearedTestRadioButtonChange(e:any){
    
    if(this.testArray.length > 0){
      this.testArray.removeAt(0);
    }
    if (e.source.value != null) {
      this.testArray.push(new FormControl(e.source.value));
      if(e.source.value=="Yes"){
        this.isRoleFieldRequired = "true"
      }else{
        this.isRoleFieldRequired = "false";
      }
    } else {
      let i: number = 0;
      this.testArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.source.value) {
          this.testArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onExpertiseCheckboxChange(e: any) {
    //this.qualificationsForm.get('otherInformationValidations').setValue('checkArray1', this.formBuilder.array(this.storageOtherInformationData.checkArray1 || []));

    if (e.checked) {
      this.myArray1.push(new FormControl(e.source.value));
      if(e.source.value=="Others"){
        this.isExpertiseFieldRequired = "true"
      }else{
        this.isExpertiseFieldRequired = "false";
      }
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
  onFamiliarCheckboxChange(e: any) {
    
    
    if (e.checked) {
      this.myArray2.push(new FormControl(e.source.value));
      if(e.source.value=="Others"){
        this.isFamiliarFieldRequired = "true"
      }else{
        this.isFamiliarFieldRequired = "false";
      }
    } else {
      let i: number = 0;
      this.myArray2.controls.forEach((item: AbstractControl) => {
        if (item.value == e.source.value) {
          this.myArray2.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
 
  getCollegeName(e:any){
    if(e.source.value=="Others"){
      this.isCollegeFieldRequired = "true"
    }else{
      this.isCollegeFieldRequired = "false";
    }
  }
  
  goToPersonal() : void{
    this.route.navigate(["personal-information"])
  }
  goToReview() : void{
    localStorage.setItem("educationData",JSON.stringify(this.qualificationsForm.get('educationValidations').value))
    this.storageEducationData = localStorage.getItem("educationData");
    localStorage.setItem("professionalData",JSON.stringify(this.qualificationsForm.get('professionalValidations').value))
    this.storageProfessionalData = localStorage.getItem("professionalData");
    localStorage.setItem("otherInformationData",JSON.stringify(this.qualificationsForm.get('otherInformationValidations').value))
    this.storageOtherInformationData = localStorage.getItem("otherInformationData");
    console.log(this.qualificationsForm);
    this.isSubmit=true;
    this.panels.forEach((x,index)=>{
      if (index==0 && this.qualificationsForm.get('educationValidations').invalid)
         x.open();
      if (index==1 && this.qualificationsForm.get('professionalValidations').invalid)
      x.open();
      
    })
    if (this.qualificationsForm.invalid) {
      this.qualificationsForm.markAllAsTouched();
      //this.scrollToFirstInvalidControl();
      return;
    }else{
      this.route.navigate(["review"])
    }
    
  }
  // private scrollToFirstInvalidControl() {
  //   const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
  //     "educationValidations .ng-invalid"
  //   );

  //   firstInvalidControl.focus(); //without smooth behavior
  // }
}
