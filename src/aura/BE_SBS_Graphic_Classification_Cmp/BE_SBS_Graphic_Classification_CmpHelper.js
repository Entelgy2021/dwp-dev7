({
    startGraph: function (component) {
        var action = component.get("c.getJSON");
        action.setParams({ recordId: component.get("v.recordId") });
        console.log(action + ' : ' + component.get("v.recordId"));
        var Nor = [];
        var CPP = [];
        var Def = [];
        var Dud = [];
        var Per = [];
        var meses = [];
        var SBS = [];
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.JsonReporte", response.getReturnValue());
                var Informe = component.get("v.JsonReporte");
                var device = $A.get("$Browser.formFactor");
                var startMonth = 0;
                if (Informe != null) {
                    for (var i = 0; i < Informe.length; i++) {
                        if(i>0 && Informe[i].length>6 && device!=='DESKTOP') {
							startMonth=6;
						}
                        for (var j = 0; j < Informe[i].length-startMonth; j++) {
                            switch (i) {
                                case 0:
                                    meses[j] = Informe[i][j+startMonth];
                                    break;
                                case 1:
                                    Nor[j] = Informe[i][j+startMonth];
                                    break;
                                case 2:
                                    CPP[j] = Informe[i][j+startMonth];
                                    break;
                                case 3:
                                    Def[j] = Informe[i][j+startMonth];
                                    break;
                                case 4:
                                    Dud[j] = Informe[i][j+startMonth];
                                    break;
                                case 5:
                                    Per[j] = Informe[i][j+startMonth];
                                    break;
                                case 7:
                                    SBS[j] = Informe[i][j+startMonth];
                                    break;
                            }
                        }
                    }
                    component.set("v.mesesLista", meses);
                    component.set("v.Nor", Nor);
                    component.set("v.CPP", CPP);
                    component.set("v.Def", Def);
                    component.set("v.Dud", Dud);
                    component.set("v.Per", Per);
                    component.set("v.SBS", SBS);
                    var barChartData = {
                        labels: component.get("v.mesesLista"),
                        datasets: [{
                            type: 'bar',
                            yAxisID: 'SBS',
                            data: component.get("v.Nor"),
                            backgroundColor: ['#004481', '#004481',
                                '#004481', '#004481',
                                '#004481', '#004481',
                                '#004481', '#004481',
                                '#004481', '#004481',
                                '#004481', '#004481'],
                            borderDash: [5, 5],
                            label: 'Nor (5)',
                            fill: true,
                            stack: 'stack 0',
                            borderWidth: 0
                        },
                        {
                            type: 'bar',
                            data: component.get("v.CPP"),
                            backgroundColor: ['#01A1DF',
                                '#01A1DF',
                                '#01A1DF',
                                '#01A1DF',
                                '#01A1DF',
                                '#01A1DF',
                                '#01A1DF', '#01A1DF',
                                '#01A1DF', '#01A1DF',
                                '#01A1DF', '#01A1DF'],
                            label: 'CPP (4)',
                            fill: true,
                            stack: 'stack 0',
                            borderWidth: 0
                        }, {
                            type: 'bar',
                            data: component.get("v.Def"),
                            backgroundColor: ['#75DFD9', '#75DFD9',
                                '#75DFD9', '#75DFD9',
                                '#75DFD9', '#75DFD9',
                                '#75DFD9', '#75DFD9',
                                '#75DFD9', '#75DFD9',
                                '#75DFD9', '#75DFD9'],
                            borderDash: [5, 5],
                            label: 'Def (3)',
                            fill: true,
                            stack: 'stack 0',
                            borderWidth: 0
                        },
                        {
                            type: 'bar',
                            data: component.get("v.Dud"),
                            backgroundColor: ['#06A69E', '#06A69E', '#06A69E', '#06A69E',
                                '#06A69E', '#06A69E', '#06A69E', '#06A69E',
                                '#06A69E', '#06A69E', '#06A69E', '#06A69E'],
                            borderDash: [5, 5],
                            label: 'Dud (2)',
                            fill: true,
                            stack: 'stack 0',
                            borderWidth: 0
                        },
                        {
                            type: 'bar',
                            data: component.get("v.Per"),
                            backgroundColor: ['#E2CE7E', '#E2CE7E', '#E2CE7E', '#E2CE7E',
                                '#E2CE7E', '#E2CE7E', '#E2CE7E', '#E2CE7E',
                                '#E2CE7E', '#E2CE7E', '#E2CE7E', '#E2CE7E'],
                            borderDash: [5, 5],
                            label: 'Per (1)',
                            fill: true,
                            stack: 'stack 0',
                            borderWidth: 0
                        }]
                    }
                    var ctx = document.getElementById("DWPChart").getContext('2d');
                    new Chart(ctx, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            elements: {
                                line: {
                                    tension: 0
                                }
                            },
                            scales: {
                                yAxes: [{
                                    id: 'SBS',
                                    display: true,
                                    position: 'left',
                                    ticks: {
                                        beginAtZero: true,
                                        min: 0,
                                        max: 100,
                                        stepSize: 20,
                                        callback: function (value) {
                                            return value + "%"
                                        }
                                    },
                                    stacked: true
                                }],
                                xAxes: [{
                                    stacked: true
                                }],
                            },
                            legend: {
                                display: true,
                                labels: {},
                                position: 'bottom',
                                stacked: true
                            }
                        }
                    });
                }
            }
        });
        $A.enqueueAction(action);
    }
})
