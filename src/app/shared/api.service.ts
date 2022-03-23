import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient ) { }

  


  postEmployee(data : any){
    return this.http.post<any>("http://localhost:8383/employee",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmployee(){
    return this.http.get<any>("http://localhost:8383/employees")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateEmployee(data : any){
    return this.http.put<any>("http://localhost:8383/updateEmp",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmployee(id : number){
    return this.http.delete<any>("http://localhost:8383/deleteEmp/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  dawnload(){

    return this.http.get("http://localhost:8383/download",

    {observe:'response',responseType:'blob'})

   

    }
 
}
