import { menuItemData } from "../data/menuItemData";
import styles from '../stylesheets/newmenu.module.css'
import Cart from '../components/Cart.js'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BsHeart } from 'react-icons/bs';
import MenuItem from '../components/menuitem.js'
export default function Newmenu(props) {
    const router = useRouter();
    console.log (router.query.menu);
    const menuDataRcvd = JSON.parse(router.query.menu);
    let iconStyles = { color: "red", fontSize: "1.2em" };
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
        {router.query.cuisine}
      </div>
      <div className={styles.hearticon}>
    <BsHeart style={iconStyles}/>
    </div>
    <div>
    {router.query.likes}
    </div>
    <div className="chefbiotext">
      <p>
      {router.query.bio}
      </p>
    </div>
    
</div>
<div className={styles.menuItemContainer}>
{menuDataRcvd.map((menuItem, index) => ( 
    <div className={styles.menuItem}>
    <Image 
      src="/images/signaturedish1.jpg" // Route of the image file
      height={185} // Desired size with correct aspect ratio
      width={310} // Desired size with correct aspect ratio
      alt="Your Name"
    />  
     <div className={styles.itemname}>
      Veg Soup
 </div>
 <div className={styles.itempricenumber}>
 
 25
    </div>
 <div className={styles.ruppeesymbol}>
 
 &#8377;
    </div>
    <div className={styles.itemdesc}>
    A soft and savory South Indian dish simple ingredients like rice lentils and seasoning fried on a griddle.
    </div>
   <div className={styles.cartButtonContainer}>
    <button  className={styles.cartButton}> - </button>
</div>
    <div className={styles.itemQuantityContainer}>
    3
    </div>
    <div className={styles.cartButtonContainer}>
    <button className={styles.cartPlusButton}> + </button>
    </div>
    </div>
   
))}
  
</div>

    </div>
    {/* left container ends */}
    <div className={styles.rightContainer}>
<Cart/>
    </div>
    <div className={styles.cartFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.cartNumItems}>[1]</div>
        <div className={styles.viewCartLink}><a className={styles.viewCartLinkAnchor}href = "">View Cart</a></div>
        <div className={styles.cartTotalAmount}>
 125
    </div>
    <div className={styles.cartTotalRuppeeSymbol}>
    &#8377;
    </div>
      
      </div>
    </div>
    </div>
)

}