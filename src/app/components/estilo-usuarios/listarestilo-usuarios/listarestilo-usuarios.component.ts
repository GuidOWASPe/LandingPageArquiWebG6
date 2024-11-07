import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EstiloUsuario } from '../../../models/EstiloUsuario';
import { EstiloUsuarioService } from '../../../services/estilousuario.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-listarestilo-usuarios',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule,RouterModule],
  templateUrl: './listarestilo-usuarios.component.html',
  styleUrl: './listarestilo-usuarios.component.css'
})
export class ListarestiloUsuariosComponent implements OnInit{
  dataSource: MatTableDataSource<EstiloUsuario> = new MatTableDataSource();
  displayedColumns: string[]=['c1','c2','c3','c4','c5','actions'];
  constructor(private euS: EstiloUsuarioService){}

  ngOnInit(): void {
    this.euS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
    this.euS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  };
  eliminar(id: number) {
    this.euS.delete(id).subscribe(data=> {
      this.euS.list().subscribe((data) => {
        this.euS.setList(data);
      });
    });
  }
}
