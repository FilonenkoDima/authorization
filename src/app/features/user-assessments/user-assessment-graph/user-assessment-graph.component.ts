import { UserAssessmentGraphModel } from '../../../core/shared/models/user-assessment-graph.model';

import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-user-assessment-graph',
  imports: [
    RouterLink,
    BaseChartDirective
  ],
  templateUrl: './user-assessment-graph.component.html',
  styleUrl: './user-assessment-graph.component.css'
})
export class UserAssessmentGraphComponent implements OnInit {
  graphData!: UserAssessmentGraphModel;
  chartData: any;
  chartType!: ChartType;
  chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.graphData = data.graph.data;
      this.chartType = data.graph.type;

      if (this.graphData) {
        this.initChart();
      }
    });
  }

  private initChart() {
    const labels: string[] = Object.keys(this.graphData);
    const values = Object.values(this.graphData);
    console.log(labels, values);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Assessment Data',
          data: values,
        }
      ]
    };
  }
}

