import { Component } from '@angular/core';
import { CantidadestilosporusuarioComponent } from "../reportes/cantidadestilosporusuario/cantidadestilosporusuario.component";
import { CantidadusuariosporpaisesComponent } from "../reportes/cantidadusuariosporpaises/cantidadusuariosporpaises.component";
import { PopularidadcoloresestiloComponent } from "../reportes/popularidadcoloresestilo/popularidadcoloresestilo.component";
import { ReportecantidadusuariosporComponent } from "../reportes/reportecantidadusuariospor/reportecantidadusuariospor.component";
import { PorcentajeusuariospormesComponent } from "../reportes/porcentajeusuariospormes/porcentajeusuariospormes.component";
import { PorcentajeusuariosporgeneroComponent } from "../reportes/porcentajeusuariosporgenero/porcentajeusuariosporgenero.component";
import { ItemmasusadoporusuarioComponent } from "../reportes/itemmasusadoporusuario/itemmasusadoporusuario.component";
import { ReporteestilosconpeorcalificacionComponent } from "../reportes/reporteestilosconpeorcalificacion/reporteestilosconpeorcalificacion.component";
import { ReporterostrosegunformaComponent } from "../reportes/reporterostrosegunforma/reporterostrosegunforma.component";
import { ReporteitemspornrousosComponent } from "../reportes/reporteitemspornrousos/reporteitemspornrousos.component";
import { ReportecantidadcomentariosnegativosComponent } from "../reportes/reportecantidadcomentariosnegativos/reportecantidadcomentariosnegativos.component";

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    CantidadestilosporusuarioComponent, 
    CantidadusuariosporpaisesComponent, 
    PopularidadcoloresestiloComponent,
    ReportecantidadusuariosporComponent,
    PorcentajeusuariospormesComponent, 
    PorcentajeusuariosporgeneroComponent,
    ItemmasusadoporusuarioComponent, 
    ReporteestilosconpeorcalificacionComponent, 
    ReporterostrosegunformaComponent, 
    ReporteitemspornrousosComponent, 
    ReportecantidadcomentariosnegativosComponent
  ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {

}
