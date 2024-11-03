import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tipo } from '../../../models/Tipo';
import { TiposService } from '../../../services/tipos.service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-listartipos',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, RouterModule, MatButtonModule, MatToolbarModule],
  templateUrl: './listartipos.component.html',
  styleUrl: './listartipos.component.css'
})
export class ListartiposComponent implements OnInit{
  dataSource: MatTableDataSource<Tipo> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private tS: TiposService){}

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; 
    })
  };
  eliminar(id: number) {
    this.tS.delete(id).subscribe(data=> {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
  }
}
