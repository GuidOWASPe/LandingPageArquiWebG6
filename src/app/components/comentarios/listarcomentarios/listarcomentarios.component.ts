import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Comentarios } from '../../../models/Comentario';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ComentariosService } from '../../../services/comentarios.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-listarcomentarios',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule, 
    MatPaginatorModule, 
    RouterModule,
    MatButtonModule,
    MatToolbarModule],
  templateUrl: './listarcomentarios.component.html',
  styleUrl: './listarcomentarios.component.css'
})
export class ListarcomentariosComponent {
  dataSource: MatTableDataSource<Comentarios> = new MatTableDataSource();
  displayedColumns: string[]=[
    'c1', 
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'accion01', 
    'accion02'];

  @ViewChild(MatPaginator) paginator !: MatPaginator; 

  constructor(private comenS: ComentariosService){}

  AfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.comenS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.comenS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  };
  
  eliminar(id: number): void {
    this.comenS.delete(id).subscribe(data=> {
      this.comenS.list().subscribe((data) => {
        this.comenS.setList(data);
      });
    });
  }


}
