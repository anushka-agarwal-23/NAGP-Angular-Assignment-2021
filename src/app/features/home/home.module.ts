import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        TranslateModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: []
})
export class HomeModule { }
