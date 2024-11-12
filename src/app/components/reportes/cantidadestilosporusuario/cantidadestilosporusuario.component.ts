import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { EstiloService } from '../../../services/estilo.service';


Chart.register(...registerables,ChartDataLabels);

@Component({
  selector: 'app-cantidadestilosporusuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidadestilosporusuario.component.html',
  styleUrl: './cantidadestilosporusuario.component.css'
})
export class CantidadestilosporusuarioComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false 
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
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
          text: 'Usuario',
          color: '#2C3E50'
        },
        ticks: {
          color: '#2C3E50'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Estilos',
          color: '#2C3E50'
        },
        ticks: {
          color: '#2C3E50'
        }
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];

  constructor(private eS: EstiloService) {}

  ngOnInit(): void {
    this.eS.cantidadEstilosPorUsuario().subscribe((data) => {

      this.barChartLabels = data.map((item) => item.nickname_usuario);
      
     
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_estilos),
          label: 'Estilos por Usuario',
          backgroundColor: '#1ABC9C',
          borderColor: '#1ABC9C',
          borderWidth: 1
        }
      ];
    });
  }
}
