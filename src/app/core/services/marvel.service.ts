import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MarvelService {
  constructor(private http: HttpClient) {}

  getCharactersById(characterId:string){
    return this.http.get(`${environment.MARVEL_API}/characters/${characterId}?${environment.MARVEL_AUTHORIZATION_API}`);
  }
  getCharactersList(limit:number=10){
    return this.http.get(`${environment.MARVEL_API}/characters?${environment.MARVEL_AUTHORIZATION_API}&limit=${limit}`);
  }
  getCharactersListFilter(limit:number=10,nameStartsWith:string){
    let urlConfig= `&limit=${limit}`;
    if(nameStartsWith){
      urlConfig += `&nameStartsWith=${encodeURIComponent(nameStartsWith)}`;
    }
    return this.http.get(`${environment.MARVEL_API}/characters?${environment.MARVEL_AUTHORIZATION_API}${urlConfig}`);
  }
  getComicsByCharacter(idCharacter:string,limit:number=20){
    return this.http.get(`${environment.MARVEL_API}/characters/${idCharacter}/comics?${environment.MARVEL_AUTHORIZATION_API}&limit=${limit}`);
  }
}
