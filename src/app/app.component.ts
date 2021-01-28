import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { debounceTime, finalize, map, startWith, tap } from "rxjs/operators";
import { CharacterDetailComponent } from "./components/character/character-detail/character-detail.component";
import { MarvelService } from "./core/services/marvel.service";
import { MarvelState } from "./core/store/marvel.state";
import * as MarvelActions from "src/app/core/store/marvel.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "FarmatodoApp";

  constructor(private store: Store<MarvelState>, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.store.dispatch(
      new MarvelActions.SetMarvel({
        type: "character",
        favourites: localStorage.getItem("favourites")
          ? JSON.parse(localStorage.getItem("favourites"))
          : [],
      })
    );
  }

  viewMoreCharacter(character) {
    this.dialog.open(CharacterDetailComponent, {
      data: {
        character,
      },
    });
  }
}
