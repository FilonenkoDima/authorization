import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-user-assessment-graph',
  imports: [
    JsonPipe,
    RouterLink
  ],
  templateUrl: './user-assessment-graph.component.html',
  styleUrl: './user-assessment-graph.component.css'
})
export class UserAssessmentGraphComponent  {
  graphData: any;
  chart: any;


  constructor(private route: ActivatedRoute) {
    // Отримання даних з Resolver через ActivatedRoute
    this.route.data.subscribe((data: any) => {
      this.graphData = data['graph']; // 'graph' відповідає ключу, вказаному в routes

      // Перевірка наявності даних
      // if (this.graphData && this.graphData.data) {
        this.initializeChart();
        // console.log('init')
      // }
    });
  }

  initializeChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }


}
