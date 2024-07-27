import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit{
  title:string = 'About | KUAA';
  
  constructor(private titleService:Title){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
