import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import {
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../../node_modules/chart.js/dist/types/index.d';
import { RostroService } from '../../../services/rostro.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-reporterostrosegunforma',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reporterostrosegunforma.component.html',
  styleUrl: './reporterostrosegunforma.component.css',
})
export class ReporterostrosegunformaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Rostros',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Forma del Rostro',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];
  noDataMessage: string | null = null;
  constructor(private rS: RostroService) {}

  ngOnInit(): void {
    this.rS.obtenerCantidadRostroForma().subscribe((data) => {
      const hasValidData = data.some((item) => item.cantidadRostro > 0);
      if (!hasValidData) {
        this.noDataMessage = 'NO HAY DATOS REGISTRADOS PARA ESTE REPORTE';
        return;
      }
      this.noDataMessage = null;
      this.barChartLabels = data.map((item) => item.nombreForma);

      this.barChartData = [
        {
          data: data.map((item) => item.cantidadRostro),
          label: 'Cantidad de Rostros',
          backgroundColor: 'rgba(62, 149, 205, 0.3)',
          borderColor: '#3e95cd',
          pointBackgroundColor: '#FF4081',
          pointBorderColor: '#FFFFFF',
          pointRadius: 5,
          fill: true,
          tension: 0.3,
        },
      ];
    });
  }
}
