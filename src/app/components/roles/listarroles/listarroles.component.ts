import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/Rol';
import { RolesService } from '../../../services/roles.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarroles',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css'
})
export class ListarrolesComponent implements OnInit{
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[]=['c1', 'c2'];
  constructor(private rS: RolesService){}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }
}
