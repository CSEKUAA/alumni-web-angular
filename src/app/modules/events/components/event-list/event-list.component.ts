import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit{
  title:string = 'Events | KUAA';
  
  constructor(private titleService:Title){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
