import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'martjack example';
  searchQuery: string;
  productSearchResult: any = null;
  errr: any = null;

  constructor(private _http:HttpClient) {
    
  }


  private searchProducts() {

    let productRes = this.getProductsBySearch(this.searchQuery);
    productRes.subscribe(res => {
      console.log(res, "success response from martjack");
      this.productSearchResult = res.resource;
      alert('success');
    }, err => {
      console.log(err, "error");
      this.errr = JSON.parse(JSON.stringify(err.message));
      alert('failure');
    })
    
  }



  getProductsBySearch(queryString: string): Observable<any> {
    
    console.log(queryString, "queryString");

    const url = `products?search-text=${queryString}`;
    const finalUrl = `https://sg-frontapi.ecom.capillary.in/v3/f3537938-adfd-45db-b173-4aaad83b4edd/${url}`;
    return this._http.get<any>(finalUrl);

  }
}
