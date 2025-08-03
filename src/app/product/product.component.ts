import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { IProduct } from '../models/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  view: 'grid' | 'list' = 'list';
  sortby: 'default' | 'htl' | 'lth' = 'default';
  products: IProduct[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let category = params.category;
      let subcategory = params.subcategory;

      if (category && subcategory) {
        this.navigationService
          .getProducts(category, subcategory, 10)
          .subscribe((res: any) => {
            this.products = res;
          })
      }
    })
  }


  public sortByPrice(sortkey: string) {
    this.products.sort((a, b) => {
      if (sortkey === 'default') {
        return a.id > b.id ? 1 : -1;
      }

      // if (sortkey === 'htl') {
      //   return this.utilityService.applyDiscount(a.price, a.offer.discount) >
      //     this.utilityService.applyDiscount(b.price, b.offer.discount) ? -1 : 1;
      // }

      // if (sortkey === 'lth') {
      //   return this.utilityService.applyDiscount(a.price, a.offer.discount) >
      //     this.utilityService.applyDiscount(b.price, b.offer.discount) ? 1 : -1;
      // }


      return (sortkey === 'htl' ? 1 : -1) * (this.utilityService.applyDiscount(a.price, a.offer.discount) >
        this.utilityService.applyDiscount(b.price, b.offer.discount) ? -1 : 1);

      return 0;
    });
  }

}
