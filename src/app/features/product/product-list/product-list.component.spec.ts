import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

import { ProductListComponent } from './product-list.component';

const MOCK_PRODUCT_LIST = [
  {
    productId: 1,
    productName: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    productPrice: 109.95,
    productDescription: 'Your perfect pack for everyday use and walks in the forest.Stash your laptop(up to 15 inches) in the padded sleeve, your everyday',
    productCategory: 'Luggage',
    productImageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    productQuantityAvailable: 0,
    subCategory: 'Backpack'
  },
  {
    productId: 2,
    productName: 'Mens Casual Premium Slim Fit T-Shirts ',
    productPrice: 22.3,
    productDescription: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And SoproductIdstitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    productCategory: 'clothing',
    productImageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    productQuantityAvailable: 20,
    subCategory: 'Men'
  }
];
const mockLocalStorage = {
  getItem: (key: 'cart_item'): string => {
    return JSON.stringify({
      total: 1,
      data: [{
        product: MOCK_PRODUCT_LIST[0],
        cartNum: 1
      }]
    });
  }
};
let router: Router;
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let cartService: CartService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, TranslateModule.forRoot(), PaginatorModule],
      declarations: [ProductListComponent],
      providers: [ProductService, CartService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(cartService, 'addToCart');
    fixture.detectChanges();
  });

  it('should create product list component', () => {
    expect(component).toBeTruthy();
  });

  it('should load data of product grid', () => {
    component.productDataChunk = MOCK_PRODUCT_LIST;
    fixture.detectChanges();
    expect(getCards().length).toBe(MOCK_PRODUCT_LIST.length);
  });

  it('should have no data in product grid with empty product data', () => {
    expect(getCards().length).toBe(0);
  });

  it('should call cart service method to add product in cart', () => {
    component.addProduct(MOCK_PRODUCT_LIST[0]);
    expect(cartService.addToCart).toHaveBeenCalled();
  });

  it('should route to product detail page on select product', () => {
    spyOn(router, 'navigate');
    component.selectProduct(MOCK_PRODUCT_LIST[0].productId);
    expect(router.navigate).toHaveBeenCalledWith (['/home/product', MOCK_PRODUCT_LIST[0].productId]);
  });

  it('should produce boolean array to disable button', () => {
    component.productData = MOCK_PRODUCT_LIST;
    fixture.detectChanges();
    component.disableAddToCartButton();
    expect(component.disable.length).toBe(MOCK_PRODUCT_LIST.length);
  });

  it('should call selectProduct function on clicking the particular product image/title', () => {
    spyOn(component, 'selectProduct');
    component.productDataChunk = MOCK_PRODUCT_LIST;
    fixture.detectChanges();
    const event = {
      preventDefault() {
      }
    };
    const ele: any = getCards()[0].childNodes[0];
    const ele1: any = ele.childNodes[0];
    ele1.triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(component.selectProduct)
      .toHaveBeenCalled();
  });

  function getCards() {
    return fixture.debugElement.queryAll(By.css('div.product'));
  }
});
