import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
 
export class RegisterComponent implements OnInit {
 
  @Output() cancelRegister = new EventEmitter();
 
  model: any = {};  
 
  constructor (private accountService:AccountService, private toastr: ToastrService) {}
    ngOnInit(): void{
   }
 
   register() {
    this.accountService.register(this.model).subscribe({
      next: () =>{        
        this.cancel();
      },
      error: error => {
        this.toastr.error(error.error, '',
        {positionClass: 'toast-bottom-right'});
        console.log(error);
      }
     
    });
   }
 
   cancel() {
    this.cancelRegister.emit(false);
   }
}