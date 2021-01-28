import { Component, EventEmitter, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { startWith, tap, debounceTime, map } from "rxjs/operators";
import { MarvelService } from "src/app/core/services/marvel.service";
import { Marvel } from "src/app/core/store/marve.model";
import { MarvelState } from "src/app/core/store/marvel.state";
import * as MarvelSelectors from "src/app/core/store/marvel.selectors";
import * as MarvelActions from "src/app/core/store/marvel.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { MatAutocompleteSelectedEvent } from "@angular/material";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  public characters: any[] = [];
  public typeSearch = null;

  public searchControl = new FormControl();
  public filteredCharacters: Observable<any[]>;
  public loadingProductService: boolean = false;
  public charactersFilter: any[] = [];
  public marvels: Observable<Marvel[]>;

  constructor(
    private marvelService: MarvelService,
    private store: Store<MarvelState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select(MarvelSelectors.getMarvel).subscribe((response) => {
      if (response) {
        this.typeSearch = response.type ? response.type : null;
      }
    });
    this.searchControl.valueChanges
      .pipe(
        startWith(""),
        tap(() => {
          this.charactersFilter = [];
          this.loadingProductService = true;
        }),
        debounceTime(500),
        map((value) => (typeof value === "string" ? value : value.name))
      )
      .subscribe((searchValue) => {
        if (searchValue) {
          switch (this.typeSearch) {
            case "character":
              this._filterCharacterBack(searchValue);
              break;
            default:
              break;
          }
        }
      });
  }
  private async _filterCharacterBack(name: string) {
    const filterValue = name.toLowerCase();
    await this.marvelService
      .getCharactersListFilter(10, filterValue)
      .toPromise()
      .then((response: any) => {
        if (response) {
          this.charactersFilter =
            response && response.data ? response.data.results : [];
          this.filteredCharacters = of(this.charactersFilter);
          this.loadingProductService = false;
        }
      })
      .catch((err) => err);
  }
  displayFn(character: any): string {
    return character && character.name ? character.name : "";
  }
  applySearch() {
    this.characters = this.charactersFilter;
    this.loadingProductService = false;
    this.filteredCharacters = of([]);
    this.store.dispatch(
      new MarvelActions.SetMarvel({
        type: "character",
        results: this.characters,
      })
    );
    this.router.navigate(["/"], {
      queryParams: { query: this.searchControl.value },
    });
  }
  optionSelected(event: MatAutocompleteSelectedEvent) {
    if (typeof event.option.value === "object") {
      this.router.navigate([`/character/${event.option.value.id}/comics`]);
    }
  }
}
