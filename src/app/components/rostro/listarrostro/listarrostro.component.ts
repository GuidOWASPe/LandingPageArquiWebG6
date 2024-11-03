import { Component, OnInit } from '@angular/core';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { Rostro } from '../../../models/Rostro';
import { RostroService } from '../../../services/rostro.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarrostro',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './listarrostro.component.html',
  styleUrl: './listarrostro.component.css'
})
export class ListarrostroComponent implements OnInit{
  dataSource: MatTableDataSource<Rostro> = new MatTableDataSource();
  displayedColumns: string[] = [
    'r1',
    'r2',
    'r3',
    'r4',
    'r5',
    'accion01',
    'accion02'
  ];
  constructor(private rS: RostroService){}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
