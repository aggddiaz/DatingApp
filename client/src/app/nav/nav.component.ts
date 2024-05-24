import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule, NgIf, JsonPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../_modules/shared.module';


 
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf, JsonPipe, RouterLink, SharedModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit { 
  model: any = {}; 
  //router: any;
  constructor(public accountService: AccountService, private toastr: ToastrService, private router: Router) {}
  ngOnInit(): void {   
  } 
  
 
  login() {
    this.accountService.login(this.model).subscribe({
      next: _ =>this.router.navigateByUrl('/members')
    })
  }
 
  logout(){
    this.accountService.logout();
   
  }
}