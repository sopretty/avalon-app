import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';
import { Player, Quest } from '../../../types';

@Component({
  selector: 'app-quest-dialog',
  templateUrl: './quest-dialog.component.html',
  styleUrls: ['./quest-dialog.component.scss']
})
export class QuestDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { players: Player[], quest: Quest }) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get voterPlayers(): Player[] {
    return this.data.players.filter(player => Object.keys(this.data.quest.votes).includes(player.id));
  }

  get votes(): { [playerId: string]: boolean }[] {
    return Object.values(this.data.quest.votes);
  }

}
