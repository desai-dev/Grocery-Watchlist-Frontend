import { Component, OnInit } from '@angular/core';
import { WatchlistService } from './watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {
  watchlist: string[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.watchlist = this.watchlistService.getWatchlist();
  }

  onRemoveButtonClick(productName: string): void {
    this.watchlistService.removeFromWatchlist(productName);
  }
}
