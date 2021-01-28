import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CharacterDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog) { }

  ngOnInit() {
  }

}
