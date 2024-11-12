import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { EstiloUsuarioService } from '../../../services/estilousuario.service';
import { ItemusuarioService } from '../../../services/itemusuario.service';


Chart.register(...registerables);
@Component({
  selector: 'app-reporteitemspornrousos',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporteitemspornrousos.component.html',
  styleUrl: './reporteitemspornrousos.component.css'
})
export class ReporteitemspornrousosComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Usos'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Ítem'
        }
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'doughnut';
 // barChartType: ChartType = 'pie';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];

  constructor(private euS: ItemusuarioService) {}

  ngOnInit(): void {
    this.euS.obtenerItemsPorNroUsos().subscribe((data) => {

      this.barChartLabels = data.map((item) => item.nombreItem);

      this.barChartData = [
        {
          data: data.map((item) => item.nrUsos),
          label: 'Número de Usos',
          backgroundColor: '#3e95cd',
          borderColor: '#3e95cd',
          borderWidth: 1
        }
      ];
    });
  }
}
