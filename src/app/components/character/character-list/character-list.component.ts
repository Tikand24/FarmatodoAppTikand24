import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { MarvelService } from "src/app/core/services/marvel.service";
import { MarvelState } from "src/app/core/store/marvel.state";
import * as MarvelSelectors from "src/app/core/store/marvel.selectors";
import * as MarvelActions from "src/app/core/store/marvel.actions";
import { Subscription } from "rxjs/internal/Subscription";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.css"],
})
export class CharacterListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public characters: any[] = [];
  sortBy: any[] = [
    { value: "1", viewValue: "Nombre" },
    { value: "2", viewValue: "Fecha " },
    { value: "3", viewValue: "Otro" },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marvelService: MarvelService,
    private store: Store<MarvelState>
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.map((s) => s.unsubscribe());
  }

  ngOnInit() {
    console.log("queryInit", this.route.snapshot.queryParamMap.get("query"));
    if (!this.route.snapshot.queryParamMap.get("query")) {
      this.marvelService
        .getCharactersList()
        .toPromise()
        .then((response: any) => {
          response && response.data
            ? (this.characters = response.data.results)
            : (this.characters = []);
        });
    }
    const sub = this.store
      .select(MarvelSelectors.getMarvel)
      .subscribe((response) => {
        console.log('qeuryChacar',response)
        if (response) {
          this.characters = response.results ? response.results : null;
        }
      });
    this.subscriptions.push(sub);
  }
}
