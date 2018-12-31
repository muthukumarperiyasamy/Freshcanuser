import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataServiceProvider {

  countryurl = "assets/data/countries.json";
  cartCost: number = 0.00;
  apiUrl = "assets/data/menu.json";
  productsData: Array<any> = [];
  product: Array<any> = [];
  user = "assets/data/userDetail.json";
  userInfo: any = [];
  cartProduct: Array<[{ productName: string, "thumbnail": string, "productCode": string, "weight": number, "price": number, "item": number }]> = [];
  userCredentials: any;
  loggedInUser: any;
  item: number = 0;
  wishlist: any = [];
  cancount: any = 0;
  shopmobile: any;
  
  constructor(public http: Http) {
    console.log('Hello DataServiceProvider Provider');
    this.shopmobile = localStorage.getItem("groceryshopmobile");
  }


  getProducts(responed) {
    this.shopmobile = localStorage.getItem("groceryshopmobile");
    
    return new Promise(resolve => {
      let Data = {
        mobile: this.shopmobile,
        category: responed,
      }
      console.log('datas....' + JSON.stringify(Data));
      var link =  'https://www.freshcangrocery.in/cppi/get_file.php';
      var myData = JSON.stringify(Data);
      this.http.post(link, myData)
        .subscribe(data => {
          // console.log(data["_body"]);
          this.productsData = JSON.parse(data["_body"]);
          this.product=[];
          this.productsData.forEach(element => {
          //  if(responed != "Discount"){
          //   element.mrp="";
          //   element.discount="";
          //  }
          //  else{
          //    element.mrp= "&#8377; &nbsp;"+element.mrp;
          //   element.discount=element.discount+" %";
          //   }
            this.product.push(element);
          });
          resolve(this.product);
        }, err => {
          console.log(err);
        });
    });

  }

  getProductsjson() {
    return this.product;
  }

  addToCart(product) {
    this.item++;
    this.cartProduct.push(product);
    this.cartCost += product.price * product.item;
    console.log(this.item);

  }
  removeCart(){
    this.cartProduct=[];
    this.item=0;
    }
  getcandetails(can) {
    this.cancount = can;
    console.log(this.cancount);
  }
  getCancount() {
    return this.cancount;
  }
  getcount(){
    return this.item;
    
  }
  getCartProduct() {
    return this.cartProduct;
  }

  removeCartProduct(product, cost) {
    this.item--;
    console.log(this.item);
    this.cartCost = cost;
    let index = this.cartProduct.indexOf(product);
    this.cartProduct.splice(index, 1);
    return this.cartCost = Number((this.cartCost - (product.price * product.item)).toFixed(1));
  }

}
