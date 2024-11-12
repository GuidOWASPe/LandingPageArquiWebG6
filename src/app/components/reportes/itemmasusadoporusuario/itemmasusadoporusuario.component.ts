import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { ItemService } from '../../../services/item.service';
Chart.register(...registerables);
@Component({
  selector: 'app-itemmasusadoporusuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './itemmasusadoporusuario.component.html',
  styleUrl: './itemmasusadoporusuario.component.css'
})
export class ItemmasusadoporusuarioComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Numero de usos '
        }
      },
      x: {
        title: {
          display: true,
          text: 'Item'
        }
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'doughnut';
 // barChartType: ChartType = 'pie';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];

  constructor(private iS: ItemService) {}

  ngOnInit(): void {
    this.iS.itemMasUsadoPorUsuario().subscribe((data) => {

      this.barChartLabels = data.map((item) => item.nombreItem);
      
      // Configuración de los datos de la gráfica, usando la cantidad de usuarios por país
      this.barChartData = [
        {
          data: data.map((item) => item.nroUsosItem),
          label: 'Usuarios por País',
          backgroundColor: '#3e95cd',
          borderColor: '#3e95cd',
          borderWidth: 1
        }
      ];
    });
  }
}
