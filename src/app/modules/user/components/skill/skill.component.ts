import { Component, OnInit } from '@angular/core';
import { SkillResponseDTO } from '../../../shared/models/api.response';
import { SkillService } from '../../../shared/services/skill.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SkillTypes } from '../../../shared/models/ui.models';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, Observable, startWith } from 'rxjs';
import { SkillRequestDTO } from '../../../shared/models/api.request';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent implements OnInit{
  alumniSkills:SkillResponseDTO[]=[];

  extLinksForm!:FormGroup;
  editSkillsSection!:boolean;
  isAdd!:boolean;
  skillTypes: SkillTypes[] = [];
  skillCount:number=0;

  // Temsp
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemControl = new FormControl('');
  selectedItems: string[] = [];
  allItems: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4']; // Autocomplete options
  filteredOptions!: Observable<string[]>;
  // END

  constructor(private skillService:SkillService, private uiService:UIService){}

  ngOnInit(): void {
    this.skillService.getAllSkills().subscribe({
      next:((resp:SkillTypes[])=>{
        this.skillTypes=resp;
        this.allItems = this.skillTypes.map(x=> x.skillName);
      })
    });

    // Filter autocomplete options as user types
    this.filteredOptions = this.itemControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value!))
    );

    this.loadAlumniSkills();
  }

  loadAlumniSkills(){
    this.skillService.getAlumniSkills().subscribe({
      next:((resp:any)=>{
        this.alumniSkills=resp;
      })
    });
  }

  onToggleAddSkill(){
    this.editSkillsSection=!this.editSkillsSection;
    this.isAdd=!this.isAdd;
    if(this.alumniSkills.length>0){
      this.selectedItems = this.alumniSkills.map(x=> x.skillName);
    }
    // this.itemControl.setValue();
  }

  // Filter function for autocomplete
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allItems.filter(item => item.toLowerCase().includes(filterValue));
  }

  // Add selected item to chips
  select(event: any): void {
    const value = event.option.value;

    if (this.selectedItems.indexOf(value) === -1) {
      this.selectedItems.push(value);
    }

    this.itemControl.setValue(''); // Clear input after selection
  }

  // Add item manually if no autocomplete selection is made
  add(event: any): void {
    const value = (event.value || '').trim();

    if (value && this.selectedItems.indexOf(value) === -1) {
      this.selectedItems.push(value);
    }

    // Clear the input value
    event.input.value = '';
    this.itemControl.setValue(null);
  }

  // Remove selected item
  remove(item: string): void {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }

  // Submit selected items to the API
  submit(): void {
    let selectedSkills:SkillRequestDTO[] = this.skillTypes.filter(obj => this.selectedItems.includes(obj.skillName));

    this.skillService.addAlumniSkill(selectedSkills).subscribe({
      next:(()=>{
        this.uiService.showSuccessAlert('Saved Successfully');
        this.onCancleSkill();
        this.loadAlumniSkills();
      }),
      error: (()=>{
        this.uiService.showErrorAlert('Something Went Wrong! Please try again!');
      })
    })
  }

  onCancleSkill(){
    this.selectedItems=[];
    this.isAdd=false;
  }
}
