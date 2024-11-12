import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { EstiloService } from '../../../services/estilo.service';


Chart.register(...registerables);

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
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Usuarios'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Estilo'
        }
      }
    }
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'doughnut';
  barChartType: ChartType = 'pie';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];

  constructor(private eS: EstiloService) {}

  ngOnInit(): void {
    this.eS.cantidadEstilosPorUsuario().subscribe((data) => {

      this.barChartLabels = data.map((item) => item.nickname_usuario);
      
      // Configuración de los datos de la gráfica, usando la cantidad de usuarios por país
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_estilos),
          label: 'Usuarios por Estilo',
          backgroundColor: '#3e95cd',
          borderColor: '#3e95cd',
          borderWidth: 1
        }
      ];
    });
  }
}
