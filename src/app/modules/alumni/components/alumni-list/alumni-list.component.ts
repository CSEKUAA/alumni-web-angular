import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { AlumniService } from '../../../shared/services/alumni.service';
import { DisciplineDTO, UserProfileResponseDTO } from '../../../shared/models/api.response';
import { PagedAPIResponseDTO, PageinfoDTO, PageRequestDTO } from '../../../shared/models/paged.response';
import moment from 'moment';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { PublicService } from '../../../shared/services/public.service';
import { StoreService } from '../../../shared/services/store.service';
import { PageModel } from '../../../shared/models/ui.models';

@Component({
  selector: 'app-alumni-list',
  templateUrl: './alumni-list.component.html',
  styleUrl: './alumni-list.component.scss'
})
export class AlumniListComponent implements OnInit{
  title:string = 'Alumni | KUAA';
  displayedColumns: string[] = ['alumni', 'roll', 'fullName', 'discipline'];
  dataSource = new MatTableDataSource<UserProfileResponseDTO>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  _liveAnnouncer = inject(LiveAnnouncer);

  disciplines:DisciplineDTO[]=[];
  alumnis:UserProfileResponseDTO[]=[];  
  pageInfo!:PageinfoDTO;
  selectedDiscipline!: string;

  // Current Paging Info
  page:number=0;
  size:number=10;
  
  constructor(private titleService:Title, private alumniService:AlumniService, private publicService:PublicService, private store:StoreService){
    if(store.isLoggedIn()){
      this.displayedColumns.push('action');
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.publicService.getAllDisciplines().subscribe({
      next:((resp:any)=>{
        this.disciplines = <DisciplineDTO[]> resp;
        this.selectedDiscipline=this.disciplines[0].shortName;
        this.loadAlumnis();
      })
    })
  }

  loadAlumnis(page:number=0, size:number=10){
    let pageRequest:PageRequestDTO={page:page, size:size, disciplineName:this.selectedDiscipline};
    this.publicService.getAllAlumnis(pageRequest).subscribe({
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

  onPage(e:any){
    let pageInfo:PageModel = <PageModel> e;
    this.loadAlumnis(pageInfo.pageIndex, pageInfo.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
