import {Product,ProductContainer} from "./products.js";//importing product.js
import {SearchBar} from "./searchbar.js";
import {ProductModal} from "./modal.js";
import {clothes} from "../image/products/clothing/clothing.js"
import {gadgets} from "../image/products/gadgets/gadgets.js"
import {personal} from "../image/products/personal/personal.js"

var p_tag = ["featured","discounted","popular"]

var discountedProductList = [];//this will carry the discounted products
var featuredProductList = [];//this will carry the discounted products
var popularProductList = [];//this will carry the discounted products
var productList = []//this will carry all the product

clothes.forEach(value =>{
  var product = new Product(value.name,value.discription,value.pice,value.image_url,clothes.indexOf(value),"clothing",true,Math.random()); // instance of a product
  productList.push(product);
});
gadgets.forEach(value =>{
  var product = new Product(value.name,value.discription,value.pice,value.image_url,clothes.indexOf(value),"gadgets",true,Math.random()); // instance of a product
  productList.push(product);
  
});
personal.forEach(value =>{
  var product = new Product(value.name,value.discription,value.pice,value.image_url,clothes.indexOf(value),"gadgets",true,Math.random()); // instance of a product
  productList.push(product);
});


for(var i = 0 ; i< productList.length;i++){
  productList[i].tag = p_tag[getRandomInt(0,2)]
  //console.log(productList[i].tag);
  switch(productList[i].tag){
    case "featured":
      featuredProductList.push(productList[i]);
      productList[i].discount_value = getRandomInt(10,30)/100;
      document.getElementById("featured_items").append(productList[i].create());
      break;
    case "discounted":
      productList[i].discount_value = getRandomInt(50,60)/100;
      // console.log(productList[i].price+" "+productList[i].discountedPrice);
      discountedProductList.push(productList[i]);
      break;
    case "popular":
      productList[i].discount_value = getRandomInt(30,50)/100;
      //console.log(productList[i].price+" "+productList[i].discountedPrice);
      popularProductList.push(productList[i]);
      break;
  }
  
  productList[i].onProductClick = (v) =>{
    var m = new ProductModal(v)
    document.getElementsByTagName('header')[0].append(m);
  }
}



document.getElementById("showcase").append(new SearchBar(productList));//creating a search bar
new ProductContainer("discounted_products",discountedProductList);//creating a container for product


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




