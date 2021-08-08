import Image from 'next/image'
import { Component } from 'react'
import eventBus from "./EventBus";

export default class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          count:0
        };
     this.props = props;
      }
      addQty = () => {
          console.log("call add quantity")
        let count = this.state.count;
        count++;
        this.setState({count:count})
        eventBus.dispatch("addCart", { itemname:this.props.itemname,itemprice:this.props.itemprice });
    }
    minusQty = () => {
        let count = this.state.count;
        if (count == 0)
        return;
        count--;
       
        this.setState({count:count})
        eventBus.dispatch("removeCart", { itemname: this.props.itemname,itemprice:this.props.itemprice });
    }
   render(){ 
       return( 
<div className="menuitemcontainer">
  <div className = "appliedcontainer">
     <div className="itemname">
       {this.props.itemname}
    </div>
     <div className="itemprice">
    <p className="ruppee">&#8377;</p>
    {this.props.itemprice}
    </div>
    </div>
    {/*}
    <div className="itemdesc">
       {this.props.itemdesc}
    </div> */}
    {/* <div className="floatleft minusbuttondiv">
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
    </div> */}
  
<style jsx global>{`
.appliedcontainer{
    width:80%;
    margin:0 auto;
}
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
   float:left;
   
}
@media only screen and (max-width: 980px) {
    .menuitemcontainer {
    
        width: 80%;
        margin: 0 auto;
        margin-bottom:20px;
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