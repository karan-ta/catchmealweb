import { Component } from 'react'
import eventBus from "./EventBus";
//eventbus is not used but kept here to easily copy from later
export default class Cart extends Component {
    constructor(props) {
        super(props)
     
     this.props = props;
      }
      //called when cart is empty and when new line item is added to cart.
       addItemToCart(data){
        let mycart = this.state.cart;
        let cartItem = new Object();
          cartItem.itemqty = 1;
          cartItem.itemname = data.itemname;
          cartItem.itemprice = data.itemprice;
          mycart.push(cartItem); 
          this.setState({ cart:mycart}) 
      }

      componentDidMount() {
        eventBus.on("addCart", (data) =>{
         let mycart = this.state.cart;
         this.state.cartTotal += Number(data.itemprice);
         if (mycart.length==0){
          console.log ("adding item to cart first time only once");
          this.addItemToCart (data);
         }
        else
         { 
           let nameMatchFound = false;
         for (let i in mycart) {
          if (mycart[i].itemname === data.itemname)
          {
            nameMatchFound = true;
            mycart[i].itemqty+=1;
            mycart[i].itemprice = mycart[i].itemqty * data.itemprice;
            this.setState({ cart:mycart})
            break;
          }
          
        }//end for
        if (!nameMatchFound)
        {
            this.addItemToCart (data);
        }
       
      } // end if cart is not empty
         
        });
        eventBus.on("removeCart", (data) =>{
            let mycart = this.state.cart;
            if (mycart.length == 0)
            {
               // do nothing - request should not come here
            }
            if (mycart.length > 0){
              for (let i in mycart) {
          
          if (mycart[i].itemname === data.itemname)
          {
            this.state.cartTotal -= Number(data.itemprice);
            mycart[i].itemqty -= 1; 
            mycart[i].itemprice = mycart[i].itemqty * data.itemprice;
            if (mycart[i].itemqty == 0)
            {
              mycart.splice(i, 1);
            }
            this.setState({ cart:mycart}) 
            break;
          }
          
        }//end for
            
          }
           });
      }
    
      componentWillUnmount() {
        eventBus.remove("addCart");
        eventBus.remove("removeCart");
      }
      render(){ 
     
          return ( 
           
        <div>
        {this.props.cart.map((cartItem, index) => {
            return (
                <div className="lineItemContainer">
        <div className="cartitemqty">{cartItem.itemqty}</div>
        <div className="cartitemcross">x</div>            
        <div className="cartitemname">{cartItem.itemname}</div>
        <div className="cartitemprice">{cartItem.itemprice}</div>
        <br/>
        </div> 
        )})}
        <div className="cartTotalLabel">Total: </div>
            <div className="cartTotalValue">{this.props.cartTotal}</div>
         <style jsx global>{`
         .lineItemContainer{
           border-bottom:1px solid #aaa;
           padding:10px;
         }
         .cartTotalLabel{
           float:left;
           margin-top:20px;
         }
         .cartTotalValue{
           float:right;
           margin-right:30px;
           margin-top:20px;
         }
         .cartitemqty{
             float:left;
             margin-right:10px;
         }
         .cartitemname{
             float:left;
         }
         .cartitemcross{
             float:left;
             margin-right:10px;
         }
         .cartitemprice{
           float:right;
           margin-right:10%;
         }
       
       
`}</style>
        </div>
        )}
}