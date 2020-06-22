import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Player } from '../../../types';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent {

  revealArray: boolean[];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { players: Player[] }) {
    this.revealArray = data.players.map(_ => false);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get players(): Player[] {
    return this.data.players;
  }

  reveal(index: number) {
    this.revealArray[index] = !this.revealArray[index];
  }

  getRole(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }
}
