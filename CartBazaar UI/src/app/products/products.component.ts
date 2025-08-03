import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../models/models';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() view: 'grid' | 'list' | 'currcartitem' | 'prevcartitem' = 'grid';
  @Input() product: IProduct = {
    id: 0,
    title: '',
    description: '',
    productCategory: {
      id: 1,
      category: '',
      subCategory: '',
    },
    offer: {
      id: 1,
      title: '',
      discount: 0
    },
    price: 0,
    quantity: 0,
    imageName: ''
  }

  constructor(public utilityService: UtilityService) { }

  ngOnInit(): void { }
}
