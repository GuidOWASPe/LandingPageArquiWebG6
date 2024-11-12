import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { ComentariosService } from '../../../services/comentarios.service';


Chart.register(...registerables);

@Component({
  selector: 'app-reportecantidadcomentariosnegativos',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportecantidadcomentariosnegativos.component.html',
  styleUrl: './reportecantidadcomentariosnegativos.component.css'
})
export class ReportecantidadcomentariosnegativosComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frecuencia'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Comentario'
        },
        ticks: {
          callback: function(value) {
            return (value as string).substring(0, 10) + '...'; 
          }
        }
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'pie';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];

  constructor(private cS: ComentariosService) {}

  ngOnInit(): void {
    this.cS.obtenerComentariosNegativosFrecuentes().subscribe((data) => {

      this.barChartLabels = data.map((item) => item.contenido);
      
      this.barChartData = [
        {
          data: data.map((item) => item.frecuencia),
          label: 'Frecuencia de Comentarios',
          backgroundColor: '#ff6384',
          borderColor: '#ff6384',
          borderWidth: 1
        }
      ];
    });
  }

}
