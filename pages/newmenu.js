import { menuItemData } from "../data/menuItemData";
import styles from '../stylesheets/newmenu.module.css'
import Cart from '../components/Cart.js'
import Image from 'next/image'
import { withRouter } from 'next/router'
import { BsHeart } from 'react-icons/bs';
import MenuItemNew from '../components/menuitemnew.js'
import ViewCartButtonPhone from '../components/viewcartbuttonphone.js'
import { Component } from 'react'

export default withRouter(class Newmenu extends Component {
  constructor(props)
  {
    super(props)
    this.props = props;
    console.log (this.props.router.query)
    console.log (this.props.router.query.menu)
    this.menuDataRcvd = JSON.parse(this.props.router.query.menu)
     this.iconStyles = { color: "red", fontSize: "1.2em" }
    this.state = {
      cart:[],
      cartTotal:0,
      cartQuantity:0 // for phone => total cart items in cart.
    };
 
  }
  //below is called first time
  addItemToCart(data){
    let mycart = this.state.cart
    let cartItem = new Object()
      cartItem.itemqty = 1
      cartItem.itemname = data.itemname
      cartItem.itemprice = Number (data.itemprice)
      mycart.push(cartItem)
      this.setState({ cart:mycart}) 
  }
  addCartEvent = (data)=>{
    let mycart = this.state.cart
    this.state.cartTotal +=   Number(data.itemprice)
    this.state.cartQuantity += 1
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
       mycart[i].itemqty += 1
       mycart[i].itemprice = mycart[i].itemqty * Number (data.itemprice)
       this.setState({ cart:mycart})
       break;
     }
     
   }//end for
   if (!nameMatchFound)
   {
       this.addItemToCart (data);
   }
  
 } // end if cart is not empty
    console.log(this.state.cart)
   }
   removeCartEvent = (data) => {
    let mycart = this.state.cart;
    if (mycart.length == 0)
    {
       // do nothing - request should not come here
    }
  
    if (mycart.length > 0){
      
      for (let i in mycart) {
  
  if (mycart[i].itemname === data.itemname)
  {
    this.state.cartQuantity -= 1.00
    this.state.cartTotal -= Number(data.itemprice);
    mycart[i].itemqty -= 1.00; 
    mycart[i].itemprice = mycart[i].itemqty * Number(data.itemprice)
    if (mycart[i].itemqty == 0.00)
    {
      mycart.splice(i, 1);
    }
    this.setState({ cart:mycart}) 
    break;
  }
  
}//end for
    
  }
   }
render(){     
return(
    <div className={styles.menuContainer}>
    <div className={styles.leftContainer}>
<div className={styles.unsetimg}>
  <Image  src="/images/profileheader.jpg" layout="fill" className={styles.customimg} />
</div>
<div className={styles.chefImageContainer}>
    <div className={styles.chefImageInnerContainer}>
<Image className = {styles.menuchefimg}
      src="/images/wayne.webp" // Route of the image file
      height={120} // Desired size with correct aspect ratio
      width={120} // Desired size with correct aspect ratio
      alt="Your Name"
    />
</div>
</div>
<div className={styles.chefBioContainer}>
<h4 className = {styles.zeropadding}>
        Chef Wayne's Italian Cafe
        </h4>
        <div className = {styles.topbottom10}>
        {this.props.router.query.cuisine}
      </div>
      <div className={styles.hearticon}>
    <BsHeart style={this.iconStyles}/>
    </div>
    <div>
    {this.props.router.query.likes}
    </div>
    <div className="chefbiotext">
      <p>
      {this.props.router.query.bio}
      </p>
    </div>
    
</div>
<div className={styles.menuItemContainer}>
{this.menuDataRcvd.map((menuItem, index) => ( 
     <MenuItemNew 
     menuitemimage={menuItem.itemphotoname}
     itemname={menuItem.itemname}
     itemdesc={menuItem.itemdesc}
     itemprice={menuItem.itemprice}
     isveg={menuItem.isveg}
     onaddclick = {this.addCartEvent}
     onminusclick = {this.removeCartEvent}
     />
))}
  
</div>
<br/><br/>
    </div>
    {/* left container ends */}
    <div className={styles.rightContainer}>
      <div className={styles.clearboth}>
<Cart
cart={this.state.cart}
cartTotal={this.state.cartTotal}
chefid={this.props.router.query.chefid}
/>
</div>
    </div>
<ViewCartButtonPhone
cartTotal={this.state.cartTotal}
cartQuantity={this.state.cartQuantity}
cart={this.state.cart}
chefid={this.props.router.query.chefid}
/>
    </div>
)}

})