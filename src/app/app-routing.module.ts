import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CharacterDetailComponent } from "./components/character/character-detail/character-detail.component";
import { CharacterListComponent } from "./components/character/character-list/character-list.component";
import { ComicsDetailComponent } from "./components/comics/comics-detail/comics-detail.component";
import { ComicsListComponent } from "./components/comics/comics-list/comics-list.component";

const routes: Routes = [
  {
    path: "",
    component: CharacterListComponent,
  },
  {
    path: "character/:id/comics",
    component: ComicsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
