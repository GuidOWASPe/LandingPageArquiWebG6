import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rostro } from '../../../models/Rostro';
import { RostroService } from '../../../services/rostro.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-listarrostro',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './listarrostro.component.html',
  styleUrl: './listarrostro.component.css',
})
export class ListarrostroComponent implements OnInit {
  dataSource: MatTableDataSource<Rostro> = new MatTableDataSource();
  displayedColumns: string[] = [
    'r1',
    'r2',
    'r3',
    'r4',
    'r5',
    'accion01',
    'accion02',
  ];
  constructor(
    private rS: RostroService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
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
