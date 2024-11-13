import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import {
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../../node_modules/chart.js/dist/types/index.d';
import { EstiloUsuarioService } from '../../../services/estilousuario.service';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-reporteestilosconpeorcalificacion',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reporteestilosconpeorcalificacion.component.html',
  styleUrl: './reporteestilosconpeorcalificacion.component.css',
})
export class ReporteestilosconpeorcalificacionComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';

  barChartData: ChartDataset[] = [];

  noDataMessage: string | null = null;

  constructor(private euS: EstiloUsuarioService) {}

  ngOnInit(): void {
    this.euS.obtenerEstiloDeUsuarioConPeorCalifiacion().subscribe((data) => {
      if (data.length === 0) {
        this.noDataMessage = 'NO HAY DATOS REGISTRADOS PARA ESTE REPORTE';
        return;
      }

      this.noDataMessage = null;

      this.barChartLabels = [
        ...new Set(data.map((item) => item.nombre_estilo)),
      ];
      this.barChartData = [
        {
          data: data.map((item) => item.calificacion_estilo),
          label: 'Calificación de Estilos',
          backgroundColor: ['#1ABC9C', '#FF4081', '#3498DB', '#9B59B6'],
          borderColor: '#FFFFFF',
          borderWidth: 2,
        },
      ];
    });
  }
}
