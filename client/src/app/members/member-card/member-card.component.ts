import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent implements OnInit {
  
  @Input() member: Member | any;
  safePhotoUrl: any;

  constructor(private sanitizer: DomSanitizer) {}
  

  ngOnInit(): void {
    if (this.member.photoUrl) {
      this.safePhotoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.member.photoUrl);
    }
  }

}
