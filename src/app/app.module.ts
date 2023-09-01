import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { WatchlistService } from './watchlist/watchlist.service';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    SearchProductComponent,
    WatchlistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WatchlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
