import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { EstiloUsuarioService } from '../../../services/estilousuario.service';


Chart.register(...registerables);
@Component({
  selector: 'app-listarestilosuauriopeorcalifiacion',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './listarestilosuauriopeorcalifiacion.component.html',
  styleUrl: './listarestilosuauriopeorcalifiacion.component.css'
})
export class ListarestilosuauriopeorcalifiacionComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'doughnut';
  barChartType: ChartType = 'pie';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];

  constructor(private euS: EstiloUsuarioService) {}

  ngOnInit(): void {
    this.euS.listarEstiloDeUsuarioConPeorCalifiacion().subscribe((data) => {

      this.barChartLabels = data.map((item) => item.nombre_estilo);
      // Configuración de los datos de la gráfica, usando la cantidad de usuarios por país
      this.barChartData = [
        {
          data: data.map((item) => item.calificacion_estilo), // Calificación de cada estilo
          label: 'Calificación por Estilo',
          backgroundColor: ['#3e95cd', '#8cdf99', '#30f54f', '#ff6384', '#36a2eb'], // Colores para cada sección
          borderColor: '#ffffff',
          borderWidth: 2
        }
      ];
    });
  }

}
