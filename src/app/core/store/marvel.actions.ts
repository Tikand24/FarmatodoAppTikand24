import { Action } from '@ngrx/store'
import { Marvel } from './marve.model'

export const ADD_MARVEL = 'ADD_MARVEL';
export const SET_MARVEL = 'SET_MARVEL';
export const ADD_FAVOURITE_MARVEL = 'ADD_FAVOURITE_MARVEL';
export const ADD_MANY_FAVOURITE_MARVEL = 'ADD_MANY_FAVOURITE_MARVEL';
export const REMOVE_FAVOURITE_MARVEL = 'REMOVE_FAVOURITE_MARVEL';

export class AddMarvel implements Action {
  readonly type = ADD_MARVEL
  constructor(public payload: Marvel) { }
}
export class SetMarvel implements Action {
  readonly type = SET_MARVEL
  constructor(public payload: Marvel) { }
}
export class AddFavouriteMarvel implements Action {
  readonly type = ADD_FAVOURITE_MARVEL
  constructor(public payload: {favourite:any}) { }
}
export class AddManyFavouritesMarvel implements Action {
  readonly type = ADD_MANY_FAVOURITE_MARVEL
  constructor(public payload: {favourites:any[]}) { }
}
export class removeFavouriteMarvel implements Action {
  readonly type = REMOVE_FAVOURITE_MARVEL
  constructor(public payload: {favourite:any}) { }
}
export type Actions = AddMarvel | SetMarvel | AddFavouriteMarvel | AddManyFavouritesMarvel | removeFavouriteMarvel;