import { Component, Input } from '@angular/core';
import { UserCartService } from '@cart/services/user-cart.service';
import { Cart } from '@cart/types/cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-btn',
  templateUrl: './cart-btn.component.html',
  styleUrls: ['./cart-btn.component.scss'],
})
export class CartBtnComponent {
  @Input() productId!: number;
  currentCart!: Cart;
  private currentCartSub!: Subscription;

  constructor(private _current_user_cart: UserCartService) {}
  ngOnInit() {
    this._current_user_cart.getCurrentUserCart();
    this.currentCartSub = this._current_user_cart.currentCart.subscribe(
      (currentCart: Cart) => {
        console.log(currentCart);
        this.currentCart = currentCart;
      }
    );
  }
  ngOnDestroy() {
    this.currentCartSub.unsubscribe();
  }

  addProductToCart() {
    if (this.currentCart.hasOwnProperty(this.productId)) {
      this.currentCart[this.productId]++;
    } else {
      this.currentCart[this.productId] = 1;
    }
    this._current_user_cart.saveCurrentUserCart(this.currentCart);
  }
}
