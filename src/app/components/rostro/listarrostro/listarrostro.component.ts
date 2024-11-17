import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rostro } from '../../../models/Rostro';
import { RostroService } from '../../../services/rostro.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../../mat-dialog/mat-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listarrostro',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './listarrostro.component.html',
  styleUrl: './listarrostro.component.css',
})
export class ListarrostroComponent implements OnInit {
  rostros: Rostro[] = []; 
  filteredRostro: Rostro[] = []; 
  filterValue: string = ''; 

  displayedColumns: string[] = [
    'r1',
    'r2',
    'r3',
    'r4',
    'r5',
    'accion01',
    'accion02',
    'accion03'
  ];


  constructor(
    private rS: RostroService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.rostros = data; 
      this.filteredRostro = data; 
    });
    this.rS.getList().subscribe((data) => {
      this.rostros = data; 
      this.filteredRostro = data; 
    });
  }

  applyFilter(): void {
    if (this.filterValue.trim()) {
      this.filteredRostro = this.rostros.filter((estilo) =>
        estilo.nombre.toLowerCase().includes(this.filterValue.trim().toLowerCase())
      );
    } else {
      this.filteredRostro = this.rostros;
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
  eliminar(id: number) {
    const dialogRef = this.dialog.open(MatDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rS.delete(id).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
            this.openSnackBar('Elemento eliminado correctamente.');
          });
        });
      }
    });
  }
}
