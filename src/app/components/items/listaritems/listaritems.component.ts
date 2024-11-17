import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Item } from '../../../models/Item';
import { ItemService } from '../../../services/item.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogComponent } from '../../mat-dialog/mat-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listaritems',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './listaritems.component.html',
  styleUrl: './listaritems.component.css',
})
export class ListaritemsComponent implements OnInit {
  items: Item[] = []; 
  filteredItems: Item[] = []; 
  filterValue: string = ''; 

  constructor(
    private iS: ItemService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.iS.list().subscribe((data) => {
      this.items = data
      this.filteredItems = data
    });
    this.iS.getList().subscribe((data) => {
      this.items = data
      this.filteredItems = data
    });
  }
  applyFilter(): void {
    if (this.filterValue.trim()) {
      this.filteredItems = this.items.filter((item) =>
        item.nombreItem.toLowerCase().includes(this.filterValue.trim().toLowerCase())
      );
    } else {
      this.filteredItems = this.items;
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
        this.iS.delete(id).subscribe((data) => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
            this.openSnackBar('Elemento eliminado correctamente.');
          });
        });
      }
    });
  }
}
