import Cart from '../components/Cart.js'
import { useRouter } from 'next/router'
import styles from '../stylesheets/cart.module.css'
export default function CartPage(props) {
    const router = useRouter()
    console.log("cart page")
    return (
        <div className={styles.cartpagecontainer}>
            <h1>
                Your Order
            </h1>
            
        <Cart
        cart={props.cart}
        cartTotal={router.query.cartTotal}
        chefid={router.query.chefid}
        />
        </div>

    )}
    export async function getServerSideProps(context) {
       
        return {props: {cart:JSON.parse(context.query.cart)}}
      }