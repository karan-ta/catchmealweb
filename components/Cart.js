import { Component } from 'react'
import eventBus from "./EventBus";
//eventbus is not used but kept here to easily copy from later
export default class Cart extends Component {
    constructor(props) {
        super(props)
     this.props = props;
      }

      loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
      
     callSignatureApi (response)
    {
             
    }
      testfunc(){
        alert ("hi")
      }
       displayRazorpay = async (e) => {
        console.log (this)
        this.testfunc ()
        const res = await this.loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if (!res) {
          alert('Razorpay SDK failed to load. Are you online?')
          return
            }
            alert (this.props.cartTotal)
            const paramString = "chefid="+this.props.chefid+"&amount="+this.props.cartTotal*100
            fetch("http://0.0.0.0:8080/razorpaytesting",{
            mode:"cors",
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
            body: paramString,
          })
          .then(res => res.json())
              .then(
                (response) => {
                console.log (response) 
                const orderApiData = response   
                const options = {
                    "key": "rzp_test_MAVdJtlc3h9K7x", // Enter the Key ID generated from the Dashboard
                    "amount": orderApiData.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": orderApiData.currency,
                    "name": "Acme Corp",
                    "description": "Test Transaction",
                    "image": "https://example.com/your_logo",
                    "order_id": orderApiData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": function (response){
                        console.log (response.razorpay_payment_id)
                        console.log (response.razorpay_order_id)
                        console.log (response.razorpay_signature)
                        const paramString = "paymentid="+response.razorpay_payment_id+"&orderid="+response.razorpay_order_id+"&signature="+response.razorpay_signature+"&razorpay_secret=CxddGtImY1enXfYnoQjDUumU"
                        fetch("http://0.0.0.0:8080/razorpaysignature",{
                            mode:"cors",
                            method: "POST",
                            headers: new Headers({
                                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                       }),
                            body: paramString,
                          })
                          .then(res => res.json())
                          .then(
                            (response) => {
                            console.log (response)    
                             return response
                            },
                            (error) => {
                
                            }
                          )
          
                    },
                    "prefill": {
                        "name": "Gaurav Kumar",
                        "email": "gaurav.kumar@example.com",
                        "contact": "9999999999"
                    },
                    "notes": {
                        "address": "Razorpay Corporate Office"
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        console.log ("opening")
            rzp1.open();
            e.preventDefault();
                },
                (error) => {
                }
              )
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
        <div className="cartitemqty">{Number(cartItem.itemqty).toFixed(0)}</div>
        <div className="cartitemcross">x</div>            
        <div className="cartitemname">{cartItem.itemname}</div>
        <div className="cartitemprice">{cartItem.itemprice}</div>
        <br/>
        </div> 
        )})}
        <div className="cartTotalLabel">Total: </div>
            <div className="cartTotalValue">{this.props.cartTotal}</div>
           <div className="clearspacer"></div>
            <div className="orderNowButtonContainer">
            <button 
            className="orderNowButton"
            onClick={this.displayRazorpay}
            >
              Order Now
            </button>
            </div>
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
         .clearspacer{
           clear:both;
         }
         .orderNowButtonContainer{
           margin-top:30px;
           font-size:18px;
           text-align:center;
         }

         .orderNowButton{
          font-size:18px;
          padding:7px;
          width:65%;
         }  

       
       
`}</style>
        </div>
        )}
}