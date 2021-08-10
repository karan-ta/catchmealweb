import Cart from '../components/Cart.js'
import { useRouter } from 'next/router'
export default function CartPage(props) {
    const router = useRouter()
    console.log("cart page")
    console.log (router.query)
    return (
        <Cart
        cart={JSON.parse(router.query.cart)}
        cartTotal={router.query.cartTotal}
        />

    )}