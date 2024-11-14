import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType, } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { EstiloService } from '../../../services/estilo.service';
import { CommonModule } from '@angular/common';


Chart.register(...registerables,ChartDataLabels);

@Component({
  selector: 'app-cantidadestilosporusuario',
  standalone: true,
  imports: [BaseChartDirective,CommonModule],
  templateUrl: './cantidadestilosporusuario.component.html',
  styleUrl: './cantidadestilosporusuario.component.css'
})
export class CantidadestilosporusuarioComponent implements OnInit {
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
            return `${label}: ${value} estilos`;
          }
        }
      },
      datalabels: {
        color: '#FFFFFF', 
        font: {
          weight: 'bold',
        },
        formatter: (value) => {
          return `${value}`; 
        }
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  noDataMessage: string | null = null;
  constructor(private eS: EstiloService) {}
  ngOnInit(): void {
    this.eS.cantidadEstilosPorUsuario().subscribe((data) => {
      if (data.length === 0) {
        this.noDataMessage = 'NO HAY DATOS REGISTRADOS PARA ESTE REPORTE';
        return;
      }
      this.noDataMessage = null;

      this.barChartLabels = data.map((item) => item.nickname_usuario);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_estilos), 
          label: 'Cantidad de Estilos por Usuario',
          backgroundColor: ['#2C3E50', '#1ABC9C', '#FF4081'], 
          borderColor: '#FFFFFF', 
          borderWidth: 2,
        }
      ];
    });
  }
}
