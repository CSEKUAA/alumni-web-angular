import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-alumni-list',
  templateUrl: './alumni-list.component.html',
  styleUrl: './alumni-list.component.scss'
})
export class AlumniListComponent implements OnInit{
  title:string = 'Alumni | KUAA';
  
  constructor(private titleService:Title){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
