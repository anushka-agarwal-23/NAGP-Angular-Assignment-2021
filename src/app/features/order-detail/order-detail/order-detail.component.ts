import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId = '';
  products: any;
  cartTotal: number;
  constructor(public cartService: CartService) {
   }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.products = data?.data);
    this.cartService.cartTotalAmount$.subscribe(data => this.cartTotal = data);
    const options = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      this.orderId += options.charAt(Math.floor(Math.random() * options.length));
    }
  }

}
