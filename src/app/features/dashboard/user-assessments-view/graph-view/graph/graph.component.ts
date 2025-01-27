import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';

import {
  UserAssessmentGraphDataModel,
  UserAssessmentGraphModel,
} from '../../../../../core/models/user-assessment-graph-data.model';

const legendsColor = ['rgba(255, 87, 51, 0.75)', 'rgb(51, 255, 87, 0.75)', 'rgb(51, 87, 255, 0.75)', 'rgb(255, 51, 168, 0.75)'];

@Component({
  selector: 'app-graph',
  imports: [
    RouterLink,
    BaseChartDirective,
  ],
  templateUrl: './graph.component.html',
})
export class GraphComponent implements OnInit {
  graph = input.required<UserAssessmentGraphModel>();

  graphData!: UserAssessmentGraphDataModel;
  chartData!: ChartData;
  chartType!: ChartType;
  chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(0, 0, 0, 0.7)'
        }
      }
    }
  };

  ngOnInit() {
    const resolvedData = this.graph();
    this.graphData = resolvedData.data;
    this.chartType = resolvedData.type as ChartType;

    if (this.graphData) {
      this.initChart();
    }
  }

  private initChart() {
    const labels: string[] = Object.keys(this.graphData);
    const values = Object.values(this.graphData);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Assessment Data',
          data: values,
          backgroundColor: legendsColor,
        },
      ]
    };
  }
}
