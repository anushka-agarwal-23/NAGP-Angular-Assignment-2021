import { Product } from './product.model';

export interface Cart {
  total: number;
  data: [{
    product: Product,
    cartNum: number
  }];
}
