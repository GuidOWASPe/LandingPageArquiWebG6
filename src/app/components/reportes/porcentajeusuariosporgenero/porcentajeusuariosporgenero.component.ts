import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { UsuariosService } from '../../../services/usuarios.service';

Chart.register(...registerables);

@Component({
  selector: 'app-porcentajeusuariosporgenero',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './porcentajeusuariosporgenero.component.html',
  styleUrl: './porcentajeusuariosporgenero.component.css'
})
export class PorcentajeusuariosporgeneroComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Porcentaje (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Mes'
        }
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.uS.porcentajeUsuariosPorGenero().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.genero);

      // Configuración de los datos de la gráfica para cantidad de usuarios y porcentaje
      this.barChartData = [
       
        {
          data: data.map((item) => item.porcentaje),
          label: 'Porcentaje de Usuarios Registrados por Genero(%)',
          backgroundColor: '#8cdf99',
          borderColor: '#8cdf99',
          borderWidth: 1,
          type: 'line' // Opcional: Esto convertirá la serie de porcentaje en una línea superpuesta
        }
      ];
    });
  }
}
