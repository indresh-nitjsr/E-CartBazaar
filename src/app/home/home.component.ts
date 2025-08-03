import { Component, OnInit } from '@angular/core';
import { ICategory, ISuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //item: any;
  suggestedProducts: ISuggestedProduct[] = [
    {
      banerimage: 'banner/Baner_Mobile.png',
      category: {
        id: 0,
        category: 'electronics',
        subCategory: 'mobiles'
      }
    },
    {
      banerimage: 'banner/Baner_Laptop.png',
      category: {
        id: 0,
        category: 'electronics',
        subCategory: 'laptops'
      }
    },
    {
      banerimage: 'banner/Baner_Chair.png',
      category: {
        id: 0,
        category: 'furniture',
        subCategory: 'chairs'
      }
    }
  ];

  constructor() { }

  ngOnInit(): void { }

}
