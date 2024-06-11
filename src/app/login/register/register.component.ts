import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {



  modalForm:FormGroup

  constructor(private _fb:FormBuilder,private _router:Router,private modalService:NgbModal,private _http:HttpClient){
    this.modalForm = this._fb.group({
      name:'',
      email:'',
      password:'',
      mobile:''

    })
  }

  ngOnInit(){}



  registerUser(x:any){

    let user = [{
      name:x.controls.value,
      email:x.controls.email.value,
      password:x.controls.password.value,
      mobile:x.controls.mobile.value
    }]

    let url = 'http://localhost:3000/registerUser'
    this._http.post(url,user).subscribe((res:any)=>{
      console.log(res)
    })

  }
}
