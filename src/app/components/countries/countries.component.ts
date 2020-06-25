import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummary } from 'src/app/models/global-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data : GlobalDataSummary[]
  countries :string[]=[];

  totalConfirmed =0;
  totalActive =0;
  totalRecovered =0;
  totalDeaths =0;

  constructor(private service : DataServicesService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result=>{
      this.data=result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
      })
        
    })
  }
  updateValues(Country)
  {
    console.log(Country)
    this.data.forEach(cs=>{
      if(cs.country==Country)
      {
        this.totalActive=cs.active
        this.totalConfirmed=cs.confirmed
        this.totalDeaths=cs.deaths
        this.totalRecovered=cs.recovered
      }
    })
  }

}
