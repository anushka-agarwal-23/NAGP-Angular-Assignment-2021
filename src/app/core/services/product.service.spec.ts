import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Product } from '../data-models/product.model';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpTestingController;
  const BASE_URL = 'http://localhost:4200/assets/db/products.json';
  const MOCK_PRODUCT = [{
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
    productDescription: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And SolproductId stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    productCategory: 'clothing',
    productImageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    productQuantityAvailable: 2,
    subCategory: 'Men'
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return complete product array', () => {
    let result: Product[];
    service.getAllProducts().subscribe(data => {
      result = data;
    });
    const req = http.expectOne({
      method: 'GET',
      url: BASE_URL
    });
    req.flush(MOCK_PRODUCT);
    expect(result).toEqual(MOCK_PRODUCT);
  });

  it('should get product according to product id', () => {
    let result: Product;
    service.getProductById(1).subscribe(data => {
      result = data;
    });
    const req = http.expectOne({
      method: 'GET',
      url: BASE_URL
    });
    req.flush(MOCK_PRODUCT);
    expect(result).toEqual(MOCK_PRODUCT[0]);
  });

  it('should return undefined if product not found', () => {
    let result: Product;
    service.getProductById(3).subscribe(data => {
      result = data;
    });
    const req = http.expectOne({
      method: 'GET',
      url: BASE_URL
    });
    req.flush(MOCK_PRODUCT);
    expect(result).toEqual(undefined);
  });

  it('should search product according to keyword', fakeAsync(() => {
    service.searchByKeyword('Backpack');
    const req = http.expectOne({
      method: 'GET',
      url: BASE_URL
    });
    req.flush(MOCK_PRODUCT);
    tick();
    expect(service.productData$.getValue()).toEqual(MOCK_PRODUCT.slice(0, 1));
  }));

  it('should search product according to category and subcategory', fakeAsync(() => {
    service.searchByCategory('Luggage', 'Backpack');
    const req = http.expectOne({
      method: 'GET',
      url: BASE_URL
    });
    req.flush(MOCK_PRODUCT);
    tick();
    expect(service.productData$.getValue()).toEqual(MOCK_PRODUCT.slice(0, 1));
  }));

  it('should search product according to category only', fakeAsync(() => {
    service.searchByCategory('Clothing');
    const req = http.expectOne({
      method: 'GET',
      url: BASE_URL
    });
    req.flush(MOCK_PRODUCT);
    tick();
    expect(service.productData$.getValue()).toEqual(MOCK_PRODUCT.slice(1, 2));
  }));

  it('should return all products when category is ALL', fakeAsync(() => {
    service.searchByCategory('All');
    const req = http.expectOne({
      method: 'GET',
      url: BASE_URL
    });
    req.flush(MOCK_PRODUCT);
    tick();
    expect(service.productData$.getValue()).toEqual(MOCK_PRODUCT);
  }));
});
