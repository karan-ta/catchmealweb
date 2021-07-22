import Image from 'next/image'
import { Component } from 'react'

export default class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          count:0
        };
      }
      addQty = (e) => {
        let count = this.state.count;
        count++;
        this.setState({count:count})
    }
    minusQty = (e) => {
        let count = this.state.count;
        count--;
        this.setState({count:count})
    }
   render(){ 
       return( 
<div className="menuitemcontainer">
        <Image 
        src="/images/menuitem.jpg" // Route of the image file
        height={185} // Desired size with correct aspect ratio
        width={305} // Desired size with correct aspect ratio
        alt="Your Name"
      />
       <div className="itemname">
   Veg Soup
    </div>
    <div className="itemprice">
    <p className="ruppee">&#8377;</p>
    25
    </div>
    <div className="itemdesc">
    A soft and savory South Indian dish simple ingredients like rice lentils and seasoning fried on a griddle,
    </div>
    <div className="floatleft minusbuttondiv">
    <button onClick={this.minusQty} className="minusbutton"> - </button>
    </div>
    <div className="floatleft itemquantity">
    {this.state.count}
    </div>
    <div className="floatleft plusbutton">
    <button onClick={this.addQty} className="plusbutton"> + </button>
    </div>
    <div className="floatright itemlearnmore">
        <a href = "">Learn More</a>
    </div>
    <br/>
    <br/>
<style jsx global>{`
.ruppee{
    margin:0px;float:left;padding-right:3px;
}

.minusbutton{
    margin-left:10px;
    font-size:22px;
    font-weight:bold;
    color:#333;
}
.plusbutton{
  
    font-size:20px;
    font-weight:bold;
    color:#333;

}
.itemlearnmore{
    margin-right:15px;
    font-size:16px;
}
.itemquantity{
    margin-right:10px;
    margin-left:10px;
    font-size:22px;
    margin-top:5px;
}
.itemname{
    margin:10px;
    float:left;
}
.itemprice{
    float:right;
    margin:10px;
    font-weight:bold;
}
.itemdesc{
    clear:both;
    margin:10px;
    margin-top:17px;
    margin-bottom:17px;
    font-size:16px;
    color:#000;
}
.menuitemcontainer{
  margin-right:30px;
    margin-top:30px;
    border:1px solid #aaa;
   width:30%;
   float:left;
}
.floatleft{
    float:left;
  }    
  .floatright{
    float:right;
  }
`}</style>
</div>

       )}}