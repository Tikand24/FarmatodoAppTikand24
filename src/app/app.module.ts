import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatToolbarModule,
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CharacterDetailComponent } from "./components/character/character-detail/character-detail.component";
import { ComicsListComponent } from "./components/comics/comics-list/comics-list.component";
import { ComicsDetailComponent } from "./components/comics/comics-detail/comics-detail.component";
import { CharacterListComponent } from './components/character/character-list/character-list.component';
import { FavoriteComicsComponent } from './components/comics/favorite-comics/favorite-comics.component';
import { ToolbarComponent } from './partials/layout/toolbar/toolbar.component';
import { StoreModule } from '@ngrx/store';
import { marvelReducer } from "./core/store/marve.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    CharacterDetailComponent,
    ComicsListComponent,
    ComicsDetailComponent,
    CharacterListComponent,
    FavoriteComicsComponent,
    ToolbarComponent,
  ],
  entryComponents: [CharacterDetailComponent,ComicsDetailComponent],
  imports: [
    MatProgressSpinnerModule,
    MatDialogModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({marvels: marvelReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
