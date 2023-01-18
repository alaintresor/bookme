import axios from 'axios';




export const paymentGate = async (req, res) => {
    let {amount} = req.body
    function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxx-xxxx-4xxx-yxxx-xxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

var data = {
  "apiOperation": "CREATE_CHECKOUT_SESSION",
  "interaction": {
    "operation": "PURCHASE"
  },
  "order": {
    "amount": parseInt(amount),
    "currency": "USD",
    "id": `${generateUUID()}`
  }
};
var config = {
  method: 'post',
  url: 'https://ap-gateway.mastercard.com/api/rest/version/61/merchant/8206000697/session',
  headers: {
    'Authorization': 'Basic bWVyY2hhbnQuODIwNjAwMDY5NzpiZTcxZTIyYmM1YTZjMWQ0YmRhYWE4NWY3OWM2NTBiZA==',
    'Content-Type': 'application/json'
  },
  data : data
};
axios.post('https://ap-gateway.mastercard.com/api/rest/version/61/merchant/8206000697/session',data,{
    headers:{
        'Authorization': 'Basic bWVyY2hhbnQuODIwNjAwMDY5NzpiZTcxZTIyYmM1YTZjMWQ0YmRhYWE4NWY3OWM2NTBiZA==',
        'Content-Type': 'application/json'
    }
})
.then(function (response) {
    console.log(response);
  res.status(200).json({ status: 'success',data:response.data})
})
.catch(function (error) {
    res.status(500).json({ status: 'erroe', erro:error })
  console.log(error);
});

}