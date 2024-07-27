import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.scss'
})
export class DonationListComponent implements OnInit{
  title:string = 'Donation | KUAA';
  
  constructor(private titleService:Title){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
