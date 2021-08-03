import Image from 'next/image'
import { BsHeart } from 'react-icons/bs';
export default function Restaurant(props) {
    let iconStyles = { color: "red", fontSize: "1.2em" };
    return(
        <div className="restaurant">
        <Image 
      src={props.signaturedishimage} // Route of the image file
      height={185} // Desired size with correct aspect ratio
      width={341} // Desired size with correct aspect ratio
      alt="Your Name"
    />
    <br /> <br />
    <div className = "leftDataContainer">
     <div className="nametext">
     {props.chefname}
    </div>
     <div className="nametext">
     {props.cuisine}
    </div>
    
    <div className="hearticon">
    <BsHeart style={iconStyles}/>
    </div>
    <div>
    {props.likes}
    </div>
    </div>
    <Image className = "chefimg"
      src={props.chefimage} // Route of the image file
      height={64} // Desired size with correct aspect ratio
      width={64} // Desired size with correct aspect ratio
     
      alt="Your Name"
    />
   
    <style jsx global>{`
   
    .chefimg{
     border-radius: 50%;
     margin-left:30px;
     float:right;
   }
       .leftDataContainer
       {
         float:left;
        width:78%;
        margin-left:7px;
       }
       
     .hearticon{
 float:left;
 margin-left:5px;
 margin-right:10px;
     }
       .nametext{
         padding:5px;
    
     font-size: 20px;
     font-weight: 400;
     line-height: 20px;
         
       }
       .restaurant{
        float:left;
        margin-right:40px;
        border: 1px solid #aaa;
      
      }
    `}</style>
     </div>
    )}