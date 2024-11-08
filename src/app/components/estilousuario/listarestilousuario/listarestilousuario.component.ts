import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EstiloUsuario } from '../../../models/EstiloUsuario';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EstiloUsuarioService } from '../../../services/estilousuario.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-listarestilousuario',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule, 
    MatPaginatorModule, 
    RouterModule, 
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './listarestilousuario.component.html',
  styleUrl: './listarestilousuario.component.css'
})
export class ListarestilousuarioComponent implements OnInit {
  dataSource: MatTableDataSource<EstiloUsuario> = new MatTableDataSource();
  displayedColumns: string[]=[
    'c1', 
    'c2',
    'c3',
    'c4',
    'c5',
    'accion01', 
    'accion02'
  ];

    @ViewChild(MatPaginator) paginator !: MatPaginator; 

  constructor(private euS: EstiloUsuarioService){}

  AfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.euS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.euS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  };
  
  eliminar(id: number): void {
    this.euS.delete(id).subscribe(data=> {
      this.euS.list().subscribe((data) => {
        this.euS.setList(data);
      });
    });
  }


}
