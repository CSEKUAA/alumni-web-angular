import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountryDTO, DistrictDTO, UserProfileResponseDTO } from '../../../shared/models/api.response';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownModel } from '../../../auth/models/dropdown.model';
import { UserProfileRequestDTO } from '../../../shared/models/api.request';
import { MiscService } from '../../../shared/services/misc.service';
import { Observable, of} from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProfileComponent implements OnInit{
  @Input('userProfile') userProfile!:UserProfileResponseDTO;
  @Output('toggleUpdate') toggleUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  userProfileForm!:FormGroup;
  countries:CountryDTO[] = [];
  presentDistrictCache!:DistrictDTO[];
  permanentDistrictCache!:DistrictDTO[];

  filteredPresentCountries$!: Observable<CountryDTO[]>;
  filteredPermanentCountries$!: Observable<CountryDTO[]>;

  presentdistricts$!: Observable<DistrictDTO[]>;
  permanentdistricts$!: Observable<DistrictDTO[]>;

  bloodGroups:DropdownModel[] = [
    {id:"A_POSITIVE", value:"A+"},{id:"A_NEGATIVE", value:"A-"},{id:"AB_POSITIVE", value:"AB+"},{id:"AB_NEGATIVE", value:"AB-"},{id:"B_POSITIVE", value:"B+"},{id:"B_NEGATIVE", value:"B-"},{id:"O_POSITIVE", value:"O+"},{id:"O_NEGATIVE", value:"O-"}
  ];

   // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
   private readonly _currentYear = new Date().getFullYear();
   readonly minDate = new Date(this._currentYear - 100, 0, 1);
   readonly maxDate = new Date(this._currentYear -15, 0, 1);

  constructor(private formBuilder:FormBuilder, private miscService:MiscService, private userService:UserService, private uiService:UIService){}

  ngOnInit(): void {
    this.userProfileForm = this.formBuilder.group({
      bloodGroup: new FormControl(this.getBloodGorupValue(this.userProfile.bloodGroup), {validators: [Validators.required]}),
      company: new FormControl(this.userProfile.contactDetail.company, {validators: [Validators.required]}),
      companyAddress: new FormControl(this.userProfile.contactDetail.companyAddress, {validators: [Validators.required]}),
      designation: new FormControl(this.userProfile.contactDetail.designation, { validators: [Validators.required]}),
      dob: new FormControl(this.getBirthDatePreset(this.userProfile.dob), { validators: [Validators.required] }),
      nickName: new FormControl(this.userProfile.nickName, { validators: [Validators.required]}),
      permanentAddress: new FormControl(this.userProfile.contactDetail.permanentAddress,{ validators: [Validators.required]}),
      permanentCity: new FormControl(this.userProfile.contactDetail.permanentCity, { validators: [Validators.required]}),
      permanentCountry: new FormControl(this.userProfile.contactDetail.permanentCountry, { validators: [Validators.required]}),
      presentAddress:new FormControl(this.userProfile.contactDetail.presentAddress, {validators: [Validators.required]}),
      presentCity: new FormControl(this.userProfile.contactDetail.presentCity, {validators: [Validators.required]}),
      presentCountry: new FormControl(this.userProfile.contactDetail.presentCountry, {validators: [Validators.required]}),
      profession: new FormControl(this.userProfile.contactDetail.profession, {validators: [Validators.required]}),
      roll: new FormControl(this.userProfile.roll, {validators: [Validators.required]})
    });

    this.loadCountries();
    
    this.userProfileForm.get('presentCountry')!.valueChanges.subscribe({
      next: (value=>{
        this.filteredPresentCountries$ = of(this._filterCountries(value));
      })
    });
    
    this.userProfileForm.get('permanentCountry')!.valueChanges.subscribe({
      next: (value=>{
        this.filteredPermanentCountries$ = of(this._filterCountries(value));
      })
    });

    this.userProfileForm.get('presentCity')!.valueChanges.subscribe({
      next: (value=>{
        this.presentdistricts$ = of(this._filterDistricts(value, "present"));
      })
    });

    this.userProfileForm.get('permanentCity')!.valueChanges.subscribe({
      next: (value=>{
        this.permanentdistricts$ = of(this._filterDistricts(value, "permanent"));
      })
    });
  }

  onSubmit(){
    if(this.userProfileForm.valid){
      let usrInfo:UserProfileRequestDTO = <UserProfileRequestDTO> this.userProfileForm.value;
      usrInfo.dob = this.toLocalISO(new Date(usrInfo.dob)).split('T')[0];
      
      this.userService.updateUserProfileInfo(usrInfo).subscribe({
        next: (() => {
          this.uiService.showSuccessAlert('Information updated successfully!');
          this.onBackProfile();
        }),
        error: (() => {
          this.uiService.showErrorAlert('Something went wrong!');
        })
      })
    }
  }

  onBackProfile(){
    this.toggleUpdate.emit(true);
  }

  private toLocalISO(date:Date):string {
    const offset = -date.getTimezoneOffset();
    const diff = offset >= 0 ? '+' : '-';
    const pad = (num:number) => String(num).padStart(2, '0');
  
    const localISO = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${diff}${pad(Math.floor(Math.abs(offset) / 60))}:${pad(Math.abs(offset) % 60)}`;
  
    return localISO;
  }

  loadCountries(){
    this.miscService.getCountries().subscribe({
      next:((resp:CountryDTO[])=>{
        this.countries=resp;

        if(this.userProfile.contactDetail.presentCountry){
          let country = this.countries.find(c => c.countryName === this.userProfile.contactDetail.presentCountry);
          if(country){
            this.userProfileForm.get('presentCountry')?.setValue(country?.countryName);
            this.loadPresentDistricts(country.countryName);
          }
        }

        if(this.userProfile.contactDetail.permanentCountry){
          let country = this.countries.find(c => c.countryName === this.userProfile.contactDetail.permanentCountry);
          if(country){
            this.userProfileForm.get('permanentCountry')?.setValue(country?.countryName);
            this.loadPermanentDistricts(country.countryName);
          }
        }
      })
    })
  }
  
  loadPresentDistricts(countryName:string){
    if (this.presentDistrictCache && this.presentDistrictCache[0].countryName===countryName) {
      this.presentDistrictCache;
    } else{
      this.miscService.getDistrictsForCountry(countryName).subscribe({
        next:(districts => {
          this.userProfileForm.get('presentCity')?.setValue(null);
          this.presentdistricts$ = of([]);
          this.presentDistrictCache = districts;
          
          if(this.userProfile.contactDetail.presentCity){
            let district = this.presentDistrictCache.find(d => d.districtName.toLowerCase() === this.userProfile.contactDetail.presentCity.toLowerCase());
            if(district){
              this.userProfileForm.get('presentCity')?.setValue(district.districtName);
            }
          }
        })
      });
    }
  }
  loadPermanentDistricts(countryName:string){
    if (this.permanentDistrictCache && this.permanentDistrictCache[0].countryName===countryName) {
      this.permanentDistrictCache;
    } else{
      this.miscService.getDistrictsForCountry(countryName).subscribe({
        next:(districts =>{
          this.userProfileForm.get('permanentCity')?.setValue(null);
          this.permanentdistricts$ = of([]);
          this.permanentDistrictCache = districts;

          if(this.userProfile.contactDetail.permanentCity){
            let district = this.permanentDistrictCache.find(d => d.districtName.toLowerCase() === this.userProfile.contactDetail.permanentCity.toLowerCase());
            if(district){
              this.userProfileForm.get('permanentCity')?.setValue(district.districtName);
            }
          }
        })
      });
    }
  }

  // Presetters
  private getBloodGorupValue(groupText:string):string{
    const group = this.bloodGroups.find(c => c.value === groupText);
    return group ? group.id : '';
  }

  private getBirthDatePreset(dateStr:string){
    return dateStr?new Date(dateStr):null;
  }
  // END

  private _filterCountries(value: any): any[] {
    value=value===null?'':value;
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.countryName.toLowerCase().includes(filterValue));
  }

  private _filterDistricts(value:string, type:string):any[]{
    value=value===null?'':value;
    
    if(type==="present" && this.presentDistrictCache){
      const filterValue = value.toLowerCase();
      return this.presentDistrictCache.filter(country => country.districtName.toLowerCase().includes(filterValue));
    }
    else if(type==="permanent" && this.permanentDistrictCache){
      const filterValue = value.toLowerCase();
      return this.permanentDistrictCache.filter(country => country.districtName.toLowerCase().includes(filterValue));
    }
    else{
      return [];
    }
  }
}
