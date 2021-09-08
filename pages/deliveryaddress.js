// https://stackoverflow.com/questions/32174317/how-to-set-default-checked-in-checkbox-reactjs
import styles from '../stylesheets/deliveryaddress.module.css'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete' ;
import {useRef,useState,useEffect } from 'react';

function DeliveryAddress({ data }) {
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    async function displayRazorpay(e,data) {
        const frontendCart = localStorage.getItem('mooveop_cart')?JSON.parse (localStorage.getItem('mooveop_cart')):[]
        let cartToBeSaved = []
       Object.keys(frontendCart).map(shopName => {
        frontendCart[shopName].map(cartItem => {
        let backendCartItem = new Object ()
        backendCartItem["chefId"] = cartItem.itemid.split ("_")[0]
        backendCartItem["itemId"]  = cartItem.itemid.split ("_")[1]
        backendCartItem["itemQty"] = cartItem.itemqty
        cartToBeSaved.push (backendCartItem)
        })
       })
        const chefId = localStorage.getItem('chefId')
        const cartTotal = localStorage.getItem('mooveop_cart_total')
         const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
         if (!res) {
           alert('Razorpay SDK failed to load. Are you online?')
           return
             }
             const paramString = "&amount="+cartTotal*100+"&deliveryType="+data.deliveryAt+"&landmark="+data.landmark+"&buildingName="+data.buildingName+"&flatNumber="+data.flatNumber
             fetch(process.env.api_url+"razorpaytesting",{
             mode:"cors",
             method: "POST",
             headers: new Headers({
                 'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
         }),
             body: paramString,
           })
           .then(res => res.json())
               .then(
                 (response) => {
                 console.log (response) 
                 const orderApiData = response   
                 const options = {
                     "key": "rzp_test_MAVdJtlc3h9K7x", // Enter the Key ID generated from the Dashboard
                     "amount": orderApiData.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                     "currency": orderApiData.currency,
                     "name": "Acme Corp",
                     "description": "Test Transaction",
                     "image": "https://example.com/your_logo",
                     "order_id": orderApiData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                     "handler": function (response){
                         console.log (response.razorpay_payment_id)
                         console.log (response.razorpay_order_id)
                         console.log (response.razorpay_signature)
                         const paramString = "paymentid="+response.razorpay_payment_id+"&orderid="+response.razorpay_order_id+"&signature="+response.razorpay_signature+"&razorpay_secret=CxddGtImY1enXfYnoQjDUumU"
                         fetch(process.env.api_url+"razorpaysignature",{
                             mode:"cors",
                             method: "POST",
                             headers: new Headers({
                               'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({"orderId":response.razorpay_order_id,"paymentId":response.razorpay_payment_id,"secret":"CxddGtImY1enXfYnoQjDUumU","signature":response.razorpay_signature,"cartItems":cartToBeSaved})
                           })
                           .then(res => res.json())
                           .then(
                             (response) => {
                             console.log (response)    
                              return response
                             },
                             (error) => {
                 
                             }
                           )
           
                     },
                     "prefill": {
                         "name": "Gaurav Kumar",
                         "email": "gaurav.kumar@example.com",
                         "contact": "9999999999"
                     },
                     "notes": {
                         "address": "Razorpay Corporate Office"
                     },
                     "theme": {
                         "color": "#3399cc"
                     }
                 };
                 var rzp1 = new Razorpay(options);
         rzp1.on('payment.failed', function (response){
                 alert(response.error.code);
                 alert(response.error.description);
                 alert(response.error.source);
                 alert(response.error.step);
                 alert(response.error.reason);
                 alert(response.error.metadata.order_id);
                 alert(response.error.metadata.payment_id);
         });
         console.log ("opening")
             rzp1.open();
             e.preventDefault();
                 },
                 (error) => {
                 }
               )
         }
    function validateDeliveryAddressForm (e){
        e.preventDefault ()
        console.log ("validating...")
        console.log (document.getElementsByName("flatNumber").value)
        console.log (flatNumberRef.current.value)
        console.log (landmarkInputRef.current)
        if (!isFlatDelivery && !isGateDelivery)
        { 
        setErrorString("Select gate or flat delivery.")
        }
        else if (isFlatDelivery && isGateDelivery)
        { 
        setErrorString("Select either gate or flat delivery.")
        
        }
       
        
        else if (flatNumberRef.current.value == "")
        {
            setErrorString("Enter Flat Number")
            
        }
        else if (buildingName.label == undefined)
        {
            setErrorString("select building name.")
        }
        else if (landmarkInputRef.current.value == "" )
        {
            setErrorString("Enter landmark name.")
            
        }
        else 
        {
            setErrorString("")
            let deliveryFormData = {}
            deliveryFormData["deliveryAt"] = isFlatDelivery?"flat":"gate"
            deliveryFormData ["landmark"] = landmarkInputRef.current == null?"":landmarkInputRef.current.value
            deliveryFormData ["flatNumber"] = flatNumberRef.current==null?"":flatNumberRef.current.value
            deliveryFormData ["buildingName"] = buildingName.label
           console.log (deliveryFormData)
            displayRazorpay (e,deliveryFormData)
        }
       
    }
    const landmarkInputRef = useRef("");
    const flatNumberRef = useRef("");
    const [errorString,setErrorString] = useState("")
    const [buildingName, setBuildingName] = useState("")
    const [isFlatDelivery, setFlatDelivery] = useState(false)
    const [isGateDelivery, setGateDelivery] = useState(false)
    return (
    <div className = {styles.deliveryaddresscontainer}>
    <h1>Enter Delivery address</h1>
        <div className = {styles.checkboxContainer}>
        <label className = {styles.checkboxLabel}>
    <input
        type="checkbox"
        value="Deliver At Gate Entrance"
        className = {styles.checkboxElement}
        onChange={() => setGateDelivery(!isGateDelivery)}
            />
Deliver At Gate Entrance
        </label>
        </div>
        <div className = {styles.checkboxContainer}>
        <label className = {styles.checkboxLabel}>
    <input
        type="checkbox"
        value="Deliver At Flat Entrance"
        className = {styles.checkboxElement}
        onChange={() => setFlatDelivery(!isFlatDelivery)}
            />
        Deliver At Flat Entrance
        </label>
        </div>
       
        <div>
        <div className = {styles.flatNumberLabel}>
        <label>
        Flat Number
        </label>
        </div>
        <div className = {styles.flatNumberElemDiv}>
        <input ref={flatNumberRef} className = {styles.flatNumberElement} type="text" name="flatNumber"   />
        </div>
        </div>
       <div className = {styles.spacer}></div>
       <div className = {styles.buildingNameLabel}>
        <label>
        Building name
        </label>
        </div>
        <div className = {styles.buildingNameElemDiv}>
        {/* <input className = {styles.buildingNameElement} type="text" name="buildingname"   /> */}
        <GooglePlacesAutocomplete
  apiKey="AIzaSyAActYUF3kZoA-KFzulfFGkLAXmx8oYzh4"
  selectProps={{
    buildingName,
    onChange: setBuildingName,
  }}
/>
        </div>
       <div className = {styles.spacer}></div>
        <div className = {styles.landmarkLabel}>
        <label>
        Landmark
        </label>
        </div>
        <div className = {styles.landmarkElemDiv}>
        <textarea ref={landmarkInputRef} className = {styles.landmarkElement} name="flatnumber"></textarea>
        </div>
        <div className = {styles.spacer}></div>
        <div className = {styles.saveAddressButtonDiv}>
        <button
        onClick={validateDeliveryAddressForm} 
        className = {styles.saveAddressButton} 
        type="submit">
        Pay now to purchase
        </button>
        </div>
        <div className = {styles.errorDiv}>
            {errorString}
        </div>
    </div>
    )
}
export default DeliveryAddress