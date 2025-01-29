import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';

import {
  GraphDataModel,
  GraphModel,
} from '../../../core/models/graph-data.model';
import { chartOptions, legendsColor } from '../../../core/constants/graph.constants';


@Component({
  selector: 'app-graph',
  imports: [
    RouterLink,
    BaseChartDirective,
  ],
  templateUrl: './graph.component.html',
})
export class GraphComponent implements OnInit {
  protected readonly chartOptions = chartOptions;

  $graph = input.required<GraphModel>();

  graphData!: GraphDataModel;
  chartData!: ChartData;
  chartType!: ChartType;

  ngOnInit() {
    this.graphData = this.$graph().data;
    this.chartType = this.$graph().type as ChartType;

      this.initChart();
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
