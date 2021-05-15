import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/core/data-models/cart.model';
import { Product } from 'src/app/core/data-models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productData: Product[];
  productDataChunk: Product[];
  category: string;
  subcategory: string;
  searchParam: string;
  disable: boolean[] = [];
  constructor(private productService: ProductService,
              private router: Router,
              private cartService: CartService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.productData = data.productList;
      this.productDataChunk = this.productData?.slice(0, 12);
    });
    this.category = this.route.snapshot.queryParamMap.get('category');
    this.subcategory = this.route.snapshot.queryParamMap.get('subcategory');
    this.searchParam = this.route.snapshot.queryParamMap.get('value');
    if (this.searchParam !== null){
      this.productService.searchByKeyword(this.searchParam);
    }
    if (this.category !== null && this.subcategory !== null) {
      this.productService.searchByCategory(this.category, this.subcategory);
    }
    this.productService.productData$.subscribe(data => {
      this.productData = data;
      this.productDataChunk = this.productData?.slice(0, 12);
    });
    this.disableAddToCartButton();
  }

  addProduct(product: Product) {
    this.cartService.addToCart(product);
  }

  selectProduct(productId: number) {
    this.router.navigate(['/home/product', productId]);
  }

  paginate(event) {
    this.productDataChunk = this.productData.slice(event.first, event.first + event.rows);
 }

 disableAddToCartButton(){
  const cartData: Cart = JSON.parse(localStorage.getItem('cart_item'));
  this.productData?.forEach(product => {
      cartData?.data.forEach(element => {
        if (product.productId === element.product.productId && element.product.productQuantityAvailable < 1){
          this.disable.push(true);
        }else{
          this.disable.push(false);
        }
      });
    });
 }

}
