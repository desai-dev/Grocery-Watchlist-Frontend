import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  watchlist: string[] = [];

  addToWatchlist(productName: string): void {
    if (!this.watchlist.includes(productName)) {
      this.watchlist.push(productName);
    }
  }

  removeFromWatchlist(productName: string): void {
    const index = this.watchlist.indexOf(productName);
    if (index !== -1) {
      this.watchlist.splice(index, 1);
    }
  }

  getWatchlist(): string[] {
    return this.watchlist;
  }
}
