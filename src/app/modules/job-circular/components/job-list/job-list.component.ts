import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit{
  title:string = 'Jobs | KUAA';
  
  constructor(private titleService:Title){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
