import {Product,ProductContainer} from "./products.js";//importing product.js
import {SearchBar} from "./searchbar.js";
import {ProductModal,CartModal} from "./modal.js";
import {clothes} from "../image/products/clothing/clothing.js"
import {gadgets} from "../image/products/gadgets/gadgets.js"
import {personal} from "../image/products/personal/personal.js"
import {home} from "../image/products/home/home.js"
var p_tag = ["featured","discounted","popular"]

var onCartProdcuts = [];//array of prodcut and quantity
var discountedProductList = [];//this will carry the discounted products
var featuredProductList = [];//this will carry the eatured products
var popularProductList = [];//this will carry the popular products
var productList = []//this will carry all the product
var totalQuantity = 0
var current_page = 1;
//init for products and categories
clothes.forEach(value =>{
  var product = new Product(value.name,value.discription,value.pice,value.image_url,clothes.indexOf(value),"clothing",true,Math.random()); // instance of a product
  productList.push(product);
});
gadgets.forEach(value =>{
  var product = new Product(value.name,value.discription,value.pice,value.image_url,clothes.indexOf(value),"gadgets",true,Math.random()); // instance of a product
  productList.push(product);
  
});
personal.forEach(value =>{
  var product = new Product(value.name,value.discription,value.pice,value.image_url,clothes.indexOf(value),"personal",true,Math.random()); // instance of a product
  productList.push(product);
});
home.forEach(value =>{
  var product = new Product(value.name,value.discription,value.pice,value.image_url,clothes.indexOf(value),"living",true,Math.random()); // instance of a product
  productList.push(product);
});
//end
//for now, we randomly select tags for products
for(var i = 0 ; i< productList.length;i++){
  productList[i].tag = p_tag[getRandomInt(0,2)]
  switch(productList[i].tag){
    case "featured":
      featuredProductList.push(productList[i]);
      productList[i].discount_value = getRandomInt(10,30)/100;//discount
      document.getElementById("featured_items").append(productList[i].create());
      break;
    case "discounted":
      productList[i].discount_value = getRandomInt(50,60)/100;//discount
      discountedProductList.push(productList[i]);
      break;
    case "popular":
      productList[i].discount_value = getRandomInt(30,50)/100;//discount
      popularProductList.push(productList[i]);
      document.getElementById("popular_items").append(productList[i].create());
      break;
  }
  //event when a product clicked
  productList[i].onProductClick = (v) =>{
    var m = new ProductModal(v);
    m.onAddtocart = (q,p)=>{
      if(q>0){
        onCartProdcuts.push({q,p});
        m.modal_container.style.display = "none";
      }
      else{
        m.modal_container.style.display = "none";
      }
      totalQuantity+=q;
      document.getElementById("cart-btn-text").textContent = totalQuantity;
    }
    if(current_page==1){
      document.getElementsByTagName('header')[0].append(m.modal_container);
    }
    if(current_page==2){
      document.getElementById('products').append(m.modal_container);
    }
    
  }
  document.getElementById("all-products").append(productList[i].create());
}
//init search bar
var s1 = new SearchBar(productList,true);
var s2 = new SearchBar(productList,false);
document.getElementById("showcase").append(s1.return_search_element);//creating a search bar
document.getElementById("product-search").append(s2.return_search_element);//creating a search bar
new ProductContainer("discounted_products",discountedProductList);//creating a container for product// this is where the slide show somewhat a like
//end
//adding fucntion on search bar
s1.onSubmit =  (value,text)=>{
  current_page = 2;
  document.getElementById("home").style.display = "none"
  document.getElementById("products").style.display = ""
  document.getElementById("all-products").innerHTML = "";//reset when click
  value.forEach(x =>{
    document.getElementById("all-products").append(x.create());
  })
  document.getElementById("searched").innerText = "Results... "+text.value
  s1.result_container.innerHTML = ""
}
s2.onSubmit =  (value,text)=>{
  document.getElementById("all-products").innerHTML = "";//reset when click
  current_page = 2;
  document.getElementById("home").style.display = "none"
  document.getElementById("products").style.display = ""
  value.forEach(x =>{
    document.getElementById("all-products").append(x.create());
  })
  document.getElementById("searched").innerText = "Results... "+text.value
  s2.result_container.innerHTML = ""
}
//end

//this part is where we switch pages, instead going to other html file, I just hide and show each page
document.getElementById("logo").onclick = ()=>{
  current_page = 1;
  document.getElementById("home").style.display = ""
  document.getElementById("products").style.display = "none"
}
document.getElementById("to-product").onclick = ()=>{
  current_page = 2;
  document.getElementById("home").style.display = "none"
  document.getElementById("products").style.display = ""
  productList.forEach(x =>{
    document.getElementById("all-products").append(x.create());
  })
  document.getElementById("searched").innerText = "All Products"
}
//end
//show cart
document.getElementById("cart-btn").onclick = () =>{
  var m = new CartModal(onCartProdcuts);
  document.getElementsByTagName("body")[0].append(m.modal_container);
  
}
//end
//this is where we show each product according to its category
document.getElementById("all-products").innerHTML = "";//clearing the all product div a products page
document.getElementById("products").style.display = "none"//hinging the home
var catbtn = document.getElementsByClassName("cat-btn");

Array.prototype.forEach.call(catbtn, function(btn) {//adding onlcik on category buttons
  btn.onclick = ()=>{
    document.getElementById("all-products").innerHTML = "";//reset when click
    document.getElementById("home").style.display = "none"
    document.getElementById("products").style.display = ""
      productList.forEach( value =>{
        console.log(value.category.toUpperCase() + " "+btn.innerText.toUpperCase())//comare category
        if(value.category.toUpperCase()==btn.innerText.toUpperCase()){
          document.getElementById("all-products").append(value.create());//create card
          document.getElementById("searched").innerText = btn.innerText
        }
      })
    

  }
  
});


function getRandomInt(min, max) {//random from min to max
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}





