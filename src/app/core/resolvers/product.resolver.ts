import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cart } from '../data-models/cart.model';
import { Product } from '../data-models/product.model';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
  constructor(private productService: ProductService){ }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const productId = + route.paramMap.get('productId');
    const cartData: Cart = JSON.parse(localStorage.getItem('cart_item'));
    let product: Observable<Product>;
    cartData?.data.forEach(element => {
      if (productId === element.product.productId && element.product.productQuantityAvailable < 1){
        product = of(element.product);
      }else{
        product = this.productService.getProductById(productId);
      }
    });
    if (cartData.data[0] === undefined){
      product = this.productService.getProductById(productId);
    }
    return product;
  }
}
