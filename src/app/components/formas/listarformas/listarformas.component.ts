import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Forma } from '../../../models/Forma';
import { FormasService } from '../../../services/formas.service';
import { MatIconModule } from '@angular/material/icon'


@Component({
  selector: 'app-listarformas',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './listarformas.component.html',
  styleUrl: './listarformas.component.css'
})
export class ListarformasComponent implements OnInit{
  dataSource: MatTableDataSource<Forma> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2', 'c3'];
  constructor(private fS:FormasService){}

  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }
}
