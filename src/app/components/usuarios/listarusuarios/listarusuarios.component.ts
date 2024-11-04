import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Usuarios } from '../../../models/Usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-listarusuarios',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  templateUrl: './listarusuarios.component.html',
  styleUrl: './listarusuarios.component.css',
})
export class ListarusuariosComponent implements OnInit {
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9',
    'accion01',
    'accion02',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private uS: UsuariosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  eliminar(id: number): void {
    const dialogRef = this.dialog.open(MatDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.uS.delete(id).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            this.openSnackBar('Elemento eliminado correctamente.');
          });
        });
      }
    });
  }
}
