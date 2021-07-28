import Head from 'next/head'
import AutoComplete from 'react-google-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete' ;
import { useState,useEffect } from 'react';
export default function Address() {
    const [value, setValue] = useState(null);
    useEffect(() => {
        // Update the document title using the browser API
        if (value != null){ 
       console.log (value.label);
       geocodeByAddress(value.label)
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) =>
    console.log('Successfully got latitude and longitude', { lat, lng })
  );
        }
      });
    return (
        <div className="container">
          <Head>
            <title>Select a chef near you</title>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
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
        {/* <AutoComplete
  apiKey="AIzaSyAActYUF3kZoA-KFzulfFGkLAXmx8oYzh4"
  onPlaceSelected={(place) => console.log(place)}
/> */}
    </div>
        </main>
            <style jsx global>{`

            `}</style>
            </div>
    )}