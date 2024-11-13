import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { EstiloService } from '../../../services/estilo.service';
import { CommonModule } from '@angular/common';


Chart.register(...registerables);

@Component({
  selector: 'app-popularidadcoloresestilo',
  standalone: true,
  imports: [BaseChartDirective,CommonModule],
  templateUrl: './popularidadcoloresestilo.component.html',
  styleUrl: './popularidadcoloresestilo.component.css'
})
export class PopularidadcoloresestiloComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            
            const backgroundColor = context.dataset.backgroundColor as string[] | undefined;
            const color = Array.isArray(backgroundColor) ? backgroundColor[context.dataIndex] : '#000000';
      
            return `${label} - ${color}: ${value} estilo(s)`;
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
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Estilos'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Forma'
        }
      }
    }
  };


  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];
  noDataMessage: string | null = null;

  constructor(private estiloService: EstiloService) {}

  ngOnInit(): void {
    this.estiloService.popularidadFormasYColoresEstilo().subscribe((data) => {
      if (data.length === 0) {
        this.noDataMessage = 'NO HAY DATOS REGISTRADOS PARA ESTE REPORTE';
        return;
      }
      
      this.noDataMessage = null;
      this.barChartLabels = data.map((item) => item.nombreForma);
      const backgroundColors = data.map((item) => item.codigoColor);
      
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadEstilo),
          label: 'Cantidad de Estilos',
          backgroundColor: backgroundColors,
          borderColor: '#FFFFFF', // Bordes en blanco para mejor contraste
          borderWidth: 1
        }
      ];
    });
  }
}
