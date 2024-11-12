import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { UsuariosService } from '../../../services/usuarios.service';

Chart.register(...registerables);

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
          text: 'País'
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

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.uS.cantidadUsuariosPorPaises().subscribe((data) => {

      this.barChartLabels = data.map((item) => item.paisUsuario);
      
      // Configuración de los datos de la gráfica, usando la cantidad de usuarios por país
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Usuarios por País',
          backgroundColor: '#3e95cd',
          borderColor: '#3e95cd',
          borderWidth: 1
        }
      ];
    });
  }

}
