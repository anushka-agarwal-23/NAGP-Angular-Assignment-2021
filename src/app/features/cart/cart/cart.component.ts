import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/data-models/cart.model';
import { Product } from 'src/app/core/data-models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData: Cart;
  cartTotal: number;
  cartProducts = 0;
  constructor(public cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.cartTotalAmount$.subscribe(data => this.cartTotal = data);
    this.cartService.cartData$.subscribe(data => {
      this.cartData = data;
      this.cartProducts = 0;
      this.cartData?.data.forEach(product => this.cartProducts += product.cartNum);
    });
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
  }

  removeCartProduct(product: Product) {
    this.cartService.removeCartProduct(product);
  }

}
