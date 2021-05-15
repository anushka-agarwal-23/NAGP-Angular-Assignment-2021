import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/data-models/cart.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartData: Cart;
  cartTotal = 0;
  searchForm: FormGroup;
  items: MenuItem[];
  profileitems: MenuItem[];
  selectedLang: string;
  loggedIn: boolean;
  constructor(public translate: TranslateService, private formBuilder: FormBuilder,
              private cartService: CartService, private productService: ProductService,
              private router: Router, private userService: UserService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      value: ['', Validators.required]
    });
    this.cartService.cartData$.subscribe(data => {
      this.cartData = data;
      this.cartTotal = 0;
      data?.data.forEach(product => this.cartTotal += product.cartNum);
    });
    this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.items = this.buildCategoryMenu();
        this.profileitems = this.buildProfileMenu();
      });
    this.profileitems = this.buildProfileMenu();
    this.userService.loggedIn$.subscribe(data => {
      this.loggedIn = data;
      this.profileitems[0].visible = this.loggedIn;
      this.profileitems[1].visible = !this.loggedIn;
    });
  }

  private buildProfileMenu() {
    const retVal: MenuItem[] = [
      {
        label: this.translate.instant('HEADER.LOGOUT'), icon: 'pi pi-fw pi-sign-out', command: () => {
          this.userService.logout();
        },
        visible: this.loggedIn
      },
      {
        label: this.translate.instant('HEADER.LOGIN'), icon: 'pi pi-fw pi-sign-in',
        routerLink: '/login',
        visible: !this.loggedIn
      },
      { label: this.translate.instant('HEADER.VIEWPROFILE'), icon: 'pi pi-fw pi-user' },
      { label: this.translate.instant('HEADER.MYORDERS'), icon: 'pi pi-fw pi-credit-card' }
    ];
    return retVal;
  }

  get f() { return this.searchForm.controls; }

  onSearch() {
    this.productService.searchByKeyword(this.f.value.value);
    this.router.navigate(['/home/product'] ,
          {​​​​​​​​ queryParams: {​​​​​​​​ value : this.f.value.value }​​​​​​​​}​​​​​​​​);
  }

  buildCategoryMenu() {
    const retVal: MenuItem[] = [
      {
        label: this.translate.instant('HEADER.ALL'), command: () => {
          this.productService.searchByCategory('All');
          this.router.navigate(['/home/product'] ,
            {​​​​​​​​ queryParams: {​​​​​​​​ category: 'All', subcategory: '' }​​​​​​​​}​​​​​​​​);
        }
      },
      {
      label: this.translate.instant('HEADER.CLOTHING'),
      items: [
        {
          label: this.translate.instant('HEADER.MEN'), icon: 'pi pi-fw pi-user', command: () => {
            this.productService.searchByCategory('Clothing', 'Men');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Clothing', subcategory: 'Men' }​​​​​​​​}​​​​​​​​);
          }
        },
        {
          label: this.translate.instant('HEADER.WOMEN'), icon: 'pi pi-fw pi-user', command: () => {
            this.productService.searchByCategory('Clothing', 'Women');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Clothing', subcategory: 'Women' }​​​​​​​​}​​​​​​​​);
          }
        }
      ], command: () => {
        this.productService.searchByCategory('Clothing');
        this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Clothing', subcategory: '' }​​​​​​​​}​​​​​​​​);
      }
    },
    {
      label: this.translate.instant('HEADER.BOOKS'),
      items: [
        {
          label: this.translate.instant('HEADER.SCIFI'), icon: 'pi pi-fw pi-book', command: () => {
            this.productService.searchByCategory('Books', 'Scifi');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Books', subcategory: 'Scifi' }​​​​​​​​}​​​​​​​​);
          }
        },
        {
          label: this.translate.instant('HEADER.MYSTERY'), icon: 'pi pi-fw pi-book', command: () => {
            this.productService.searchByCategory('Books', 'Mystery');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Books', subcategory: 'Mystery' }​​​​​​​​}​​​​​​​​);
          }
        },
        {
          label: this.translate.instant('HEADER.BUSINESS'), icon: 'pi pi-fw pi-book', command: () => {
            this.productService.searchByCategory('Books', 'Business');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Books', subcategory: 'Business' }​​​​​​​​}​​​​​​​​);
          }
        },
        {
          label: this.translate.instant('HEADER.COOKBOOK'), icon: 'pi pi-fw pi-book', command: () => {
            this.productService.searchByCategory('Books', 'Cookbooks');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Books', subcategory: 'Cookbook' }​​​​​​​​}​​​​​​​​);
          }
        }
      ], command: () => {
        this.productService.searchByCategory('Books');
        this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Books', subcategory: '' }​​​​​​​​}​​​​​​​​);
      }
    },
    {
      label: this.translate.instant('HEADER.ELECTRONICS'),
      items: [
        {
          label: this.translate.instant('HEADER.TV'), icon: 'pi pi-fw pi-tablet', command: () => {
            this.productService.searchByCategory('Electronics', 'TV');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Electronics', subcategory: 'TV' }​​​​​​​​}​​​​​​​​);
          }
        },
        {
          label: this.translate.instant('HEADER.DISK'), icon: 'pi pi-fw pi-mobile', command: () => {
            this.productService.searchByCategory('Electronics', 'Disk/Drive');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Electronics', subcategory: 'Disk/Drive' }​​​​​​​​}​​​​​​​​);
          }
        }
      ], command: () => {
        this.productService.searchByCategory('Electronics');
        this.router.navigate(['/home/product'] ,
          {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Electronics', subcategory: '' }​​​​​​​​}​​​​​​​​);
      }
    },
    {
      label: this.translate.instant('HEADER.LUGGAGE'), command: () => {
        this.productService.searchByCategory('Luggage');
        this.router.navigate(['/home/product'] ,
          {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Luggage', subcategory: '' }​​​​​​​​}​​​​​​​​);
      }
    },
    {
      label: this.translate.instant('HEADER.JEWELLERY'), command: () => {
        this.productService.searchByCategory('Jewellery');
        this.router.navigate(['/home/product'] ,
          {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Jewellery', subcategory: '' }​​​​​​​​}​​​​​​​​);
      }
    }, {
      label: this.translate.instant('HEADER.FOOD'),
      items: [
        {
          label: this.translate.instant('HEADER.FRUIT'), icon: 'pi pi-fw pi-heart', command: () => {
            this.productService.searchByCategory('Food', 'Fruit');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Food', subcategory: 'Fruit' }​​​​​​​​}​​​​​​​​);
          }
        },
        {
          label: this.translate.instant('HEADER.VEGETABLE'), icon: 'pi pi-fw pi-heart', command: () => {
            this.productService.searchByCategory('Food', 'Vegetables');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Food', subcategory: 'Vegetable' }​​​​​​​​}​​​​​​​​);
          }
        },
        {
          label: this.translate.instant('HEADER.BAKERY'), icon: 'pi pi-fw pi-heart', command: () => {
            this.productService.searchByCategory('Food', 'Bakery');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Food', subcategory: 'Bakery' }​​​​​​​​}​​​​​​​​);
          }
        },
        {
          label: this.translate.instant('HEADER.DAIRY'), icon: 'pi pi-fw pi-heart', command: () => {
            this.productService.searchByCategory('Food', 'Dairy');
            this.router.navigate(['/home/product'] ,
             {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Food', subcategory: 'Dairy' }​​​​​​​​}​​​​​​​​);
          }
        }
      ], command: () => {
        this.productService.searchByCategory('Food');
        this.router.navigate(['/home/product'] ,
          {​​​​​​​​ queryParams: {​​​​​​​​ category: 'Food', subcategory: '' }​​​​​​​​}​​​​​​​​);
      }
    }];
    return retVal;
  }

}
