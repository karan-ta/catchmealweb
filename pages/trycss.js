import Trycomponent from '../components/trycomponent.js'
import styles from '../stylesheets/Trycomponentpage.module.css'
import { restaurantData } from "../data/restaurantsData";
import { useRouter } from 'next/router'
export default function Trycss() {
    const restaurantDataArray = JSON.parse(restaurantData);
    const router = useRouter();
    const menuhref = "/newmenu";
    const showMenu = (e) => {
      e.preventDefault()
      router.push(
        {
        pathname: '/newmenu',
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
      '/newmenu',
      )
    }
    return( 
      <div className = {styles.restaurantcontainer}>
            <h1>Chefs List</h1>
            {restaurantDataArray.map((restaurant, index) => ( 
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
                menu={JSON.stringify(restaurant.menu)}
                onClick={showMenu}
                >
        <Trycomponent
          key={index}
          chefname={restaurant.chefname} 
          cuisine={restaurant.cuisine}
          likes={restaurant.likes} 
          signaturedishimage={restaurant.signaturedishimage} 
          chefimage={restaurant.chefimage}/>
          </a>
      
            ))}
              </div>
            )}