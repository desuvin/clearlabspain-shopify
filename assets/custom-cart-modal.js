// Get the modal
var modal = document.getElementById("cartModal");

// Get the button that opens the modal (you can link this to a button or an event)
// var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openModalCart(){
  modal.style.display = "block";
}

function closeModalCart(){
  modal.style.display = "none";
}

function gotoCheckout(){
  // window.location.href = "https://clearlab-spain.myshopify.com/checkout";
  window.location.href = "/cart";
}

function afterSubmit(){
  var productSpecs = document.getElementById("product-details-specs");
  var cartCount = document.getElementById("cart-count");
  
  //specs
  var quantity = document.getElementById('product-quantity');
  var productColor = document.getElementById('product-color');
  var productAxis = document.getElementById('product-axis');
  var productCylinder = document.getElementById('product-cylinder');
  var productSelector = document.getElementById('product-selector');
  var productPower = document.getElementById('product-power');
  
  var cartCountValue = parseInt(cartCount.innerHTML, 10);  // Convert to an integer
  var newCartCountValue = cartCountValue + parseInt(quantity.value, 10);  
  cartCount.innerHTML = newCartCountValue;

  let pwr_qty_p = document.createElement("p");
  if(productPower){
     pwr_qty_p.innerHTML = "Power: "+productPower.options[productPower.selectedIndex].text+"&nbsp;&nbsp;&nbsp; QTY: "+quantity.value;
  } else {
     pwr_qty_p.innerHTML = "Power: "+productSelector.options[productSelector.selectedIndex].text+"&nbsp;&nbsp;&nbsp; QTY: "+quantity.value;
  }
 
  productSpecs.append(pwr_qty_p);
  
  if(productColor){
    let p = document.createElement("p");
    p.innerHTML = "Color : "+productColor.value;
    productSpecs.append(p);
  }
  if(productCylinder){
    let p = document.createElement("p");
    p.innerHTML = "Cylinder : "+productCylinder.value;
    productSpecs.append(p);
  }
  if(productAxis){
    let p = document.createElement("p");
    p.innerHTML = "Axis : "+productAxis.value;
    productSpecs.append(p);
  }
  openModalCart();
}