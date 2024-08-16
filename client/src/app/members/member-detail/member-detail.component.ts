import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [NgFor, NgIf,TabsModule, GalleryModule, TimeagoModule, DatePipe],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})

export class MemberDetailComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Member;
  images: GalleryItem[]=[];
  safePhotoUrl: SafeResourceUrl | undefined;
  

  constructor( private sanitizer: DomSanitizer){}
  
  ngOnInit():void{    
    this.loadMember()    
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({      
      next: member => {
        this.member = member  
        if (this.member.photoUrl) {
          this.safePhotoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.member.photoUrl);
        } 
        this.getImages(); // Call getImages() after loading member 
      }  
    });
  }

  getImages(){
    if(!this.member) return;
    for(const photo of this.member?.photos){
      this.images.push(new ImageItem({src:photo.url.trim(), thumb: photo.url.trim()}));      
    }    
  }
}
