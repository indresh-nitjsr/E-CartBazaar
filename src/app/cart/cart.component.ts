import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { NavigationService } from '../services/navigation.service';
import { ICart, IPayment } from '../models/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  usersCart: ICart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: ''
  }

  usersPaymentInfo: IPayment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: ''
    },
    totalAmount: 0,
    shipingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  }

  usersPreviousCarts: ICart[] = [];

  constructor(public utilityService: UtilityService, private navigationService: NavigationService) { }
  ngOnInit(): void {
    //Get Cart
    this.navigationService.getActiveCartOfUser(this.utilityService.getUser().id).subscribe((res: any) => {
      //console.log(res);
      this.usersCart = res;

      // Calculate Payment
      this.utilityService.calculatePayment(
        this.usersCart,
        this.usersPaymentInfo
      );
    });

    //Get previous carts
    this.navigationService
      .getAllPreviousCarts(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        console.log(res);

        this.usersPreviousCarts = res;
      })
  }

}
