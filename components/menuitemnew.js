import Image from 'next/image'
import { Component } from 'react'
import eventBus from "./EventBus";
import styles from '../stylesheets/menuitemnew.module.css'

export default class MenuItemNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
          count:0
        };
     this.props = props;
      }
      addQty = () => {
        //   console.log("call add quantity")
        let count = this.state.count;
        count++;
        this.setState({count:count})
        // eventBus.dispatch("addCart", { itemname:this.props.itemname,itemprice:this.props.itemprice });
        // eventBus.dispatch("addCartPhone", {itemprice:this.props.itemprice });
        this.props.onaddclick ({ itemname:this.props.itemname,itemprice:this.props.itemprice })
    }
    minusQty = () => {
        let count = this.state.count;
        if (count == 0)//validation => do nothing
        return;
        count--;
       
        this.setState({count:count})
        // eventBus.dispatch("removeCart", { itemname:this.props.itemname,itemprice:this.props.itemprice });
        // eventBus.dispatch("removeCartPhone", {itemprice:this.props.itemprice });
        this.props.onminusclick ({ itemname:this.props.itemname,itemprice:this.props.itemprice })
    }
    render(){ 
        return( 
<div className={styles.menuItem}>
    <Image 
      src={this.props.menuitemimage} // Route of the image file
      height={185} // Desired size with correct aspect ratio
      width={310} // Desired size with correct aspect ratio
      alt="Your Name"
    />  
     <div className={styles.itemname}>
     {this.props.itemname}
 </div>
 <div className={styles.itempricenumber}>
 
 {this.props.itemprice}
    </div>
 <div className={styles.ruppeesymbol}>
 
 &#8377;
    </div>
    <div className={styles.itemdesc}>
    {this.props.itemdesc}
    </div>
   <div className={styles.cartButtonContainer}>
    <button onClick={this.minusQty} className={styles.cartButton}> - </button>
</div>
    <div className={styles.itemQuantityContainer}>
    {this.state.count}
    </div>
    <div className={styles.cartButtonContainer}>
    <button onClick={this.addQty} className={styles.cartPlusButton}> + </button>
    </div>
    </div>
        )}}