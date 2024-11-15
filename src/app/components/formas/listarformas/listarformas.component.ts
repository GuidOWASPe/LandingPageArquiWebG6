import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Forma } from '../../../models/Forma';
import { FormasService } from '../../../services/formas.service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../../mat-dialog/mat-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarformas',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule, 
    MatInputModule,
    CommonModule
  ],
  templateUrl: './listarformas.component.html',
  styleUrl: './listarformas.component.css',
})
export class ListarformasComponent implements OnInit {
  dataSource: MatTableDataSource<Forma> = new MatTableDataSource();
  filterValue: string = '';

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fS: FormasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.fS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) =>
      data.nombreForma.trim().toLowerCase().includes(filter);

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
        this.fS.delete(id).subscribe(() => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
            this.openSnackBar('Elemento eliminado correctamente.');
          });
        });
      }
    });
  }
}
