import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  watchlistData: any[] = [];
  watchlistChanged = new BehaviorSubject<any[]>(this.watchlistData);

  constructor(private http: HttpClient) {
    this.fetchWatchlistData();
  }

  fetchWatchlistData(): void {
    // Fetch the watchlist data from the database and update the watchlist
    this.http.get('https://grocery-watchlist-default-rtdb.firebaseio.com/watchlist.json')
    .pipe(map((res) => {
      const products = [];
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          products.push({...res[key], id: key});
        }
      }
      return products;
    }))
    .subscribe((data) => {
        if (data) {
          console.log("data", data);
          
          this.watchlistData = data;
          console.log("OKKK", this.watchlistData);
          this.watchlistChanged.next([...this.watchlistData]);
        }
    }); 
  }

  addToWatchlist(productName: string, price: number, watchPrice: string): void {
    const doesProductExist = this.watchlistData.some((product) => product.name === productName);
    if (!doesProductExist) {
      const requestData = {name: productName, price: price, watchPrice: watchPrice};
      console.log(requestData);
      this.http.post('https://grocery-watchlist-default-rtdb.firebaseio.com/watchlist.json', requestData)
      .subscribe((res) => {
        console.log(res);
        this.fetchWatchlistData();
      })
    }
  }

  removeFromWatchlist(id: string): void {
    // Make a DELETE request to remove the product from the database
    this.http.delete(`https://grocery-watchlist-default-rtdb.firebaseio.com/watchlist/${id}.json`)
      .subscribe(
        (res) => {
          console.log('Product removed:', res);
          this.fetchWatchlistData();
        }
      );
  }

  getWatchlist(): any[] {
    return this.watchlistData;
  }
}
