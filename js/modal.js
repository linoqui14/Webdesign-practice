import{Product} from "./products.js";
export class ProductModal{
    //creating the modal
    constructor(product){
        this.product = product;
        this.modal_container = document.createElement('div');
        this.onAddtocart = ()=>{};
        var modal_content = document.createElement('div');
        var product_name = document.createElement('div')
        var close_btn = document.createElement('button')
        var image = document.createElement('img');
        var detail_container = document.createElement('div');
        var description = document.createElement('div');
        var price = document.createElement('div');
        var discount = document.createElement('div');
        var quantity_container = document.createElement('div');
        var quantity_add = document.createElement('button');
        var quantity_minus = document.createElement('button');
        var quantity_label = document.createElement('div');
        var quantity_value = document.createElement('input');
        var add_to_cart_btn = document.createElement('button');
        

        this.modal_container.className = "modal";
        this.modal_container.style.display = "block";
        this.quaintity = 1;
        modal_content.className = "modal-content";
        modal_content.style.height="500px"
        modal_content.style.maxHeight="500px"
        modal_content.style.maxWidth = "700px"
        modal_content.style.minHeight="300px"
        modal_content.style.minWidth = "200px"
        modal_content.style.textOverflow = "break-word"
        modal_content.style.position = "relative"
        product_name.innerText = product.product_name;
        product_name.style.fontFamily = "Quicksand-Bold";
        product_name.style.fontSize = "30px"

        product_name.style.textOverflow = "ellipsis";
        product_name.style.overflow = "hidden";
        product_name.style.whiteSpace = "none" 

        quantity_label.innerText = "Quantity";
        quantity_label.style.float = "left"
        quantity_label.style.marginRight = "10px"
        quantity_minus.innerText = "-"
        quantity_add.innerText = "+"
        quantity_value.placeholder = "0";
        quantity_value.style.width = "20px"
        quantity_value.style.textAlign = "center"
        quantity_container.style.display = "inline"
        quantity_container.style.width = "200px"
        quantity_container.style.marginTop = "50px"
        quantity_container.append(quantity_label)
        quantity_container.append(quantity_minus)
        quantity_container.append(quantity_value)
        quantity_container.append(quantity_add)
        
        quantity_minus.onclick = ()=>{
            if( this.quaintity>0){
                this.quaintity--;
                quantity_value.value =  this.quaintity;
            }
        }
        quantity_add.onclick = ()=>{
            this.quaintity++;
            quantity_value.value =  this.quaintity;
        }
       
        add_to_cart_btn.innerText = "Add to Cart"
        add_to_cart_btn.style.position = "absolute";
        add_to_cart_btn.style.bottom = "10px"
        add_to_cart_btn.style.right = "10px"
        add_to_cart_btn.style.width = "200px"
        add_to_cart_btn.style.height = "50px"
        add_to_cart_btn.style.color = "white"
        add_to_cart_btn.style.backgroundColor = "#ff5e00"
        add_to_cart_btn.style.outline = "none"
        add_to_cart_btn.style.border = "none"
        add_to_cart_btn.id = "add-cart-btn"

        add_to_cart_btn.addEventListener("mouseover",()=>{
            add_to_cart_btn.style.backgroundColor = "rgba(82, 82, 82, 0.8)"
        });
        add_to_cart_btn.addEventListener("mouseleave",()=>{
            add_to_cart_btn.style.backgroundColor = "#ff5e00"
        });
        add_to_cart_btn.onclick = ()=>{
            this.onAddtocart(this.quaintity,this.product);
            document.getElementsByClassName("search_content")[0].style.display = "block"
        }
       

        description.style.marginTop = "5px"
        description.style.fontFamily = "Quicksand-Bold";
        description.style.fontWeight = "bold"
        description.style.fontSize = "20px"
        
        description.innerText = this.product.description;

        close_btn.innerText = "x";
        close_btn.style.fontSize = "20px"
        close_btn.style.fontWeight = "bold"
        close_btn.style.position = "absolute"
        close_btn.style.right = "10px"
        close_btn.style.top = "10px"
        close_btn.style.color = "rgba(82, 82, 82, 0.8)"
        close_btn.style.backgroundColor = "white"
        close_btn.style.outline = "none"
        close_btn.style.border = "none"

        close_btn.addEventListener("mouseleave",()=>{
            close_btn.style.backgroundColor = "white"
            close_btn.style.color = "rgba(82, 82, 82, 0.8)"
        });
        close_btn.addEventListener("mouseover",()=>{
            close_btn.style.backgroundColor = "rgba(82, 82, 82, 0.8)"
            close_btn.style.color = "white"
        });
        // close_btn.float = "right"

        price.innerText =   "₱ "+this.product.discountedPrice.toFixed(2);
        price.style.fontSize = "35px"
        price.style.color = "#ff5e00"
        price.style.marginTop = "20px";

        discount.innerHTML = '<span style="text-decoration-line: line-through;font-weight:150;color:rgba(0,0,0,0.7)">₱ '+this.product.price.toFixed(2)+'</span>'+' '+(this.product.discount_value*100).toFixed(2)+'%'
        discount.style.fontWeight = "bold";
        discount.style.marginBottom = "20px"

        detail_container.style.paddingRight = "20px";
        detail_container.style.marginTop = "20px"

        image.src = this.product.image_url;
        image.alt = "../image/loading_image.png";
        image.style.minWidth = "20%";
        image.style.minHeight = "50%";
        image.style.width = "50%";
        image.style.height = "100%";

        image.style.objectFit = "contain"
        // image.style.display = "inline"
        image.style.float = "left"
        image.style.marginRight = "20px"
       
        detail_container.append(product_name);
        detail_container.append(description);
        detail_container.append(price);
        detail_container.append(discount);
        detail_container.append(quantity_container);
        detail_container.append(add_to_cart_btn);
        
        modal_content.append(image);
        
        modal_content.append(detail_container);
        modal_content.append(close_btn);
        modal_content.append(add_to_cart_btn);
        this.modal_container.append(modal_content);
        
        
        
        document.getElementsByClassName("search_content")[0].style.display = "none"
        close_btn.onclick = () =>{
            this.modal_container.style.display = "none";
            document.getElementsByClassName("search_content")[0].style.display = "block"
        }
        //this event will auotmaitcally fit the content of the modal
        var w_width =window.innerWidth;
        window.addEventListener("resize",value =>{
            w_width = window.innerWidth;
            console.log(w_width)
            if(w_width<=1050){
                product_name.style.fontSize = "25px"
                description.style.fontSize = "15px"
            }
          
            else{
                product_name.style.fontSize = "30px"
                description.style.fontSize = "20px"
            }
        });
        if(w_width<=1050){
            product_name.style.fontSize = "25px"
            description.style.fontSize = "15px"
        }
      
        else{
            product_name.style.fontSize = "30px"
            description.style.fontSize = "20px"
        }
        return  this;
    }

}
//not finish, only show product image
export class CartModal{
    //user cart modal
    constructor(products){
        
        var close_btn = document.createElement('button')
        this.products = products;
        this.modal_container = document.createElement('div');
        var modal_content = document.createElement('div');

        this.modal_container.className = "modal";
        this.modal_container.style.display = "block";
        var product_container = document.createElement("div");
        close_btn.innerText = "x";
        close_btn.style.fontSize = "20px"
        close_btn.style.fontWeight = "bold"
        close_btn.style.position = "absolute"
        close_btn.style.right = "10px"
        close_btn.style.top = "10px"
        close_btn.style.color = "rgba(82, 82, 82, 0.8)"
        close_btn.style.backgroundColor = "white"
        close_btn.style.outline = "none"
        close_btn.style.border = "none"
        close_btn.onclick = () =>{
            this.modal_container.style.display = "none";
            document.getElementsByClassName("search_content")[0].style.display = "block"
        }
        close_btn.addEventListener("mouseleave",()=>{
            close_btn.style.backgroundColor = "white"
            close_btn.style.color = "rgba(82, 82, 82, 0.8)"
        });
        close_btn.addEventListener("mouseover",()=>{
            close_btn.style.backgroundColor = "rgba(82, 82, 82, 0.8)"
            close_btn.style.color = "white"
        });
        this.products.forEach(value =>{
            console.log(value);
            var contain = document.createElement("div");
            var image = document.createElement("img");
            image.src = value.p.image_url;
            image.style.width = "40px"
            image.style.height = "70px"
            image.style.objectFit = "contain"
            contain.append(image);
            product_container.append(image);
            
        })


        modal_content.className = "modal-content";
        modal_content.style.height="500px"
        modal_content.style.maxHeight="500px"
        modal_content.style.maxWidth = "700px"
        modal_content.style.minHeight="300px"
        modal_content.style.minWidth = "200px"
        modal_content.style.textOverflow = "break-word"
        modal_content.style.position = "relative"
        modal_content.append(product_container);
        modal_content.append(close_btn);
        console.log(products)

        document.getElementsByClassName("search_content")[0].style.display = "none"
        close_btn.onclick = () =>{
            this.modal_container.style.display = "none";
            document.getElementsByClassName("search_content")[0].style.display = "block"
        }
        this.modal_container.append(modal_content);
        return this;
    }
        
}