import styles from '../stylesheets/Trycomponent.module.css'
import Image from 'next/image'
import { BsHeart } from 'react-icons/bs';
import { useRouter } from 'next/router'
function joinAll(...classes) {
    return classes.join(" ")
  }
export default function Trycomponent(props) {
  
  const iconStyles = { color: "red", fontSize: "1.2em" };
    return(

   <div key = {props.index} className = {styles.restaurant}>
   <Image 
      src={props.signaturedishimage} // Route of the image file
      height={185} // Desired size with correct aspect ratio
      width={347} // Desired size with correct aspect ratio
      alt="Your Name"
    />
   <div className={styles.leftBottomBox}>
   <div className={styles.nametext}>
     {props.chefname}
    </div>
    <div className={styles.nametext}>
     {props.cuisine}
    </div>
    
    <div className={styles.hearticon}>
    <BsHeart style={iconStyles}/>
    </div>
    <div>
    {props.likes}
    </div>
   </div>
   <div className={styles.rightBottomBox}>
   <Image className = {styles.chefimg}
      src={props.chefimage} // Route of the image file
      height={64} // Desired size with correct aspect ratio
      width={64} // Desired size with correct aspect ratio
     
      alt="Your Name"
    />
   </div>
   
   </div>
  
 


    )}