import { createFeatureSelector, State, createSelector } from "@ngrx/store";
import { MarvelState } from "./marvel.state";


export const getMarvelstate = createFeatureSelector<MarvelState>(
    'marvels'
  );
  
  export const getMarvelList = createSelector(
    getMarvelstate,
    (state: MarvelState) => state.marvels
  );
  
  export const getMarvel = createSelector(
    getMarvelstate,
    (state: MarvelState) => state.marvel
  );

  export const getFavourites = createSelector(
    getMarvelstate,
    (state: MarvelState) => state.favourites
  );