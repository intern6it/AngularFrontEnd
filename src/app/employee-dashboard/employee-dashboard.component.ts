import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, FormArray, Validators,NgForm } from '@angular/forms'
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { formatDate } from '@angular/common';
import localeES from "@angular/common/locales/es";
import { Pipe, PipeTransform } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup
  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData !: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  submitted=false;

Data: Array<any> = [
  { name: 'Hindi', value: 'Hindi' },
  { name: 'English', value: 'English' },
  { name: 'Tamil', value: 'Tamil' },
];
public select : any=[];




  constructor(private formbuilder:FormBuilder,
    private api:ApiService) {
    }

  ngOnInit():void{

  
    this.formValue=this.formbuilder.group({
      firstName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      lastName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      email:['',[Validators.required,Validators.email,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$')]],
      mobile:['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$'),Validators.maxLength(10)]],
      salary:['',Validators.required],
      gender:['',Validators.required],
      city:['',Validators.required],
      date:['',Validators.required],
      language: this.formbuilder.array([],[Validators.required]),
   
      
    })
    this.getAllEmployee();

    
  }

  // onChangeLanguage($event:any){
    
  //   let index=this.selectedLanguage.indexOf($event.target.value);
  //   console.log(index);
  //   if(index==-1){
      
  //   this.selectedLanguage.push($event.target.value)
  //   }
  //   else{
  //     this.selectedLanguage.splice(index,1)
  //   }
  //   console.log(this.selectedLanguage)
  //   console.log(this.selectedLanguage.toString())
  // }


  onCheckboxChange($event:any) {

    const language: FormArray = this.formValue.get('language') as FormArray;
    if ($event.target.checked) {
      language.push(new FormControl($event.target.value));
    }else{
     let i: number = 0;
      language.controls.forEach((item) => {
        if (item.value == $event.target.value) {
          language.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false
  }
  postEmployeeDetails(){


    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this.employeeModelObj.gender=this.formValue.value.gender;
    this.employeeModelObj.city=this.formValue.value.city;
    this.employeeModelObj.date=this.formValue.value.date;
    this.employeeModelObj.language=this.formValue.value.language.toString();

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res)
      alert("ADDED SUCCESSFULLY")
      let ref=document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    error=>{
      alert("something went wrong")
    }
    )
  }
  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData=res;
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id).subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }
 onEdit(row:any){
   this.showAdd=false;
    this.showUpdate=true
   this.employeeModelObj.id=row.id
   this.formValue.controls['firstName'].setValue(row.firstName);
   this.formValue.controls['lastName'].setValue(row.lastName);
   this.formValue.controls['email'].setValue(row.email);
   this.formValue.controls['mobile'].setValue(row.mobile);
   this.formValue.controls['salary'].setValue(row.salary);
   this.formValue.controls['gender'].setValue(row.gender);
   this.formValue.controls['city'].setValue(row.city);
   this.formValue.controls['date'].setValue(row.date);
   this.formValue.controls['language'].setValue(row.language);
  
 }

 updateEmployeeDetails(){
  this.employeeModelObj.firstName=this.formValue.value.firstName;
  this.employeeModelObj.lastName=this.formValue.value.lastName;
  this.employeeModelObj.email=this.formValue.value.email;
  this.employeeModelObj.mobile=this.formValue.value.mobile;
  this.employeeModelObj.salary=this.formValue.value.salary;
  this.employeeModelObj.gender=this.formValue.value.gender;
  this.employeeModelObj.city=this.formValue.value.city;
  this.employeeModelObj.date=this.formValue.value.date;
  this.employeeModelObj.language=this.formValue.value.language.toString();
  this.api.updateEmployee(this.employeeModelObj)
    .subscribe(res=>{
      alert("UPDATED SUCCESSFULLY")
      let ref=document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
  
    })
 
 }
 saveFiles() :void{

  let a=document.createElement('a');

  a.href="http://localhost:8383/download"

  a.click();

  }


}
