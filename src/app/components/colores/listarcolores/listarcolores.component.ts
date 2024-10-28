import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Color } from '../../../models/Color';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';  // Importar MatDialog
import { ColoresService } from '../../../services/colores.service';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../dialog/dialog.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarcolores',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatDialogModule, RouterModule],
  templateUrl: './listarcolores.component.html',
  styleUrl: './listarcolores.component.css',
})
export class ListarcoloresComponent implements OnInit {
  dataSource: MatTableDataSource<Color> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'accion01', 'accion02'];
  constructor(private cS: ColoresService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  openDialog(): void{
    this.dialog.open(DialogComponent, {
      width: '700px'
    })
  }

  eliminar(id: number): void{
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      })
    })
  }
}
