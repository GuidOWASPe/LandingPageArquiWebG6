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
    FormsModule
  ],
  templateUrl: './listaritems.component.html',
  styleUrl: './listaritems.component.css',
})
export class ListaritemsComponent implements OnInit {
  dataSource: MatTableDataSource<Item> = new MatTableDataSource();
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
    private iS: ItemService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.iS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.iS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) =>
      data.nombreItem.trim().toLowerCase().includes(filter);

    this.dataSource.filter = this.filterValue.trim().toLowerCase();
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
