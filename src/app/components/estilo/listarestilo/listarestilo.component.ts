import { Component, OnInit, ViewChild } from '@angular/core';
import { Estilo } from '../../../models/Estilo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-listarestilo',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, RouterModule, MatButtonModule, MatToolbarModule],
  templateUrl: './listarestilo.component.html',
  styleUrl: './listarestilo.component.css'
})
export class ListarestiloComponent implements OnInit{
  dataSource: MatTableDataSource<Estilo> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'c3', 'c4', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private eT: Estilo){}

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
