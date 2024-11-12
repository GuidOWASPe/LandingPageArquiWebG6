import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { UsuariosService } from '../../../services/usuarios.service';

Chart.register(...registerables);
@Component({
  selector: 'app-porcentajeusuariospormes',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './porcentajeusuariospormes.component.html',
  styleUrl: './porcentajeusuariospormes.component.css'
})
export class PorcentajeusuariospormesComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.uS.porcentajeUsuariosRegistradosPorMes().subscribe((data) => {
      this.barChartLabels = data.map((item) => new Date(item.mesregistro).toLocaleDateString('es-ES', { month: 'long', year: 'numeric'} ));

      // Configuración de datos para usuarios registrados y porcentaje
      this.barChartData = [
    
        {
          data: data.map((item) => item.porcentaje),
          label: 'Porcentaje de usuarios registrados por mes (%)',
          backgroundColor: '#8cdf99',
          borderColor: '#8cdf99',
          borderWidth: 1
        }
      ];
    });
  }
}
