import Head from 'next/head'
import AutoComplete from 'react-google-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete' ;
import { useState,useEffect } from 'react';
import Restaurant from '../components/restaurant.js'
import { useRouter } from 'next/router'
export default function Address() {
    const menuhref = "/menu";
    const router = useRouter();
    const [value, setValue] = useState(null);
    const [restaurantsArray, setRestaurantsResponse] = useState(new Array());
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
    return (
        <div className="container">
          <Head>
            <title>Select a chef near you</title>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
          {restaurantsArray.length > 0  &&
            <main className="mycontainer">
           {restaurantsArray.map((restaurant, index) => (
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
              menu={JSON.stringify(restaurant.menuList)}
              onClick={showMenu}
              >
           <Restaurant 
           chefname={restaurant.chefname} 
           cuisine={restaurant.cuisinename}
           likes={restaurant.likes} 
           signaturedishimage={restaurant.signaturedishimagename} 
           chefimage={restaurant.chefphotoname}/>
           </a>
           ))}
              </main>
          }
          {restaurantsArray.length == 0  &&
            <main className="mycontainer">
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
</main>
          }
            <style jsx global>{`
            `}</style>
            </div>
    )}