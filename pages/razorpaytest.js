export default function Razorpaytest(props) {
    function callSignatureApi (response)
    {
        const paramString = "paymentid="+response.razorpay_payment_id+"&orderid="+response.razorpay_order_id+"&signature="+response.razorpay_signature+"&razorpay_secret=CxddGtImY1enXfYnoQjDUumU"
                    fetch("http://0.0.0.0:8080/razorpaysignature",{
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
                         return response
                        },
                        (error) => {
            
                        }
                      )
             
    }
    function callCreateOrderApi ()
    {
    const paramString = "chefid=1&amount=50000"
    fetch("http://0.0.0.0:8080/razorpaytesting",{
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
     return response
    },
    (error) => {
    }
  )
    }
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
    async function displayRazorpay(e) {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
        }
        const paramString = "chefid=1&amount=50000"
        fetch("http://0.0.0.0:8080/razorpaytesting",{
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
                    callSignatureApi (response)
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
    return(
     
            <div className="App">
                    <a
                       id = "rzp-button1"
                        className="App-link"
                        onClick={displayRazorpay}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Donate $5
                    </a>
            </div>
        
    
    )}