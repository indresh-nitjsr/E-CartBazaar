import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { IProduct, IReview } from '../models/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  imageIndex: number = 1;
  product!: IProduct;
  reviewControl = new FormControl('');
  showError = false;
  reviewSaved = false;
  otherReviews: IReview[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getProduct(id).subscribe((res: any) => {
        this.product = res;
        this.fetchAllReviews();
      });
    });
  }

  submitReview() {
    console.log("Hello");

    let review = this.reviewControl.value;

    if (review === '' || review === null) {
      this.showError = true;
      return;
    }

    let userid = this.utilityService.getUser().id;
    let productid = this.product.id;

    this.navigationService.submitReview(userid, productid, review).subscribe((res) => {
      this.reviewSaved = true;
      this.fetchAllReviews();
      this.reviewControl.setValue("");
    })
  }

  fetchAllReviews() {
    this.otherReviews = [];
    this.navigationService
      .getAllReviewsOfProduct(this.product.id)
      .subscribe((res: any) => {
        for (let review of res) {
          this.otherReviews.push(review);
        }
      });
  }

}
