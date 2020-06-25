import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  private globalDatalUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-09-2020.csv'
  constructor( private http: HttpClient) {} 

  getGlobalData(){
    return this.http.get(this.globalDatalUrl , {responseType : 'text'}).pipe(
      map(result=>{
        //let data : GlobalDataSummary[]=[]
        let rows = result.split('\n')
        rows.splice(0,1)
        // console.log(rows)
        let raw={}              // contains all data of cases country wise
        rows.forEach(row=>{
          let cols=row.split(/,(?=\S)/)
          //  console.log(cols)
          let cs={
            
              country : cols[3],
              confirmed : +cols[7],
              deaths : +cols[8],
              recovered : +cols[9],
              active : +cols[10]
            
          }
          let tmp : GlobalDataSummary=raw[cs.country]
          if(tmp){
            tmp.active=cs.active+tmp.active
            tmp.confirmed=cs.confirmed+tmp.confirmed
            tmp.deaths=cs.deaths+tmp.deaths
            tmp.recovered=cs.recovered+tmp.recovered

            raw[cs.country]=tmp
          }
          else{
            raw[cs.country]=cs
          }
          // data.push()
        })
        console.log(raw)
       return <GlobalDataSummary[]>Object.values(raw)
      })
    )
  }
}
