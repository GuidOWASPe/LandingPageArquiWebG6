import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { ItemService } from '../../../services/item.service';
import { CommonModule } from '@angular/common';
Chart.register(...registerables,ChartDataLabels);
@Component({
  selector: 'app-itemmasusadoporusuario',
  standalone: true,
  imports: [BaseChartDirective,CommonModule],
  templateUrl: './itemmasusadoporusuario.component.html',
  styleUrl: './itemmasusadoporusuario.component.css'
})
export class ItemmasusadoporusuarioComponent {
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
            return `${label}: ${value} usos`; 
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
          text: 'Item',
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
          text: 'Número de Usos',
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
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  noDataMessage: string | null = null;

  constructor(private iS: ItemService) {}

  ngOnInit(): void {
    this.iS.itemMasUsadoPorUsuario().subscribe((data) => {
      if (data.length === 0) {
        this.noDataMessage = 'NO HAY DATOS REGISTRADOS PARA ESTE REPORTE';
        return;
      }
      this.noDataMessage = null;

      this.barChartLabels = data.map((item) => item.nombreItem);
      
      this.barChartData = [
        {
          data: data.map((item) => item.nroUsosItem),
          label: 'Items por Usuario',
          backgroundColor: data.map((_, index) => index % 2 === 0 ? '#1ABC9C' : '#3e95cd'), 
          borderColor: '#FFFFFF',
          borderWidth: 2
        }
      ];
    });
  }
}
