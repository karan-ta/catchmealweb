import Head from 'next/head'
import Trycomponent from '../components/trycomponent.js'
import styles from '../stylesheets/address.module.css'
import { restaurantData } from "../data/restaurantsData";
import { useRouter } from 'next/router'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete' ;
import { useState,useEffect } from 'react';
export default function Trycss() {
    // const restaurantDataArray = JSON.parse(restaurantData)
    const router = useRouter()
    const menuhref = "/newmenu"
    const [value, setValue] = useState(null)
    const [restaurantDataArray, setRestaurantsResponse] = useState(new Array());
  
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
    useEffect(() => {
      // Update the document title using the browser API
      if (value != null){ 
     console.log (value.label);
     geocodeByAddress(value.label)
.then(results => getLatLng(results[0]))
.then(({ lat, lng }) =>
  // console.log('Successfully got latitude and longitude', { lat, lng });
  fetch("http://0.0.0.0:8080/"+lat+"/"+lng)
  .then(res => res.json())
  .then(
    (response) => {
     setRestaurantsResponse (response);
     console.log(response);
    },
    (error) => {
   
    }
  )
);
      }
    },[value]);
    return(
      <div className={styles.homepagecontainer}>
        <Head>
            <title>Select a chef near you</title>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
          {restaurantDataArray.length > 0  &&
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
}
{restaurantDataArray.length == 0  &&
            <div className={styles.addressContainer}>
    <h1>Address</h1>
    <br/>
    <div>
    <GooglePlacesAutocomplete
  apiKey="AIzaSyAActYUF3kZoA-KFzulfFGkLAXmx8oYzh4"
  selectProps={{
    value,
    onChange: setValue,
  }}
/>
   
</div>
</div>
          }
              </div> 
            )}