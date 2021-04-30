

//This class is the one who handle the search and suggestion
//It requires the list of products
 class SearchBar{
    constructor(products,isFloat,parent){
        this.parent = parent;
        this.isFloat = isFloat;
        this.return_search_element = document.createElement('div');
        this.products = products;
        this.onSubmit = ()=>{

        }
        let product_names = [];//this array will have all the name of the product
        let searched_prodcuts = []
        //creating the searchbar
        this.input_text = document.createElement('input');
        this.input_text.type = "submut"
        let submit = document.createElement('button');
        this.searchbar_container = document.createElement('div');
        this.result_container = document.createElement('div');
        let searchedWord = ""
        //init element
        submit.className = "fa fa-search search-submit-button";
        submit.type = "submit";
        this.input_text.placeholder = "Search Everything...";
        this.input_text.className = "search-input"
        this.searchbar_container.className = "searchbar";
        this.result_container.className = "result";
        this.return_search_element.className = "search_content";
        submit.onclick = ()=>{
            if(searched_prodcuts.length>0){
                this.onSubmit(searched_prodcuts,searchedWord);
            }
            
        }
        //when you hit enter
        this.input_text.addEventListener("keypress",(e)=>{
            if (e.key === 'Enter') {
                this.onSubmit(searched_prodcuts,searchedWord);
              }
            
        })
        //adding the input and the button to the searchbar container
        this.searchbar_container.appendChild(this.input_text);
        this.searchbar_container.appendChild(submit);
        
        //put all the names of the product to the product_names array
        products.forEach(element => {
            product_names.push(element.product_name.toUpperCase());
        });
        if(this.input_text.value.length<=0){//check if the input is empty
            this.result_container.style.backgroundColor = "rgba(0,0,0,0)"//true then set visible 0
        }
        
        //this part is where simple search algo
        this.input_text.addEventListener("input",(e)=>{//add input listener to the this.input_text
            searched_prodcuts = []
            searchedWord = this.input_text;
            let individual_result_container;//creating the container for individual result
            this.result_container.innerHTML = "";//remove all children in the result_container
            product_names.forEach(value =>{//loop to all product names
                // let words = this.input_text.value.toUpperCase().split(" ");
                let isSuggest = true;//let it be true
                for(let i = 0 ; i<this.input_text.value.length ;i++){//this loop will check every letter of the input and compare it in every letter of the products name
                    if(value.toUpperCase()[i]!=this.input_text.value.toUpperCase()[i]){
                        isSuggest = false;//if not equal the automatically that product is not what the user search for
                        break;
                    }
                }
                for(let i = 0 ; i<this.input_text.value.length ;i++){//this loop will check every letter of the input and compare it in every letter of the products name
                    // console.log(this.products[product_names.indexOf(value)].tag)
                    if(this.products[product_names.indexOf(value)].category.toUpperCase()[i]==this.input_text.value.toUpperCase()[i]){
                        isSuggest = true;//if not equal the automatically that product is not what the user search for
                        break;
                    }
                }
                if(value.toUpperCase().includes(this.input_text.value.toUpperCase())){
                    isSuggest = true;
                }
                
                //if the isSuggets is true and the input length is greater than zero
                if(isSuggest&&this.input_text.value.length>0){//then init resultbutton
                    
                    let resultBtn = document.createElement("button");
                    resultBtn.onclick = (e)=>{//set on click when the user click the desired result
                        let prodModal = new ProductModal(products[product_names.indexOf(value)]);
                        prodModal.onAddtocart = (q,p)=>{
                            totalQuantity+=q;
                            onCartProdcuts.push({q,p});
                            prodModal.modal_container.style.display = "none";
                            document.getElementById("cart-btn-text").textContent = totalQuantity;
                            document.getElementsByClassName("search_content")[0].style.display = "block"
                        }
                        document.getElementsByTagName("header")[0].append(prodModal.modal_container)
                        console.log(products[product_names.indexOf(value)]);
                    }
                    searched_prodcuts.push(products[product_names.indexOf(value)]);
                    resultBtn.innerText = value.toLowerCase();//the result value will be the inner text of the button
                    resultBtn.className = "result_button";//assign a class 
                    individual_result_container = document.createElement("div");//create a container for the result
                    individual_result_container.appendChild(resultBtn);//put the button on the container
                    this.result_container.appendChild(individual_result_container);//then put the result_container to the result_container
                }
            });
            if(this.input_text.value.length<=0){
                this.result_container.style.backgroundColor = "rgba(0,0,0,0)"

            }
            else{
                this.result_container.style.backgroundColor = "white"
            }
            
        });
        // always on top
        let shrink = true;
        let shrinkValue = 0;
        let p = document.getElementById("product-search");
        let style = p.currentStyle || window.getComputedStyle(p);
        let originalMarginTop =  style.marginTop;
        var marginTop = parseInt(style.marginTop.toString().replace('px',''))
        if(this.isFloat){
            window.addEventListener("resize",value =>{
                if(shrinkValue<window.innerWidth){//expand
                    shrinkValue = window.innerWidth;
                    shrink = false;
                }
                else{//shrink
                    shrinkValue = window.innerWidth;
                    shrink = true;
                }

                if(window.innerWidth<1030&&shrink&&marginTop<100){
                    marginTop+=3
                    document.getElementById("product-search").style.marginTop = marginTop.toString()+"px"; 
                }
                else if(window.innerWidth<1155&&!shrink){
                    marginTop -=3
                    document.getElementById("product-search").style.marginTop = marginTop.toString()+"px"; 
                }
                else if (window.innerWidth>1155){
                    document.getElementById("product-search").style.marginTop = originalMarginTop; 
                }
            });
        }
        

        this.return_search_element.appendChild( this.searchbar_container);//put the searchbar to the return return_search_element
        this.return_search_element.appendChild(this.result_container);///put the result_container to the return return_search_element
        return this;
        
    }
    
}