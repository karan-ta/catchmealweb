export default class CartState extends Component {
    constructor(props)
    {
      super(props)
      this.state = {
      cart:new Object (),
      itemIdToQuantity:{},
      cartTotal:0,
      cartQuantity:0 // for phone => total cart items in cart.
      };
   
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
            console.log (data.itemIds.includes (cartItemArray[i].itemid)  )
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
      
}