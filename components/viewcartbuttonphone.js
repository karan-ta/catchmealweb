import { Component } from 'react'
import eventBus from "./EventBus";
import styles from '../stylesheets/viewcartbuttonphone.module.css'
import { withRouter } from 'next/router'
export default withRouter(class ViewCartButtonPhone extends Component {
    constructor(props) {
        super(props)
        this.state = {
          cartQuantity:0,
          cartTotal:0

        }
     this.props = props;
     console.log("in view cart")
     console.log(this.props.cart)
      }
      showCartPage = (e) => {
        console.log("in view cart showcart func")
     console.log(this.props.cart)
        e.preventDefault()
        this.props.router.push(
          {
          pathname: '/cartpage',
          query: {
            cart:JSON.stringify(this.props.cart),
            cartTotal:this.props.cartTotal,
          }
          //send menu above
        },
        '/cartpage',
        )
      }
      updateCart(data,mode){
          let cartQuantity = this.state.cartQuantity
          let cartTotal = this.state.cartTotal
          if (mode == "add"){ 
          cartQuantity += 1
          cartTotal += Number(data.itemprice)
          }
          if (mode == "subtract"){ 
            cartQuantity -= 1
            cartTotal -= Number(data.itemprice)
            }
          this.setState({ cartQuantity:cartQuantity,cartTotal:cartTotal}) 
      }
    
      componentDidMount() {
        eventBus.on("addCartPhone", (data) =>{
        this.updateCart (data,"add")
        })

        eventBus.on("removeCartPhone", (data) =>{
            this.updateCart (data,"subtract")
        })
      }
      componentWillUnmount() {
        eventBus.remove("addCartPhone");
        eventBus.remove("removeCartPhone");
      }
      render(){ 
    return ( 
    <div className={styles.cartFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.cartNumItems}>[{this.props.cartQuantity}]</div>
        <div className={styles.viewCartLink}><a onClick = {this.showCartPage } className={styles.viewCartLinkAnchor}>Click To View Cart</a></div>
        <div className={styles.cartTotalAmount}>
        {this.props.cartTotal}
        </div>
    <div className={styles.cartTotalRuppeeSymbol}>
    &#8377;
    </div>
      </div>
    </div>
        )}
})