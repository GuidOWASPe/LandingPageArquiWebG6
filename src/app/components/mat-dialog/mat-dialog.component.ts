import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './mat-dialog.component.html',
  styleUrl: './mat-dialog.component.css'
})
export class MatDialogComponent {
  constructor(private dialogRef: MatDialogRef<MatDialogComponent>) {}

  oncancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
