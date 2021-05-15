export interface Product {
  productId: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDescription: string;
  productImageUrl: string;
  productQuantityAvailable: number;
  subCategory?: string;
}
