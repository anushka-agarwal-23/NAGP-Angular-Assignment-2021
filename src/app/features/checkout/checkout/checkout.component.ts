import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/core/data-models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartData: Cart;
  cartTotal: number;
  showSpinner: boolean;
  checkoutForm: any;
  shippingForm: any;
  acceptedTNC = false;
  constructor(private cartService: CartService, private router: Router,
              private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipcode: ['', [Validators.required, Validators.maxLength(6)]]
    });
    this.shippingForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipcode: ['', [Validators.required, Validators.maxLength(6)]]
    });
  }

  ngOnInit() {
    this.cartService.cartTotalAmount$.subscribe(data => this.cartTotal = data);
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    if (this.cartData?.total === 0){
      this.router.navigateByUrl('/home/cart');
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.checkoutForm.controls; }

  get g() { return this.shippingForm.controls; }

  getControlValidationClasses(control: AbstractControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

  onCheckout() {
    localStorage.removeItem('cart_item');
    this.cartService.cartData$.next(null);
    this.cartService.cartTotalAmount$.next(0);
    this.cartService.cart = null;
  }

  handlechange(event) {
    if (event.target.checked) {
      this.acceptedTNC = true;
    }
    else {
      this.acceptedTNC = false;
    }
  }
}
