import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Estilo } from '../../../models/Estilo';
import { EstiloService } from '../../../services/estilo.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../../mat-dialog/mat-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listarestilo',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './listarestilos.component.html',
  styleUrl: './listarestilos.component.css',
})
export class ListarestilosComponent implements OnInit {
  estilos: Estilo[] = []; 
  filteredEstilos: Estilo[] = []; 
  filterValue: string = ''; 

  constructor(
    private eT: EstiloService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.eT.list().subscribe((data) => {
      this.estilos = data; 
      this.filteredEstilos = data; 
    });
    this.eT.getList().subscribe((data) => {
      this.estilos = data; 
      this.filteredEstilos = data; 
    });
  }

  applyFilter(): void {
    if (this.filterValue.trim()) {
      this.filteredEstilos = this.estilos.filter((estilo) =>
        estilo.nombreEstilo.toLowerCase().includes(this.filterValue.trim().toLowerCase())
      );
    } else {
      this.filteredEstilos = this.estilos;
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
        this.eT.delete(id).subscribe(() => {
          this.eT.list().subscribe((data) => {
            this.estilos = data; 
            this.filteredEstilos = data; 
            this.openSnackBar('Elemento eliminado correctamente.');
          });
        });
      }
    });
  }
}