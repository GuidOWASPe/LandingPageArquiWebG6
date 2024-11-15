import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';
import {
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../../node_modules/chart.js/dist/types/index.d';
import { UsuariosService } from '../../../services/usuarios.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-cantidadusuariosporpaises',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './cantidadusuariosporpaises.component.html',
  styleUrl: './cantidadusuariosporpaises.component.css',
})
export class CantidadusuariosporpaisesComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
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
            return `${label}: ${value} usuarios`;
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        offset: -10,
        color: '#2C3E50',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value) => `${value}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'País',
          color: '#2C3E50',
        },
        ticks: {
          color: '#2C3E50',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad de Usuarios',
          color: '#2C3E50',
        },
        ticks: {
          color: '#2C3E50',
        },
        beginAtZero: true,
      },
    },
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];
  noDataMessage: string | null = null;
  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.uS.cantidadUsuariosPorPaises().subscribe((data) => {
      if (data.length === 0) {
        this.noDataMessage = 'NO HAY DATOS REGISTRADOS PARA ESTE REPORTE';
        return;
      }
      this.noDataMessage = null;
      this.barChartLabels = data.map((item) => item.paisUsuario);
      const colors = data.map(() => this.getSimilarColor());
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Usuarios por País',
          backgroundColor: colors,
          borderColor: '#FFFFFF',
          borderWidth: 2,
        },
      ];
    });
  }
  getSimilarColor(): string {
    const baseColors = ['#2C3E50', '#1ABC9C', '#FF4081', '#95A5A6'];
    const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
    return this.adjustColorBrightness(
      baseColor,
      Math.floor(Math.random() * 30) - 15
    );
  }
  adjustColorBrightness(hex: string, percent: number): string {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + percent));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
    const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
}
