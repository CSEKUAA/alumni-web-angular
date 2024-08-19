import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventRequestDTO } from '../../../shared/models/api.request';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventTypesDTO } from '../../../shared/models/api.response';
import { Location } from '@angular/common';
import { EventService } from '../../../shared/services/events.service';
import moment from 'moment';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent implements OnInit{
  private title:string='Create Event | KUAA';
  createEventForm!:FormGroup;
  eventTypes!:EventTypesDTO[];

  // Set the minimum to Current Date and Max will be 3 years from today.
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date();
  readonly maxDate = new Date(this._currentYear +3, new Date().getMonth(), new Date().getDay());

  constructor(private titleService:Title, private location: Location, private formBuilder:FormBuilder, 
    private eventService:EventService, private uiService:UIService){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.eventService.getEventTypes().subscribe({
      next:((types:EventTypesDTO[])=>{
        if(types && types.length>0){
          this.eventTypes=types;
        }
      })
    })

    this.createEventForm = this.formBuilder.group({
      id:new FormControl(0, {}),
      eventName:new FormControl('', {validators: [Validators.required]}),
      eventType:new FormControl('', {validators: [Validators.required]}),
      description:new FormControl('', {validators: [Validators.required]}),
      eventDate:new FormControl(new Date(), { validators: [Validators.required] }), // it'll be a ISO datetime formate e.g 2024-08-15T13:10:00.000Z      
      eventTime:new FormControl('', { validators: [Validators.required] }),
      location:new FormControl('', {validators: [Validators.required]}),
      link:new FormControl('', {})
    });
  }

  onBackToEvents(){
    this.location.back();
  }

  onSubmit(){
    if(this.createEventForm.valid && this.createEventForm.dirty){
      let eventRequest:EventRequestDTO = <EventRequestDTO> this.createEventForm.value;
      eventRequest = {
        ...eventRequest, 
        eventDate: this.formatDate(new Date(eventRequest.eventDate)), 
        eventTime:this.convertToISOTime(eventRequest.eventTime)
      }
      this.eventService.createEvent(eventRequest).subscribe({
        next:(()=>{
          this.uiService.showSuccessAlertWithGoBackAction('Event Created Successfully');
        }),
        error:(()=>{
          this.uiService.showErrorAlert('Something Went Wrong!');
        })
      });
    }
  }

  private convertToISOTime(eventTime:string):string {
    // Assuming the selected time is in the format 'hh:mm AM/PM'
    return moment(eventTime, 'hh:mm A').format('HH:mm');
  }

  private toISODateString(inDate:Date):string{
    let dateISO = moment(inDate).toISOString(true);
    let [date, time] = dateISO.split('T');

    return date;
  }

  private formatDate(inDate:Date) {
    const year = inDate.getFullYear();
    const month = String(inDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month, so add 1
    const day = String(inDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}T00:00:00.000Z`;
}
}
