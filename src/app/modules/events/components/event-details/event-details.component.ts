import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventResponseDTO } from '../../../shared/models/api.response';
import { ActivatedRoute} from '@angular/router';
import { EventService } from '../../../shared/services/events.service';
import moment from 'moment';
import { PublicService } from '../../../shared/services/public.service';
import { UIService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit{
  title:string='Event Details | KUAA';
  event!:EventResponseDTO;
  eventId!:number;
  isChangeBannarVisible!:boolean;
  selectedFile: File | null = null;

  constructor(private location:Location, private titleService:Title, private route:ActivatedRoute, 
    private eventService:EventService, private publicService:PublicService, private uiService:UIService){    
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('eventId')!;
    this.publicService.getEvent(this.eventId).subscribe({
      next:((resp:EventResponseDTO)=>{
        this.event=resp;
        this.event = {
          ...this.event ,
          eventDate: moment(this.event.eventDate).format('DD-MMM-YYYY'),
          eventTime: moment(this.event.eventTime, "HH:mm").format('hh:mm A'),
          createdDate: moment.utc(this.event.createdDate).format('DD-MMM-YYYY, hh:mm A'),
          updatedDate: this.event.updatedDate?moment.utc(this.event.updatedDate).format('DD-MMM-YYYY, hh:mm A'):''
        }
      })
    })
  }

  onBackToEvents(){
    this.location.back();
  }

  showButton(){
    this.isChangeBannarVisible=!this.isChangeBannarVisible;
  }

  hideButton(){
    this.isChangeBannarVisible=!this.isChangeBannarVisible;
  }

  triggerFileInput(){
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  onFileSelected(event:any){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('file', file);

      this.eventService.uploadEventBannar(this.eventId, formData).subscribe({
        next: ((resp: any)=> {
          this.uiService.showSuccessAlert('Bannae updated successfully!');
        })
      })
    }
  }

}
