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
    cart:new Object (),
    itemIdToQuantity:{},
    cartTotal:0,
    cartQuantity:0 // for phone => total cart items in cart.
    };
 
  }
  componentDidMount(){
    if (!localStorage.getItem('mooveop_cart'))
    {
      console.log ("no cart found in local storage on refresh.")
      return
    }
    const mycart = JSON.parse(localStorage.getItem('mooveop_cart'))
   
    console.log ("cart from refresh")
    console.log (mycart)
    const mycarttotal = localStorage.getItem('mooveop_cart_total')
    ? Number (localStorage.getItem('mooveop_cart_total'))
    : 0
    const itemIdToQuantity = {}
    if (this.props.data.chefname in mycart)
    {
      mycart[this.props.data.chefname ].map((cartitem, index) => {
        itemIdToQuantity[cartitem.itemid] = cartitem.itemqty
      })
      console.log ("itemidtoqty")
      console.log (itemIdToQuantity)
    }
 
    console.log (mycart)
    this.setState({ cart:mycart,cartTotal:mycarttotal,itemIdToQuantity:itemIdToQuantity}) 
  }
  //below is called first time
  addItemToCart(data){
    let mycart = this.state.cart
    let itemIdToQuantity = this.state.itemIdToQuantity
    let cartTotal = this.state.cartTotal
    let cartQuantity = this.state.cartQuantity
    cartTotal +=   Number(data.itemprice)
    cartQuantity += 1
    console.log (mycart)
    let cartItem = new Object()
      cartItem.itemqty = 1
      cartItem.itemname = data.itemname
      cartItem.itemid = data.itemid
      cartItem.itemprice = Number (data.itemprice)
      if (!(data.chefName in mycart))
      mycart[data.chefName] = []
      mycart[data.chefName].push(cartItem)
      if (!(data.itemid in itemIdToQuantity))
      itemIdToQuantity[data.itemid] = 1
      else
      itemIdToQuantity[data.itemid] += 1
      this.setState({ cart:mycart})
      this.setState({ itemIdToQuantity:itemIdToQuantity}) 
      this.setState({ cartTotal:cartTotal}) 
      this.setState({ cartQuantity:cartQuantity}) 
      console.log (mycart)
      localStorage.setItem('mooveop_cart', JSON.stringify(mycart))
      console.log ("adding cart tolocal storage")
      console.log (localStorage.getItem('mooveop_cart'))
      localStorage.setItem('mooveop_cart_total',cartTotal.toFixed(2))
      localStorage.setItem('chefId',this.props.data.id)
  }
  getItemQuantity = (itemId)=>{
  return this.state.itemIdToQuantity[itemId]
  }
  addCartEvent = (data)=>{
    
    if (!(data.chefName in this.state.cart)){
     console.log ("adding item to cart first time only once");
     this.addItemToCart (data);
    }
   else
    { 
      let mycart = this.state.cart
      let itemIdToQuantity = this.state.itemIdToQuantity
      let cartTotal = this.state.cartTotal
      let cartQuantity = this.state.cartQuantity
      cartTotal +=   Number(data.itemprice)
      cartQuantity += 1
      let nameMatchFound = false;
    for (let i in mycart[data.chefName]) {

     if (mycart[data.chefName][i].itemid === data.itemid)
     {
       nameMatchFound = true;
       mycart[data.chefName][i].itemqty += 1
       mycart[data.chefName][i].itemprice = mycart[data.chefName][i].itemqty * Number (data.itemprice)
       itemIdToQuantity[data.itemid] += 1
       this.setState({ cart:mycart})
       this.setState({ itemIdToQuantity:itemIdToQuantity}) 
       this.setState({ cartTotal:cartTotal}) 
       this.setState({ cartQuantity:cartQuantity}) 
       localStorage.setItem('mooveop_cart', JSON.stringify(mycart))
       localStorage.setItem('mooveop_cart_total',cartTotal.toFixed(2))
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
  removeCartItems = (data) =>{
    let mycart = this.state.cart
    let itemIdToQuantity = this.state.itemIdToQuantity
    let cartTotal = this.state.cartTotal
    let cartQuantity = this.state.cartQuantity
    console.log ("cart is now ")
    console.log (mycart)
    for (const [shopName,cartItemArray] of Object.entries (mycart)){
    console.log (shopName)
      console.log (cartItemArray)
      for(var i = 0; i < cartItemArray.length; i++){
        console.log ("index")
        console.log (i) 
        console.log (cartItemArray)
        console.log (data.itemIds)
        console.log (cartItemArray[i].itemid)
        console.log (data.itemIds.includes (cartItemArray[i].itemid))
        if ((data.itemIds.includes (cartItemArray[i].itemid)))
        {
          console.log ("matched")
          console.log (cartItemArray[i].itemid)
          cartTotal -= cartItemArray[i].itemprice
          cartQuantity -= cartItemArray[i].itemqty
          delete itemIdToQuantity[cartItemArray[i].itemid];
          cartItemArray.splice (i,1)
          console.log ("shop cart length")
          console.log (cartItemArray.length)
          if (cartItemArray.length == 0){
            delete mycart[shopName]
            console.log ("yes")
            console.log (mycart)
            console.log (shopName)
          }
          
          i = i - 1
        }
      }
        }
    localStorage.setItem('mooveop_cart', JSON.stringify(mycart))
    localStorage.setItem('mooveop_cart_total',cartTotal.toFixed(2))
    this.setState({ cart:mycart})
    this.setState({ itemIdToQuantity:itemIdToQuantity}) 
    this.setState({ cartTotal:cartTotal}) 
    this.setState({ cartQuantity:cartQuantity}) 
  }

   removeCartEvent = (data) => {
    let mycart = this.state.cart
    let itemIdToQuantity = this.state.itemIdToQuantity
    let cartTotal = this.state.cartTotal
    let cartQuantity = this.state.cartQuantity
    if (!(data.chefName in this.state.cart) || !(data.itemid in this.state.itemIdToQuantity)){
     console.log ("item not in cart")
      return
    }
  
      
  for (let i in mycart[data.chefName]) {
  if (mycart[data.chefName][i].itemid === data.itemid)
  {
    cartQuantity -= 1.00
    cartTotal -= mycart[data.chefName][i].itemprice
    mycart[data.chefName][i].itemqty -= 1.00; 
    mycart[data.chefName][i].itemprice = mycart[data.chefName][i].itemqty * mycart[data.chefName][i].itemprice
    if (mycart[data.chefName][i].itemqty == 0.00)
    {
      mycart[data.chefName].splice(i, 1);
      if (mycart[data.chefName].length == 0)
      delete mycart[data.chefName]
    }
    
    
    itemIdToQuantity[data.itemid] -= 1
   
    if (itemIdToQuantity[data.itemid] == 0)
    {
      delete itemIdToQuantity[data.itemid];
    }
    this.setState({ cart:mycart})
    this.setState({ itemIdToQuantity:itemIdToQuantity}) 
    this.setState({ cartTotal:cartTotal}) 
    this.setState({ cartQuantity:cartQuantity}) 
    localStorage.setItem('mooveop_cart', JSON.stringify(mycart))
    localStorage.setItem('mooveop_cart_total',cartTotal.toFixed(2))
    break;
  }
  
}//end for
    
  
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
     itemId={this.props.data.id+"_"+menuItem.itemid} //shopid_itemid => unique itemid
     itemIdToQuantity={this.state.itemIdToQuantity[this.props.data.id+"_"+menuItem.itemid]?this.state.itemIdToQuantity[this.props.data.id+"_"+menuItem.itemid]:0}
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
chefName={this.props.data.chefname}
onRemoveClick = {this.removeCartItems}
/>
</div>
    </div>
<ViewCartButtonPhone
cartTotal={this.state.cartTotal}
cartQuantity={this.state.cartQuantity}
cart={this.state.cart}
chefid={this.props.data.id}
chefName={this.props.data.chefname}
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
