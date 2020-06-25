import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummary } from 'src/app/models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed =0;
  totalActive =0;
  totalRecovered =0;
  totalDeaths =0;
  gobaldata : GlobalDataSummary[]
  constructor(private dataservice : DataServicesService) { }

  ngOnInit(): void {
    this.dataservice.getGlobalData()
    .subscribe(
      {
        next : (result)=>{
          console.log(result);
          this.gobaldata=result
          // console.log(this.gobaldata)
          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed))
            {
              this.totalConfirmed+=cs.confirmed
              this.totalActive+=cs.active
              this.totalRecovered+=cs.recovered
              this.totalDeaths+=cs.deaths
            }
          })
            console.log(this.totalConfirmed)
            console.log(this.totalRecovered)
          }
     
      }
    )
  }

}
