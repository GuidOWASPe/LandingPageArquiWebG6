import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import {
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../../node_modules/chart.js/dist/types/index.d';
import { EstiloUsuarioService } from '../../../services/estilousuario.service';
import { ComentariosService } from '../../../services/comentarios.service';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-reportecantidadcomentariosnegativos',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reportecantidadcomentariosnegativos.component.html',
  styleUrl: './reportecantidadcomentariosnegativos.component.css',
})
export class ReportecantidadcomentariosnegativosComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
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
          label: (context) => `Frecuencia: ${context.raw}`,
        },
      },
    },
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  noDataMessage: string | null = null;

  constructor(private cS: ComentariosService) {}

  ngOnInit(): void {
    this.cS.obtenerComentariosNegativosFrecuentes().subscribe((data) => {
      if (data.length === 0) {
        this.noDataMessage = 'NO HAY DATOS REGISTRADOS PARA ESTE REPORTE';
        return;
      }

      this.noDataMessage = null;

      this.barChartLabels = data.map((item) => item.contenido);
      this.barChartData = [
        {
          data: data.map((item) => item.frecuencia),
          label: 'Frecuencia de Contenidos Negativos',
          backgroundColor: [
            '#2C3E50',
            '#1ABC9C',
            '#FF4081',
            '#95A5A6',
            '#3E95CD',
          ], // Colores para cada sección
          borderColor: '#FFFFFF',
          borderWidth: 2,
        },
      ];
    });
  }
}
