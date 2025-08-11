var selectedAddress = "";

// document.addEventListener("DOMContentLoaded", function () {
//     const addressRadios = document.getElementById("input[name='address']");

//     function getSelectedAddress() {
//         const selectedRadio = document.querySelector("input[name='address']:checked");
//         if (selectedRadio) {
//             const index = selectedRadio.id.replace("address-", ""); // Get the index from ID

//             selectedAddress = {
//                 // address1: document.querySelector(`#address-address1-${index}`).textContent.trim(),
//                 // street: document.querySelector(`#address-street-${index}`).textContent.trim(),
//                 // city: document.querySelector(`#address-city-${index}`).textContent.trim(),
//                 // zip: document.querySelector(`#address-zip-${index}`).textContent.trim(),
//                 // country: document.querySelector(`#address-country-${index}`).textContent.trim(),
//                 // first_name: document.querySelector(`#address-firstname-${index}`).textContent.trim(),
//                 // last_name: document.querySelector(`#address-lastname-${index}`).textContent.trim(),
//                 // province: document.querySelector(`#address-province-${index}`).textContent.trim()

//                 address1:document.getElementById("selected-name").textContent,
//                 street:document.getElementById("selected-street").textContent,
//                 city:document.getElementById("selected-city").textContent,
//                 zip:document.getElementById("selected-zip").textContent,
//                 country:document.getElementById("selected-country").textContent,
//                 first_name:document.getElementById("selected-firstname").textContent,
//                 last_name:document.getElementById("selected-lastname").textContent,
//                 province:document.getElementById("selected-province").textContent,
                
//             };

//             console.log(selectedAddress);
//             return selectedAddress;
//         }
//         return null;
//     }

//     addressRadios.forEach(radio => {
//         radio.addEventListener("change", getSelectedAddress);
//     });

//     // Optional: Get initially selected address
//     getSelectedAddress();
// });


document.getElementById("btnCheckout").addEventListener("click", function (){
  // alert("button was click!");
  this.disabled = true; // Disable the button to prevent multiple clicks
  this.textContent = "Processing..."; // Change button text to indicate processing
  if(selectedAddress){
    fetch('/cart.js')
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            let cartId = data.token; // Shopify's cart ID
            console.log(cartId);
            let email_address = document.getElementById('account_email').value;
            const formData = new FormData();
            formData.append('action', 'create_order');
            formData.append('cart_id', cartId);
            formData.append('shipping_address', JSON.stringify(selectedAddress));
            formData.append('billing_address', JSON.stringify(selectedAddress));
            formData.append('email_address', email_address);
          

            fetch('https://shopify.clearlablens.com/clearlabes/', {
              method: 'POST',
              body: formData,
            })
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if(result.success){
                  // localStorage.setItem("cartId", result.new_cart_id); // Store new empty cart
                  // alert("Order Created! Cart has been cleared.");
                  updateStatus(checkoutStatus, completedCheckout, completedStatusColor);
                  console.log('Success:', result.order_id);
                  console.log('Order Response', result.order_response);
                  // console.log(result.cart_response);
                  clearCart();
                  let newUrl = "https://clearlab-spain.myshopify.com/account/orders/"+result.order_token;
                  const shopifyStoreUrl = "https://"+Shopify.shop+"/account/orders/"+result.order_token;
                  console.log(shopifyStoreUrl);
                  redirectPage(newUrl);
                } else {
                  alert(result.error);
                }
                
              })
              .catch(error => {
                console.error('Error:', error);
              });
        } else {
            alert("Cart is empty!");
        }
    })
    .catch(error => console.error("Error fetching cart:", error));
  } else {
    alert("No Address Selected");
  }
   
});

function clearCart(){
  fetch('/cart/clear.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Cart cleared:', data);
  })
  .catch(error => {
    console.error('Error clearing cart:', error);
  });

}

function redirectPage(url){
  setTimeout(() => {
     window.location.href = url;
  }, 3000); 
 
}




