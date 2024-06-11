import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {

  userLoginForm!:FormGroup;
  @Input() public user: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();


  constructor(private _fb:FormBuilder,private modalService:NgbModal,private _http:HttpClient,public activeModal: NgbActiveModal){
   
  }

  ngOnInit(){
    console.log(this.user)
    this.userLoginForm = this._fb.group({
      name:this.user.name,
      email:this.user.email
    })
    console.log(this.userLoginForm)
  }

  editUser(x:any){
let details = [{
  name:x.controls.name.value,
  email:x.controls.email.value,
}]

let url = 'http://localhost:3000/postDetails'
this._http.post(url,JSON.stringify(details)).subscribe((resp:any)=>{
  console.log(resp)
  this.passEntry.emit(details);

  this.activeModal.close()

})
  }
}
