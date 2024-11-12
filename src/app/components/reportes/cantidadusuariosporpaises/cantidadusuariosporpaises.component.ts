import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { UsuariosService } from '../../../services/usuarios.service';

Chart.register(...registerables,ChartDataLabels);

@Component({
  selector: 'app-cantidadusuariosporpaises',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidadusuariosporpaises.component.html',
  styleUrl: './cantidadusuariosporpaises.component.css'
})
export class CantidadusuariosporpaisesComponent implements OnInit{
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
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} usuarios`;
          }
        }
      },
      datalabels: {
        anchor: 'end', 
        align: 'end', 
        offset: -10, 
        color: '#2C3E50', 
        font: {
          weight: 'bold',
          size: 12
        },
        formatter: (value) => `${value}` 
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'País',
          color: '#2C3E50'
        },
        ticks: {
          color: '#2C3E50'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad de Usuarios',
          color: '#2C3E50'
        },
        ticks: {
          color: '#2C3E50'
        },
        beginAtZero: true
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';

  barChartLegend = false;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.uS.cantidadUsuariosPorPaises().subscribe((data) => {

      this.barChartLabels = data.map((item) => item.paisUsuario);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Usuarios por País',
          backgroundColor: data.map((_, index) => index % 2 === 0 ? '#1ABC9C' : '#3e95cd'),
          borderColor: '#FFFFFF',
          borderWidth: 2
        }
      ];
    });
  }

}
