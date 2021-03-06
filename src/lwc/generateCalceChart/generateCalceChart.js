import { LightningElement, wire, api } from 'lwc';
import getCalceChart from '@salesforce/apex/BE_CalceChartController.getCalceChart';
import getReportId from '@salesforce/apex/BE_CalceChartController.getReportID';
import { NavigationMixin } from 'lightning/navigation';
export default class GenerateCalceChart extends NavigationMixin(LightningElement) {
    reportId;
    error;
    chartConfiguration;
    @api grandTotal
    @wire(getCalceChart)
    getCalceChart({ error, data }) {
        console.log(data,'dataaaaaaa')
        console.log(error,'errrrrror')
        if (error) {
            this.error = error;
            this.chartConfiguration = null;
        } else if (data) {
            let chartAmtData = [];
            let chartRevData = [];
            let chartRecData = [];
            let chartLabel = [];
            data.forEach(cal => {
                chartAmtData.push(cal.netDirect);
                chartRevData.push(cal.netIndirect);
                chartRecData.push(cal.netResource);
                chartLabel.push('Resumen Calce Neto');
            });
         this.grandTotal = chartAmtData[0] + chartRevData[0];
            this.chartConfiguration = {
                type: 'bar',
                data: {
                    datasets: [{
                            label: 'Directo',
                            data: chartAmtData,
                            barPercentage: 0.5,
                            barThickness: 6,
                            maxBarThickness: 8,
                            minBarLength: 2,
                           backgroundColor: "rgba(0, 110, 193)",
                        },
                        {
                            label: 'Indirecto',
                            data: chartRevData,
                            barPercentage: 0.5,
                            barThickness: 6,
                            maxBarThickness: 8,
                            minBarLength: 2,
                           backgroundColor: "rgba(82, 188, 236)",
                        },
                        {
                            label: 'Recursos',
                            data: chartRecData,
                            barPercentage: 0.5,
                            barThickness: 6,
                            maxBarThickness: 8,
                            minBarLength: 2,
                           backgroundColor: "rgba(181, 229, 249)",
                        },
                    ],
                    labels: chartLabel,
                },
                options: {
                    scales: {
                        indexAxis: 'x',
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                },
            };
            console.log('data => ', data);
            this.error = null;

            console.log('grandTotalllllll', this.grandTotal);
            this.error = null;
            console.log('IDDDDDDDDDDDDDDDD',this.reportId);
        }
    }

    @wire(getReportId,{reportName:'Reporte Neto Calce'})
    report({data,error}) {
      if(data) {
        this.reportId=data;
      }
      else if(error) {
      this.error=error;
      }
   }
    navigatetoReport(event) {
       this[NavigationMixin.Navigate]({
           type: 'standard__recordPage',
           attributes: {
             recordId: this.reportId,
             objectApiName: 'Report',
             actionName: 'view'
           }
     });
    }
}
