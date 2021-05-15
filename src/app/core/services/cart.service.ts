import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../data-models/cart.model';
import { Product } from '../data-models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart = {
    total: 0,
    data: [{
      product: undefined,
      cartNum: 0
    }]
  };
  cartTotalAmount$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<Cart>(this.cart);

  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart_item'));
    this.cartData$.next(this.cart);
    this.cartTotalAmount$.next(this.calculateTotal());
   }

   getCart(){
    this.cartData$.next(this.cart);
    return this.cartData$.asObservable();
   }

   getCartAmount(){
    this.cartTotalAmount$.next(this.calculateTotal());
    return this.cartTotalAmount$.asObservable();
   }

  addToCart(product: Product, quantity?: number): void {
    let count = 0;
    const productCount = quantity !== undefined ? quantity : 1;
    if (this.cart === null) {
      this.cart = {
        total: 0,
        data: [{
          product: undefined,
          cartNum: 0
        }]
      };
      product.productQuantityAvailable -= productCount;
      this.cart.data[0] = {
        product,
        cartNum: productCount
      };
    } else {
      this.cart.data.forEach(p => {
        if (p.product.productId === product.productId) {
          p.cartNum += productCount;
          p.product.productQuantityAvailable -= productCount;
          count++;
        }
      });
      if (count === 0) {
        product.productQuantityAvailable -= productCount;
        this.cart.data.push({
          product,
          cartNum: productCount
        });
      }
    }
    this.cart.total = this.cart.data.length;
    this.cartData$.next(this.cart);
    this.cartTotalAmount$.next(this.calculateTotal());
    localStorage.setItem('cart_item', JSON.stringify(this.cart));
  }

  removeCartProduct(product: Product) {
    this.cart = JSON.parse(localStorage.getItem('cart_item'));
    for (let i = 0; i < this.cart.data.length; i++) {
      if (this.cart.data[i].product.productId === product.productId) {
        this.cart.data.splice(i, 1);
        this.cart.total = this.cart.data.length;
        break;
      }
    }
    this.cartData$.next(this.cart);
    this.cartTotalAmount$.next(this.calculateTotal());
    localStorage.setItem('cart_item', JSON.stringify(this.cart));
  }

  getLocalCartProducts(): Cart {
    this.cart = JSON.parse(localStorage.getItem('cart_item'));
    return this.cart;
  }

  calculateTotal() {
    let total = 0;
    this.cart?.data.forEach(p => {
      const {productPrice} = p.product;
      const subTotal = p.cartNum * productPrice;
      total += subTotal;
    });
    return total;
  }

  increaseQuantity(index: number){
    if (this.cart.data[index].product.productQuantityAvailable >= 1){
      this.cart.data[index].cartNum++;
      this.cart.data[index].product.productQuantityAvailable--;
      this.cartData$.next(this.cart);
      this.cartTotalAmount$.next(this.calculateTotal());
      localStorage.setItem('cart_item', JSON.stringify(this.cart));
    }
  }

  decreaseQuantity(index: number){
    this.cart.data[index].cartNum--;
    this.cart.data[index].product.productQuantityAvailable++;
    if (this.cart.data[index].cartNum === 0){
      this.removeCartProduct(this.cart.data[index].product);
    }
    this.cartData$.next(this.cart);
    this.cartTotalAmount$.next(this.calculateTotal());
    localStorage.setItem('cart_item', JSON.stringify(this.cart));
  }
}
