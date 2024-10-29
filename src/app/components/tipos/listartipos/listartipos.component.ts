import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tipo } from '../../../models/Tipo';
import { TiposService } from '../../../services/tipos.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listartipos',
  standalone: true,
  imports: [
    MatTableModule, 
    MatIconModule,
    RouterModule
  ],
  templateUrl: './listartipos.component.html',
  styleUrl: './listartipos.component.css'
})
export class ListartiposComponent implements OnInit{
  dataSource: MatTableDataSource<Tipo> = new MatTableDataSource();
  displayedColumns:string[]=['id','nombre']

  constructor(private tS:TiposService){}

  ngOnInit():void{
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource)
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.tS.delete(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
  }
}
