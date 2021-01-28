import { Marvel } from './marve.model';

export interface MarvelState {
  readonly marvels: Marvel[];
  readonly marvel:Marvel;
  readonly favourites:any[];
}