import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { EstiloUsuarioService } from '../../../services/estilousuario.service';
import { EstiloUsuarioConPCDTO } from '../../../models/EstiloUsuarioConPCDTO';


Chart.register(...registerables,ChartDataLabels);
@Component({
  selector: 'app-reporteestilosconpeorcalificacion',
  standalone: true,
  imports: [BaseChartDirective,CommonModule],
  templateUrl: './reporteestilosconpeorcalificacion.component.html',
  styleUrl: './reporteestilosconpeorcalificacion.component.css'
})
export class ReporteestilosconpeorcalificacionComponent implements OnInit {
  estilosUsuario: EstiloUsuarioConPCDTO[] = []; 
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }, 
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#2C3E50',
        font: { weight: 'bold', size: 12 },
        formatter: (value) => `${value}`
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Nombre Estilo', color: '#2C3E50' }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Calificación', color: '#2C3E50' }
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];

  constructor(private euS: EstiloUsuarioService) {}

  ngOnInit(): void {
    this.euS.listarEstiloDeUsuarioConPeorCalifiacion().subscribe((data) => {

      this.barChartLabels = data.map((item) => item.nickname_usuario);
      
      this.barChartLabels = data.map((item) => item.nombre_estilo);
      this.barChartData = [
        {
          data: data.map((item) => item.calificacion_estilo),
          label: 'Calificación Estilo',
          backgroundColor: '#1ABC9C',
          borderColor: '#1ABC9C',
          borderWidth: 1
        }
      ];
    });
  }

}
