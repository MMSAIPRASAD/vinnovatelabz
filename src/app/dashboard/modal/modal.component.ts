import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../dashboard.component';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  modalForm!: FormGroup;
  userrecords:any;
  editExpense = false
  addExpense = false;
  @Input() public user: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any
  editFile: boolean = true;
  removeUpload: boolean = false;

  constructor(private _fb:FormBuilder,private _router:Router,public activeModal: NgbActiveModal,private _http:HttpClient,private cd: ChangeDetectorRef){}

  registrationForm = this._fb.group({
    file: [null]
  })  

  ngOnInit(){
   console.log(this.user)
   if(this.user !== ''){
    this.editExpense = true
   this.modalForm = this._fb.group({
    ename: this.user.expenseName,
    ebudget: this.user.expenseTarget,
    eexp: this.user.expenseTotal
  })
   }
   else{
    this.addExpense = true

    this.modalForm = this._fb.group({
      ename:'',
      ebudget:'',
      eexp: 0
    })
   }
  }


  createExpense(expenseDetails:any,checkVariable:any){
    console.log(expenseDetails)
let expenseRecord={
  expenseName:expenseDetails.controls.ename.value,
  expenseTarget:expenseDetails.controls.ebudget.value,
  expenseTotal:expenseDetails.controls.eexp.value,
  image:this.registrationForm.controls.file.value,
id:''
}

if(checkVariable){
  expenseRecord.id = this.user.id
}

console.log(expenseRecord)


let url = 'http://localhost:3000/expenseDetails'
this._http.post(url,JSON.stringify(expenseRecord)).subscribe((resp:any)=>{
this.userrecords = resp;
this.passEntry.emit();

this.activeModal.close()
})
  }


  uploadFile(event:any) {
    let reader:any = new FileReader();
    let file = event.target.files[0] ;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
    }
  }


  closeDialog(){
    this.activeModal.close()
  }
}
