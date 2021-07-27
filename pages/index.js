
import Head from 'next/head'
import { restaurantData } from "../data/restaurantsData";
import Restaurant from '../components/restaurant.js'
import { useRouter } from 'next/router'

export default function Home() {
  const restaurantDataArray = JSON.parse(restaurantData);
  const router = useRouter();
  const menuhref = "/menu";
   const showMenu = (e) => {
  
    e.preventDefault()
    router.push(
      {
      pathname: '/menu',
      query: {
        index:e.currentTarget.getAttribute("index"),
        chefname:e.currentTarget.getAttribute("chefname"),
        cuisine:e.currentTarget.getAttribute("cuisine"),
        likes:e.currentTarget.getAttribute("likes"),
        signaturedishimage:e.currentTarget.getAttribute("signaturedishimage"),
        chefimage:e.currentTarget.getAttribute("chefimage"),
        bio:e.currentTarget.getAttribute("bio"),
        cheftitlelabel:e.currentTarget.getAttribute("cheftitlelabel"),
        menu:e.currentTarget.getAttribute("menu")
      }
      //send menu above
    },
    '/menu',
    )
  }
  return (
    <div className="container">
      <Head>
        <title>Select a chef near you</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className="mycontainer">
      {restaurantDataArray.map((restaurant, index) => {
        console.log (restaurant.menu);
          let menuString = JSON.stringify(restaurant.menu)
          console.log (menuString);
          return (
            <a 
            href={menuhref}
            index={index}
            chefname={restaurant.chefname} 
            cuisine={restaurant.cuisine}
            likes={restaurant.likes} 
            signaturedishimage={restaurant.signaturedishimage} 
            chefimage={restaurant.chefimage}
            bio={restaurant.bio}
            cheftitlelabel={restaurant.cheftitlelabel}
            menu={menuString}
            onClick={showMenu}
            >
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
