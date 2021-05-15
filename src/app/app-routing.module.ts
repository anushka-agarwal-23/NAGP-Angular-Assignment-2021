import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/authentication/login/login.component';
import { HomeComponent } from './features/home/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home/product', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'product',
        loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'checkout',
        loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'order',
        loadChildren: () => import('./features/order-detail/order-detail.module').then(m => m.OrderDetailModule),
        canActivate: [AuthGuard]
      },
      {
        path: '', redirectTo: 'product', pathMatch: 'full'
      }
    ]
  },
  {
    path: '**', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
