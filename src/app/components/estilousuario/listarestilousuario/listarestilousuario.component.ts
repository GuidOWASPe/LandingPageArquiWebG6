import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EstiloUsuario } from '../../../models/EstiloUsuario';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EstiloUsuarioService } from '../../../services/estilousuario.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../../mat-dialog/mat-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarestilousuario',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    FormsModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './listarestilousuario.component.html',
  styleUrl: './listarestilousuario.component.css',
})
export class ListarestilousuarioComponent implements OnInit {
  estiloUsuario: EstiloUsuario[] = []; 
  filteredEstilosFav: EstiloUsuario[] = []; 
  filterValue: string = ''; 

  constructor(
    private euS: EstiloUsuarioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.euS.list().subscribe((data) => {
      this.estiloUsuario = data; 
      this.filteredEstilosFav = data; 
    });
    this.euS.getList().subscribe((data) => {
      this.estiloUsuario = data; 
      this.filteredEstilosFav = data; 
    });
  }

  applyFilter(): void {
    if (this.filterValue.trim()) {
      this.filteredEstilosFav = this.estiloUsuario.filter((estilo) =>
        estilo.estilo.nombreEstilo.toLowerCase().includes(this.filterValue.trim().toLowerCase())
      );
    } else {
      this.filteredEstilosFav = this.estiloUsuario;
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
        this.euS.delete(id).subscribe((data) => {
          this.euS.list().subscribe((data) => {
            this.euS.setList(data);
            this.openSnackBar('Elemento eliminado correctamente.');
          });
        });
      }
    });
  }
}
