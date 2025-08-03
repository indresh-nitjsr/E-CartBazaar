import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { ICategory, IOrder, IPayment, IPaymentMethod, IUser } from '../models/models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl = "https://localhost:7235/api/Shopping/";

  constructor(private http: HttpClient) { }

  getCategoryList() {
    let url = this.baseUrl + 'GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: ICategory = {
            id: category.id,
            category: category.category,
            subCategory: category.subCategory
          };
          return mappedCategory;
        })
      )
    )
  }

  getProducts(category: string, subcategory: string, count: number) {
    let url = this.baseUrl + 'GetProducts';
    return this.http.get<any[]>(url, {
      params: new HttpParams()
        .set('category', category)
        .set('subcategory', subcategory)
        .set('count', count)
    });
  }

  getProduct(id: number) {
    let url = this.baseUrl + 'GetProducts/' + id;
    return this.http.get(url);
  }

  registerUser(user: IUser) {
    let url = this.baseUrl + "RegisterUser";
    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = this.baseUrl + "LoginUser";
    return this.http.post(url, { Email: email, Password: password }, { responseType: 'text' });
  }

  submitReview(userId: number, productId: number, review: string) {
    let obj: any = {
      User: {
        Id: userId,
      },
      Product: {
        Id: productId,
      },
      Value: review
    }

    let url = this.baseUrl + 'InsertReview';
    return this.http.post(url, obj, { responseType: 'text' });
  }

  getAllReviewsOfProduct(productId: number) {
    let url = this.baseUrl + 'GetProductReviews/' + productId;
    return this.http.get(url);
  }

  addToCart(userId: number, productId: number) {
    let url = this.baseUrl + 'InsertCartItem/' + userId + '/' + productId;
    return this.http.post(url, null, { responseType: 'text' });
  }


  getActiveCartOfUser(userid: number) {
    let url = this.baseUrl + 'GetActiveCartOfUser/' + userid;
    return this.http.get<any>(url);
  }

  getAllPreviousCarts(userid: number) {
    let url = this.baseUrl + 'GetAllPreviousCartsOfUser/' + userid;
    return this.http.get(url);
  }

  getPaymentMethods() {
    let url = this.baseUrl + 'GetPaymentMethods';
    return this.http.get<IPaymentMethod[]>(url);
  }

  insertPayment(payment: IPayment) {
    return this.http.post(this.baseUrl + 'InsertPayment', payment, { responseType: 'text' });
  }

  insertOrder(order: IOrder) {
    return this.http.post(this.baseUrl + 'InsertOrder', order, { responseType: 'text' });
  }
}
