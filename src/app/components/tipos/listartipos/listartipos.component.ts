import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tipo } from '../../../models/Tipo';
import { TiposService } from '../../../services/tipos.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listartipos',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './listartipos.component.html',
  styleUrl: './listartipos.component.css'
})
export class ListartiposComponent implements OnInit{
  dataSource: MatTableDataSource<Tipo> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];

  constructor(private tS: TiposService){}

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }
}
