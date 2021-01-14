import { Component, Input, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {

  @Input() title: string = 'Sin Título';

  @Input('labels') public doughnutChartLabels: Label[] = ['label1', 'label2', 'label3'];
  @Input('data') public doughnutChartData: MultiDataSet = [
    [250, 130, 70],
  ];

  public colors: Color[] = [
    { backgroundColor: [ '#6857e6', '#009FEE', '#F02059' ] }
  ];


}
