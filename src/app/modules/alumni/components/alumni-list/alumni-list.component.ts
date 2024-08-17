import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { AlumniService } from '../../../shared/services/alumni.service';
import { DisciplineDTO, UserProfileResponseDTO } from '../../../shared/models/api.response';
import { PagedAPIResponseDTO, PageinfoDTO, PageRequestDTO } from '../../../shared/models/paged.response';
import moment from 'moment';

@Component({
  selector: 'app-alumni-list',
  templateUrl: './alumni-list.component.html',
  styleUrl: './alumni-list.component.scss'
})
export class AlumniListComponent implements OnInit{
  title:string = 'Alumni | KUAA';
  displayedColumns: string[] = ['roll', 'fullName', 'discipline', 'phoneNumber'];
  dataSource = new MatTableDataSource<UserProfileResponseDTO>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  disciplines:DisciplineDTO[]=[];
  alumnis:UserProfileResponseDTO[]=[];  
  pageInfo!:PageinfoDTO;
  selectedDiscipline!: string;

  // Current Paging Info
  page:number=0;
  size:number=10;
  
  constructor(private titleService:Title, private alumniService:AlumniService){}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.alumniService.getAllDisciplines().subscribe({
      next:((resp:any)=>{
        this.disciplines = <DisciplineDTO[]> resp;
        this.selectedDiscipline=this.disciplines[0].shortName;
        this.loadAlumnis();
      })
    })
  }

  loadAlumnis(){
    let pageRequest:PageRequestDTO={page:this.page, size:this.size, disciplineName:this.selectedDiscipline};
    this.alumniService.getAllAlumnis(pageRequest).subscribe({
      next:((resp:PagedAPIResponseDTO)=>{
        this.alumnis=[];       
        let response:PagedAPIResponseDTO = <PagedAPIResponseDTO> resp; 
        this.alumnis = response.content;
        this.dataSource.data=this.alumnis;

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
