import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Estilo } from '../../../models/Estilo';
import { EstiloService } from '../../../services/estilo.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-listarestilo',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,RouterModule, MatPaginatorModule, MatToolbarModule],
  templateUrl: './listarestilos.component.html',
  styleUrl: './listarestilos.component.css'
})
export class ListarestiloComponent implements OnInit{
  dataSource: MatTableDataSource<Estilo> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'c3', 'c4', 'c5', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private eT: EstiloService){}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.eT.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.eT.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.eT.delete(id).subscribe((data) => {
      this.eT.list().subscribe((data) => {
        this.eT.setList(data);
      });
    });
  }
}