export interface ISuggestedProduct {
    banerimage: string;
    category: ICategory;
}

export interface INavigationItem {
    category: string;
    subcategories: string[];
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    mobile: string;
    password: string;
    createdAt: string;
    modifiedAt: string;
}

// #region Product
export interface IOffer {
    id: number;
    title: string;
    discount: number;
}

export interface ICategory {
    id: number;
    category: string;
    subCategory: string;
}

export interface IProduct {
    id: number;
    title: string;
    description: string;
    productCategory: ICategory;
    offer: IOffer;
    price: number;
    quantity: number;
    imageName: string;
}

export interface IReview {
    id: number;
    user: IUser;
    product: IProduct;
    value: string;
    createdAt: string;
}
// #endregion



// #region Cart
export interface ICartItem {
    id: number;
    product: IProduct;
}

export interface ICart {
    id: number;
    user: IUser;
    cartItems: ICartItem[];
    ordered: boolean;
    orderedOn: string;
}
// #endregion



// #region Payment and Orders
export interface IPaymentMethod {
    id: number;
    type: string;
    provider: string;
    available: boolean;
    reason: string;
}

export interface IPayment {
    id: number;
    user: IUser;
    paymentMethod: IPaymentMethod;
    totalAmount: number;
    shipingCharges: number;
    amountReduced: number;
    amountPaid: number;
    createdAt: string;
}

export interface IOrder {
    id: number;
    user: IUser;
    cart: ICart;
    payment: IPayment;
    createdAt: string;
}
// #endregion