 export class Product{
    
    constructor(product_name,description,price,image_url,id,tag,isDiscounted){
        this.product_name = product_name;
        this.description=description;
        this.price = price;
        this.image_url = image_url;
        this.id = id;
        this.tag = tag
        this.isDiscounted = isDiscounted;
    }
    //creating elements
    create(){
        var li = document.createElement("li");
        var card = document.createElement("div");
        var container = document.createElement("div");
        var image = document.createElement("img");
        var product_name_h4 = document.createElement("h4");
        var product_text_b = document.createElement("b");
        var product_description_p = document.createElement("p");
        //set attributesss
        container.className = "container";
        product_text_b.textContent = this.product_name;
        product_description_p.textContent = this.description;
        card.className = "card";
        image.src = this.image_url;
        image.alt = "../image/loading_image.png";
        image.style = "width:100%";
        li.id = this.id;
        //adding elements
        product_name_h4.append(product_text_b);
        card.append(image);
        card.append(container);
        container.append(product_name_h4);
        container.append(product_description_p);
        li.append(card);
        li.onclick = () => {
           console.log(this.id);
           
        }
        return li;
    } 
    
}
