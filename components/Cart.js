import { Component } from 'react'
import eventBus from "./EventBus";

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          cart:[]

        };
     this.props = props;
      }
      componentDidMount() {
        eventBus.on("addCart", (data) =>{
         let mycart = this.state.cart;
         mycart.push(data)
          this.setState({ cart:mycart})
        });
        eventBus.on("removeCart", (data) =>{
            let mycart = this.state.cart;
            mycart.pop()
             this.setState({ cart:mycart})
           });
      }
    
      componentWillUnmount() {
        eventBus.remove("addCart");
        eventBus.remove("removeCart");
      }
      render(){ 
          return ( 
        <div className="rightpagecontainer">
        {this.state.cart.map((cartItem, index) => {
            return (
                <div>
        <div className="cartitemqty">1</div>
        <div className="cartitemcross">x</div>            
        <div className="cartitemname">{cartItem.itemname}</div>
        <div className="cartitemprice">{cartItem.itemprice}</div>
        <br/>
        </div> 
        )})}
         <style jsx global>{`
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
         .rightpagecontainer{
            border-top:1px solid #aaa;
            width:22%;
            float:right;
           
          }
`}</style>
        </div>
)}
}