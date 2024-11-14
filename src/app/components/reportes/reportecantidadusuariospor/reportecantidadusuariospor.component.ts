import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import {
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../../node_modules/chart.js/dist/types/index.d';
import { UsuariosService } from '../../../services/usuarios.service';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-reportecantidadusuariospor',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reportecantidadusuariospor.component.html',
  styleUrl: './reportecantidadusuariospor.component.css',
})
export class ReportecantidadusuariosporComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,

    scales: {
      x: {
        title: {
          display: true,
          text: 'Rango de Edad',
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
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#2C3E50',
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
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  noDataMessage: string | null = null;

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.uS.cantidadUsuariosPorGeneroSegunRangoEdad().subscribe((data) => {
      if (data.length === 0) {
        this.noDataMessage = 'NO HAY DATOS REGISTRADOS PARA ESTE REPORTE';
        return;
      }
      this.noDataMessage = null;
      this.barChartLabels = [...new Set(data.map((item) => item.rangoEdad))];
      this.barChartData = [
        {
          data: this.barChartLabels.map(
            (edad) =>
              data.find(
                (item) => item.rangoEdad === edad && item.genero === 'Masculino'
              )?.cantidadUsuario || 0
          ),
          label: 'Masculino',
          backgroundColor: '#2C3E50',
          borderColor: '#95A5A6',
          borderWidth: 1,
        },
        {
          data: this.barChartLabels.map(
            (edad) =>
              data.find(
                (item) => item.rangoEdad === edad && item.genero === 'Femenino'
              )?.cantidadUsuario || 0
          ),
          label: 'Femenino',
          backgroundColor: '#1ABC9C',
          borderColor: '#95A5A6',
          borderWidth: 1,
        },
        {
          data: this.barChartLabels.map(
            (edad) =>
              data.find(
                (item) => item.rangoEdad === edad && item.genero === 'Otro'
              )?.cantidadUsuario || 0
          ),
          label: 'Otro',
          backgroundColor: '#FF4081',
          borderColor: '#95A5A6',
          borderWidth: 1,
        },
      ];
    });
  }
}
