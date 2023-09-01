import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { WatchlistService } from '../watchlist/watchlist.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent {
  searchQuery: string = '';
  searchResults: any = null;

  constructor(private http: HttpClient, private watchlistService: WatchlistService) {}

  onSearchClick(): void {
    console.log('Search clicked. Query:', this.searchQuery);
    this.fetchProducts();
  }

  onAddButtonClick(productName: any): void {
    console.log(productName);
    this.watchlistService.addToWatchlist(productName);
    console.log(this.watchlistService.getWatchlist());
    console.log("hi");
  }

  private fetchProducts() {
    this.http.get(`http://127.0.0.1:8000/getprices/${this.searchQuery}`)
    .subscribe((res) => {
      console.log(res);
      this.searchResults = res;
    });
  }
}
