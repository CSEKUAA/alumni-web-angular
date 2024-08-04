import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlumniExternalLinkInfoDTO, ExternalLinkTypeDTO, UserProfileResponseDTO } from '../../../shared/models/api.response';
import { UserService } from '../../../shared/services/user.service';
import { Title } from '@angular/platform-browser';
import { UIService } from '../../../shared/services/ui.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MiscService } from '../../../shared/services/misc.service';
import { ExternalLinkCreateRequestDTO, ExternalLinkUpdateRequestDTO } from '../../../shared/models/api.request';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  title:string = 'Profile | KUAA';
  userProfileInfo!:UserProfileResponseDTO;
  profileImage:string='Sample';
  isButtonVisible: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  isUpdateCalled!:boolean;

  // External Link management
  extLinksForm!:FormGroup;
  editExternalLinkSection!:boolean;
  isAdd!:boolean;
  externalLinkTypes: ExternalLinkTypeDTO[] = [];
  extLinkCount:number=0;
  //END

  constructor(private userService:UserService, private titleService:Title, 
    private uiService:UIService, private fb:FormBuilder, private miscService:MiscService){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.loadProfileInformation();
    
    this.extLinksForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  loadProfileInformation(){
    this.userService.getUserProfile().subscribe({
      next: ((resp:UserProfileResponseDTO)=>{
        this.userProfileInfo = resp;
        if(resp.photo==='--'){
          this.userProfileInfo.photo=this.profileImage;
        }
      })
    });
  }

  toggleUpdateMode(){
    this.isUpdateCalled=!this.isUpdateCalled;
    if(!this.isUpdateCalled){
      this.loadProfileInformation();
    }
  }

  showButton() {
    this.isButtonVisible = true;
  }

  hideButton() {
    this.isButtonVisible = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.changeProfilePicture(file);
    }
  }

  changeProfilePicture(imageFile:File){
    const formData = new FormData();
    formData.append('image', imageFile);

    this.userService.uploadProfilePicture(formData).subscribe({
      next: ()=>{
        this.loadProfileInformation();
        this.clearFileInput();
        this.uiService.showSuccessAlert('Profile Picture Successfully Updated!');

      },
      error: ((error:Error)=>{
        this.clearFileInput();
        this.uiService.showErrorAlert('File Upload Failed!');
      })
    })
  }

  clearFileInput(){
    this.fileInput.nativeElement.value = '';
  }

  onToggleAddExternalLink(){
    this.editExternalLinkSection=!this.editExternalLinkSection;
    this.isAdd=!this.isAdd;
    if(this.editExternalLinkSection && this.externalLinkTypes.length===0){
      this.miscService.getExternalLinkTypes().subscribe({
        next: (types=>{
          this.externalLinkTypes = types;
          this.addItem();
        })
      });
    }
    else{
      this.clearItems();
      this.addItem();
    }
  }

  onToggleEditExternalLink(){
    this.editExternalLinkSection=!this.editExternalLinkSection;
    if(this.editExternalLinkSection){
      if(this.externalLinkTypes.length===0){
        this.miscService.getExternalLinkTypes().subscribe({
          next: (types=>{
            this.externalLinkTypes = types;
            this.initializeEditForm();
          })
        });
      }
      else{        
        this.initializeEditForm();
      }
    }else{
      this.clearEditForm();
    }
  }

  get items(): FormArray {
    return this.extLinksForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      externalLinkId: [0],
      externalTypeName: ['', Validators.required],
      externalLinkUrl: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addItem() {
    this.items.push(this.createItem());
    this.extLinkCount++;
  }

  removeItem(index: number, id:number) {
    if(id>0){
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteExternalLink(id).subscribe({
            next: (resp=>{
              this.uiService.showSuccessAlert('External Link Deleted Successfully!');
              this.items.removeAt(index);
              this.extLinkCount--;
              if(this.items.length===0){
                this.editExternalLinkSection=!this.editExternalLinkSection;
                this.extLinkCount=0;
                this.isAdd=!this.isAdd;
              }
            }),
            error: ((error:Error)=>{
              this.uiService.showErrorAlert('Failed to delete!');
            })
          })
        }
      });
    }
    else{
      this.items.removeAt(index);
      this.extLinkCount--;
      if(this.items.length===0){
        this.editExternalLinkSection=!this.editExternalLinkSection;
        this.extLinkCount=0;
        this.isAdd=!this.isAdd;
      }
    }
  }

  clearItems() {
    this.items.clear();
    this.extLinkCount=0;
  }

  initializeEditForm(){
    this.extLinksForm = this.fb.group({
      items: this.fb.array(this.userProfileInfo.externalLinkInfo.map(item=>{
        return this.fb.group({
          externalLinkId: [item.alumniExternalLinkId, Validators.required],
          externalTypeName: [{value: item.alumniExternalLinkName, disabled:true}, Validators.required],
          externalLinkUrl: [item.alumniExternalLinkUrl, Validators.required],
          description: [item.description, Validators.required]
        })
      }))
    });
  }

  clearEditForm(){
    this.extLinksForm.reset();
  }

  onSubmitExternalLinkCreate(){
    if(this.extLinksForm.valid){
      let formData = this.extLinksForm.value;
      let externalLinkDTO:ExternalLinkCreateRequestDTO[] = formData.items;
      this.userService.saveAllExternalLinks(externalLinkDTO).subscribe({
        next: (resp =>{
          this.uiService.showSuccessAlert('Successfully Saved!');
          this.editExternalLinkSection=!this.editExternalLinkSection;
          this.loadProfileInformation();
        }),
        error: ((error:Error)=>{
          this.uiService.showErrorAlert(error.message);
        })
      })
    }
  }

  onSubmitExternalLinkUpdate(){
    if(this.extLinksForm.valid){
      let formData = this.extLinksForm.value;
      let externalLinkDTO:ExternalLinkUpdateRequestDTO[] = formData.items.map((item:ExternalLinkCreateRequestDTO)=>{
        return ({
          id: item.externalLinkId, description:item.description, url:item.externalLinkUrl
        })
      });
      this.userService.updateAllExternalLinks(externalLinkDTO).subscribe({
        next: (resp =>{
          this.uiService.showSuccessAlert('Successfully Updated!');
          this.editExternalLinkSection=!this.editExternalLinkSection;
          this.loadProfileInformation();
        }),
        error: ((error:Error)=>{
          this.uiService.showErrorAlert(error.message);
        })
      })
    }
  }
}
