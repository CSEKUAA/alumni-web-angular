import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventService } from '../../../shared/services/events.service';
import { EventRequestDTO, pageRequestDTO } from '../../../shared/models/api.request';
import { PagedAPIResponseDTO, PageinfoDTO } from '../../../shared/models/paged.response';
import { EventResponseDTO } from '../../../shared/models/api.response';
import moment from 'moment';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit{
  title:string = 'Events | KUAA';

  events:EventResponseDTO[]=[];
  pageInfo!:PageinfoDTO;
  
  constructor(private titleService:Title, private eventService:EventService){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    let pageRequestDTO:pageRequestDTO={page:0, size:10}
    this.eventService.getAllEvents(pageRequestDTO).subscribe({
      next:((resp:PagedAPIResponseDTO)=>{

        let response:PagedAPIResponseDTO = <PagedAPIResponseDTO> resp; 

        this.events = response.content.map(item =>{
          return {
            ...item,
            eventDate: moment(item.eventDate).format('DD-MMM-YYYY'),
            eventTime: moment(item.eventTime, "HH:mm").format('hh:mm A')
          }
        });

        this.pageInfo={
          empty:response.empty,
          first:response.first,
          last:response.last,
          number:response.number,
          numberOfElements:response.numberOfElements,
          size:response.size,
          totalElements:response.totalElements,
          totalPages:response.totalPages
        };
      })
    })
  }
}
