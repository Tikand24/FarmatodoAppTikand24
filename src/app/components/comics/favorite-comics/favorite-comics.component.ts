import { Component, OnDestroy, OnInit } from "@angular/core";
import { MarvelState } from "src/app/core/store/marvel.state";
import * as MarvelSelectors from "src/app/core/store/marvel.selectors";
import * as MarvelActions from "src/app/core/store/marvel.actions";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

@Component({
  selector: "app-favorite-comics",
  templateUrl: "./favorite-comics.component.html",
  styleUrls: ["./favorite-comics.component.css"],
})
export class FavoriteComicsComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  public favourites: any[] = [];
  constructor(private store: Store<MarvelState>) {}
  ngOnDestroy(): void {
    this.subscriptions.map((s) => s.unsubscribe());
  }

  ngOnInit() {
    const sub = this.store.select("marvels").subscribe((response: any) => {
      if (response) {
        this.favourites = response.favourites;
      }
    });
    this.subscriptions.push(sub);
    this.store.dispatch(
      new MarvelActions.AddManyFavouritesMarvel({
        favourites: localStorage.getItem("favourites")
          ? JSON.parse(localStorage.getItem("favourites"))
          : [],
      })
    );
  }
  removeFavorite(favourite){
    this.store.dispatch(
      new MarvelActions.removeFavouriteMarvel({
        favourite
      })
    );

  }
}
