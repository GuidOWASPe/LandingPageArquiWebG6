import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/Rol';
import { RolesService } from '../../../services/roles.service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-listarroles',
  standalone: true,
  imports: [MatTableModule,
     MatIconModule, 
     MatPaginatorModule, 
     RouterModule,
      MatButtonModule,
       MatToolbarModule],
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css'
})
export class ListarrolesComponent implements OnInit{
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator !: MatPaginator; 

  constructor(private rS: RolesService){}

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  };
  eliminar(id: number): void {
    this.rS.delete(id).subscribe(data=> {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
