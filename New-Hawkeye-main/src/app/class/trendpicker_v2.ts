import { Common } from "./common"
import { concat } from 'rxjs';

interface SeriesVariable {
    name: string;
    type: string;
    showSymbol: boolean;
    hoverAnimation: boolean;
    data: any[];
    smooth: boolean;
    yAxisIndex: number;


}
export class TrendV2{
 
      
      
     
      

    trendName:any []
    data:any[];
    axisVariable:any[]
   // authGaurdKeyWord:any


    series:any

    theme:any = Common.getTheme();




    constructor(TrendName:any[], DATA:any[],AxisVariable:any[]){
        this.trendName = TrendName;
        this.data= DATA;
        this.axisVariable = AxisVariable;

    }
    returnSeriesVariable:any = [];
    public getSeries(){
        for(let i = 0; i < this.trendName.length; i++){

           const seriesVariable:SeriesVariable= {
                name:this.trendName[i],
                type: 'line',
                showSymbol:false ,
                hoverAnimation: true,
                data: this.data[i],
                smooth: true,
                yAxisIndex: this.axisVariable[i],
            }

            this.returnSeriesVariable.push(seriesVariable);
        
        }

        return this.returnSeriesVariable;
    }




    MinMaxAvg(m:any, siteArray:any[]){
        var maxValues=[]
          var minValues=[]
          var avgValues=[]
            var avg: any = 0
      maxValues[m] = siteArray[0][1]
      minValues[m] = siteArray[0][1]
      avgValues[m] = siteArray[0][1]

      for (let i = 0; i < siteArray.length; i++) {

      if (maxValues[m]<siteArray[i][1]) {
      maxValues[m] = siteArray[i][1]
      }
      if (minValues[m]>siteArray[i][1]) {
      minValues[m] = siteArray[i][1]
      }

      avg  = siteArray[i][1] + avg
      }
      avg = (avg/siteArray.length).toFixed(2)
      avgValues[m]=avg

      var arr =[minValues[m],maxValues[m],avg]
      return arr
   }
}