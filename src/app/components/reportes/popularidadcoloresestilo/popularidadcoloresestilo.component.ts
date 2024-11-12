import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { EstiloService } from '../../../services/estilo.service';


Chart.register(...registerables);

@Component({
  selector: 'app-popularidadcoloresestilo',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './popularidadcoloresestilo.component.html',
  styleUrl: './popularidadcoloresestilo.component.css'
})
export class PopularidadcoloresestiloComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
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

  constructor(private estiloService: EstiloService) {}

  ngOnInit(): void {
    this.estiloService.popularidadFormasYColoresEstilo().subscribe((data) => {
      // Configuramos etiquetas del gráfico (nombres de las formas)
      this.barChartLabels = data.map((item) => item.nombreForma);

      // Configuración de los datos de la gráfica con colores personalizados
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadEstilo),
          label: 'Cantidad de Estilos',
          backgroundColor: data.map((item) => item.codigoColor), // Aplica el color especificado en cada ítem
          borderColor: '#ffffff',
          borderWidth: 1
        }
      ];
    });
  }
}
