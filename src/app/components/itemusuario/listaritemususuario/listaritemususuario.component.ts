import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ItemusuarioService } from '../../../services/itemusuario.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../../mat-dialog/mat-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ItemUsuario } from '../../../models/ItemUsuario';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listaritemususuario',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './listaritemususuario.component.html',
  styleUrl: './listaritemususuario.component.css',
})
export class ListaritemususuarioComponent implements OnInit{
  itemUsuario: ItemUsuario[] = []; 
  filteredItemUsuario: ItemUsuario[] = []; 
  filterValue: string = ''; 
  
  constructor(
    private itemU: ItemusuarioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.itemU.list().subscribe((data) => {
      this.itemUsuario = data
      this.filteredItemUsuario = data
    });
    this.itemU.getList().subscribe((data) => {
      this.itemUsuario = data
      this.filteredItemUsuario = data
    });
  }

  applyFilter(): void {
    if (this.filterValue.trim()) {
      this.filteredItemUsuario = this.itemUsuario.filter((item) =>
        item.it.nombreItem.toLowerCase().includes(this.filterValue.trim().toLowerCase())
      );
    } else {
      this.filteredItemUsuario = this.itemUsuario;
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
        this.itemU.delete(id).subscribe((data) => {
          this.itemU.list().subscribe((data) => {
            this.itemU.setList(data);
            this.openSnackBar('Elemento eliminado correctamente.');
          });
        });
      }
    });
  }
}
