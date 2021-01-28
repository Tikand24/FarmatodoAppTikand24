import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { MarvelState } from 'src/app/core/store/marvel.state';
import * as MarvelActions from "src/app/core/store/marvel.actions";
import * as MarvelSelectors from "src/app/core/store/marvel.selectors";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comics-detail',
  templateUrl: './comics-detail.component.html',
  styleUrls: ['./comics-detail.component.css']
})
export class ComicsDetailComponent implements OnInit,OnDestroy {

  public subscriptions:Subscription[]=[];
  public comic:any=null;
  public price=null;
  public isFavourite=false;
  constructor(private store: Store<MarvelState>,
    public dialogRef: MatDialogRef<ComicsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog) { }
  ngOnDestroy(): void {
    this.subscriptions.map(s=>s.unsubscribe());
  }

  ngOnInit() {
    this.comic = this.dataDialog.comic ? this.dataDialog.comic :null;
    console.log('select')
    if(this.comic){
      this.price = this.comic.prices.find(price=>price.type=='digitalPurchasePrice');
    }
    const sub=this.store.select(MarvelSelectors.getFavourites).subscribe((favorites:any[])=>{
      if(favorites && this.comic){
        this.isFavourite = favorites.find(favourite=>favourite.id == this.comic.id);
      }
    })
    this.subscriptions.push(sub);
  }
  addFavourites(){
    if(!this.isFavourite){
      this.store.dispatch(
        new MarvelActions.AddFavouriteMarvel({
          favourite:this.comic,
        })
      );
      this.isFavourite = this.comic;
    }
  }

}
