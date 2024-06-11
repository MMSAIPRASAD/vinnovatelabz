import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { EdituserComponent } from './edituser/edituser.component';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

userDetails:any;
toaster:boolean = false;
expenseDetails:any;
currencyForm!:FormGroup;


currencyValues = [
  {id:1,currency:'USD'},
  {id:2,currency:'IND'},
 ]
constructor(private _http:HttpClient,private modalService:NgbModal,private _fb:FormBuilder){
this.currencyForm = this._fb.group({
amount:''
})
}

addExpense(details:any){
  const modalRef = this.modalService.open(ModalComponent);
  modalRef.componentInstance.user = details;
  modalRef.componentInstance.passEntry.subscribe((receivedEntry:any) => {
    this.getDashboardItems()

  })
}

ngOnInit(){

  let user:any = localStorage.getItem('userLoginDetails')
  console.log(user)
  this.userDetails = JSON.parse(user)
this.getDashboardItems()
this.getExchangeRates()
}


getDashboardItems(){

  this._http.get('http://localhost:3000/expenseDetails').subscribe((resp:any)=>{
    console.log(resp)
    this.expenseDetails = resp;
    this.expenseDetails.map((x:any)=>{
      x.progress= x.expenseTotal / x.expenseTarget * 100
    })
    console.log( this.expenseDetails)

  })
}


getExchangeRates(){
  this._http.get('https://api.exchangerate.host/latest?base=USD').subscribe((resp:any)=>{
    console.log(resp)
}
)
}


deleteExpense(user:any){
  console.log(user)
  this._http.delete(`http://localhost:3000/expenseDetails/${user.id}`).subscribe((resp:any)=>{
    console.log(resp)
    this.toaster = true;
    this.getDashboardItems()

  })
}

editusernameDetails(x:any){
console.log(x)
const modalRef = this.modalService.open(EdituserComponent);
modalRef.componentInstance.user = x;
modalRef.componentInstance.passEntry.subscribe((receivedEntry:any) => {
  console.log(receivedEntry)
this.userDetails.name = receivedEntry[0].name
this.userDetails.email = receivedEntry[0].email

})
}



convertCurrency(){

}

  }