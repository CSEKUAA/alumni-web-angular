import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventService } from '../../../shared/services/events.service';
import { PagedAPIResponseDTO, PageinfoDTO, PageRequestDTO } from '../../../shared/models/paged.response';
import { EventResponseDTO } from '../../../shared/models/api.response';
import moment from 'moment';
import { PageModel } from '../../../shared/models/ui.models';
import { PublicService } from '../../../shared/services/public.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit{
  title:string = 'Events | KUAA';

  events:EventResponseDTO[]=[];
  pageInfo!:PageinfoDTO;
  initClass!:boolean;
  
  constructor(private titleService:Title, private eventService:EventService, private publicService:PublicService){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.loadEvents();
  }

  loadEvents(page:number=0, size:number=12){
    let pageRequestDTO:PageRequestDTO={page:page, size:size, disciplineName:''}
    this.publicService.getAllEvents(pageRequestDTO).subscribe({
      next:((resp:PagedAPIResponseDTO)=>{
        this.events=[];        
        this.initClass=true;

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

  onPage(e:any){
    this.initClass=false;
    let pageInfo:PageModel = <PageModel> e;
    this.loadEvents(pageInfo.pageIndex, pageInfo.pageSize);
  }
}
