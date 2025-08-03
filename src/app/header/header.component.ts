import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICategory, INavigationItem } from '../models/models';
import { LoginComponent } from '../login/login.component';
import { Type } from '@angular/compiler';
import { RegisterComponent } from '../register/register.component';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  cartItems: number = 0;
  firstname: string = '';

  navigationList: INavigationItem[] = [];

  constructor(private navigationService: NavigationService, public utilityService: UtilityService) { }
  ngOnInit(): void {
    //Get category list
    this.navigationService.getCategoryList().subscribe((list: ICategory[]) => {
      for (let item of list) {
        //console.log(item);

        let present = false;
        for (let navItem of this.navigationList) {
          if (navItem.category === item.category) {
            navItem.subcategories.push(item.subCategory);
            present = true;
          }
        }

        if (!present) {
          this.navigationList.push({
            category: item.category,
            subcategories: [item.subCategory]
          });
        }
      }
    });
    //console.log(this.navigationList);

    //Cart
    if (this.utilityService.isLoggedIn()) {
      this.firstname = this.utilityService.getUser().firstName;
      this.navigationService
        .getActiveCartOfUser(this.utilityService.getUser().id)
        .subscribe((res: any) => {
          this.cartItems = res.cartItems.length;
        });
    }

    this.utilityService.changeCart.subscribe((res: any) => {
      if (parseInt(res) === 0) this.cartItems = 0;
      else this.cartItems += parseInt(res);
    })
  }

  openModal(name: string) {
    this.container.clear();
    let componentType!: any;

    if (name === 'login') {
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Login Information';
    }
    if (name === 'register') {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Register Information';
    }
    this.container.createComponent(componentType)
  }

}
