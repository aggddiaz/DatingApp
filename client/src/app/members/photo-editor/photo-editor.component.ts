import { Component, Input, OnInit} from '@angular/core';
import { Member } from '../../_models/member';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { User } from '../../_models/user';
import { environment } from '../../../environments/environment';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { MembersService } from '../../_services/members.service';
import { Photo } from '../../_models/photo';
 
@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FileUploadModule, CommonModule],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
 
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;
 
  constructor(private accountService: AccountService, private memberService: MembersService){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user =>{
        if (user) this.user = user
      }
    })
  }
 
  ngOnInit(): void {
    this.initializeUploader();
  }
 
  fileOverBase(e: any){
    this.hasBaseDropZoneOver = e;
  }
 
  setMainPhoto(photo: Photo){
    this.memberService.setMainPhoto(photo).subscribe({
      next: () =>{
        if (this.user && this.member){
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user)
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p => {
            if (p.isMain) p.isMain = false;
            if (p.id === photo.id) p.isMain = true;
          })
        }
      }
    })
  }
 
  deletePhoto(photo: Photo){
    this.memberService.deletePhoto(photo).subscribe({
      next: _ => {
        if (this.member){
          this.member.photos = this.member.photos.filter(x => x.id != photo.id);          
        }
      }
    })
  }
 
  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl +  'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
 
    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials = false
    }
 
    this.uploader.onSuccessItem = (item, response, status, headers) =>{
      if (response){
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
        if(photo.isMain && this.user && this.member)
        {
          this.user.photoUrl = photo.url;
          this.member.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }          
      }
    }
  }
 
}
 