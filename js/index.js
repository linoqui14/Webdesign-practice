import {Product,ProductContainer} from "./products.js";//importing product.js
import {SearchBar} from "./searchbar.js";
import {ProductModal} from "./modal.js";

import {cloths} from "../image/products/clothing/clothing.js"
import {gadgets} from "../image/products/gadgets/gadgets.js"
var featureProductList = [];
var productList = []
cloths.forEach(value =>{
  //console.log(value);
  var product = new Product(value.name,value.discription,value.pice,value.image_url,cloths.indexOf(value),"gadgets",true,Math.random()); // instance of a product
  //console.log(product.product_name);
  featureProductList.push(product);//adding this prodcut to the array
  productList.push(product);
});



new ProductContainer("discounted_products",productList);//creating a container for product
gadgets.forEach(value =>{
  var product = new Product(value.name,value.discription,value.pice,value.image_url,cloths.indexOf(value),"gadgets",true,Math.random()); // instance of a product
  productList.push(product);
  document.getElementById("featured_items").append(product.create());
});

for(var i = 0 ;i < 10;i++){// adding produc card
  var product = new Product("test"+i,"tes ni siya",i*100,"../image/gadget.png",i,"gadgets",true,Math.random()); // instance of a product
  document.getElementById("popular_items").append(product.create());
}
document.getElementById("showcase").append(new SearchBar(productList));//creating a search bar

productList.forEach(value =>{
  value.onProduckClick = (v) =>{
    var m = new ProductModal(v)
    document.getElementsByTagName('header')[0].append(m);
  }
});




