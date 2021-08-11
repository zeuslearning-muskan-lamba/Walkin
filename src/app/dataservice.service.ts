import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';

@Injectable()
export class dataService {
name=""
firstName=""
lastName=""
email=""
mobileNumber=""
portfolioURL=""
referral=""
checkboxArray: FormArray
  constructor() { } 
}