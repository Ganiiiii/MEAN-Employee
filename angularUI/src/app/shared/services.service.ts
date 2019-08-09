import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommentStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url = "http://localhost:3000/employee";
  userid;
  
  url1 = "http://localhost:3000/users/";
  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  }


  constructor(private http:HttpClient) { }

  regiUser(user)
  {
     let httpOptions1 = {headers: new HttpHeaders({Authorization: 'bearer ' + localStorage.getItem('token')})}
    return this.http.post<any>(this.url,user,httpOptions1);
  }
  disUser()
  { 
    let httpOptions1 = {headers: new HttpHeaders({Authorization: 'bearer ' + localStorage.getItem('token')})}
    return this.http.get(this.url,httpOptions1);
  }
  delUser(id)
  {
    const url = "http://localhost:3000/employee/"+id;
  
    return this.http.delete(url);
  }
  find(id)
  {
      const url="http://localhost:3000/employee/"+id; 
      console.log(localStorage.getItem('token'));
    let httpOptions1 = {headers: new HttpHeaders({Authorization: 'bearer ' + localStorage.getItem('token')})}
    return this.http.get<any>(url,httpOptions1);
  }
  email(id)
  {
    this.userid=id;
  }
  updUser(data)
  {
       const url = "http://localhost:3000/employee/"+this.userid;
      return this.http.patch<any>(url,data);
  }
  addUSer(data)
  {
    return this.http.post<any>(this.url1,data,this.httpOptions);
  }
  getUser(data)
  {
    let data1=JSON.parse(data);
    
    return this.http.post<any>(this.url1+data1.email,data,this.httpOptions);
  }
  loggedIn()
  {
    return !!localStorage.getItem('token');
  }
  sendEmail(email)
  {
    return this.http.get<any>(this.url1+email);
  }
  changePass(data)
  {
    console.log('in service');
    let parseData=JSON.parse(data);
    console.log(parseData);
    console.log(this.url1+parseData.id);
    return this.http.patch(this.url1+parseData.id,data,this.httpOptions);
  }
}



  