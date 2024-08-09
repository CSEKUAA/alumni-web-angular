import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MembershipInfoDTO, MembershipTypesDTO, UserProfileResponseDTO } from '../../../shared/models/api.response';
import { MembershipService } from '../../../shared/services/membership.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembershipRequestDTO } from '../../../shared/models/api.request';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-membership-info',
  templateUrl: './membership-info.component.html',
  styleUrl: './membership-info.component.scss'
})

export class MembershipInfoComponent implements OnInit, OnChanges{
  @Input('userProfile') userProfile!:UserProfileResponseDTO;
  @Output('onSuccessApplication') successApplicationEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  membershipDetails: MembershipInfoDTO[] = [];
  membershipTypes:MembershipTypesDTO[]=[];
  isApplyOpen!:boolean;
  membershipApplicationForm!:FormGroup;
  isPlanSelected!:boolean;
  planInfo:string='';
  selectedTypeId!:number;

  constructor(private membershipService:MembershipService, private formBuilder:FormBuilder, private uiService:UIService){}
  
  ngOnInit() {
    this.membershipDetails=this.userProfile.membershipInfos;
    this.membershipService.getMembershipTypes().subscribe({
      next:((types:MembershipTypesDTO[])=>{
        this.membershipTypes=types;
      }),
      error: (()=>{
        console.warn('Unable to load Types');
      })
    });

    this.membershipApplicationForm = this.formBuilder.group({
      membershipTypeId: this.formBuilder.control('', { validators: Validators.required })
    });

    this.membershipApplicationForm.get('membershipTypeId')?.valueChanges.subscribe({
      next: ((value:string)=>{
        let mappedTypes = this.membershipTypes.filter((item:MembershipTypesDTO)=> item.membershipType===value.toLowerCase());
        if(mappedTypes.length>0){
          this.selectedTypeId = mappedTypes[0].memberShipTypeId;
          this.isPlanSelected=true;
          this.planInfo = `${value.toUpperCase()} Package fee is BDT ${mappedTypes[0].membershipFee}/=`;
        }
      })
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userProfile']) {
      this.membershipDetails=this.userProfile.membershipInfos;
    }
  }

  onToggleApplyMembership(){
    this.isApplyOpen=!this.isApplyOpen;
  }

  onSubmit(){
    if(this.membershipApplicationForm.valid){
      let selectedPlan:MembershipRequestDTO = {
        membershipTypeId:this.selectedTypeId
      }

      this.membershipService.applyMembership(selectedPlan).subscribe({
        next: (()=>{
          this.uiService.showSuccessAlert('Membership Applied! Please pay the required fees in order to activate membership!');
          this.onToggleApplyMembership();
          this.successApplicationEvent.emit(true);
        }),
        error: (()=>{
          this.uiService.showErrorAlert('Something went wrong!');
        })
      })
    }
  }
}
