import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users:any;
  constructor(private http: HttpClient) {};

  ngOnInit(): void {   
    this.getUsers(); 
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  } 

  getUsers(){
    this.http.get('http://localhost:5241/api/users').subscribe({
    next: response => this.users = response,
    error: error => console.log(error),
    complete: () => console.log('Request has completed')
  })  
}

cancelRegisterMode(event: boolean) {
  this.registerMode = event;
}

}
