import { menuItemData } from "../data/menuItemData";
import styles from '../stylesheets/newmenu.module.css'
import Cart from '../components/Cart.js'
import Image from 'next/image'
import { BsHeart } from 'react-icons/bs';
import MenuItemNew from '../components/menuitemnew.js'
import ViewCartButtonPhone from '../components/viewcartbuttonphone.js'
import { Component } from 'react'

export default class Newmenu extends Component {
  constructor(props)
  {
    super(props)
    this.props = props;
    this.menuDataRcvd = this.props.data.menuList
    this.iconStyles = {color: "red", fontSize: "1.2em" }
    this.state = {
    cart:{},
    itemIdToQuantity:{},
    cartTotal:0,
    cartQuantity:0 // for phone => total cart items in cart.
    };
 
  }
  componentDidMount(){
    const mycart = localStorage.getItem('mooveop_cart')
    ? JSON.parse(localStorage.getItem('mooveop_cart'))
    : []
    const mycarttotal = localStorage.getItem('mooveop_cart_total')
    ? Number (localStorage.getItem('mooveop_cart_total'))
    : 0
    const itemIdToQuantity = {}
    if (mycart[this.props.data.chefName] && mycart[this.props.data.chefName].length > 0)
    {
      mycart[data.chefName].map((cartitem, index) => {
        itemIdToQuantity[cartitem.itemid] = cartitem.itemqty
      })
    }
    console.log ("itemidtoqty")
    console.log (mycart)
    console.log (itemIdToQuantity["4_7"])
    this.setState({ cart:mycart,itemIdToQuantity:itemIdToQuantity}) 
  }
  //below is called first time
  addItemToCart(data){
    let mycart = this.state.cart
    let cartItem = new Object()
      cartItem.itemqty = 1
      cartItem.itemname = data.itemname
      cartItem.itemid = data.itemid
      cartItem.itemprice = Number (data.itemprice)
      if (!(data.chefName in mycart))
      mycart[data.chefName] = []
      mycart[data.chefName].push(cartItem)
      this.setState({ cart:mycart}) 
      localStorage.setItem('mooveop_cart', JSON.stringify(mycart))
      localStorage.setItem('mooveop_cart_total',cartItem.itemprice.toFixed(2))
      localStorage.setItem('chefId',this.props.data.id)
  }
  getItemQuantity = (itemId)=>{
  return this.state.itemIdToQuantity[itemId]
  }
  addCartEvent = (data)=>{
    let mycart = this.state.cart
    this.state.cartTotal +=   Number(data.itemprice)
    this.state.cartQuantity += 1
    if (!(data.chefName in mycart)){
     console.log ("adding item to cart first time only once");
     this.addItemToCart (data);
    }
   else
    { 
      let nameMatchFound = false;
    for (let i in mycart[data.chefName]) {
     if (mycart[data.chefName][i].itemid === data.itemid)
     {
       nameMatchFound = true;
       mycart[data.chefName][i].itemqty += 1
       mycart[data.chefName][i].itemprice = mycart[data.chefName][i].itemqty * Number (data.itemprice)
       this.setState({ cart:mycart})
       localStorage.setItem('mooveop_cart', JSON.stringify(mycart))
       localStorage.setItem('mooveop_cart_total',this.state.cartTotal.toFixed(2))
       break;
     }
     
   }//end for
   if (!nameMatchFound)
   {
       this.addItemToCart (data);
   }
  
 } // end if cart is not empty
 console.log ("cart : ")
    console.log(this.state.cart)
    console.log (Object.keys(this.state.cart))
    Object.keys(this.state.cart).map((shopName) => {
      this.state.cart[shopName].map((cartItem,index)=>{
      console.log (cartItem)
      })
    })
  }
   removeCartEvent = (data) => {
    let mycart = this.state.cart;
    if (mycart[data.chefName].length == 0)
    {
       // do nothing - request should not come here
    }
  
    if (mycart[data.chefName].length > 0){
      
  for (let i in mycart[data.chefName]) {
  console.log (data.itemid)
  console.log (mycart[data.chefName][i].itemid)
  if (mycart[data.chefName][i].itemid === data.itemid)
  {
    this.state.cartQuantity -= 1.00
    this.state.cartTotal -= Number(data.itemprice);
    mycart[data.chefName][i].itemqty -= 1.00; 
    mycart[data.chefName][i].itemprice = mycart[data.chefName][i].itemqty * Number(data.itemprice)
    if (mycart[data.chefName][i].itemqty == 0.00)
    {
      mycart[data.chefName].splice(i, 1);
    }
    this.setState({ cart:mycart}) 
    localStorage.setItem('mooveop_cart', JSON.stringify(mycart))
    localStorage.setItem('mooveop_cart_total',this.state.cartTotal.toFixed(2))
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
        {this.props.data.cuisinename}
      </div>
      <div className={styles.hearticon}>
    <BsHeart style={this.iconStyles}/>
    </div>
    <div>
    {this.props.data.likes}
    </div>
    <div className="chefbiotext">
      <p>
      {this.props.data.chefbio}
      </p>
    </div>
    
</div>
<div className={styles.menuItemContainer}>
{this.menuDataRcvd.map((menuItem, index) => ( 
     <MenuItemNew 
     menuitemimage={menuItem.itemphotoname}
     chefName={this.props.data.chefname}
     itemid={this.props.data.id+"_"+menuItem.itemid} //shopid_itemid => unique itemid
     itemIdToQuantity={this.state.itemIdToQuantity[this.props.data.id+"_"+menuItem.itemid]}
     itemname={menuItem.itemname}
     itemdesc={menuItem.itemdesc}
     itemprice={menuItem.itemprice}
     isveg={menuItem.isveg}
     onaddclick = {this.addCartEvent}
     onminusclick = {this.removeCartEvent}
     getItemQuantity = {this.getItemQuantity}
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
chefid={this.props.data.id}
/>
</div>
    </div>
<ViewCartButtonPhone
cartTotal={this.state.cartTotal}
cartQuantity={this.state.cartQuantity}
cart={this.state.cart}
chefid={this.props.data.id}
/>
    </div>
)}

}
export async function getServerSideProps(context) {
  console.log (context)
  const res = await fetch(process.env.api_url+context.query.restaurantname)
  const data = await res.json()
  // console.log (data)
  return {props: {data}}
}
