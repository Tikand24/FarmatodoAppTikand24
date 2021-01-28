import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { MarvelService } from "src/app/core/services/marvel.service";
import { ComicsDetailComponent } from "../comics-detail/comics-detail.component";

@Component({
  selector: "app-comics-list",
  templateUrl: "./comics-list.component.html",
  styleUrls: ["./comics-list.component.css"],
})
export class ComicsListComponent implements OnInit {
  public isLoading = true;
  public character: any = null;
  public comics: any[] = [];
  sortBy: any[] = [
    { value: "1", viewValue: "Nombre" },
    { value: "2", viewValue: "Fecha " },
    { value: "3", viewValue: "Otro" },
  ];

  constructor(
    private marvelService: MarvelService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((response) => {
      if (response.id) {
        this.isLoading = true;
        this.marvelService
          .getCharactersById(response.id)
          .toPromise()
          .then((response: any) => {
            if (response) {
              if (response.data && response.data.results) {
                this.character =
                  response.data.results.length > 0
                    ? response.data.results[0]
                    : null;
              }
            }
          });
        this.marvelService
          .getComicsByCharacter(response.id)
          .pipe(finalize(() => (this.isLoading = false)))
          .toPromise()
          .then((response: any) => {
            response && response.data
              ? (this.comics = response.data.results)
              : (this.comics = []);
          });
      }
    });
  }

  openDetailComic(comic) {
    this.dialog.open(ComicsDetailComponent, {
      data: {
        comic,
      },
      maxWidth: "45vw",
    });
  }
}
