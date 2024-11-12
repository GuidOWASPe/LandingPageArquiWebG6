import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { RostroService } from '../../../services/rostro.service';



Chart.register(...registerables);

@Component({
  selector: 'app-reporterostrosegunforma',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporterostrosegunforma.component.html',
  styleUrl: './reporterostrosegunforma.component.css'
})
export class ReporterostrosegunformaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Rostros'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Forma del Rostro'
        }
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'pie';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];

  constructor(private rS: RostroService) {}

  ngOnInit(): void {
    this.rS.obtenerCantidadRostroForma().subscribe((data) => {

      this.barChartLabels = data.map((item) => item.nombreForma);

     
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadRostro),
          label: 'Cantidad de Rostros',
          backgroundColor: '#3e95cd',
          borderColor: '#3e95cd',
          borderWidth: 1
        }
      ];
    });
  }
}
