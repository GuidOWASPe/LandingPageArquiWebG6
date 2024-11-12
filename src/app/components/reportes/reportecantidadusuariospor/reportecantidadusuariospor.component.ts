import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { UsuariosService } from '../../../services/usuarios.service';

Chart.register(...registerables);

@Component({
  selector: 'app-reportecantidadusuariospor',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportecantidadusuariospor.component.html',
  styleUrl: './reportecantidadusuariospor.component.css'
})
export class ReportecantidadusuariosporComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.uS.cantidadUsuariosPorGeneroSegunRangoEdad().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.rangoEdad);
      this.barChartData = [
        {
          data: this.barChartLabels.map((edad) => 
            data.find((item) => item.rangoEdad === edad && item.genero === 'Masculino')?.cantidadUsuario || 0),
          label: 'Masculino',
          backgroundColor: '#22712e',
          borderColor: '#22712e',
          borderWidth: 1
        },
        {
          data: this.barChartLabels.map((edad) => 
            data.find((item) => item.rangoEdad === edad && item.genero === 'Femenino')?.cantidadUsuario || 0),
          label: 'Femenino',
          backgroundColor: '#8cdf99',
          borderColor: '#8cdf99',
          borderWidth: 1
        },
        {
          data: this.barChartLabels.map((edad) => 
            data.find((item) => item.rangoEdad === edad && item.genero === 'Otro')?.cantidadUsuario || 0),
          label: 'Otro',
          backgroundColor: '#30f54f',
          borderColor: '#30f54f',
          borderWidth: 1
        },
      ];
    });
  } 

}
