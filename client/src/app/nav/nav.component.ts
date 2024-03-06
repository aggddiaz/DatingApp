import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  standalone: true,  
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  model:any = {}

  constructor() {}

  ngOnInit(): void {    
  }

  login(){
    console.log(this.model);
  }

}
