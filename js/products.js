 export class Product{
    constructor(product_name,description,price,image_url,product_id,tag,isDiscounted,discount_value){
        this.product_name = product_name;
        this.description=description;
        this.price = price;
        this.image_url = image_url;
        this.product_id = product_id;
        this.tag = tag
        this.isDiscounted = isDiscounted;
        this.discount_value = discount_value;
        this.onProduckClick = function(){}
        this.discountedPrice = 0
        // this.discount_percentage = discount_percentage;
        // this.discounted_price = price - (price*discount_percentage);
    }
    //creating elements
    create(){
        this.discountedPrice = this.price - (this.price*this.discount_value);
        var card = document.createElement("div");
        var container = document.createElement("div");
        var image = document.createElement("img");
        var product_name_h4 = document.createElement("h4");
        var price_text = document.createElement("h3");
        var discount = document.createElement("h6");
        var product_description_p = document.createElement("div");
        //set attributesss
        container.className = "container";
        container.style.width = "200px";
        container.style.marginLeft = "2%";
        container.style.fontFamily = "Questrial";
        container.style.height = "100px"
        container.style.marginTop = "5px"
        product_description_p.textContent = this.description;
        product_description_p.style = "color = rgba(0,0,0,50)"
        product_description_p.style.marginBlockStart = 0;
        product_description_p.style.marginBlockEnd = 0;
        product_description_p.style.width = "360px"
        product_description_p.style.height = "20px"
        product_description_p.style.fontWeight = "100"
        product_description_p.style.fontSize = "13px"
        product_description_p.style.wordWrap = " break-word";
  
        card.className = "card";
        card.style.textAlign = "justify"
        image.src = this.image_url;
        image.alt = "../image/loading_image.png";
        image.style.width = "250px"
        image.style.height = "330px"
        image.style.objectFit = "cover"
        image.draggable = false;
        
        
        price_text.style = "color:#ff5e00;"
        price_text.style.fontFamily = "Questrial";
        price_text.style.fontWeight = "100"
        price_text.style.fontSize = "1.5rem"
        price_text.style.marginBlockStart = 0;
        price_text.style.marginBlockEnd = 0;
        price_text.style.marginTop = "0px"
        //adding elements
        product_name_h4.innerText = this.product_name;
        product_name_h4.style.textAlign = "justify"
        container.append(product_name_h4);
        container.append(product_description_p);
        container.append(price_text);
        
        if(this.isDiscounted){
            price_text.innerText = "₱ "+this.discountedPrice.toFixed(2);
            discount.style.marginBlockStart = 0;
            discount.style.marginBlockEnd = 0;
            discount.style.fontSize = "15px";
            discount.innerHTML = '<span style="text-decoration-line: line-through;font-weight:150;color:rgba(0,0,0,0.7)">₱ '+this.price.toFixed(2)+'</span>'+' '+(this.discount_value*100).toFixed(2)+'%'

            container.append(discount);
        }
        else{
            price_text.innerText = "₱ "+this.price.toFixed(2);
        }
        
        card.append(image);
        card.append(container);
        card.product_id = this.product_id;
        card.onclick = ()=>{
            this.onProduckClick(this);
        } 
        return card;
    } 

}

export class ProductContainer{
    constructor(elementID,products){
        this.products=products;
        this.elementID = elementID;
        var product_container = document.getElementById(this.elementID);//get the container where you want to put the cards
        var card = product_container.getElementsByClassName("card");

        var speed = 1000/60;//the speed of the scroll which is 60 frames/s
        var isScroll = true;//use to indicate if autoScroll can scroll or not
        var isDown = false;//use to indicate if the mouse is pressing the product container
        var startX;//use for scrolling using mouse
        var scrollLeft;//this will store the value of the current scrollValue when mousedown
        var productList = [];//list of product objects
        var forward = true;//indicator if the auto scroll is scrolling forward or else
        var lastScroll = 0;//value for the last scroll before current scroll value
        products.forEach((value) =>{// adding produc card
            productList.push(value);//adding this prodcut to the array
            product_container.append(value.create());//then adding to the element
        })
      
        productList.forEach((value,index)=>{//init for cards EventListener
            // card[index].onclick = ()=>{
            //     console.log(value.id);
            // }
            card[index].addEventListener("mouseover",(e) =>{//if the mouse is ontop of the card the stop autoScroll
                isScroll = false;
            });
            card[index].addEventListener("mouseleave",(e) =>{//else continue
                isScroll = true;
            });
        });
        //Scroll by holding leftmouse button and drag to left or right
        product_container.addEventListener("mousedown",(e) =>{
            isDown = true;//set is down to true when user hold the leftmouse button on the product_container
            isScroll = false//let the autoScroll false
            startX = e.pageX - product_container.offsetLeft;//init the startX
        //set the scrollLeft to the value of the scrollLeft of the product_container by the 
        //time the user hold the leftmouse button on the product_container 
            scrollLeft = product_container.scrollLeft;
        });
        product_container.addEventListener('mouseover',()=>{
            isScroll = false;
        })
        product_container.addEventListener('mouseleave', () => {
            isScroll = true;
            isDown = false;//if mouse leaves the container then isDown is false
        });

        product_container.addEventListener('mouseup', () => {
            isDown = false;//if user release the mouse then isDown is false

        });

        product_container.addEventListener('mousemove', (e) => {
            if(!isDown) return;//if is down is fallse the stop or return
            isScroll = false;//let the autoScroll stop
            e.preventDefault();
            const x = e.pageX - product_container.offsetLeft;//getting the difference os the e.pageX and the offsetLeft of the container
            const walk = (x - startX) * 1;//setting speed 
            product_container.scrollLeft = scrollLeft - walk;//set the scrollLeft 
        });
        //end

        product_container.onscroll = ()=>{//check if the scroll is on the end or on the start
            //compare the diffence of the scrollwidth and the scrollLeft of the container to the offsetWidth
            if(product_container.scrollWidth - product_container.scrollLeft==
                product_container.offsetWidth){
               // product_container.scrollLeft = 0;
                forward = false;//then let it be scroll to forward/right
            }
            else if(product_container.scrollLeft==0){
                //product_container.scrollLeft = product_container.offsetWidth;
                forward = true;
            }
        }
        //check if the user scroll is left or right
        product_container.addEventListener("scroll",()=>{
        if(!isScroll){
            if(product_container.scrollLeft > lastScroll){
                lastScroll = product_container.scrollLeft;
                forward = true;
            }
            else{
                lastScroll = product_container.scrollLeft;
                forward = false;
            }
        }
        
        })
        //this setInterval is used to autoScroll the product container

        setInterval(function(){
            //console.log(isScroll);
            if(isScroll){
                if(forward){
                    product_container.scrollLeft += 1;//add scroll overtime for smooth scrolling
                }
                else{
                    product_container.scrollLeft -= 1;
                }
            }
            
        },speed);
    }
}
