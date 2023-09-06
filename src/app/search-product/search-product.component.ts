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
  textInput: string[] = [];

  constructor(private http: HttpClient, private watchlistService: WatchlistService) {}

  onSearchClick(): void {
    console.log('Search clicked. Query:', this.searchQuery);
    this.fetchProducts();
  }

  onAddButtonClick(productName: any, price: any, textInputValue: string): void {
    console.log("poop", productName, price, textInputValue);
    this.watchlistService.addToWatchlist(productName, price, textInputValue);
    console.log(this.watchlistService.getWatchlist());
    this.scrapeWatchlist();
    console.log("hi");
  }

  private fetchProducts() {
    this.http.get(`http://127.0.0.1:8000/getprices/${this.searchQuery}`)
    .subscribe((res) => {
      console.log(res);
      this.searchResults = res;
    });
  }

  private scrapeWatchlist() {
    const watchlist = this.watchlistService.watchlistData;
    for (const product of watchlist) {
      this.scrapeProduct(product);
    }
  }

  private scrapeProduct(data : any) {
    console.log("SEND TO BACKEND", data);
    this.http.post(`http://127.0.0.1:8000/scrapewatchlist`, data)
    .subscribe((res) => {
      console.log(res);
    });
  }
}
