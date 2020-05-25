import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Player } from '../../../services/game/game.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { players: Player[], pickNumber: number }) {


  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      players: new FormArray([]),
    });
    this.addPlayersForm();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  addPlayersForm(): void {
    this.data.players.forEach((player) => {
      this.playersForm.push(new FormControl(false));
    });
  }

  get playersForm(): FormArray {
    return this.form.get('players') as FormArray;
  }

  get numberSelected(): number {
    return this.playersForm.value.reduce((acc, checked) => acc + checked, 0);
  }

  get playerSelected(): Player[] {
    return this.data.players.filter((player, index) => this.playersForm.value[index]);
  }
}
