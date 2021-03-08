import {Product} from "./products.js";

//This class is the one who handle the search and suggestion
//It requires the list of products
export class SearchBar{
    constructor(products){
        this.return_search_element = document.createElement('div');
        this.products = products;
        var product_names = [];//this array will have all the name of the product
        //creating the searchbar
        var input_text = document.createElement('input');
        var submit = document.createElement('button');
        this.searchbar_container = document.createElement('div');
        this.result_container = document.createElement('div');
        
        //init element
        submit.className = "fa fa-search search-submit-button";
        submit.type = "submit";
        input_text.placeholder = "Search Everything...";
        input_text.className = "search-input"
        this.searchbar_container.className = "searchbar";
        this.result_container.className = "result";
        this.return_search_element.className = "search_content";
        
        //adding the input and the button to the searchbar container
        this.searchbar_container.appendChild(input_text);
        this.searchbar_container.appendChild(submit);
        
        //put all the names of the product to the product_names array
        products.forEach(element => {
            product_names.push(element.product_name.toUpperCase());
        });
        if(input_text.value.length<=0){//check if the input is empty
            this.result_container.style.backgroundColor = "rgba(0,0,0,0)"//true then set visible 0
        }
        //this part is where simple search algo
        input_text.addEventListener("input",(e)=>{//add input listener to the input_text
            var individual_result_container;//creating the container for individual result
            this.result_container.innerHTML = "";//remove all children in the result_container
            product_names.forEach(value =>{//loop to all product names
                var words = input_text.value.toUpperCase().split(" ");
                var isSuggest = true;//let it be true
                for(var i = 0 ; i<input_text.value.length ;i++){//this loop will check every letter of the input and compare it in every letter of the products name
                    if(value.toUpperCase()[i]!=input_text.value.toUpperCase()[i]){
                        isSuggest = false;//if not equal the automatically that product is not what the user search for
                        break;
                    }
                }
                if(value.toUpperCase().includes(input_text.value.toUpperCase())){
                    isSuggest = true;
                }
                // words.forEach(x =>{
                //     if(x.toUpperCase().includes(x)){
                //         isSuggest = true;
                //     }
                // })
                
                //if the isSuggets is true and the input length is greater than zero
                if(isSuggest&&input_text.value.length>0){//then init resultbutton
                    var resultBtn = document.createElement("button");
                    resultBtn.onclick = (e)=>{//set on click when the user click the desired result
                        console.log(product_names.indexOf(value));
                    }
                    resultBtn.innerText = value.toLowerCase();//the result value will be the inner text of the button
                    resultBtn.className = "result_button";//assign a class 
                    individual_result_container = document.createElement("div");//create a container for the result
                    individual_result_container.appendChild(resultBtn);//put the button on the container
                    this.result_container.appendChild(individual_result_container);//then put the result_container to the result_container
                }
            });
            if(input_text.value.length<=0){
                this.result_container.style.backgroundColor = "rgba(0,0,0,0)"

            }
            else{
                this.result_container.style.backgroundColor = "white"
            }
            
        });
        // always on top
        window.onscroll = ()=>{
            var scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
            if(scrollPos < 300){
                this.return_search_element.style.position = null;
                this.return_search_element.style.top = null;
            }else if(scrollPos >= 300){
                this.return_search_element.style.position = "fixed";
                this.return_search_element.style.top = "30px";
            }
            
        }

        this.return_search_element.appendChild( this.searchbar_container);//put the searchbar to the return return_search_element
        this.return_search_element.appendChild(this.result_container);///put the result_container to the return return_search_element
        return this.return_search_element;//and return int
        
    }
    
}