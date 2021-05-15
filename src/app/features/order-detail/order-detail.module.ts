import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailRoutingModule } from './order-detail-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        OrderDetailRoutingModule,
        TranslateModule
    ],
    declarations: [
        OrderDetailComponent
    ],
    providers: [],
    exports: [
      OrderDetailComponent
    ]
})
export class OrderDetailModule { }
