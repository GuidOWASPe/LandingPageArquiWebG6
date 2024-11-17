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
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

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
    MatInputModule,
    FormsModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './listarusuarios.component.html',
  styleUrl: './listarusuarios.component.css',
})
export class ListarusuariosComponent implements OnInit {
  usuarios: Usuarios[] = [];
  filteredUsuarios: Usuarios[] = [];
  filterValue: string = '';

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


  constructor(
    private uS: UsuariosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.usuarios = data; 
      this.filteredUsuarios = data; 
    });
    this.uS.getList().subscribe((data) => {
      this.usuarios = data; 
      this.filteredUsuarios = data; 
    });
  }

  applyFilter(): void {
    if (this.filterValue.trim()) {
      this.filteredUsuarios = this.usuarios.filter((estilo) =>
        estilo.username.toLowerCase().includes(this.filterValue.trim().toLowerCase())
      );
    } else {
      this.filteredUsuarios = this.usuarios;
    }
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
