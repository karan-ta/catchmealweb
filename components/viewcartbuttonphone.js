import { Component } from 'react'
import eventBus from "./EventBus";
import styles from '../stylesheets/viewcartbuttonphone.module.css'
import { useRouter } from 'next/router'
     
export default function ViewCartButtonPhone(props) {   
  const router = useRouter()
      const showCartPage = (e) => {
        console.log("in view cart showcart func")
        e.preventDefault()
     router.push(
          {
          pathname: '/cartpage',
        }
        )
      }
    return ( 
    <div className={styles.cartFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.cartNumItems}>[{props.cartQuantity}]</div>
        <div className={styles.viewCartLink}><a onClick={showCartPage} className={styles.viewCartLinkAnchor}>Click To View Cart</a></div>
        <div className={styles.cartTotalAmount}>
        {props.cartTotal}
        </div>
    <div className={styles.cartTotalRuppeeSymbol}>
    &#8377;
    </div>
      </div>
    </div>
        )}
