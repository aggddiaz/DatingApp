import {HttpClient} from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
//import { NgFor } from '@angular/common'; 

import { CommonModule } from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [ CommonModule],
})

export class AppComponent implements OnInit {  
  title = 'Dating app';
  users: any;
  constructor(private http: HttpClient) {}
  ngOnInit():void{
    this.http.get('http://localhost:5241/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete : () => console.log('Request has completed')
    })
  }
}
