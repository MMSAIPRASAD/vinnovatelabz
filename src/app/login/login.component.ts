import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userLoginForm:FormGroup

  constructor(private _fb:FormBuilder,private _router:Router,private modalService:NgbModal){
    this.userLoginForm = this._fb.group({
      name:'',
      email:'',
      password:''
    })
  }

  ngOnInit(){}

  login(userDetails:any){

let userDetail = {
  name:userDetails.controls.name.value,
  email:userDetails.controls.email.value,
  password:userDetails.controls.password.value
}
localStorage.setItem('userLoginDetails',JSON.stringify(userDetail))
this._router.navigate(['/dashboard'])
  }


  register(){
    const modalRef = this.modalService.open(RegisterComponent);
    modalRef.componentInstance.user = '';
  }

}
