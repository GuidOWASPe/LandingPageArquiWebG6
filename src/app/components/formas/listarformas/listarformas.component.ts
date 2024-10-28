import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Forma } from '../../../models/Forma';
import { FormasService } from '../../../services/formas.service';
import { MatIconModule } from '@angular/material/icon'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-listarformas',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, RouterModule, MatButtonModule, MatToolbarModule],
  templateUrl: './listarformas.component.html',
  styleUrl: './listarformas.component.css'
})
export class ListarformasComponent implements OnInit{
  dataSource: MatTableDataSource<Forma> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'c3'];
  displayedColumns: string[]=['c1', 'c2', 'c3', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private fS:FormasService){}

  AfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.fS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  eliminar(id: number): void{
    this.fS.delete(id).subscribe((data) => {
      this.fS.list().subscribe((data) => {
        this.fS.setList(data);
      })
    })
  }
}
