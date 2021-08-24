import Cart from '../components/Cart.js'
import { useRouter } from 'next/router'
import styles from '../stylesheets/cart.module.css'
export default function CartPage(props) {
    const router = useRouter()
    console.log("cart page")
    console.log (router.query)
    return (
        <div className={styles.cartpagecontainer}>
            <h1>
                Your Order
            </h1>
        <Cart
        cart={JSON.parse(router.query.cart)}
        cartTotal={router.query.cartTotal}
        chefid={router.query.chefid}
        />
        </div>

    )}