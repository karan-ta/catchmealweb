import { menuItemData } from "../data/menuItemData";
import styles from '../stylesheets/newmenu.module.css'
import Cart from '../components/Cart.js'
import Image from 'next/image'
export default function Newmenu(props) {
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
chef bio
    
</div>
    </div>
    {/* left container ends */}
    <div className={styles.rightContainer}>
<Cart/>
    </div>
    </div>
)

}