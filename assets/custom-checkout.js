

const displayTriggerShow = document.querySelectorAll(".display-show-trigger");
const displayTriggerHide = document.querySelectorAll(".display-hide-trigger");
var selectedAddress = "";
  
displayTriggerShow.forEach(trigger => {
  trigger.addEventListener('click', function handleClick(event) {
    var containerSelected = trigger.getAttribute("data-container-target");
    var selectedElement = document.getElementById(containerSelected);
    selectedElement.style.display = 'block';    
  });
});

displayTriggerHide.forEach(trigger => {
  trigger.addEventListener('click', function handleClick(event) {
    var containerSelected = trigger.getAttribute("data-container-target");
    var selectedElement = document.getElementById(containerSelected);
    selectedElement.style.display = 'none';    
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const addressRadios = document.querySelectorAll("input[name='address']");

    function getSelectedAddress() {
        const selectedRadio = document.querySelector("input[name='address']:checked");
        if (selectedRadio) {
            const index = selectedRadio.id.replace("address-", ""); // Get the index from ID

            selectedAddress = {
                address1: document.querySelector(`#address-address1-${index}`).textContent.trim(),
                street: document.querySelector(`#address-street-${index}`).textContent.trim(),
                city: document.querySelector(`#address-city-${index}`).textContent.trim(),
                zip: document.querySelector(`#address-zip-${index}`).textContent.trim(),
                country: document.querySelector(`#address-country-${index}`).textContent.trim(),
                first_name: document.querySelector(`#address-firstname-${index}`).textContent.trim(),
                last_name: document.querySelector(`#address-lastname-${index}`).textContent.trim(),
                province: document.querySelector(`#address-province-${index}`).textContent.trim()
            };

            console.log(selectedAddress);
            return selectedAddress;
        }
        return null;
    }

    addressRadios.forEach(radio => {
        radio.addEventListener("change", getSelectedAddress);
    });

    // Optional: Get initially selected address
    getSelectedAddress();
});



// document.addEventListener("DOMContentLoaded", function () {
//     var addressForm = document.querySelector("#address_form_new");

//     if (addressForm) {
//         addressForm.addEventListener("submit", function (event) {
//             event.preventDefault();
//             var formData = new FormData(addressForm);

//             fetch(addressForm.action, {
//                 method: "POST",
//                 body: formData,
//                 headers: { "X-Requested-With": "XMLHttpRequest" }
//             })
//             .then(response => response.text()) // Shopify might return HTML, so parse as text
//             .then(responseText => {
//                 if (responseText.includes("success")) { // Adjust success detection
//                     alert("Address updated successfully!");
//                 } else {
//                     alert("Something went wrong. Please try again.");
//                 }
//             })
//             .catch(error => console.error("Error:", error));
//         });
//     }
// });


document.getElementById("btnCheckout").addEventListener("click", function (){
  // alert("button was click!");
  
  if(selectedAddress){
    fetch('/cart.js')
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            let cartId = data.token; // Shopify's cart ID
            // alert(cartId);
            // window.location.href = "https://shopify.clearlablens.com/clearlabes/cart-order.php?cart_id=" + cartId;
            console.log(cartId);

            // let shippingAddress = {
            //     first_name: "John",
            //     last_name: "Doe",
            //     address1: "123 Main Street",
            //     city: "New York",
            //     province: "NY",
            //     country: "US",
            //     zip: "10001",
            //     phone: "+15555555555"
            // };

            // let billingAddress = {
            //     first_name: "John",
            //     last_name: "Doe",
            //     address1: "456 Billing Street",
            //     city: "New York",
            //     province: "NY",
            //     country: "US",
            //     zip: "10002",
            //     phone: "+15555555555"
            // };
          
            const formData = new FormData();
            formData.append('action', 'create_order');
            formData.append('cart_id', cartId);
            formData.append('shipping_address', JSON.stringify(selectedAddress));
            formData.append('billing_address', JSON.stringify(selectedAddress));
          

            fetch('https://shopify.clearlablens.com/clearlabes/', {
              method: 'POST',
              body: formData,
            })
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if(result.success){
                  // localStorage.setItem("cartId", result.new_cart_id); // Store new empty cart
                  alert("Order Created! Cart has been cleared.");
                  console.log('Success:', result.order_id);
                  console.log(result.cart_response);
                  clearCart();
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




