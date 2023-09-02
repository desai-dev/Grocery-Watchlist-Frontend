import { Component, OnInit } from '@angular/core';
import { WatchlistService } from './watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {
  watchlist: any[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.watchlistService.watchlistChanged.subscribe((data) => {
      this.watchlist = data;
      console.log("RECIEVED", this.watchlist);
    });
  }

  onRemoveButtonClick(id: string): void {
    this.watchlistService.removeFromWatchlist(id);
  }
}
