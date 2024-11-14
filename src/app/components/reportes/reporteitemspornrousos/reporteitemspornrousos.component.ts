import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import {
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../../node_modules/chart.js/dist/types/index.d';
import { ItemusuarioService } from '../../../services/itemusuario.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-reporteitemspornrousos',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reporteitemspornrousos.component.html',
  styleUrl: './reporteitemspornrousos.component.css',
})
export class ReporteitemspornrousosComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#2C3E50',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} uso(s)`;
          },
        },
      },
    },
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  noDataMessage: string | null = null;
  colorsPalette: string[] = [
    '#2C3E50', // Azul Oscuro
    '#1ABC9C', // Turquesa Claro
    '#FF4081', // Magenta
    '#95A5A6', // Gris Medio
    '#3E95CD', // Azul Claro
    '#2ECC71', // Verde Claro
    '#F39C12', // Naranja Claro
    '#E74C3C', // Rojo Claro
  ];

  constructor(private euS: ItemusuarioService) {}

  ngOnInit(): void {
    this.euS.obtenerItemsPorNroUsos().subscribe((data) => {
      if (data.length === 0) {
        this.noDataMessage = 'NO HAY DATOS REGISTRADOS PARA ESTE REPORTE';
        return;
      }

      this.noDataMessage = null;

      this.barChartLabels = data.map((item) => item.nombreItem);
      const backgroundColors = data.map(
        (_, index) => this.colorsPalette[index % this.colorsPalette.length]
      );
      this.barChartData = [
        {
          data: data.map((item) => item.nrUsos),
          label: 'Número de Usos',
          backgroundColor: backgroundColors,
          borderColor: '#FFFFFF',
          borderWidth: 1,
        },
      ];
    });
  }
}
