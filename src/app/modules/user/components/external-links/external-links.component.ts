import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AlumniExternalLinkInfoDTO, ExternalLinkTypeDTO, UserProfileResponseDTO } from '../../../shared/models/api.response';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MiscService } from '../../../shared/services/misc.service';

import Swal from 'sweetalert2';
import { UserService } from '../../../shared/services/user.service';
import { UIService } from '../../../shared/services/ui.service';
import { ExternalLinkCreateRequestDTO, ExternalLinkUpdateRequestDTO } from '../../../shared/models/api.request';

@Component({
  selector: 'app-external-links',
  templateUrl: './external-links.component.html',
  styleUrl: './external-links.component.scss'
})
export class ExternalLinksComponent implements OnInit, OnChanges{
  @Input('userProfile') userProfile!:UserProfileResponseDTO;
  @Output('onSuccessApplication') successApplicationEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  externalLinks: AlumniExternalLinkInfoDTO[] = [];

  extLinksForm!:FormGroup;
  editExternalLinkSection!:boolean;
  isAdd!:boolean;
  externalLinkTypes: ExternalLinkTypeDTO[] = [];
  extLinkCount:number=0;

  constructor(private formBuilder:FormBuilder, private miscService:MiscService, private userService:UserService, private uiService:UIService){}

  ngOnInit(): void {
    this.externalLinks = this.userProfile.externalLinkInfo;
    
    this.extLinksForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userProfile']) {
      this.externalLinks=this.userProfile.externalLinkInfo;
    }
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
    return this.formBuilder.group({
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
    this.extLinksForm = this.formBuilder.group({
      items: this.formBuilder.array(this.externalLinks.map(item=>{
        return this.formBuilder.group({
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
        next: (() =>{
          this.uiService.showSuccessAlert('Successfully Saved!');
          this.editExternalLinkSection=!this.editExternalLinkSection;
          this.successApplicationEvent.emit(true);
        }),
        error: ((error:Error)=>{
          this.uiService.showErrorAlert(error.message);
        })
      })
    }
  }

  onSubmitExternalLinkUpdate(){
    if(!this.extLinksForm.dirty){
      this.uiService.showErrorAlert("Nothing Changed to Update!");
      return;
    }

    if(this.extLinksForm.valid){
      let formData = this.extLinksForm.value;
      let externalLinkDTO:ExternalLinkUpdateRequestDTO[] = formData.items.map((item:ExternalLinkCreateRequestDTO)=>{
        return ({
          id: item.externalLinkId, description:item.description, url:item.externalLinkUrl
        })
      });
      this.userService.updateAllExternalLinks(externalLinkDTO).subscribe({
        next: (() =>{
          this.uiService.showSuccessAlert('Successfully Updated!');
          this.editExternalLinkSection=!this.editExternalLinkSection;
          this.successApplicationEvent.emit(true);
        }),
        error: ((error:Error)=>{
          this.uiService.showErrorAlert(error.message);
        })
      })
    }
  }

}
