import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { EventResponseDTO, EventTypesDTO } from '../../../shared/models/api.response';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { UIService } from '../../../shared/services/ui.service';
import { EventService } from '../../../shared/services/events.service';
import { EventRequestDTO } from '../../../shared/models/api.request';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.scss'
})
export class UpdateEventComponent {
  private title:string='Update Event | KUAA';
  eventId!:number;
  updateEventForm!:FormGroup;
  eventTypes!:EventTypesDTO[];

  // Set the minimum to Current Date and Max will be 3 years from today.
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date();
  readonly maxDate = new Date(this._currentYear +3, new Date().getMonth(), new Date().getDay());

  constructor(private titleService:Title, private location: Location, private formBuilder:FormBuilder, 
    private eventService:EventService, private uiService:UIService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.eventId = +this.route.snapshot.paramMap.get('eventId')!;
    this.eventService.getEventTypes().subscribe({
      next:((types:EventTypesDTO[])=>{
        if(types && types.length>0){
          this.eventTypes=types;
        }
      })
    });

    this.eventService.getEvent(this.eventId).subscribe({
      next: ((event:EventResponseDTO)=>{        
        this.updateEventForm = this.formBuilder.group({
          id:new FormControl(event.eventId, {validators: [Validators.required]}),
          eventName:new FormControl(event.eventName, {validators: [Validators.required]}),
          eventType:new FormControl(event.eventType, {validators: [Validators.required]}),
          description:new FormControl(event.description, {validators: [Validators.required]}),
          eventDate:new FormControl(new Date(event.eventDate), { validators: [Validators.required] }),
          eventTime:new FormControl(event.eventTime, { validators: [Validators.required] }),
          location:new FormControl(event.location, {validators: [Validators.required]}),
          link:new FormControl(event.link, {})
        });
      })
    })
  }

  onBackToEvents(){
    this.location.back();
  }

  onSubmit(){
    if(this.updateEventForm.valid && this.updateEventForm.dirty){
      let eventRequest:EventRequestDTO = <EventRequestDTO> this.updateEventForm.value;
      eventRequest = {
        ...eventRequest, 
        eventDate: this.formatDate(new Date(eventRequest.eventDate)), 
        eventTime:this.convertToISOTime(eventRequest.eventTime)
      }
      this.eventService.updateEvent(eventRequest).subscribe({
        next:(()=>{
          this.uiService.showSuccessAlertWithGoBackAction('Event Updated Successfully');
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
