import Head from 'next/head'
import Image from 'next/image'
export default function Menu() {
  
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
    <br/>
    <Image className = "menuchefimg"
      src="/images/wayne.webp" // Route of the image file
      height={164} // Desired size with correct aspect ratio
      width={164} // Desired size with correct aspect ratio
     
      alt="Your Name"
    />
    </div>
    <div className="rightpagecontainer">
        <h4>
            Your Cart is empty.
        </h4>
    </div>
        </main>
          <style jsx global>{`
      .mycontainer{
       
        font-family: arial;
      }
      a{
        text-decoration:none;
        color:#000;
      }
      .leftpagecontainer{
          border-right:1px solid #aaa;
          float:left;
      }
      .rightpagecontainer{
        border-top:1px solid #aaa;
        padding:10px;
      }
      .menuchefimg{
        border-radius: 50%;
        margin-left:30px;
       
      }
      `}</style>
        </div>
    )}