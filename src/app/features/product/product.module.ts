import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { ProductRoutingModule } from './product-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProductRoutingModule,
    TranslateModule,
    PaginatorModule
  ],
  exports: [
    ProductListComponent, ProductDetailComponent
  ]
})
export class ProductModule { }
