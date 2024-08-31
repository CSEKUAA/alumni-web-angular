import { Component, OnInit } from '@angular/core';
import { EventResponseDTO } from '../../shared/models/api.response';
import { EventService } from '../../shared/services/events.service';
import { PublicService } from '../../shared/services/public.service';
import { PagedAPIResponseDTO } from '../../shared/models/paged.response';
import moment from 'moment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{

  events: EventResponseDTO[]=[];

  constructor(private publicService:PublicService){}

  ngOnInit(): void {
    this.publicService.getAllEvents().subscribe({
      next:((resp:any)=>{
        let response:PagedAPIResponseDTO = <PagedAPIResponseDTO> resp; 

        this.events = response.content.map(item =>{
          return {
            ...item,
            eventDate: moment(item.eventDate).format('DD-MMM-YYYY'),
            eventTime: moment(item.eventTime, "HH:mm").format('hh:mm A')
          }
        });
      })
    })
  }

}
