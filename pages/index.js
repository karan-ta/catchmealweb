
import Head from 'next/head'
import { restaurantData } from "../data/restaurantsData";
import Restaurant from '../components/restaurant.js'
export default function Home() {
  
  return (
    <div className="container">
      <Head>
        <title>Select a chef near you</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className="mycontainer">
      {restaurantData.map((restaurant, index) => {
          return (
            <a href = "/menu">
            <Restaurant 
            chefname={restaurant.chefname} 
            cuisine={restaurant.cuisine}
            likes={restaurant.likes} 
            signaturedishimage={restaurant.signaturedishimage} 
            chefimage={restaurant.chefimage}/>
            </a>
          );
        })}


 
      </main>
      <style jsx global>{`
      .mycontainer{
        margin:0 auto;
        width:90%;
        font-family: arial;
      }
      a{
        text-decoration:none;
        color:#000;
      }
      `}</style>
    </div>
  )
}
