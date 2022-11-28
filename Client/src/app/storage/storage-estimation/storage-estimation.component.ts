import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { StorageQuota } from '../storage-quota.model';

type NullableStorageQuota = StorageQuota | null;

@Component({
  selector: 'app-storage-estimation',
  templateUrl: './storage-estimation.component.html',
  styleUrls: ['./storage-estimation.component.css']
})
export class StorageEstimationComponent implements OnInit {

  @Input() estimation: NullableStorageQuota = null;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Used', 'Remaining'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';

  constructor() { }

  ngOnInit(): void {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.estimation) {
      this.pieChartData = [this.estimation.used, this.estimation.remaining];
    }
  }
}
