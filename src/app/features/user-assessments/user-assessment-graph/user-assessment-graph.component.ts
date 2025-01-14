import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UserAssessmentGraphModel } from '../../../core/shared/models/user-assessment-graph.model';

@Component({
  selector: 'app-user-assessment-graph',
  imports: [
    RouterLink,
    BaseChartDirective
  ],
  templateUrl: './user-assessment-graph.component.html',
})
export class UserAssessmentGraphComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);

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

  constructor() {
    this.route.data.pipe(takeUntilDestroyed()).subscribe((data: any) => {
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

