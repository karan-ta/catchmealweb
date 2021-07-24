import Head from 'next/head'
import Image from 'next/image'
import { BsHeart } from 'react-icons/bs';
import Restaurant from '../components/restaurant.js'
import MenuItem from '../components/menuitem.js'
import Cart from '../components/Cart.js'
import { menuItemData } from "../data/menuItemData";
export default function Menu() {
  let iconStyles = { color: "red", fontSize: "1.2em" };
    return (
        <div className="container">
        <Head>
          <title>Wayne's Menu for Thursday (19 july)</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <main className="mycontainer">
            <div className="leftpagecontainer">
        <Image 
      src="/images/profileheader.jpg" // Route of the image file
      height={200} // Desired size with correct aspect ratio
      width={1000} // Desired size with correct aspect ratio
      alt="Your Name"
    />
    <br/>
    <div className = "floatleft menuchefimgdiv">
    <Image className = "menuchefimg"
      src="/images/wayne.webp" // Route of the image file
      height={120} // Desired size with correct aspect ratio
      width={120} // Desired size with correct aspect ratio
      alt="Your Name"
    />
    </div>
    <div className = "chefmenuheader floatright">
      <div className = "bottom10">
      <h4 className = "zeropadding ">
        Wayne's Menu for Friday - July 23
        </h4>
        </div>
      <div className = "bottom10">
        Indian
      </div>

      <div className="hearticon">
    <BsHeart style={iconStyles}/>
    </div>
    <div>
      25
    </div>
    <div className="chefbiotext">
      <p>
      I was raised in a house blessed with excellent cooks.
      it was almost second nature to follow after my granny, mom, and my elder brother.
      </p>
    </div>
    </div>
    <div className="clearspacer"></div>
    {menuItemData.map((menuItem, index) => {
   return (
     <MenuItem 
     menuitemimage={menuItem.menuitemimage}
     itemname={menuItem.itemname}
     itemdesc={menuItem.itemdesc}
     itemprice={menuItem.itemprice}
     isveg={menuItem.isveg}
     />
   );
    })}
     <br/>
    </div>
    {/* left page container ends */}
  <Cart/>
        </main>
          <style jsx global>{`
          .clearspacer{
            clear:both;
          }
          .chefbiotext{
            clear:both;
          }
             .hearticon{
            
              float:left;
              margin-right:10px;
                  }
          .bottom10{
            margin-bottom:10px;
          }
      .zeropadding{
        padding:0px;
        margin:0px;
      }    
      .chefmenuheader{
        width:80%;
        margin-top:20px;
        color:#333;
      }    
      .floatleft{
        float:left;
      }    
      .floatright{
        float:right;
      }
      .mycontainer{
        font-family: arial;
        margin:0px;
        margin:0px;
        padding:0px;
      }
      a{
        text-decoration:none;
        color:#000;
      }
      .leftpagecontainer{
          border-right:1px solid #aaa;
          float:left;
          width:76%;
          margin:0px;
        padding:0px;
      }
     
      .menuchefimg{
        border-radius: 50%;
      
      }
      .menuchefimgdiv{
        margin-left:40px;
        margin-top:30px;
      }
      .container{
        margin:0px;
        padding:0px;
      }
      `}</style>
        </div>
    )}