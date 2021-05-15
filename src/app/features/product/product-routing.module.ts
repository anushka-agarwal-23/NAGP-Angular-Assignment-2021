import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from 'src/app/core/resolvers/product.resolver';
import { ProductsResolver } from 'src/app/core/resolvers/products.resolver';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '', component: ProductListComponent, resolve: {
      productList: ProductsResolver
    }
  }
  ,
  {
    path: ':productId', component: ProductDetailComponent, resolve: {
      product: ProductResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
