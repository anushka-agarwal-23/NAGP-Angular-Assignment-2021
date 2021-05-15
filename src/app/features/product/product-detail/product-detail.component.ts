import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/core/data-models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  quantity = 0;
  q$ = new BehaviorSubject<number>(0);
  constructor(private route: ActivatedRoute,
              private cartService: CartService) {
    }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data?.product;
    });
    this.q$.subscribe(data => {
      this.quantity = data;
    });
  }

  Increase(){
    if (this.quantity < 20){
      this.quantity++;
      }
    this.q$.next(this.quantity);
  }

  Decrease(){
    if (this.quantity > 0){
    this.quantity--;
    }
    this.q$.next(this.quantity);
  }

  addToCart(product: Product){
    this.cartService.addToCart(product, this.quantity);
  }

}
