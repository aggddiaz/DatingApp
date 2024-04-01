
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './_modules/shared.module';

;

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, NavComponent, HomeComponent, RouterModule, SharedModule],
 
})
 
export class AppComponent implements OnInit {

  title = 'Dating app'; 
 
  constructor(private accountService: AccountService){}
 
 
  ngOnInit(): void {    
    this.setCurrentUser();
  }  
 
  setCurrentUser()
  {
    if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentuser(user);
    }
  }
}