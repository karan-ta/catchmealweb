import Head from 'next/head'
import Image from 'next/image'
import { BsHeart } from 'react-icons/bs';
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
            test
        </div> 
        <div className="rightpagecontainer">
            test 2
        </div> 
        </main>
        <style jsx global>{`
        .leftpagecontainer{
        width:69%;
        border:1px solid red;
        float:left;
        }
        .rightpagecontainer{
        width:30%;
        border:1px solid red;
        float:right;
        }
        `}</style>
        </div>
    )}