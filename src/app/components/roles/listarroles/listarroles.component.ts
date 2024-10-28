import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/Rol';
import { RolesService } from '../../../services/roles.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarroles',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  imports: [MatTableModule, MatIconModule, MatPaginatorModule,RouterModule],
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css'
})
export class ListarrolesComponent implements OnInit{
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2'];
  displayedColumns: string[]=['c1', 'c2','actions'];
  constructor(private rS: RolesService){}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  };
  eliminar(id: number) {
    this.rS.delete(id).subscribe(data=> {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
