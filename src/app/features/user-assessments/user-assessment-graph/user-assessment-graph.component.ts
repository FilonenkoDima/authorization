import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  UserAssessmentGraphDataModel,
  UserAssessmentGraphModel
} from '../../../core/shared/models/user-assessment-graph-data.model';

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

  graphData!: UserAssessmentGraphDataModel;
  chartData!: ChartData;
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
    this.route.data.pipe(takeUntilDestroyed()).subscribe((data) => {
      const resolvedData = data as { graph: UserAssessmentGraphModel };
      this.graphData = resolvedData.graph.data;
      this.chartType = resolvedData.graph.type as ChartType;

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
        },

      ]
    };
  }
}

