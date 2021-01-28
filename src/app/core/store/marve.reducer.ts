// 1 - Importaciones
import { Marvel } from "./marve.model";
import * as MarvelActions from "./marvel.actions";

// 2 - Estado inicial
const initialState: Marvel = {
  type: "character",
  results: [],
  favourites: [],
};

// 3 - Switch con las funciones puras
export function marvelReducer(
  state: Marvel = initialState,
  action: MarvelActions.Actions
) {
  switch (action.type) {
    case MarvelActions.ADD_MARVEL:
      return { ...state, marvels: action.payload };
    case MarvelActions.SET_MARVEL:
      return { ...state, marvel: action.payload };
    case MarvelActions.ADD_FAVOURITE_MARVEL:
      state.favourites.push(action.payload.favourite);
      localStorage.setItem('favourites',JSON.stringify(state.favourites));
      return { ...state };
    case MarvelActions.ADD_MANY_FAVOURITE_MARVEL:
      state.favourites = state.favourites.concat(action.payload.favourites);
      return { ...state };
      case MarvelActions.REMOVE_FAVOURITE_MARVEL:
        const  index = state.favourites.findIndex(fovourite=>fovourite.id == action.payload.favourite.id);
        if(index != -1){
          state.favourites.splice(index,1);
        }
        localStorage.setItem('favourites',JSON.stringify(state.favourites));
        return { ...state };
    default:
      return state;
  }
}
