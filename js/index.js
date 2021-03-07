import {Product} from "./products.js";//importing product.js

//this must be a ul 
//and set the ul id so that it can the products card can be added as a child
var product_container = document.getElementById("home_product_container");


for(var i = 0 ;i < 20;i++){
    var product = new Product("test"+i
    ,"tes ni siya",i,
    "../image/gadget.png",i,"gadgets",false); // instance of a product
    var li = product.create();// this function will return a list item
    product_container.appendChild(li);//put it in the ul
}

//slide 
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}


