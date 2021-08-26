import Link from 'next/link'
import Trycomponent from '../components/trycomponent.js'
import styles from '../stylesheets/restaurants.module.css'
import { useRouter } from 'next/router';
function Restaurants({ data }) {
  
  return (
<div className = {styles.restaurantcontainer}>
  <h1>Chefs List</h1>
    {data.map((restaurant, index) => ( 

    <Link href="/newmenu">
    <a>
    <Trycomponent
          key={index}
          chefname={restaurant.chefname} 
          cuisine={restaurant.cuisinename}
          likes={restaurant.likes} 
          signaturedishimage={restaurant.signaturedishimagename} 
          chefimage={restaurant.chefphotoname}/>
    </a>
    </Link>
   
  ))}
    </div>

  )}
// This gets called on every request
export async function getServerSideProps(context) {

  const router = useRouter()
    // Fetch data from external API
    const res = await fetch("http://0.0.0.0:8080/"+router.query.lat+"/"+router.query.lng)
    const data = await res.json()
    console.log (data)
    // Pass data to the page via props  
    return { props: { data } }
  }
  
export default Restaurants
