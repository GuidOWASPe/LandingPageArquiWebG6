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
        position: 'bottom', 
        labels: {
          color: '#2C3E50', 
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `Porcentaje: ${context.raw}%`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mes',
          color: '#2C3E50' 
        },
        ticks: {
          color: '#2C3E50' 
        }
      },
      y: {
        title: {
          display: true,
          text: 'Porcentaje (%)',
          color: '#2C3E50' 
        },
        ticks: {
          color: '#2C3E50',
          callback: function(value) {
            return value + '%'; 
          }
        },
        beginAtZero: true
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.uS.porcentajeUsuariosRegistradosPorMes().subscribe((data) => {
      this.barChartLabels = data.map((item) => new Date(item.mesregistro).toLocaleDateString('es-ES', { month: 'long', year: 'numeric'} ));
      this.barChartData = [
        {
          data: data.map((item) => item.porcentaje),
          label: 'Porcentaje de usuarios registrados por mes (%)',
          backgroundColor: 'rgba(26, 188, 156, 0.3)', 
          borderColor: '#1ABC9C', 
          pointBackgroundColor: '#FF4081', 
          pointBorderColor: '#FF4081',
          pointRadius: 5, 
          fill: true,
          tension: 0.3,
          borderWidth: 2
        }
      ];
    });
  }
}
