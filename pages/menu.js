import Head from 'next/head'
import Image from 'next/image'
import { BsHeart } from 'react-icons/bs';
import Restaurant from '../components/restaurant.js'
import MenuItem from '../components/menuitem.js'
import Cart from '../components/Cart.js'
import { menuItemData } from "../data/menuItemData";
import { useRouter } from 'next/router'

export default function Menu(props) {
  const router = useRouter();
  console.log (router.query.menu);
  const menuDataRcvd = JSON.parse(router.query.menu);
  console.log(menuDataRcvd);
  let iconStyles = { color: "red", fontSize: "1.2em" };
    return (
        <div className="container">
        <Head>
          <title>{router.query.cheftitlelabel} Menu for Thursday (19 july)</title>
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
      <div className = "topbottom10">
        {router.query.cuisine}
      </div>

      <div className="hearticon">
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
    <div className="clearspacer"></div>
    <div>
    {menuDataRcvd.map((menuItem, index) => {
   return (
     <MenuItem 
     menuitemimage={menuItem.itemphotoname}
     itemname={menuItem.itemname}
     itemdesc={menuItem.itemdesc}
     itemprice={menuItem.itemprice}
     isveg={menuItem.isveg}
     />
   );
    })}
    </div>
     <br/>
    </div>
    {/* left page container ends */}
  <Cart />
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
        width:96%;
      }
   
      a{
        text-decoration:none;
        color:#000;
      }
      .leftpagecontainer{
          float:left;
        
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
      @media only screen and (min-width: 980px) {
        .leftpagecontainer {
          border-right:1px solid #aaa;
          width:79%;
        }
        @media only screen and (max-width: 980px) {
          .leftpagecontainer {
            width:99%;
          }
      `}</style>
        </div>
    )}
    