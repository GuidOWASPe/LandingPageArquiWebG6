import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ItemUsuario } from '../../../models/ItemUsuario';
import { ItemusuarioService } from '../../../services/itemusuario.service';

@Component({
  selector: 'app-listaritemususuario',
  standalone: true,
  imports: [MatTableModule,
    MatIconModule, 
    MatPaginatorModule, 
    RouterModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './listaritemususuario.component.html',
  styleUrl: './listaritemususuario.component.css'
})
export class ListaritemususuarioComponent {
  dataSource: MatTableDataSource<ItemUsuario> = new MatTableDataSource();
  displayedColumns: string[]=[
    'c1', 
    'c2',
    'c3',
    'c4',
    'c5',
    'accion01', 
    'accion02'];

  @ViewChild(MatPaginator) paginator !: MatPaginator; 

  constructor(private itemU: ItemusuarioService){}

  AfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.itemU.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.itemU.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  };
  eliminar(id: number): void {
    this.itemU.delete(id).subscribe(data=> {
      this.itemU.list().subscribe((data) => {
        this.itemU.setList(data);
      });
    }); 
  }


}
