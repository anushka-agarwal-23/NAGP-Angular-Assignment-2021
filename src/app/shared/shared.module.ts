import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NumbersOnlyDirective
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MenuModule,
    FormsModule,
    TieredMenuModule,
    TranslateModule,
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NumbersOnlyDirective
  ]
})
export class SharedModule { }
