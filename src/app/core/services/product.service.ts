import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../data-models/product.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: Product[] = [];
  productData$ = new BehaviorSubject<Product[]>(this.productList);
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:4200/assets/db/products.json')
    .pipe(
      tap(
        res => this.productData$.next(res)
      )
    );
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product[]>('http://localhost:4200/assets/db/products.json')
      .pipe(
        map(products => products.find((product: Product) => product.productId === productId))
      );
  }

  searchByKeyword(keyword: string) {
    this.http.get('http://localhost:4200/assets/db/products.json').toPromise().then((res: Product[]) => {
      this.productList = res.filter((product: Product) =>
        product.productName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
      this.productData$.next(this.productList);
    });
  }

  searchByCategory(category: string, subcategory?: string){
    if (subcategory === ''){
      subcategory = undefined;
    }
    this.http.get('http://localhost:4200/assets/db/products.json').toPromise().then((res: Product[]) => {
      if (category !== 'All'){
        this.productList = res.filter((product: Product) => product.productCategory.toLowerCase().indexOf(category.toLowerCase()) !== -1);
        if (subcategory !== undefined){
          this.productList = this.productList.filter((product: Product) =>
          product.subCategory.toLowerCase().indexOf(subcategory.toLowerCase()) !== -1);
        }
      }else{
        this.productList = res;
      }
      this.productData$.next(this.productList);
    });
  }
}
