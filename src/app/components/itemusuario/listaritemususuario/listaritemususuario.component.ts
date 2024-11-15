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
    CommonModule
  ],
  templateUrl: './listaritemususuario.component.html',
  styleUrl: './listaritemususuario.component.css',
})
export class ListaritemususuarioComponent implements OnInit{
  dataSource: MatTableDataSource<ItemUsuario> = new MatTableDataSource();
  
  filterValue: string = '';

  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'accion01',
    'accion02',
  ];

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private itemU: ItemusuarioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.itemU.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.itemU.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) =>
      data.it.nombreItem.trim().toLowerCase().includes(filter);

    this.dataSource.filter = this.filterValue.trim().toLowerCase();
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
